import Movie from "../Movie/Movie";

function MoviesList({movies, onSelect}) { 
  return (  
    <ul className="list list-movies">
        {movies.map((movie)=>{
          return <Movie key={movie.imdbID} id={movie.imdbID} title={movie.Title} url={movie.Poster} year={movie.Year} onSelect={onSelect}/>
        })}
    </ul>     
  )
}

export default MoviesList;