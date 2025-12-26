import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useParams } from 'react-router'
import useAxiosSecure from '../../../components/Hooks/useAxiosSecure'
import Loading from '../../../components/Loading'

const Payment = () => {
    const {parcelId} = useParams()
    const axiosInstance = useAxiosSecure()

    const {isLoading, data: parcel} = useQuery({
        queryKey: ['parcels', parcelId],
        queryFn: async() => {
            const res = await axiosInstance.get(`/parcels/${parcelId}`)
             return res.data
        }
    })

        const handlePayment = async() => {
          const paymentInfo = {
            cost: parcel.cost,
            parcelId: parcel._id,
            senderEmail: parcel.senderEmail,
            parcelName: parcel.parcelName
          }
       
          const res = await axiosInstance.post('/create-checkout-session', paymentInfo)
          console.log(res.data)
           window.location.href = res.data.url
        }

     if(isLoading) {
      return <div>
        <Loading /> 
        </div>
    }
    
  return (
    <div>
        <h2> Please Pay ${parcel.cost} for: {parcel.parcelName}</h2>
        <button onClick={handlePayment} className='btn btn-primary text-black'> Pay </button>
    </div>
  )
}

export default Payment