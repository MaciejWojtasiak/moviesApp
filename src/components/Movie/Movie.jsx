function Movie({id, title, url, year,onSelect}) {
  return (
    <li onClick={()=>onSelect(id)}>
        <img src={url} alt={`${title}--poster`} />
        <h3>{title}</h3>        
        <div>
          <p>{year}</p>
        </div>
    </li>
  )
}

export default Movie