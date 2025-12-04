import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router'
import useAxiosSecure from '../../../components/useAxiosSecure'

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session_id')
  console.log(sessionId)
  const axiosInstance = useAxiosSecure()

  useEffect(() => {
    if(sessionId){
         axiosInstance.patch(`/payment-succes?session_id=${sessionId}`)
          .then(res => {
            console.log(res.data)
          })
    }
  },[sessionId,axiosInstance])
  return (
    <div>
        <h2 className='text-4xl font-semibold'>Payment Successful</h2>
    </div>
  )
}

export default PaymentSuccess