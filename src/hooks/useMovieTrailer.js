import { options } from "../utils/constants";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { addTrailerVideos } from "../utils/movieSlice";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
  const getMovieVideos = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
      options
    );
    const json = await data.json();
    const trailerVideo = json?.results.filter(
      (video) => video.type === "Trailer"
    );
    const trailer = trailerVideo.length ? trailerVideo[0] : json?.results[0];
    dispatch(addTrailerVideos(trailer));
  };

  useEffect(() => {
    getMovieVideos();
  }, []);
};

export default useMovieTrailer;
