import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../../contexts/AuthContext'
import { Link, useLocation, useNavigate } from 'react-router'
import SocialLogin from './SocialLogin'
import axios from 'axios'
import useAxiosSecure from '../../components/Hooks/useAxiosSecure'

const Register = () => {
  const navigate = useNavigate()
  const location = useLocation()
     console.log('In register page', location)

    const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const {registerUser, updateUserProfile} = useContext(AuthContext);

  const axiosSecure = useAxiosSecure()

  const handleRegister = (data) => {
   console.log('after register', data)
  const profileImg = data.photo[0]

registerUser(data.email, data.password).then( () => {
  //console.log(result.user)

  //store the image in form data
  const formData = new FormData()
  formData.append('image', profileImg)

   //send the photo to store and get the url
  const img_API_URL = `https://api.imgbb.com/1/upload?expiration=600&key=${import.meta.env.VITE_img_host_key}`
  axios.post( img_API_URL , formData)

  .then(res => {
       const photoURL = res.data.data.url; 
    //console.log('after image upload', photoURL)
  
   // create user in the database
   const userInfo = {
    email: data.email,
    displayName: data.name ,
    photoURL: photoURL
   }
    axiosSecure.post('/users', userInfo)
   .then( res => {
      if(res.data.insertedId){
        console.log('user created in the dataset.')
      }
   })

    //update user profile in firebase
    const userProfile = {
      displayName: data.name,
      photoURL: photoURL,
    }

  updateUserProfile(userProfile)
  .then(() => {
    console.log('User Profile updated done')
      navigate(location.state || '/')
  })
  .catch(error => console.log(error))
  })

  alert('Registration Successfull')
  //  navigate(location?.state || '/')

}).catch(error => {
  console.log(error)
})
  }

  return (
    <div  className='card bg-base-100 w-full mx-auto max-w-sm shrink-0 '>
          <h2 className='text-4xl py-4 text-center font-bold'>Create an Account</h2>
         
 <form onSubmit={handleSubmit(handleRegister)} className='card-body'>
  <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
  
    {/*name field */}
  <label className="label">Name</label>
  <input type="text" {...register('name' , { required: true , maxLength: 20, minLength:4 })} className="input" placeholder="Enter your Name" />
 
 {errors.name?.type==='required' && <span className='text-red-500'>Name is required</span>}
 {errors.name?.type ==='minLength' && <span className='text-red-500'>Name must be 4 characters or longer</span>}
 {errors.name?.type ==='maxLength' && <span className='text-red-500'>Name must be in 20 characters</span>}
  
    {/*photo image field */}
  <label className="label">Photo</label> 
  <input type="file" {...register('photo' , { required: true })} className="file-input" placeholder="Upload your profile picture" />
 
 {errors.name?.type==='required' && <span className='text-red-500'>Photo is required</span>}

  
  {/*email field */}
  <label className="label">Email</label>
  <input type="email" {...register('email' , { required: true })} className="input" placeholder="Enter your Email" />

 {errors.email?.type==='required' && <span className='text-red-500'>Email is required</span>}

  {/*password field */}
  <label className="label">Password</label>
  <input type="password" {...register('password', { 
    required: true,
    minLength:6,
    pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/ ,
   })} className="input" placeholder="Password" />

 {errors.password?.type ==='required' && <span className='text-red-500'>Password is required</span>}
 {errors.password?.type ==='minLength' && <span className='text-red-500'>Password must be 6 characters or longer</span>}
 {errors.password?.type ==='pattern' && <span className='text-red-500'>Password must have at least one uppercase, at least one lowercase, at least one number and at least one special characters.  </span>}

  <button className="btn bg-primary mt-4">Register</button>
   <SocialLogin></SocialLogin>
  <p className='pt-2 text-center text-base-content'>Already have an account? <Link state={location.state} to={'/login'} className='text-primary hover:underline hover:text-blue-500'> Login </Link> </p>
</fieldset>
          </form>
    </div>
  )
}

export default Register