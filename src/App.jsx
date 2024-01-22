import './App.css';
import Navbar from './components/Navbar/Navbar';
import Search from './components/Search/Search';
import NumResults from './components/NumResults/NumResults';
import Main from './components/Main/Main';
import MoviesList from './components/MoviesList/MoviesList';
import WatchedSummary from './components/WatchedSummary/WatchedSummary';
import Box from './components/Box/Box';
import WatchedBox from './WatchedBox';
import Selected from './components/Selected/Selected';
import { useEffect, useState } from 'react';
import axios from 'axios';

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    runtime: 148,
    imdbRating: 8.8,
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    runtime: 148,
    imdbRating: 8.8,
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    runtime: 148,
    imdbRating: 8.8,
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const KEY = '5350fbdf'


function App() { 
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(tempWatchedData);
  const [selected, setSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [query,setQuery] = useState('Hello');

  const onChangeQuery = (e) => {
    setQuery(e)
  }

  const onDeleteWatched = (id) => {
    setWatched(watched.filter((item)=> item.imdbID != id))
  }
  const onSelect = (id) => {
    setSelected(movies.filter(item => item.imdbID === id)[0]);
  }
  const onBack = () => {
    setSelected(false);
  }

  useEffect(()=>{
    const getData = async () =>{
      setIsLoading(true);
      try {        
        const response = await axios.get(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`);
        if(response.data.Response === 'False') throw new Error('Movie not found.');
        setMovies(response.data.Search);       
      } catch(err) {
        console.error(err);
      }  finally {
        setIsLoading(false);
      }
    }
    getData();        
  },[])


  return (
    <>
     <Navbar>
      <Search onChangeQuery={onChangeQuery} query={query}/>
      <NumResults movies={movies}/>
     </Navbar> 
     <Main>
      <Box>
        {isLoading  ? 'Loading...' : <MoviesList movies={movies} onSelect={onSelect}/> }        
      </Box>    
      <Box>
        {selected ?
          (
            <Selected key={selected.imdbID} selected={selected} onBack={onBack}/>
          )
          :
          (        
            <>
            <WatchedSummary watched={watched}/>
            <WatchedBox watched={watched} onDeleteWatched={onDeleteWatched}/>
            </>          
          )}        
      </Box>
     </Main>
    </>
  )
}

export default App
