import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss";

export const MovieCard = ({
  movie,
  user,
  token,
  setUser,
  addFavorite,
  removeFavorite,
}) => {
  if (!user) {
    return <p>Loading user data...</p>;
  }

  const favorites = Array.isArray(user.favorites) ? user.favorites : [];

  const isFavorite = favorites.includes(String(movie._id));
  console.log(`Checking if movie ${movie._id} is in favorites:`, isFavorite);

  const handleFavorite = () => {
    if (!user.username || !movie._id) {
      console.error("User or movie data is missing!");
      return;
    }

    const method = isFavorite ? "DELETE" : "POST";
    const url = `https://movie-flex-api-95d248252fac.herokuapp.com/users/${user.username}/movies/${movie._id}`;

    fetch(url, {
      method,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data || !Array.isArray(data.favorites)) {
          throw new Error("Failed to update favorite list.");
        }

        const updatedFavorites = isFavorite
          ? favorites.filter((m) => m !== movie._id)
          : [...favorites, movie._id];

        const updatedUser = { ...user, favorites: updatedFavorites };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));

        alert(
          isFavorite
            ? `${movie.title} removed from favorites!`
            : `${movie.title} added to favorites!`
        );
      })
      .catch((error) => {
        console.error("Error updating favorite status:", error);
        alert("An error occurred while updating favorites.");
      });
  };

  console.log("User:", user);
  console.log("Movie:", movie);
  console.log("User favorites:", user.favorites);
  console.log("Movie ID:", movie._id);

  return (
    <Card className="h-100">
      <div className="image-container">
        <Card.Img
          variant="top"
          src={movie.image}
          alt={`${movie.title} poster`}
          loading="lazy"
        />
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title>
          <h5>
            <Link to={`/movies/${movie._id}`}>
              {movie.title || "Untitled Movie"}
            </Link>
          </h5>
        </Card.Title>
        <Card.Text className="mt-auto">
          Directed by{" "}
          {movie.director?.name ? (
            <Link to={`/directors/${movie.director.name}`}>
              {movie.director.name}
            </Link>
          ) : (
            <span>Unknown Director</span>
          )}
        </Card.Text>
      </Card.Body>

      <Button
        variant={isFavorite ? "danger" : "outline-primary"}
        onClick={() => {
          if (isFavorite) {
            removeFavorite(movie._id);
          } else {
            addFavorite(movie._id);
          }
        }}
        className="btn-heart"
      >
        {isFavorite ? (
          <>
            <i className="bi bi-heart-fill"></i> Remove from Favorites
          </>
        ) : (
          <>
            <i className="bi bi-heart"></i> Add to Favorites
          </>
        )}
      </Button>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    director: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
  user: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  setUser: PropTypes.func.isRequired,
};
