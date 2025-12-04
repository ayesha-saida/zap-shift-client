import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useParams } from 'react-router'

const Payment = () => {
    const {parcelId} = useParams()
    const {} = useQuery({
        queryKey: ['parcels', parcelId]
    })

  return (
    <div>
        <h2> Please Pay </h2>
    </div>
  )
}

export default Payment