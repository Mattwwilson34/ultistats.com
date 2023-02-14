interface UserFromLocalStorage {
  displayName: string
  email: string
  phoneNumber: string | null
  photoURL: string
  providerId: string
  uid: string
}
const getUserDataFromLocalStorage = (): UserFromLocalStorage | null => {
  const userData: string | null = localStorage.getItem('firebaseUser')
  if (userData === null || userData === undefined) {
    console.log('No user found in local storage under "firebaseUser"')
  } else {
    const user: UserFromLocalStorage = JSON.parse(userData)
    return user
  }
  return null
}
 
export {getUserDataFromLocalStorage }
