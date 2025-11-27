import React from 'react'
import { useForm } from 'react-hook-form'
import useAuth from '../../hooks/useAuth'

const Register = () => {
    const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const {registerUser, loginUser} = useAuth;

  const handleRegister = (data) => {
console.log('after register', data)

registerUser(data.email, data.password)
.then(result => {
  console.log(result.user)
})
.catch(error => {
  console.log(error)
})
  }

  return (
    <div>
          <h2 className='text-3xl text-center'>This is Register page</h2>
         
 <form onSubmit={handleSubmit(handleRegister)}>
  <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
  <label className="label">Email</label>
  <input type="email" {...register('email' , { required: true })} className="input" placeholder="Email" />

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

  <button className="btn btn-neutral mt-4">Login</button>
</fieldset>
          </form>
    </div>
  )
}

export default Register