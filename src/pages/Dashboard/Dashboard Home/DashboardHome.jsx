import React from 'react'
import useRole from '../../../components/Hooks/useRole'
import Loading from '../../../components/Loading'
import RiderDashboardHome from './RiderDashboardHome'
import AdminDashboardHome from './AdminDashboardHome'
import UsersManagement from '../Users Management/UsersManagement'

const DashboardHome = () => {
    const {role, roleLoading} = useRole()

    if(roleLoading) {
        return <Loading />  
    }
    if(role === 'admin') {
        return <AdminDashboardHome /> 
    }
    else if(role === 'rider') {
        return <RiderDashboardHome /> 
    }
    else {
        return <UsersManagement />
    }

  return (
    <div>
        <h2>Dashing Dash</h2>
    </div>
  )
}

export default DashboardHome