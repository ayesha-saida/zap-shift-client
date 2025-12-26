import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import useAxiosSecure from '../../../components/Hooks/useAxiosSecure'

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams()
  const [paymentInfo, setPaymentInfo] = useState({})
  const sessionId = searchParams.get('session_id')
  console.log(sessionId)
  const axiosInstance = useAxiosSecure()

  useEffect(() => {
    if(sessionId){
         axiosInstance.patch(`/payment-success?session_id=${sessionId}`)
          .then(res => {
            console.log(res.data)

           setPaymentInfo({
               trackingId: res.data.trackingId,
               transactionId: res.data.transactionId
            })   

          })
    }
  }, [sessionId,axiosInstance])

  return (
    <div>
        <h2 className='text-4xl font-semibold'>Payment Successful</h2>
         <p>Your Transaction ID: {paymentInfo.transactionId}</p>
         <p>Your Parcel Tracking ID: {paymentInfo.trackingId} </p> 
    </div>
  )
}

export default PaymentSuccess