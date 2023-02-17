import { type UserInfo } from 'firebase/auth'
import { type User } from '../types/user'
import { addUserDocToFireStore } from './add-user-doc-to-firestore'

const saveUserDataToDB = async (authData: UserInfo): Promise<void> => {
  const { uid, email, photoURL, displayName } = authData

  if (uid == null || email == null || photoURL == null || displayName == null) {
    throw Error('uid, email, photoURL, or displayName is undefined')
  }

  const userObject: User = {
    email,
    photoURL,
    displayName,
  }

  if (userObject == null) {
    throw Error('UserObject is undefined')
  }

  await addUserDocToFireStore('users', uid, userObject)
}

export default saveUserDataToDB
