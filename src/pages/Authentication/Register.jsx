import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../../contexts/AuthContext'
import { Link, useNavigate } from 'react-router'
import SocialLogin from './SocialLogin'

const Register = () => {
  const navigate = useNavigate()
    const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const {registerUser} = useContext(AuthContext);

  const handleRegister = (data) => {
console.log('after register', data)

registerUser(data.email, data.password).then(result => {
  console.log(result.user)
  alert('Registration Successfull')
  navigate('/')
}).catch(error => {
  console.log(error)
})
  }

  return (
    <div  className='card bg-base-100 w-full mx-auto max-w-sm shrink-0 '>
          <h2 className='text-4xl py-4 text-center font-bold'>Create an Account</h2>
         
 <form onSubmit={handleSubmit(handleRegister)} className='card-body'>
  <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
  <label className="label">Name</label>
  <input type="text" {...register('name' , { required: true , maxLength: 20, minLength:4 })} className="input" placeholder="Enter your Name" />
 
 {errors.name?.type==='required' && <span className='text-red-500'>Name is required</span>}
 {errors.name?.type ==='minLength' && <span className='text-red-500'>Name must be 4 characters or longer</span>}
 {errors.name?.type ==='maxLength' && <span className='text-red-500'>Name must be in 20 characters</span>}
  
  <label className="label">Email</label>
  <input type="email" {...register('email' , { required: true })} className="input" placeholder="Enter your Email" />

 {errors.email?.type==='required' && <span className='text-red-500'>Email is required</span>}

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
  <p className='pt-2 text-center text-base-content'>Already have an account? <Link to={'/login'} className='text-primary hover:underline hover:text-blue-500'> Login </Link> </p>
</fieldset>
          </form>
    </div>
  )
}

export default Register