import { Image } from "antd"
import { FaAngleDoubleLeft, FaAngleDoubleRight,    } from "react-icons/fa"
import { CiCircleRemove } from "react-icons/ci";
import { UserAuth } from "../../context/AuthContext"
import { db } from "../../firebase"
import {  doc, onSnapshot, updateDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

const Favorite = () => {
  const navigate = useNavigate()
  const [movies, setMovies] = useState([])
  const { user } = UserAuth()

  const LeftArrowClick = () => {
    var slider = document.getElementById('slider'  );
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const RightArrowClick = () => {
    var slider = document.getElementById('slider' );
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  const toHome = () => {

     navigate('/')
  }

  useEffect(() => {
    onSnapshot(doc(db, 'users', `${user.email}`), (doc) => {
      setMovies(doc.data().saveMoviess)
    })
  },[user.email])

  const deleteId = doc(db, 'users', `${user.email}`)

  const deleteFunction = async (removedId) => {
    try{
     const result =  movies.filter((movie) => movie.id !== removedId)
     await updateDoc(deleteId,{
      saveMoviess: result
     })
    }
    catch(error){
      console.log(error)
    }
  }
  return (
    <div>
          <div className="relative flex items-center">
        <FaAngleDoubleLeft onClick={LeftArrowClick} className="absolute bg-white top-30 text-6xl opacity-50 hover:opacity-100 z-10 cursor-pointer" />
        <div id={'slider' } className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth relative" style={{ scrollbarWidth: 'none' }}>
          {movies.map((movie) => (
            <div className="inline-block cursor-pointer relative" key={movie.id}>
              <Image style={{ width: '500px', marginLeft: '1.5rem' }} src={`https://image.tmdb.org/t/p/w500/${movie.img}`} alt={movie.title} />
              <div className="absolute top-5 left-6">
                <p className="text-white text-2xl">{movie.title}</p>
                <CiCircleRemove  onClick={() => deleteFunction(movie.id)} className="relative text-4xl bg-white top-3"/>
              </div>
            </div>
          ))}
        </div>
        <FaAngleDoubleRight onClick={RightArrowClick} className="absolute bg-white top-30 right-0 text-6xl opacity-50 hover:opacity-100 z-10 cursor-pointer" />
      </div>
      <button  onClick={toHome} className="relative inline-block text-lg group">
<span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
<span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
<span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
<span className="relative">回到首頁</span>
</span>
<span className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
</button>
       </div>
  )
}

export default Favorite