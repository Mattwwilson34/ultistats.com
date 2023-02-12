// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider, getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBROS402FKa0UIKjziFiPgg9gir7DXNNrI',
  authDomain: 'ultistats-fc28e.firebaseapp.com',
  projectId: 'ultistats-fc28e',
  storageBucket: 'ultistats-fc28e.appspot.com',
  messagingSenderId: '289703592975',
  appId: '1:289703592975:web:23882caffc6e4527878f7a',
  measurementId: 'G-P6N3GKGE5X',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Auth
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export { app, auth, provider }
