import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { Navigate } from 'react-router'

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext)
    
    if(loading) {
      return <div>
        <span className="loading loading-dots loading-xl"></span>
        </div>
    }

    if(!user){
      return <Navigate to={'/login'} />  
    }

  return children;
}

export default PrivateRoute