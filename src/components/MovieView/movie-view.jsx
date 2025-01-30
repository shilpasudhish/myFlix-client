import PropTypes from "prop-types";
import { Card, Row, Col, Button } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movies, user, token, setUser }) => {
  // Step 1: Retrieve the movieId from URL parameters
  const { movieId } = useParams();

  // Step 2: Find the selected movie from the list of movies
  const selectedMovie = movies.find((movie) => movie._id === movieId);

  // Step 3: Handle case where the movie is not found (fallback UI)
  if (!selectedMovie) {
    return <div>Movie not found!</div>;
  }

  // Step 4: Check if the movie is in the user's favorites
  const isFavorite = user?.favorites?.includes(selectedMovie._id) || false;

  // Step 5: Function to handle adding/removing from favorites
  const handleFavorite = () => {
    const method = isFavorite ? "DELETE" : "POST";
    const url = `https://movie-flex-api-95d248252fac.herokuapp.com/users/${user.username}/movies/${selectedMovie._id}`;

    // Step 6: Make the request to the backend
    fetch(url, {
      method,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then(() => {
        alert(
          isFavorite
            ? `${selectedMovie.title} removed from favorites!`
            : `${selectedMovie.title} added to favorites!`
        );

        // Step 7: Update the user's favorite list in local state
        const updatedFavorites = isFavorite
          ? user.favorites.filter((m) => m !== selectedMovie._id)
          : [...user.favorites, selectedMovie._id];

        // Step 8: Sync the user state and update localStorage
        const updatedUser = { ...user, favorites: updatedFavorites };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      })
      .catch((error) => console.error("Error updating favorites:", error));
  };

  return (
    <Row className="justify-content-center mt-4">
      <Col md={8}>
        <Card className="movie-view-card shadow-sm">
          {/* Step 9: Display the movie poster */}
          <Card.Img
            src={selectedMovie.image}
            alt={`${selectedMovie.title} poster`}
            className="movie-poster"
          />
          <Card.Body>
            {/* Step 10: Display movie title */}
            <Card.Title className="text-center mb-4">
              {selectedMovie.title}
            </Card.Title>

            <div className="movie-details">
              {/* Step 11: Display movie details */}
              <div className="mb-2">
                <strong>ID:</strong> {selectedMovie._id}
              </div>
              <div className="mb-2">
                <strong>Director:</strong> {selectedMovie.director.name}
              </div>
              <div className="mb-2">
                <strong>Release Year:</strong> {selectedMovie.releaseYear}
              </div>
              <div className="mb-2">
                <strong>Genre:</strong> {selectedMovie.genre.name}
              </div>
            </div>

            <div className="text-center mt-4">
              {/* Step 12: Display button to add/remove from favorites */}
              <Button
                variant={isFavorite ? "danger" : "primary"}
                className="me-2"
                onClick={handleFavorite}
              >
                {isFavorite
                  ? "❌ Remove from Favorites"
                  : "❤️ Add to Favorites"}
              </Button>

              {/* Step 13: Back button to the home page */}
              <Link to="/">
                <Button variant="secondary" className="back-button">
                  Back
                </Button>
              </Link>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

MovieView.propTypes = {
  movies: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  setUser: PropTypes.func.isRequired,
};
