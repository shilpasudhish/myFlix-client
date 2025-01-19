import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../MovieView/movie-view";
import Loginview from "../login-view/login-view";
import Signupview from "../signup-view/signup-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const urlAPI = "https://movie-flex-api-95d248252fac.herokuapp.com/movies";

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch(urlAPI, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMovies(data);
      });
  }, [token]);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }
  if (!user) {
    return (
      <>
        <Loginview
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
        <Signupview />
      </>
    );
  }
  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <>
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
      <button
        onClick={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      >
        LogOut
      </button>
    </>
  );
};
