import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../MovieView/movie-view";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Button, Col, Row, Container } from "react-bootstrap";
import { Navigationbar } from "../navigation-bar/navigation-bar";
import Profileview from "../profile-view/profile-view";
import Loginview from "../login-view/login-view";
import Signupview from "../signup-view/signup-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(localStorage.getItem("token") || null);
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

  return (
    <BrowserRouter>
      <Navigationbar user={user} onLogout={handleLogout} />

      <Container>
        <Row className="justify-content-md-center">
          <Routes>
            <Route
              path="/signup"
              element={!user ? <Signupview /> : <Navigate to="/" replace />}
            />
            <Route
              path="/login"
              element={
                !user ? (
                  <Loginview
                    onLoggedIn={(user, token) => {
                      setUser(user);
                      setToken(token);
                    }}
                  />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/movies/:movieId"
              element={
                user ? (
                  movies.length > 0 ? (
                    <MovieView movies={movies} />
                  ) : (
                    <div>Loading movies...</div>
                  )
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            <Route
              path="/"
              element={
                user ? (
                  movies.length > 0 ? (
                    <Row className="g-4">
                      {movies.map((movie) => (
                        <Col key={movie.id} md={3}>
                          <MovieCard movie={movie} />
                        </Col>
                      ))}
                    </Row>
                  ) : (
                    <Col>The list is empty!</Col>
                  )
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
          </Routes>
        </Row>
      </Container>
    </BrowserRouter>
  );
};
