import { useQuery } from '@tanstack/react-query'
import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import useAxiosSecure from '../../components/useAxiosSecure'

const MyParcels = () => {
   const {user} = useContext(AuthContext)
  const axiosInstance = useAxiosSecure()

   const { data: parcels = [] } = useQuery({
    queryKey: ['myParcel', user?.email],
    queryFn: async() => {
           const res = await axiosInstance.get(`/parcels?.email=${user.email}`)
           return res.data
    }
   })

  return (
    <div>All of MyParcels: {parcels.length}</div>
  )
}

export default MyParcels