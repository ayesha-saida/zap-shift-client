import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { Navigate, useLocation } from 'react-router'
import Loading from '../components/Loading'

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext)
    const location = useLocation()
//console.log('location', location)

    if(loading) {
      return <div>
       <Loading />
        </div>
    }

    if(!user){
      return <Navigate state={location.pathname} to={'/login'} />  
    }

  return children;
}

export default PrivateRoute