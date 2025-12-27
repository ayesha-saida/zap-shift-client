import { useContext } from 'react'
import { AuthContext } from '../../../contexts/AuthContext';
import useAxiosSecure from '../../../components/Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const AssignTask = () => {
      const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['parcels', user.email, 'driver_assigned'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/rider?riderEmail=${user.email}&deliveryStatus=driver_assigned`)
            return res.data;
        }
    })

     const handleDeliveryStatusUpdate = (parcel, status) => {
        const statusInfo = { 
            deliveryStatus: status, 
            riderId: parcel.riderId,
            trackingId: parcel.trackingId
        }

        axiosSecure.patch(`/parcels/${parcel._id}/status`, statusInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: 'Thank you for accepting',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

  return (
    <div>
          <h2 className="text-4xl">Parcels Pending Pickup: {parcels.length}</h2>

           <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Confirm</th>
                            <th>Other Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                          {parcels.map((parcel, index) => <tr key={parcel._id}>
                            <th>{index + 1}</th>
                            <td>{parcel.parcelName}</td>
                            <td>
                                {
                                    parcel.deliveryStatus === 'driver_assigned'
                                        ? <>
                                            <button
                                                  onClick={() => handleDeliveryStatusUpdate(parcel, 'rider_arriving')}
                                                className='btn btn-primary text-black'>Accept</button>
                                            <button className='btn btn-warning text-black ms-2'>Reject</button>
                                        </>
                                             : <span>Accepted</span>
                                }

                            </td>
                            <td>
                                <button
                              
                                    className='btn btn-primary text-black'>Mark as Picked Up</button>
                                <button
                                   
                                    className='btn btn-primary text-black mx-2'>Mark as Delivered</button>
                            </td>
                        </tr>)}

                    </tbody>
                          </table>
            </div>
    </div>
  )
}

export default AssignTask