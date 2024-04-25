import { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export const MovieContext = createContext([])

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    async function fetchMovies() {
      try {
        // Question axios
        const response = await axios.get(
          'https://api.themoviedb.org/3/trending/movie/day?language=en-US' +
            '&api_key=dcd345ec48e9703490f93056cc03c057'
        )
        const data = await response.data
        setMovies(data.results)
        console.log(data.results)
      } catch (error) {
        console.error(error)
      }
    }
    fetchMovies()
  }, [])

  return (
    <MovieContext.Provider value={{ movies }}>{children}</MovieContext.Provider>
  )
}
