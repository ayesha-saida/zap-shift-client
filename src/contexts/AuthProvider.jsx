import React, { useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import { auth } from '../Firebase/firebase.config'

const provider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

  const registerUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }

 const logInUser = (email, password) => {
  setLoading(true)
  return signInWithEmailAndPassword(auth,email, password)
 }

 const signInGoogle  = () => {
  setLoading(true)
  return signInWithPopup(auth , provider)
 }

 
  /* logout */
       const logOut = () => {
         setLoading(true)
        return signOut(auth)
       }


        // observe user state 
 useEffect(() => {
 const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
  setUser(currentUser)
  setLoading(false)
 })
 }, [])


    const authInfo = {
   registerUser,
   logInUser,
   signInGoogle,
    logOut ,
    user,
    loading
    }

  return (
    <AuthContext.Provider value={authInfo}> 
 {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider