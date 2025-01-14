import { Link, useNavigate } from "react-router-dom"
import { UserAuth } from "../../context/AuthContext"
import { message } from "antd"
const Navbar = () => {

  const navigate = useNavigate()
  const {user, logOut} = UserAuth()
 
  const  handleLogout = async () => {
      try{
         await logOut()
         message.success('登出成功')
         navigate('/')
      }
      catch(error){
        console.log(error)

      }
  }
    return (
      <div className="flex items-center justify-between p-4 absolute w-full">
          <Link to="/"className="text-red-600 text-4xl font-bold cursor-pointer">NETFLIX</Link>
          {user ?  
          <div>
          <button onClick={() => navigate('/account')}className="text-white pr-4 bg-red-600 px-6 py-2">account</button>
              <button onClick={handleLogout} className="  bg-red-600 px-6 py-2 ml-4">登出
              </button>  
          </div> :
          <div>
          <button onClick={() => navigate('/signup')}className="text-white pr-4 bg-red-600 px-6 py-2">註冊</button>
              <button onClick={() => navigate('/login')} className="  bg-red-600 px-6 py-2 ml-4">登入</button>
              
          </div> 
          }
      </div> 
    )
  }
  
  export default Navbar