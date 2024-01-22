function Search({query, onInputChange}) {

  return (    
        <input 
          className="search" 
          type="text" 
          placeholder="Search movies..."
          value={query}
          onChange={onInputChange}
        />  
  )
}

export default Search