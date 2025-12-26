import React, { useContext } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { AuthContext } from '../../contexts/AuthContext'
import useAxiosSecure from '../../components/Hooks/useAxiosSecure'
import { useLoaderData } from 'react-router'
import Swal from 'sweetalert2'

const Rider = () => {
  const {
    register, 
    handleSubmit,
    control
  } = useForm()

const {user} = useContext(AuthContext)
const axiosInstance = useAxiosSecure()

const serviceCenters = useLoaderData()
const regionsDuplicate = serviceCenters.map(c => c.region)
const regions =[...new Set(regionsDuplicate)]
//console.log(regions)
const districtsByRegion = (region) => {
        const regionDistricts = serviceCenters.filter(c => c.region === region);
        const districts = regionDistricts.map(d => d.district);
        return districts;
    }

const riderRegion = useWatch({control,  name:'riderRegion'})

 const handleRiderApplication = (data) => {
   console.log(data)
     axiosInstance.post('/riders', data)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your application has been submitted. We will reach to you in 14 days",
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
 }
  return (
    <div>
      <h2 className='text-4xl text-primary'>Be a Rider</h2>

         <form onSubmit={handleSubmit(handleRiderApplication)} className='mt-12 p-4 text-black'> 

{/*two column*/}
<div className='grid grid-cols-1 md:grid-cols-2 gap-12'>

{/*rider Details*/}
 <fieldset className="fieldset">
<h4 className='text-2xl font-semibold'> Rider Details</h4>

    {/*rider name*/}
          <label className="label">Rider Name</label>
          <input type="text" {...register('riderName')}
            defaultValue={user?.displayName}
          className="input w-full" placeholder="rider Name" />
    
    {/*rider Email*/}
          <label className="label"> Email</label>
          <input type="text" {...register('riderEmail')}
           defaultValue={user?.email}
          className="input w-full" placeholder="rider Email" />
       
       {/*rider phone number*/}
          <label className="label">Rider Phone No.</label>
          <input type="number" {...register('riderNumber')} className="input w-full" placeholder="Phone Number" />
      
       {/*rider reigon*/}
          <label className="label">Region</label>
          <select  {...register('riderRegion')}className="select w-full">
                <option disabled={false}>Select your Region</option>
                {
                    regions.map((r,i) =>  <option key={i} value={r}>{r}</option>)
                }
       </select>

       {/*rider district*/}
          <label className="label">District</label>
          <select  {...register('riderDistrict')}className="select w-full">
                <option disabled={true}>Select your District</option>
                {
                   districtsByRegion(riderRegion).map((r,i) => 
                     <option key={i} value={r}>{r}</option>)
                }
       </select>  

      {/*rider address*/}
          <label className="label">Your Address</label>
          <input type="text" {...register('riderAddress')} className="input w-full" placeholder="Rider Address" />
 
     <h4 className="text-2xl font-semibold">More Details</h4>
          {/* receiver name */}
           <label className="label">Driving License</label>
          <input type="text" {...register('license')} className="input w-full" placeholder="Driving License" />

             {/* receiver email */}
     <label className="label">NID</label>
           <input type="text" {...register('nid')} className="input w-full" placeholder="NID No." />

                 {/* Bike */}
         <label className="label mt-4">BIKE</label>
          <input type="text" {...register('bike')} className="input w-full" placeholder="Bike" />
                        {/*  address */}


                    </fieldset>

 </div>
<input type='submit' value='Submit' className='btn btn-primary text-black' />
    </form>
    </div>
  )
}

export default Rider