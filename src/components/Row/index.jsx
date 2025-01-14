import axios from "axios";
import { useEffect, useState } from "react";
import { Image, message } from "antd";
import { FaHeart, FaRegHeart, FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { UserAuth } from "@/context/AuthContext";
import { db } from '../../firebase';
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

const Row = ({ title, fetchURL, RowId }) => {
  const [movies, setMovies] = useState([]);
  const [likes, setLikes] = useState({});
  const { user } = UserAuth();

  useEffect(() => {
    axios.get(fetchURL).then((response) => {
      setMovies(response.data.results);
    });
  }, [fetchURL]);

  const saveMovie = async (movie) => {
    if (user && user.email) {
      setLikes((prevLikes) => ({
        ...prevLikes,
        [movie.id]: !prevLikes[movie.id]
      }));
      const movieId = doc(db, 'users', `${user.email}`);
      await updateDoc(movieId, {
        saveMoviess: arrayUnion({
          id: movie.id,
          title: movie.title,
          img: movie.backdrop_path
        })
      });
    } else {
      message.error('請登入');
    }
  };

  const LeftArrowClick = () => {
    var slider = document.getElementById('slider' + RowId);
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const RightArrowClick = () => {
    var slider = document.getElementById('slider' + RowId);
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  return (
    <div>
      <h2 className="text-white text-2xl font-bold p-4">{title}</h2>
      <div className="relative flex items-center">
        <FaAngleDoubleLeft onClick={LeftArrowClick} className="absolute bg-white top-30 text-6xl opacity-50 hover:opacity-100 z-10 cursor-pointer" />
        <div id={'slider' + RowId} className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth relative" style={{ scrollbarWidth: 'none' }}>
          {movies.map((movie) => (
            <div className="inline-block cursor-pointer relative" key={movie.id}>
              <Image style={{ width: '500px', marginLeft: '1.5rem' }} src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} alt={movie.title} />
              <div className="absolute top-5 left-6">
                <p className="text-white text-2xl">{movie.title}</p>
                <p onClick={() => saveMovie(movie)}>
                  {likes[movie.id] ? <FaHeart className="text-4xl absolute top-5 text-red-600 mt-4" /> : <FaRegHeart className="text-4xl mt-2 text-white" />}
                </p>
              </div>
            </div>
          ))}
        </div>
        <FaAngleDoubleRight onClick={RightArrowClick} className="absolute bg-white top-30 right-0 text-6xl opacity-50 hover:opacity-100 z-10 cursor-pointer" />
      </div>
    </div>
  );
};

export default Row;
