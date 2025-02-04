import PropTypes from "prop-types";
import { Card, Row, Col, Button } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movies, user, token, setUser }) => {
  const { movieId } = useParams();

  const selectedMovie = movies.find((movie) => movie._id === movieId);

  if (!selectedMovie) {
    return <div>Movie not found!</div>;
  }

  const isFavorite = user?.favorites?.includes(selectedMovie._id) || false;

  const handleFavorite = () => {
    const method = isFavorite ? "DELETE" : "POST";
    const url = `https://movie-flex-api-95d248252fac.herokuapp.com/users/${user.username}/movies/${selectedMovie._id}`;

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

        const updatedFavorites = isFavorite
          ? user.favorites.filter((m) => m !== selectedMovie._id)
          : [...user.favorites, selectedMovie._id];

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
          {/*  Display the movie poster */}
          <Card.Img
            src={selectedMovie.image}
            alt={`${selectedMovie.title} poster`}
            className="movie-poster"
          />
          <Card.Body>
            {/* Display movie title */}
            <Card.Title className="text-center mb-4">
              {selectedMovie.title}
            </Card.Title>

            <div className="movie-details">
              {/*  Display movie details */}
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
              {/* Display button to add/remove from favorites */}
              <Button
                variant={isFavorite ? "danger" : "primary"}
                className="me-2"
                onClick={handleFavorite}
              >
                {isFavorite
                  ? "❌ Remove from Favorites"
                  : "❤️ Add to Favorites"}
              </Button>

              {/* Back button to the home page */}
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
