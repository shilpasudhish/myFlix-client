import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss";

export const MovieCard = ({ movie }) => {
  console.log("MovieCard received movie:", movie); // Debugging

  return (
    <Card className="h-100 movie-card shadow-sm rounded">
      <Card.Img
        src={movie.image}
        alt={`${movie.title} poster`}
        className="movie-image"
      />
      <Card.Body>
        <Card.Title className="movie-title">
          {movie.title || "Untitled Movie"}
        </Card.Title>
        <Link to={`/movies/${movie._id || movie.id}`}>
          <Button variant="primary" className="open-button mt-2">
            Open
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};
