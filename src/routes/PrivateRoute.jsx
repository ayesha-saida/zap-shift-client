import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext)
    
  return (
    <div>

    </div>
  )
}

export default PrivateRoute