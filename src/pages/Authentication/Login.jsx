import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../../contexts/AuthContext'

const Login = () => {
const {logInUser} = useContext(AuthContext)

  const {register, handleSubmit, formState:{errors}} = useForm()

  const handleLogin = (data) => {
    console.log('form data', data)
  logInUser(data.email, data.password).then(result => {
  console.log(result.user)
  alert('login succesfull')
}).catch(error => {
  console.log(error)
})
  }
  return (
    <div>

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
  <a className='link link-hover'>Forgot password?</a>
</div>

  <button className="btn btn-neutral mt-4">Login</button>
</fieldset>
          </form>
     </div>
  )
}

export default Login