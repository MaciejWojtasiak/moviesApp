import { useEffect, useState } from "react";
import axios from "axios";
import StarRating from "../StarRating/StarRating";

const KEY = import.meta.env.VITE_KEY;

function Selected({selectedID, onBack}) {
  const [isLoading, setIsLoading] = useState(false);
  const [detailedSelected, setDeatailedSelected] = useState({});
  console.log(detailedSelected)
  useEffect(()=>{
    setIsLoading(true);
    const getSelected = async () => {
        try {
          const res = await axios.get(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedID}`);
          setDeatailedSelected(res.data)
        } catch(err) {
          console.log(err);
        } finally {
          setIsLoading(false);
        }
    }
    getSelected();
  },[selectedID]);

  return (
  <>
    {isLoading ? 'Loading...': (
      <div className="details">
        <header>
            <button className="btn-back" onClick={onBack}>{`<`}</button>
            <img src={detailedSelected.Poster} alt={`Poster of ${detailedSelected.Title}`}/>
            <div className="details-overview">
                <h2>{detailedSelected.Title}</h2>
                <p>{detailedSelected.Year} - {detailedSelected.runtime} min</p>
                <p>{detailedSelected.Genre}</p>
                <p>{detailedSelected.imdbRating} IMDb rating</p>
            </div>
        </header>
        <section>
        <StarRating />
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