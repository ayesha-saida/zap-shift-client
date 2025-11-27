import React from 'react'
import { AuthContext } from './AuthContext'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../Firebase/firebase.config'

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
    <AuthContext.Provider value={authInfo}> 
 {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider