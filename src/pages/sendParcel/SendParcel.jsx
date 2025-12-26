import React, { useContext } from 'react'
import { useForm, useWatch, Watch } from 'react-hook-form'
import { useLoaderData, useNavigate } from 'react-router'
import Swal from 'sweetalert2'
import useAxiosSecure from '../../components/Hooks/useAxiosSecure'
import { AuthContext } from '../../contexts/AuthContext'

const SendParcel = () => {
 const { register, handleSubmit, control, 
    //formState: { errors } 
    } = useForm()

const {user} = useContext(AuthContext)

const axiosInstance = useAxiosSecure()

const navigate = useNavigate()

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
   // console.log(data)
    const isDocument = data.parcelType === 'document';
    const isSameDistrict = data.senderDistrict === data.recieverDistrict
  //console.log(isSameDistrict)
   const parcelWeight = parseFloat(data.parcelWeight)

  let cost = 0
  if(isDocument) {
    cost = isSameDistrict ? 60 : 80;
  } 
  else {
    if(parcelWeight < 3 ) {
        cost = isSameDistrict ? 110 : 150;
    }
    else {
      const minCharge = isSameDistrict ? 110 : 150;
      const extraWeight = parcelWeight - 3;
      const extraCharge = isSameDistrict ? extraWeight * 40 :
                           extraWeight * 40 + 40;
      cost = minCharge + extraCharge                    
    }
  }
    // console.log('cost', cost)
   data.cost = cost;

  Swal.fire({
  title: "Are you agree with our parcel pricing rate?",
  text: `You will be charge ${cost} Tk.`,
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Confirm and Continue Payment!"
}).then((result) => {
  if (result.isConfirmed) {
    //save the parcel info. in to the db
    axiosInstance.post('/parcels', data)
    .then(res => {
        console.log('After Sending Parcel', res.data)

        if(res.data.insertedId) {
          navigate('/dashboard/my-parcels')
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Parcel request has created. Please Pay',
            showConfirmButton: false,
            timer: 2500
          })

        }
    })
   
  }
});
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
          <input type="text" {...register('senderName')}
            defaultValue={user?.displayName}
          className="input w-full" placeholder="Sender Name" />
    
    {/*sender Email*/}
          <label className="label">Sender Email</label>
          <input type="text" {...register('senderEmail')}
           defaultValue={user?.email}
          className="input w-full" placeholder="Sender Email" />
       
       {/*sender phone number*/}
          <label className="label">Sender Phone No.</label>
          <input type="number" {...register('senderNumber')} className="input w-full" placeholder="Phone Number" />
      
       {/*sender reigon*/}
          <label className="label">Sender Region</label>
          <select  {...register('senderRegion')}className="select w-full">
                <option disabled={false}>Select your Region</option>
                {
                    regions.map((r,i) =>  <option key={i} value={r}>{r}</option>)
                }
       </select>

       {/*sender district*/}
          <label className="label">Sender District</label>
          <select  {...register('senderDistrict')}className="select w-full">
                <option disabled={true}>Select your District</option>
                {
                   districtsByRegion(senderRegion).map((r,i) => 
                     <option key={i} value={r}>{r}</option>)
                }
       </select>  

      {/*sender address*/}
          <label className="label">Address</label>
          <input type="text" {...register('senderAddress')} className="input w-full" placeholder="Address" />
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
   
       {/*reciever phone number*/}
          <label className="label">Reciever  Phone No.</label>
          <input type="number" {...register('recieverNumber')} className="input w-full" placeholder="Phone Number" />
      
       {/*reciever reigon*/}
          <label className="label">Reciever Region</label>
          <select  {...register('recieverRegion')}className="select w-full">
                <option disabled={false}>Select Reciever's Region</option>
                {
                    regions.map((r,i) =>  <option key={i} value={r}>{r}</option>)
                }
       </select>

       {/*reciever district*/}
          <label className="label">Reciever District</label>
          <select  {...register('recieverDistrict')}className="select w-full">
                <option disabled={true}>Select Reciever's District</option>
                {
                   districtsByRegion(recieverRegion).map((r,i) => 
                     <option key={i} value={r}>{r}</option>)
                }
       </select>
       
      {/*reciever address*/}
          <label className="label">Reciever Address</label>
          <input type="text" {...register('recieverAddress')} className="input w-full" placeholder="Address" />
 </fieldset>   

 </div>
<input type='submit' value='Send Parcel' className='btn btn-primary text-black' />
    </form>
    
    </div>
  )
}

export default SendParcel