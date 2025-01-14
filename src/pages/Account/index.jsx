import Favorite from "@/components/Favorite"

const Account = () => {
   return (
    <>
  <div className="">
    <img  className="h-[500px] w-full object-cover"
    src='https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg' /> 
    <h2 className="text-white text-2xl">我的收藏</h2>
  </div>
    <Favorite />
    </>
   )
 }
 
 export default Account