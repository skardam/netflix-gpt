import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((state) => state.movies);
  console.log("movies", movies);

  return (
    movies.nowPlayingMovies &&
    movies.popularMovies && (
      <div className=" bg-black">
        <div className="-mt-35 z-20 pl-5 relative">
          <MovieList
            title={"Now Playing Movies"}
            movies={movies.nowPlayingMovies}
          />
          <MovieList title={"Popular Movies"} movies={movies.popularMovies} />
          <MovieList title={"Horror Movies"} movies={movies.nowPlayingMovies} />
          <MovieList
            title={"Top Rated Movies"}
            movies={movies.nowPlayingMovies}
          />
          <MovieList
            title={"Teen Movies Movies"}
            movies={movies.nowPlayingMovies}
          />
        </div>
      </div>
    )
  );
};

export default SecondaryContainer;
