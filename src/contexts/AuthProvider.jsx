import React from 'react'
import { AuthContext } from './AuthContext'
import {auth} from '../Firebase/firebase.config'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
const AuthProvider = ({children}) => {

  const registerUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

 const logInUser = (email, password) => {
  return signInWithEmailAndPassword(auth,email, password)
 }
    const authInfo = {
   registerUser,
   logInUser,

    }
  return (
    <AuthContext value={authInfo}> 
 {children}
    </AuthContext>
  )
}

export default AuthProvider