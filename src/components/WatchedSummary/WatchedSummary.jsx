function WatchedSummary({watched}) {
    const average = (arr) => arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

    const imdbAvg = average(watched.map((movie)=>movie.imdbRating));
    const userAvg = average(watched.map((movie)=>movie.userRating));
    const avgTime = average(watched.map((movie)=>movie.runtime));    

  return (
    <div className="summary">
        <h2>Movies you watched</h2>
        <div>
            <p>{watched.length} <span>movies</span></p>
            <p>{imdbAvg} <span>Imdb rating</span></p>
            <p>{userAvg} <span>User rating</span></p>
            <p>{avgTime} <span>min.</span></p>
        </div>
    </div>
  )
}

export default WatchedSummary