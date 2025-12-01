import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../../contexts/AuthContext'
import { Link, useLocation, useNavigate} from 'react-router';
import SocialLogin from './SocialLogin';

const Login = () => {
  const {logInUser} = useContext(AuthContext)
  const navigate = useNavigate()
  const {register, handleSubmit, formState:{errors}} = useForm()
  const location = useLocation()
  //console.log('In login page', location)

  const handleLogin = (data) => {
    console.log('form data', data)

  logInUser(data.email, data.password)
  .then(result => {
  console.log(result.user)
  alert('login succesfull')
  navigate(location.state || '/')

}).catch(error => {
  console.log(error)
})
  }

  return (
    <div className='card bg-base-100 w-full mx-auto max-w-sm shrink-0 '>
                     <h1 className='text-4xl text-center py-5 font-bold'>Welcome Back</h1>
                     <p className='text-center'>Login with ZapShift</p>
         <form className='card-body' onSubmit={handleSubmit(handleLogin)}>
  <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
 
  {/*email */}
  <label className="label">Email</label>
  <input type="email" {...register('email', {required: true})} className="input" placeholder="Email" />

{
 errors.email?.type === 'required' && <span className='text-red-500'> Email is required</span>
}

{/*password*/}
  <label className="label">Password</label>
  <input type="password" {...register('password', {required: true, 
    minLength:6 })} className="input" placeholder="Password" />

 {errors.password?.type ==='minLength' && <span className='text-red-500'>Password must be 6 characters or longer</span>}

<div>
  <a className='link link-hover text-gray-500'>Forgot password?</a>
</div>

  <button className="btn bg-primary mt-4">Login</button>
 
  <SocialLogin></SocialLogin>

  <p className='pt-2 text-center text-base-content'>Don't have an account? <Link state={location.state} to={'/register'} className='text-primary hover:underline  hover:text-blue-500'> Register </Link> </p>
</fieldset>
          </form>
     </div>
  )
}

export default Login