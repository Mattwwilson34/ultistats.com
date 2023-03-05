import { db } from '../../../firebase/firebase'
import { doc, setDoc } from 'firebase/firestore'
import { uuidv4 } from '@firebase/util'

const addTeamDocToFireStore = async (teamObject: {
  teamName: string
  userUid: string
}): Promise<void> => {
  try {
    await setDoc(doc(db, 'teams', uuidv4()), teamObject)
  } catch (error) {
    console.log(error)
  }
}

export { addTeamDocToFireStore }
