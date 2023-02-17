import { db } from '../../../firebase/firebase'
import { doc, setDoc } from 'firebase/firestore'
import { type User } from '../types/user'

const addUserDocToFireStore = async (
  collection: string,
  uid: string,
  userObject: User
): Promise<void> => {
  try {
    await setDoc(doc(db, collection, uid), userObject)
  } catch (error) {
    console.log(error)
  }
}

export { addUserDocToFireStore }
