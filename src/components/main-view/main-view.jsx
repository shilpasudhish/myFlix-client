import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../MovieView/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Bloody Title",
      image: "https://media.gettyimages.com/id/1332479704/vector/viking-warrior-poster.jpg?s=612x612&w=0&k=20&c=9zxo1XYHh0P4jd5xnMg96R9rhPwvczGHKil5Rj45hsY=",
      author: "Marijn Haverbeke"
    },
    {
      id: 2,
      title: "Pirates of carribean",
      image: "https://media.gettyimages.com/id/458587791/photo/pirates-of-the-caribbean-on-stranger-tides-poster.jpg?s=612x612&w=0&k=20&c=61W2D7oJTn7h9lumx1bKO0vhzj1JzSb7mnCCYYc6Bxk=",
      author: "Federico Kereki"
    },
    {
      id: 3,
      title: "Horror",
      image: "https://media.gettyimages.com/id/1768286889/vector/slasher-horror-poster.jpg?s=612x612&w=0&k=20&c=eI79ClMmOrDYV0UCXUWCVcwX-_lhsQIBNNVvibFIHNY=",
      author: "David Flanagan"
    },
    {
      id: 4,
      title: "The Godfather",
      image:
        "https://media.gettyimages.com/id/1137152399/photo/the-godfather.jpg?s=1024x1024&w=gi&k=20&c=5QWLqzlBAI-5WV01UQoV21o3LsmRu_zGPQYbp54xINs=",
      author: "Robin Wieruch"
    }
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
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
