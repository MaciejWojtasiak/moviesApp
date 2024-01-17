function Movie({title, url, year}) {
  return (
    <li className="movie">
        <img src={url} alt={`${title}--poster`} />
        <h3>{title}</h3>
        <p>{year}</p>
    </li>
  )
}

export default Movie