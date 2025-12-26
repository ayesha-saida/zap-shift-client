import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import useRole from '../components/Hooks/useRole'
import Forbidden from '../components/Forbidden'
import Loading from '../components/Loading'

const AdminRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext)
    const {role, roleLoading} = useRole()

    if(loading || roleLoading) {
        return <Loading />  
    }

    if(role !== 'admin') {
      return  <Forbidden></Forbidden>
    }

    return children
}

export default AdminRoute