import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../../contexts/AuthContext'

const Register = () => {
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
}).catch(error => {
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

<div>
  <a className='link link-hover'>Forgot password?</a>
</div>

  <button className="btn btn-neutral mt-4">Register</button>
</fieldset>
          </form>
    </div>
  )
}

export default Register