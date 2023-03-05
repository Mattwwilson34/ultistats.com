import { auth } from '../../../firebase/firebase'

const logoutUser = (): void => {
  void (async () => {
    try {
      await auth.signOut()
      window.location.href = '/login'
    } catch (error) {
      console.log(error)
    }
  })()
}

export default logoutUser
