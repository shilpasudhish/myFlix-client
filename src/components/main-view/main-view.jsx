import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../MovieView/movie-view";
import Loginview from "../login-view/login-view";
import Signupview from "../signup-view/signup-view";
import { Button, Col, Row, Container } from "react-bootstrap";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const urlAPI = "https://movie-flex-api-95d248252fac.herokuapp.com/movies";

  useEffect(() => {
    if (!token) return;

    fetch(urlAPI, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch movies.");
        }
        return response.json();
      })
      .then((data) => setMovies(data))
      .catch((error) => console.error(error.message));
  }, [token]);

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  const renderLoginOrSignupView = () => (
    <Col md={6} className="mt-5">
      <Loginview
        onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }}
      />
      <div className="text-center mt-3">or</div>
      <Signupview />
    </Col>
  );

  const renderMoviesListView = () => (
    <>
      <Row className="justify-content-md-center mb-3">
        <Col md={12} className="text-end">
          <Button onClick={handleLogout} variant="secondary">
            Log Out
          </Button>
        </Col>
      </Row>
      <Row className="g-4">
        {movies.map((movie) => (
          <Col key={movie.id} md={3}>
            <MovieCard
              movie={movie}
              onMovieClick={(newSelectedMovie) =>
                setSelectedMovie(newSelectedMovie)
              }
            />
          </Col>
        ))}
      </Row>
    </>
  );

  const renderSelectedMovieView = () => (
    <Col md={8} className="mt-5">
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    </Col>
  );

  return (
    <Container>
      <Row className="justify-content-md-center">
        {!user ? (
          renderLoginOrSignupView()
        ) : selectedMovie ? (
          renderSelectedMovieView()
        ) : movies.length === 0 ? (
          <div>The list is empty!</div>
        ) : (
          renderMoviesListView()
        )}
      </Row>
    </Container>
  );
};
