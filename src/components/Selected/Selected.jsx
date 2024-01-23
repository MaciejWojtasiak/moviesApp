import { useEffect, useState } from "react";
import axios from "axios";
import StarRating from "../StarRating/StarRating";
import NoImage from "../../NoImage"
import Loader from "../Loader/Loader";

const KEY = import.meta.env.VITE_KEY;

const ratingStyle = {
  textAlign:'center',
}

function Selected({selected, onBack, onAdd}) {
  const [isLoading, setIsLoading] = useState(false);
  const [detailedSelected, setDeatailedSelected] = useState({});

  useEffect(()=>{    
    const getSelected = async () => {
      setIsLoading(true);
        try {
          const res = await axios.get(`http://www.omdbapi.com/?apikey=${KEY}&i=${selected.imdbID}`);
          setDeatailedSelected(res.data)
        } catch(err) {
          console.log(err);
        } finally {
          setIsLoading(false);
        }
    }
    selected.userRating ? setDeatailedSelected(selected) : getSelected();    
  },[selected]);

  const handleAddSelected = (userRating) =>{    
    const watchedMovie = {
      ...detailedSelected,userRating
    }
    onAdd(watchedMovie);
  }

  return (
  <>
    {isLoading ? <Loader />: (
      <div className="details">
        <header>
            <button className="btn-back" onClick={onBack}>{`<`}</button>
            {detailedSelected.Poster === 'N/A' ? <NoImage/> : <img src={detailedSelected.Poster} alt={`Poster of ${detailedSelected.Title}`}/>}
            <div className="details-overview">
                <h2>{detailedSelected.Title}</h2>
                <p>{detailedSelected.Year} - {detailedSelected.Runtime}</p>
                <p>{detailedSelected.Genre}</p>
                <p>{detailedSelected.imdbRating} IMDb rating</p>
            </div>
        </header>
        <section>
        {selected.userRating && <div className="rating"><p style={ratingStyle}>User rated this movie {selected.userRating}</p></div>}
        {!selected.userRating && <StarRating handleAddSelected={handleAddSelected} />}        
        <p><em>{detailedSelected.Plot}</em></p>
        <p>Starring {detailedSelected.Actors}</p>
        <p>Directed by {detailedSelected.Director}</p>
        </section>
      </div>
    )}   
  </>
  )
}

export default Selected;