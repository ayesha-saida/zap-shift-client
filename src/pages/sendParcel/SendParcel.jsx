import React from 'react'
import { useForm, useWatch, Watch } from 'react-hook-form'
import { useLoaderData } from 'react-router'

const SendParcel = () => {
 const { register, handleSubmit, control, formState: { errors } } = useForm()

const serviceCenters = useLoaderData()
const regionsDuplicate = serviceCenters.map(c => c.region)
const regions =[...new Set(regionsDuplicate)]
//console.log(regions)
const senderRegion = useWatch({control,  name:'senderRegion'})
const recieverRegion = useWatch({control,  name:'recieverRegion'})

const districtsByRegion = region =>{
    const regionDistricts = serviceCenters.filter(c => c.region === region)
    const districts = regionDistricts.map(d => d.district)
    return districts
}

 const handleSendParcel = (data) => {
console.log(data)
 }
  return (
    <div>
        <h2 className='text-5xl font-bold'>Send a Parcel</h2>
    <form onSubmit={handleSubmit(handleSendParcel)} className='mt-12 p-4 text-black'> 
        {/* parcel type */}
  <div className='space-x-4'>
    <label className='label'>
        <input type="radio" {...register('parcelType')} value='document' className="radio" defaultChecked />
        Document
   </label>
    <label className='label'>
        <input type="radio" {...register('parcelType')} value='non-document'  className="radio" defaultChecked />
        Non-Document
   </label>

 </div>


{/* parcel info: name, weight */}
<div className='grid grid-cols-1 md:grid-cols-2 gap-12 my-8'>
    <fieldset className="fieldset">
          <label className="label">Parcel Name</label>
          <input type="text" {...register('parcelName')} className="input w-full" placeholder="Parcel Name" />
        </fieldset>
    <fieldset className="fieldset">
          <label className="label">Parcel Weight (kg)</label>
          <input type="number" {...register('parcelWeight')} className="input w-full" placeholder="Parcel Weight" />
        </fieldset>
</div>


{/*two column*/}
<div className='grid grid-cols-1 md:grid-cols-2 gap-12'>

{/*sender Details*/}
 <fieldset className="fieldset">
<h4 className='text-2xl font-semibold'> Sender Details</h4>

    {/*sender name*/}
          <label className="label">Sender Name</label>
          <input type="text" {...register('senderName')} className="input w-full" placeholder="Sender Name" />
    
    {/*sender Email*/}
          <label className="label">Sender Email</label>
          <input type="text" {...register('senderEmail')} className="input w-full" placeholder="Sender Email" />
      
      {/*sender address*/}
          <label className="label">Address</label>
          <input type="text" {...register('senderAddress')} className="input w-full" placeholder="Address" />
       
       {/*sender phone number*/}
          <label className="label">Sender Phone No.</label>
          <input type="number" {...register('senderNumber')} className="input w-full" placeholder="Phone Number" />
      
       {/*sender reigon*/}
          <label className="label">Sender Region</label>
          <select  {...register('senderRegion')}className="select">
                <option disabled={true}>Select your Region</option>
                {
                    regions.map((r,i) =>  <option key={i} value={r}>{r}</option>)
                }
       </select>


       {/*sender district*/}
          <label className="label">Sender District</label>
          <select  {...register('senderDistrict')}className="select">
                <option disabled={true}>Select your District</option>
                {
                   districtsByRegion(senderRegion).map((r,i) => 
                     <option key={i} value={r}>{r}</option>)
                }
       </select>
 </fieldset>    
 

{/*reciever info.*/}
 <fieldset className="fieldset">
    <h4 className='text-2xl font-semibold'> Reciever  Details</h4>

    {/*reciever name*/}
          <label className="label">Reciever Name</label>
          <input type="text" {...register('recieverName')} className="input w-full" placeholder="Reciever Name" />
      
         {/*reciever Email*/}
          <label className="label">Reciever Email</label>
          <input type="text" {...register('recieverEmail')} className="input w-full" placeholder="Reciever Email" />

      {/*reciever address*/}
          <label className="label">Reciever Address</label>
          <input type="text" {...register('recieverAddress')} className="input w-full" placeholder="Address" />
       
       {/*reciever phone number*/}
          <label className="label">Reciever  Phone No.</label>
          <input type="number" {...register('recieverNumber')} className="input w-full" placeholder="Phone Number" />
      
       {/*reciever reigon*/}
          <label className="label">Reciever Region</label>
          <select  {...register('recieverRegion')}className="select">
                <option disabled={true}>Select Reciever's Region</option>
                {
                    regions.map((r,i) =>  <option key={i} value={r}>{r}</option>)
                }
       </select>


       {/*reciever district*/}
          <label className="label">Reciever District</label>
          <select  {...register('recieverDistrict')}className="select">
                <option disabled={true}>Select Reciever's District</option>
                {
                   districtsByRegion(recieverRegion).map((r,i) => 
                     <option key={i} value={r}>{r}</option>)
                }
       </select>
 </fieldset>   

 </div>
<input type='submit' value='Send Parcel' className='btn btn-primary text-black' />
    </form>
    
    </div>
  )
}

export default SendParcel