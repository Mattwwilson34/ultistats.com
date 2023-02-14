import {createContext } from 'react'
import {
  getUserDataFromLocalStorage,
} from './get-user-data-local-storage'

const user = getUserDataFromLocalStorage()

if (user === null || user === undefined) {
  console.log('No user found in local storage aborting context creation')
}

const userContext = createContext(user)

export default userContext
