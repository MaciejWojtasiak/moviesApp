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

const KEY = import.meta.env.VITE_KEY;


function App() { 
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [selected, setSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [query,setQuery] = useState('');

  const onInputChange = (e) => {  
      setQuery(e.target.value);  
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
      if(query.length < 3) return;
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
    if(!query.length) {
      setMovies([]);
      return
    }
    getData();        
  },[query])


  return (
    <>
     <Navbar>
      <Search onInputChange={onInputChange} query={query}/>
      <NumResults movies={movies}/>
     </Navbar> 
     <Main>
      <Box>
        {isLoading  ? 'Loading...' : <MoviesList movies={movies} onSelect={onSelect}/> }        
      </Box>    
      <Box>
        {selected ?
          (
            <Selected key={selected.imdbID} selectedID={selected.imdbID} onBack={onBack}/>
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
