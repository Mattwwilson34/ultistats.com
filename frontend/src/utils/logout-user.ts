import { auth } from '../../../firebase/firebase'

const logoutUser = (): void => {
  void (async () => {
    try {
      await auth.signOut()
    } catch (error) {
      console.log(error)
    }
  })()
}

export default logoutUser
