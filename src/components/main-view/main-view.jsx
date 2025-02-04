import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../MovieView/movie-view";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Button, Col, Row, Container } from "react-bootstrap";
import { Navigationbar } from "../navigation-bar/navigation-bar";
import ProfileView from "../profile-view/profile-view";
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
  const addFavorite = (movieId) => {
    if (!user) {
      console.error("User is not defined!");
      return;
    }

    const favorites = Array.isArray(user.favorites) ? user.favorites : [];

    const updatedFavorites = [...favorites, movieId];
    const updatedUser = { ...user, favorites: updatedFavorites };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));

    fetch(
      `https://movie-flex-api-95d248252fac.herokuapp.com/users/${user.username}/movies/${movieId}`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add favorite");
        }
        return response.json();
      })
      .then(() => {
        alert("Movie added to favorites!");
      })
      .catch((error) => {
        console.error("Failed to add favorite:", error);
        alert("Failed to add movie to favorites.");

        setUser(user);
      });
  };

  const removeFavorite = (movieId) => {
    if (!user) {
      console.error("User is not defined!");
      return;
    }

    const updatedFavorites = user.favorites.filter(
      (movie) => movie !== movieId
    );
    const updatedUser = {
      ...user,
      favorites: updatedFavorites,
    };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));

    fetch(
      `https://movie-flex-api-95d248252fac.herokuapp.com/users/${user.username}/movies/${movieId}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => response.json())
      .then(() => {
        alert("Movie removed from favorites!");
      })
      .catch((error) => {
        console.error("Failed to remove favorite:", error);
        alert("Failed to remove movie from favorites.");

        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
      });
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
                      localStorage.setItem("user", JSON.stringify(user));
                      localStorage.setItem("token", token);
                    }}
                  />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/profile"
              element={
                user ? (
                  <ProfileView
                    user={user}
                    token={token}
                    movies={movies}
                    setUser={setUser}
                  />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            <Route
              path="/movies/:movieId"
              element={
                user ? (
                  movies.length > 0 ? (
                    <MovieView
                      movies={movies}
                      user={user}
                      token={token}
                      setUser={setUser}
                    />
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
                  movies.length === 0 ? (
                    <div>Loading movies...</div>
                  ) : (
                    <Row className="g-4">
                      {movies.map((movie) => (
                        <Col key={movie._id} md={3}>
                          <MovieCard
                            movie={movie}
                            user={user}
                            token={token}
                            setUser={setUser}
                            addFavorite={addFavorite}
                            removeFavorite={removeFavorite}
                          />
                        </Col>
                      ))}
                    </Row>
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
