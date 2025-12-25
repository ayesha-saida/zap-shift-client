import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import useRole from '../components/useRole'
import Forbidden from '../components/Forbidden'

const AdminRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext)
    const {role, roleLoading} = useRole()

    if(loading || roleLoading) {
        return <span className="loading loading-dots loading-xl"></span>
    }

    if(role !== 'admin') {
      return  <Forbidden></Forbidden>
    }

    return children
}

export default AdminRoute