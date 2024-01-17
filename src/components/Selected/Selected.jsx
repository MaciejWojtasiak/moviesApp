import StarRating from "../StarRating/StarRating"

function Selected({selected, onBack}) {
  return (
    <div className="details">
        <header>
            <button className="btn-back" onClick={onBack}>{`<`}</button>
            <img src={selected.Poster} alt={`Poster of ${selected.Title}`}/>
            <div className="details-overview">
                <h2>{selected.Title}</h2>
                <p>{selected.Year} - {selected.runtime} min</p>
                <p>{selected.imdbRating} IMDb rating</p>
            </div>
        </header>
        <section>
        <StarRating />
        </section>
    </div>
  )
}

export default Selected