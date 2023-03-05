import { useQuery } from 'react-query'
import getTeams from '../utils/get-teams'

interface UseTeamsReturnType {
  data: any
  error: any
  isLoading: boolean
  isError: boolean
}

const useTeams = (userId: string): UseTeamsReturnType => {
  const { data, error, isLoading, isError } = useQuery(
    ['teams', userId],
    async () => await getTeams(userId)
  )
  return { data, error, isLoading, isError }
}
//
export default useTeams
