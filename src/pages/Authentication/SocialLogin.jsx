import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useContext } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { useLocation, useNavigate } from 'react-router'
import { AuthContext } from '../../contexts/AuthContext'

const SocialLogin = () => {
    const {signInGoogle} = useContext(AuthContext)
    const location = useLocation()
  //  console.log('location in social', location)
    const navigate = useNavigate()

  const handleGoogleSignIn = () => {
     signInGoogle()
      .then((result) => {
        console.log(result.user)
       alert("Successfully SignIn with Google");
        navigate(location.state || '/' );
      })
      .catch((error) => {
       console.log(error)
      });
  }
  return (
    <div className='text-center'>
          <p className='text-center text-base-content/60 mt-2'>OR</p>
             
               <button type="button" onClick={handleGoogleSignIn} 
               className="btn bg-base-100 text-base-content border-base-300 mt-2" >
                    <FcGoogle />  Login with Google
                  </button>
    </div>
  )
}

export default SocialLogin