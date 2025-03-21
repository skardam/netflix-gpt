import React, { useEffect } from "react";
import Header from "./Header";
import useNowPlayingMoviews from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import { useSelector } from "react-redux";

const Browse = () => {
  useNowPlayingMoviews();
  const movies = useSelector((state) => state.movies?.nowPlayingMovies);
  if (!movies) return null;

  const mainMovie = movies[0];
  console.log("mainMovie", mainMovie);
  return (
    <div>
      <Header />
      <MainContainer />
      <SecondaryContainer />
    </div>
  );
};

export default Browse;
