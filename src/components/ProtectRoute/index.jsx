 import { UserAuth } from "@/context/AuthContext"
import { useNavigate } from "react-router-dom"
const ProtectRoute = ( {children} ) => {
    const navigate = useNavigate()
    const { user } = UserAuth()
    if(!user){
        navigate('/login')
    }
  return  children
}

export default ProtectRoute