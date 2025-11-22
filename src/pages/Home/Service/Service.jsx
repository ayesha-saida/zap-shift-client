import  { useEffect, useState } from 'react'
import serviceIcon from '../../../assets/service.png'

const Service = () => {
 const [services, setServices] = useState([]);

  useEffect(() => {
    fetch('/services.json')
      .then(res => res.json())
      .then(data => {
        setServices(data); 
      //  console.log(data)
      });
  }, []); 

  return (
    <div className='bg-secondary w-11/12 mx-auto rounded-lg m-6 p-7'> 
    <div className='space-y-3 pt-3 text-center'>
        <h1 className='text-2xl font-bold text-white'>Our Services</h1>
         <p className='font-light text-sm text-white'> Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to 
          <br />
    business shipments — we deliver on time, every time.</p>
    </div>
<div className='grid lg:grid-cols-3 lg:gap-5 gap-3 grid-cols-1 p-4'>
     {services.map(item => (
        <div key={item.id} className='bg-white border rounded-lg space-y-2 p-5 flex flex-col justify-center items-center'>
          <img src={serviceIcon} />
          <h2 className='text-lg text-secondary font-semibold'>{item.title}</h2>
          <p className='font-light text-sm'>{item.description}</p>
        </div>
      ))}
</div>
    </div>
  )
}

export default Service
