import axios from "@/api/axios";
import { useEffect, useState } from "react";
import Request from "@/Request.js";

const Banner = () => {
  const [movie, setMovie] = useState({});
  
    const truncateString = (str, num) => {
      if(str?.length > num){
        return str.slice(0, num) + '...'
      }
      else{
        return str
      }
    }
  useEffect(() => {
    async function fetchData() {
      try {
        const request = await axios.get(Request.now_playing);
        console.log(request)
        const randomMovie = Math.floor(Math.random() * request.data.results.length);
        setMovie(request.data.results[randomMovie]);
      } catch (error) {
        console.log(error)
      }
    }
    fetchData();
  },[]);

  return (
    <div className="w-full h-[800px]  mt-4">
     <div className="w-full h-full"> 
      <img className='w-full h-full object-cover'   src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.original_title} />
      <div className="absolute w-full top-[20%] p-4 md:p-8">
        <h2 className="text-2xl md:text-5xl text-yellow-50 font-bold">電影名稱:{movie.title}</h2>
        <button className="border bg-gray-300 text-black text-2xl  border-gray-400 mt-4 py-4 px-6">Play</button>
        <button className="border bg-gray-300 text-white text-2xl border-gray-400  ml-3 bg-transparent py-4 px-4">watch</button>
        <h2 className="text-yellow-50 text-sm font-bold mt-4">上映日期:{movie.release_date}</h2>
        <p className="w-full md:max-w-[80%] lg:max-w-[50%] xl:max-w-[40%] text-yellow-50 text-2xl"> 
        {truncateString(movie.overview, 80)}
        </p>
      </div>
    </div>
    </div>
  );
};

export default Banner;
