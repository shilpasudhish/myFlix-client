import PropTypes from "prop-types";
import { Card, Row, Col, Button } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  console.log("MovieView received movieId:", movieId); // Debugging
  console.log("MovieView received movies:", movies); // Debugging

  const selectedMovie = movies.find(
    (b) => b._id === movieId || b.id === movieId
  );

  if (!selectedMovie) {
    return <div>Movie not found</div>;
  }

  return (
    <Row className="justify-content-center mt-4">
      <Col md={8}>
        <Card className="movie-view-card shadow-sm">
          <Card.Img
            src={selectedMovie.image}
            alt={`${selectedMovie.title} poster`}
            className="movie-poster"
          />
          <Card.Body>
            <Card.Title className="text-center mb-4">
              {selectedMovie.title}
            </Card.Title>
            <div className="movie-details">
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
              <Link to="/">
                <Button variant="primary" className="back-button">
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
