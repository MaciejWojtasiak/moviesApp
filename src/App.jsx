import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
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
import Loader from './components/Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const KEY = import.meta.env.VITE_KEY;

function App() { 
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(JSON.parse(localStorage.getItem('watched')) || []);
  const [selected, setSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [query,setQuery] = useState('');

  const onInputChange = (e) => {  
      setQuery(e.target.value);  
  }
  const onDeleteWatched = (id) => {
    setWatched((watched) => watched.filter((item)=> item.imdbID != id));    
    toast.success('Movie removed.')
  }
  const onSelect = (id) => {
    setSelected((selected) => (id = selected ? null : id));
  }
  const onBack = useCallback(() => {
    setSelected(null);
  },[])
  
  useEffect(()=>{
    localStorage.setItem('watched',JSON.stringify(watched));
  },[watched])
  useEffect(()=>{
    const getData = async () =>{
      if(query.length < 3) return;
      setIsLoading(true);
      try {        
        const response = await axios.get(`https://www.omdbapi.com/?apikey=${KEY}&s=${query}`);
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
  },[query]);
  

  const handleOnAdd = (watchedMovie) => {
    setWatched((watched)=>[...watched,watchedMovie]);
    onBack();
    toast.success('Movie added.')
  }
  useEffect(()=>{
      function callback(e) {
        if(e.code === "Escape") {
          onBack();
        }
      }
      document.addEventListener('keydown', callback);
      return function() {
        document.removeEventListener("keydown", callback);
      };
  }, [onBack])

  return (
    <>
     <Navbar>
      <Search onInputChange={onInputChange} query={query}/>
      <NumResults movies={movies}/>
     </Navbar> 
     <Main>
      <Box>
        {isLoading  ? <Loader /> : <MoviesList movies={movies} onSelect={onSelect}/> }        
      </Box>    
      <Box>
        {selected ?
          (
            <Selected key={selected} selected={selected} onBack={onBack} onAdd={handleOnAdd} watched={watched}/>
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
     <ToastContainer/>
    </>
    
  )
}

export default App
