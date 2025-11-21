import React from 'react'
import { useLoaderData } from 'react-router'
import icon from '../../../assets/bookingIcon.png'
import { TbTruckDelivery } from 'react-icons/tb'

const Work = () => {
    const data = useLoaderData()
   // console.log(data)
  return (
    <div className='w-11/12 mx-auto pt-7'>
        <h1 className='text-secondary text-2xl font-bold py-3'>How it works</h1>
        { /* <img src={icon} alt="" /> */}
        <div className='grid lg:grid-cols-4 lg:gap-5 gap-3 grid-cols-1 md:grid-cols-2'>
          {  data.map((item) => ( 
            <div key={item.id} className='border rounded-lg shadow-xl p-4 space-y-2'>
                 <TbTruckDelivery size={50} />
     <h3 className='text-lg font-semibold text-secondary'>{item.title}</h3>
     <p className='text-sm font-light'>{item.description} </p>
    </div>
          ) ) }
      
              
        </div>
        </div>
  )
}

export default Work