import { useState, useEffect } from 'react'
import SearchInput from './SearchInput'
import './App.css'

const api = 'https://api.themoviedb.org/'
const apikey = import.meta.env.VITE_API_KEY

function App() {
  const [info, setInfo] = useState({})
  const [text, setText] = useState('')

  useEffect(() => {
    if (text) {
      setInfo({});
      console.log(apikey)

      fetch(
        `${api}3/search/movie?api_key=${apikey}&language=pt-BR&query=${text}&page=1&include_adult=false`
      )
        .then((response) => response.json())
        .then((response) => {
          setInfo(response)
        })
    }
  }, [text])

  return (
    <div className="App">
      <h1>Movies</h1>
      <SearchInput value={text}
        onChange={(search) => setText(search)} />
      {text && !info.results && <span>Carregando...</span>}
      {info.results && (
        <ul className="animes-list">
          {info.results.map((anime) => (
            <li key={anime.id}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${anime.poster_path}`}
                alt={anime.title}
              />
              {anime.title}
            </li>
          ))}
        </ul>
      )}
      
    </div>
  )
}

export default App
