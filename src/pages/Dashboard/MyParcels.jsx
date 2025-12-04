import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import useAxiosSecure from '../../components/useAxiosSecure'
import { FaEdit } from 'react-icons/fa'
import { MdDeleteForever } from 'react-icons/md'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import Swal from 'sweetalert2'
//import { Link } from 'react-router'

const MyParcels = () => {
   const {user} = useContext(AuthContext)
  const axiosInstance = useAxiosSecure()

   const { data: parcels = [], refetch } = useQuery({
    queryKey: ['my-parcels', user?.email],
    queryFn: async() => {
           const res = await axiosInstance.get(`/parcels?email=${user.email}`)
           return res.data;
    }
   })

 const handleParcelDelete = (id) => {
  console.log(id)
  Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {

    axiosInstance.delete(`/parcels/${id}`)
    .then(res => {
      console.log(res.data)

      if(res.data.deletedCount) {
             refetch();  //refresh the data in the UI

          Swal.fire({
          title: "Deleted!",
          text: "Your parcel request has been deleted.",
          icon: "success"
         }); 
      }

    })

  }
});

 }

const handlePayment = async(parcel) => {
   
  //  Validate parcel data
  if (!parcel.cost || isNaN(parcel.cost) || parcel.cost <= 0) {
   alert('Parcel cost is invalid. Cannot proceed to payment.');
        return;
    }
     
  if (!parcel.senderEmail) {
    alert('Parcel sender email is missing.');
    return;
  }

    const paymentInfo = {
            cost:  Number(parcel.cost),
            parcelId: parcel._id,
            senderEmail: parcel.senderEmail,
            parcelName: parcel.parcelName
      }
         const res = await axiosInstance.post('/payment-checkout-session', paymentInfo)
          console.log(res.data)
      window.location.href = res.data.url
}

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
        <th>Payment</th>
        <th>Delivery Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
       {
            parcels.map((parcel, index) => 
         <tr key={parcel._id}>
        <th>{index + 1}</th>
        <td>{parcel.parcelName}</td>       
        <td>{parcel.cost}</td> 
              
        <td>
          {
          parcel.paymentStatus === 'paid' ? <span className='text-green-500'> Paid </span>
           :  <button onClick={ () =>  handlePayment(parcel) } className='btn btn-sm btn-primary text-black'> Pay </button> 
          }
        </td> 

        <td>{parcel.deliveryStatus}</td>              
        <td className='flex'>
          <button className='btn btn-square hover:bg-primary'>
              <FaMagnifyingGlass />
          </button>
          <button className='btn btn-square hover:bg-primary mx-2'>
              <FaEdit />
          </button>
          <button 
           onClick={ () => handleParcelDelete(parcel._id)}
          className='btn btn-square hover:bg-primary'>
              <MdDeleteForever />
          </button>  
        </td>
       
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