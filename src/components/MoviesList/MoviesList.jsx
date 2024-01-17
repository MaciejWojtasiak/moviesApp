import Movie from "../Movie/Movie";
import { useState } from "react";

function MoviesList({movies}) {
  const [isOpen, setIsOpen] = useState(true);
  const handleSetIsOpen = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className="box">
      <button className="btn-toggle" onClick={handleSetIsOpen}>
        {isOpen ? '–' : '+'}
      </button>
      {isOpen && (
        <ul className="list list-movies">
          {movies.map((movie)=>{
            return <Movie key={movie.imdbID} title={movie.Title} url={movie.Poster} year={movie.Year}/>
          })}
        </ul>
      )}     
    </div>
  )
}

export default MoviesList;