import { Link, useNavigate } from "react-router-dom"
import { UserAuth } from "../../context/AuthContext";
import { useState } from "react";
import { message } from "antd";

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const {  logIn } = UserAuth()
  const navigate = useNavigate()
  
  const handleSubmit = async (e) => {
      e.preventDefault();
      setError('')
      try {
          await logIn(email, password);
          navigate('/')
          message.success("登入會員成功")
      } catch (error) {
        message.error('登入失敗，請檢查密碼是否正確');
      }
  };
  return (
    
    <div className="w-full h-screen">
   <img className='hidden sm:block   w-full h-full relative -z-10' 
   src='https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg' 
   alt='' />
   <div className="w-[600px] h-[700px] bg-black/70 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
   <div className='max-w-[320px] mx-auto py-16'>
    <h2 className="text-center text-4xl text-white font-bold">登入</h2>
    {error ? <p className="text-white text-2xl bg-red-500">{error}</p> : null}
   <form onSubmit={handleSubmit} className='w-full flex flex-col py-4'>
    <input onChange={(e) => setEmail(e.target.value)} className='p-3 my-4 bg-gray-700 rouded' type="email"  placeholder='Email' autoComplete='email'/>
    <input onChange={(e) => setPassword(e.target.value)} className='p-3 my-4 bg-gray-700 rouded' type="password"   placeholder='密碼' autoComplete='current-password'/>
    <button className='bg-red-600 py-3 my-8 rounded font-bold'>登入</button>
   </form>
      <div className='flex justify-between items-center text-sm text-gray-600'>
   <p className="text-2xl text-white">
     <input className='mr-2 w-[20px] h-[20px] p-6' type='checkbox' />
    記住我
    </p>
     </div>
     <p className='py-8'>
            <span className='text-gray-600 text-2xl'>
            沒有帳戶?
        </span>{' '}
    <Link className='text-white text-2xl ml-5' to='/signup'>註冊</Link>
        </p>
            </div>
            </div>
      </div>
  );
};

export default Login;