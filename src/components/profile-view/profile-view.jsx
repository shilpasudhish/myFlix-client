import React, { useState, useEffect } from "react";
import { Button, Card, Form, Row, Col, Container } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

const ProfileView = ({ user, token, movies, setUser }) => {
  const [updatedUser, setUpdatedUser] = useState({
    username: user?.username || "",
    password: "",
    email: user?.email || "",
    birthday: user?.birthday || "",
  });
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state for API calls

  // Fetch and set favorite movies whenever movies or user change
  useEffect(() => {
    if (movies.length > 0 && user?.favorites) {
      setFavoriteMovies(movies.filter((m) => user.favorites.includes(m._id)));
    }
  }, [movies, user]); // Re-run this whenever user or movies changes

  // Handle user information update
  const handleUpdate = (event) => {
    event.preventDefault();
    setLoading(true); // Start loading when submitting the form

    fetch(
      `https://movie-flex-api-95d248252fac.herokuapp.com/users/${user.username}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedUser),
      }
    )
      .then((response) => response.json())
      .then((updatedUserData) => {
        alert("Profile updated successfully!");
        setUser(updatedUserData); // Update the user state
        localStorage.setItem("user", JSON.stringify(updatedUserData)); // Store in localStorage
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to update profile.");
      })
      .finally(() => setLoading(false)); // Stop loading after the request finishes
  };

  // Handle user account deletion
  const handleDelete = () => {
    if (!window.confirm("Are you sure you want to delete your account?"))
      return;

    setLoading(true); // Start loading when initiating account deletion

    fetch(
      `https://movie-flex-api-95d248252fac.herokuapp.com/users/${user.username}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then(() => {
        alert("Account deleted.");
        localStorage.clear();
        setUser(null); // Remove user from state
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to delete account.");
      })
      .finally(() => setLoading(false)); // Stop loading after the request finishes
  };

  // Add a movie to the user's favorites
  const addFavorite = (movieId) => {
    if (!user) {
      console.error("User is not defined!");
      return;
    }

    // Optimistic update: immediately update favoriteMovies state and user state
    const updatedFavorites = [...user.favorites, movieId];
    const updatedUser = { ...user, favorites: updatedFavorites };
    setUser(updatedUser);
    setFavoriteMovies((prevFavorites) => [
      ...prevFavorites,
      movies.find((m) => m._id === movieId),
    ]);
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
        // Revert optimistic update in case of failure
        setUser(user); // Restore previous user state
        setFavoriteMovies(favoriteMovies); // Restore previous favorite movies state
      });
  };

  // Remove a movie from the user's favorites
  const removeFavorite = (movieId) => {
    if (!user) {
      console.error("User is not defined!");
      return;
    }

    // Optimistic update: immediately update favoriteMovies state and user state
    const updatedFavorites = favoriteMovies.filter(
      (movie) => movie._id !== movieId
    );
    const updatedUser = {
      ...user,
      favorites: updatedFavorites.map((m) => m._id), // Only store IDs
    };
    setUser(updatedUser);
    setFavoriteMovies(updatedFavorites);
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
        console.error(error);
        alert("Failed to remove movie from favorites.");
        // Revert optimistic update in case of failure
        setUser(user); // Restore previous user state
        setFavoriteMovies(favoriteMovies); // Restore previous favorite movies state
      });
  };

  // Check if user is undefined before rendering
  if (!user) {
    return <p>Loading profile...</p>;
  }

  return (
    <Container>
      <Row className="justify-content-md-center mt-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Profile Information</Card.Title>
              <Form onSubmit={handleUpdate}>
                <Form.Group controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    value={updatedUser.username}
                    onChange={(e) =>
                      setUpdatedUser({
                        ...updatedUser,
                        username: e.target.value,
                      })
                    }
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formEmail" className="mt-2">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={updatedUser.email}
                    onChange={(e) =>
                      setUpdatedUser({ ...updatedUser, email: e.target.value })
                    }
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formBirthday" className="mt-2">
                  <Form.Label>Birthday</Form.Label>
                  <Form.Control
                    type="date"
                    value={updatedUser.birthday}
                    onChange={(e) =>
                      setUpdatedUser({
                        ...updatedUser,
                        birthday: e.target.value,
                      })
                    }
                    required
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  className="mt-2"
                  disabled={loading} // Disable button while loading
                >
                  {loading ? "Updating..." : "Update"}
                </Button>
                <Button
                  variant="danger"
                  className="mt-2 ms-2"
                  onClick={handleDelete}
                  disabled={loading} // Disable button while loading
                >
                  {loading ? "Deleting..." : "Deregister"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <h3>Favorite Movies</h3>
        {favoriteMovies.length > 0 ? (
          favoriteMovies.map((movie) => (
            <Col key={movie._id} md={3}>
              <MovieCard
                movie={movie}
                user={user} // Now using the user prop
                token={token} // Using the token prop
                setUser={setUser} // Using the setUser prop
                addFavorite={addFavorite} // Pass addFavorite as prop
                removeFavorite={removeFavorite} // Pass removeFavorite as prop
              />
            </Col>
          ))
        ) : (
          <p>You have no favorite movies yet.</p>
        )}
      </Row>
    </Container>
  );
};

export default ProfileView;
