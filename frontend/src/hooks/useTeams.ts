import { useQuery, type UseQueryResult } from 'react-query'
import { db } from '../../../firebase/firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { type Team } from '../types/teams'

type Teams = Team[]

const getTeams = async (userUid: string): Promise<Teams> => {
  const teams: Teams = []
  const teamsRef = collection(db, 'teams')
  const q = query(teamsRef, where('userUid', '==', userUid))
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    // Fix: teamName is undefined in this scope. Moving on with dev for now.
    const team = { ...doc.data() } as Team // eslint-disable-line @typescript-eslint/consistent-type-assertions

    teams.push(team)
  })
  return teams
}

const useTeams = (userId: string): UseQueryResult<Teams> => {
  return useQuery(['teams', userId], async () => await getTeams(userId))
}
//
export default useTeams
