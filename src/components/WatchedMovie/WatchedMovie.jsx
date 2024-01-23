import NoImage from "../../NoImage";
function WatchedMovie({movie, onDeleteWatched}) {
  return (
    <li>
      {movie.Poster === 'N/A' ? <NoImage /> : <img src={movie.Poster} alt={`${movie.Title}--poster`} />} 
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.Runtime}</span>
        </p>

        <button
          className="btn-delete"
          onClick={() => onDeleteWatched(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  )
}

export default WatchedMovie