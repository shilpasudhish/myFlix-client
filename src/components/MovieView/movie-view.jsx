import PropTypes from "prop-types";
import { Card, Row, Col, Button } from "react-bootstrap";
import "./movie-view.scss";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <Row className="justify-content-center mt-4">
      <Col md={8}>
        <Card className="movie-view-card shadow-sm">
          <Card.Img
            src={movie.image}
            alt={`${movie.title} poster`}
            className="movie-poster"
          />

          <Card.Body>
            <Card.Title className="text-center mb-4">{movie.title}</Card.Title>
            <div className="movie-details">
              <div className="mb-2">
                <strong>ID:</strong> {movie._id}
              </div>
              <div className="mb-2">
                <strong>Director:</strong> {movie.director.name}
              </div>
              <div className="mb-2">
                <strong>Release Year:</strong> {movie.releaseYear}
              </div>
              <div className="mb-2">
                <strong>Genre:</strong> {movie.genre.name}
              </div>
            </div>
            <div className="text-center mt-4">
              <Button
                variant="primary"
                onClick={onBackClick}
                className="back-button"
              >
                Back
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    director: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    releaseYear: PropTypes.number.isRequired,
    genre: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
