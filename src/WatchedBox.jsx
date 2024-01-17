import WatchedMovie from "./components/WatchedMovie/WatchedMovie";

function WatchedBox({watched, onDeleteWatched}) {  
    return (  
      <div>        
        <ul className="list">
          {watched.map((movie)=>{
            return <WatchedMovie key={movie} movie={movie} onDeleteWatched={onDeleteWatched}/>
          })}
        </ul> 
      </div>
         
    )
  }

  export default WatchedBox;