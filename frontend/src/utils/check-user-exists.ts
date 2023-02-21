import { type UserInfo } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../../firebase/firebase'

async function checkUserExists(userData: UserInfo): Promise<boolean> {
  try {
    const { uid } = userData
    if (uid == null) {
      throw Error('uid is undefined')
    }

    // Build a reference to the document for the user with the given UID
    const userRef = doc(db, 'users', uid)

    // Try to get the document for the user
    const docSnap = await getDoc(userRef)

    // If the document exists, return true; otherwise, return false
    return docSnap.exists()
  } catch (error) {
    console.error('Error checking for user:', error)
    return false
  }
}

export default checkUserExists
