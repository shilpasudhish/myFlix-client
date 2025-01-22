import { Button, Card } from "react-bootstrap";
import "./movie-card.scss";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className="h-100 movie-card shadow-sm rounded">
      <Card.Body>
        <Card.Title className="movie-title">
          {movie.title || "Untitled Movie"}
        </Card.Title>
        <Button
          onClick={() => onMovieClick(movie)}
          variant="primary"
          className="open-button mt-2"
          aria-label={`Open details for ${movie.title}`}
        >
          Open
        </Button>
      </Card.Body>
      <Card.Img
        src={movie.image}
        alt={`${movie.title} poster`}
        className="movie-image"
      />
    </Card>
  );
};
