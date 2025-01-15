import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../MovieView/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);
  const urlAPI = "https://movie-flex-api-95d248252fac.herokuapp.com/movies";

  useEffect(() => {
    fetch(urlAPI, [])
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMovies(data);
      })
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
