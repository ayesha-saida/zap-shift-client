import React, { useEffect, useState } from 'react'

const Service = () => {
 const [services, setServices] = useState([]);

  useEffect(() => {
    fetch('/services.json')
      .then(res => res.json())
      .then(data => {
        setServices(data); 
        console.log(data)
      });
  }, []); 

  return (
    <div className='bg-secondary'> 
    <div className='space-y-3 pt-3'>
        <h1 className='text-xl font-bold text-white'>Our Services</h1>
         <p className='font-light text-white'> Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to 
    business shipments — we deliver on time, every time.</p>
    </div>
<div className='grid lg:grid-cols-4 lg:gap-5 gap-3 grid-cols-1 md:grid-cols-2'>
     {services.map(item => (
        <div key={item.id}>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
        </div>
      ))}
</div>
    </div>
  )
}

export default Service
