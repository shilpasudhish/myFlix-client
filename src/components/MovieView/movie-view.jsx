import PropTypes from "prop-types";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <span>UserId: </span>
        <span>{movie.userId}</span>
      </div>
      <div>
        <span>Id: </span>
        <span>{movie.id}</span>
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Author: </span>
        <span>{movie.body}</span>
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};

MovieView.propTypes  = {
  movie: PropTypes.shape ({
      userId: PropTypes.number,
      Id: PropTypes.number.isRequired,
      Title: PropTypes.string.isRequired,
      Author: PropTypes.string.isRequired

  }) .isRequired,
  onBackClick: PropTypes.func.isRequired

}
