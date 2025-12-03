import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import useAxiosSecure from '../../components/useAxiosSecure'

const MyParcels = () => {
   const {user} = useContext(AuthContext)
  const axiosInstance = useAxiosSecure()

   const { data: parcels = [] } = useQuery({
    queryKey: ['my-parcels', user?.email],
    queryFn: async() => {
           const res = await axiosInstance.get(`/parcels?.email=${user.email}`)
           return res.data;
    }
   })

  return (
    <div> 
      <h2>All of My Parcels: {parcels.length}</h2> 
    
    <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Cost</th>
        <th>Payment Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
       {
            parcels.map((parcel, index) => 
         <tr key={parcel._id}>
        <th>{index + 1}</th>
        <td>{parcel.parcelName}</td>
        <td>{parcel.senderName}</td>        
        <td>{parcel.cost}</td>
       
      </tr>
           )
       }
    

    </tbody>
  </table>
</div>
    </div>
  )
}

export default MyParcels