import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../../contexts/AuthContext'
import useAxiosSecure from '../../../components/Hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'

const PaymentHistory = () => {
    const {user} = useContext(AuthContext)
    const axiosInstance = useAxiosSecure()
    
    const {data: payments = []} = useQuery( {
        queryKey: ['payments', user.email],
        queryFn: async () => {
          const res = await axiosInstance.get(`/payments?email=${user.email}`)
          return res.data
        }
    })
  return (
    <div>
        <h2 className='text-5xl'> Payment History : {payments.length} </h2>
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Amount</th>
        <th>Time</th>
        <th>Transaction</th>
      </tr>
    </thead>
    <tbody>
      
      {
        payments.map( (payment, index) =>  <tr key={payment._id}>
        <th>{index + 1}</th>
        <td>{user?.displayName}</td>
        <td>${payment.amount}</td>
        <td>${payment.paidAt}</td>
        <td>{payment.transactionId}</td>
      </tr>)
      }

    </tbody>
  </table>
</div>
    </div>
  )
}

export default PaymentHistory