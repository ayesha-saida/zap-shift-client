import  { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import Loading from '../components/Loading'
import useRole from '../components/Hooks/useRole'

const RidersRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext)
    const {role, roleLoading} = useRole()

    if(loading || !user|| roleLoading) {
        return <Loading />  
    }

    if(role !== 'rider') {
      return  <Forbidden></Forbidden>
    }

    return children
}

export default RidersRoute