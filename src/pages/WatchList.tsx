import { useDispatch, useSelector } from 'react-redux'
import {
  selectWatchList,
  setWatchList,
  addWatchList,
  removeWatchList,
  sortWatchList,
  reverseWatchList,
  selectAllWatchList,
  setCurrentPage,
} from '../store/watchListSlice'
import PosterPic from '../components/PosterPic'
import RatingDetail from '../components/RatingDetail'
import styled from 'styled-components'
import { ArrowDown, ArrowUp, ArrowUpDown, Check } from 'lucide-react'
import { useEffect, useState } from 'react'
import PageSplit from '../components/PageSplit'
import { Helmet } from 'react-helmet-async'
import { mediaProperty } from '../utils/interface'
const WatchPage = styled.div`
  background: #e0dbcf;
  color: black;
  padding: 1rem 15rem;
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0.5rem 0;
  }
`
const WatchBox = styled.ul`
color: black;
display: flex;
flex-direction: column;
flex:0;
margin: 0 auto;
min-height: 100vh;
max-width: 1200px;
width: 80%
gap: 1rem;
background: #FAF8F1;
h3{
  font-size: 2.3rem;
}
time{
  font-size: 1.3rem;
}

`
const WatchItem = styled.li`
  display: flex;
  padding: 2rem 3rem;
  gap: 1rem;
  border-bottom: 1px solid #445566;
`
const WatchHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.3rem;
  margin: 0 auto;
  max-width: 1200px;
  h1 {
    font-size: 3.8rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`
const Btn = styled.button`
  border: none;
  background: none;
  border-radius: 5px;
  padding: 0.5rem;
  &:hover {
    background-color: grey;
  }
`
const WatchSort = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const WatchSelect = styled.select`
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #445566;
  background-color: white;
  cursor: pointer;
`

const WatchItemOverview = styled.p`
  font-size: 1.5rem;
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

function WatchList() {
  const {
    value: WatchList,
    currentPage,
    moviesPerPage,
  } = useSelector(selectAllWatchList)
  const dispatch = useDispatch()
  const [filterMovies, setFilterMovies] = useState<mediaProperty[]>([])
  useEffect(() => {
    const indexOfLastMovie = currentPage * moviesPerPage
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage
    const currentMovies = WatchList.slice(indexOfFirstMovie, indexOfLastMovie)
    setFilterMovies(currentMovies)
  }, [WatchList, currentPage, moviesPerPage])
  useEffect(() => {
    if (currentPage > 0 && WatchList.length <= currentPage * moviesPerPage) {
      setCurrentPage(currentPage - 1)
    }
  }, [WatchList, currentPage, moviesPerPage])

  const handleSelectChange = (event: { target: { value: string } }) => {
    const value = event.target.value
    switch (value) {
      case '1':
        dispatch(sortWatchList('rating'))
        break
      // case '2':
      //   dispatch(sortWatchList('YourRating'));
      //   break;
      case '3':
        dispatch(sortWatchList('release'))
        break
      case '4':
        dispatch(sortWatchList('title'))
        break
      default:
      // handle default case
    }
  }

  return (
    <WatchPage>
      <Helmet>
        <title>Your WatchList - movies4fun</title>
        <meta
          name="description"
          content="View your personalized WatchList on movies4fun. Check out your saved movies sorted by your preferences!"
        />
        <meta property="og:title" content="Your WatchList - movies4fun" />
        <meta
          property="og:description"
          content="Explore your WatchList and manage your favorite movies on movies4fun."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://movie4fun.netlify.app/watchlist"
        />
        <meta
          property="og:image"
          content="https://movie4fun.netlify.app/default-watchlist-image.jpg"
        />
        <meta property="og:site_name" content="movies4fun" />
      </Helmet>
      <WatchHeader>
        <h1>Your WatchList</h1>
        <WatchSort>
          <h3>Sort by:</h3>
          <WatchSelect onChange={handleSelectChange}>
            <option value="0">Default</option>
            <option value="1">IMDb Rating</option>
            {/* <option value="2">Your Rating</option> */}
            <option value="3">Release Date</option>
            <option value="4">Title</option>
          </WatchSelect>
          <Btn onClick={() => dispatch(reverseWatchList())}>
            <ArrowUpDown />
          </Btn>
        </WatchSort>
      </WatchHeader>

      {filterMovies.length > 0 ? (
        <>
          <WatchBox>
            {filterMovies.map((movie: mediaProperty) => (
              <WatchItem key={`watchlist-movie-${movie.id}`}>
                <PosterPic movie={movie} height={200} width="130px" />
                <div>
                  <h3>
                    {movie?.original_title
                      ? movie.original_title
                      : movie?.original_name}
                  </h3>
                  <time>
                    {movie?.release_date
                      ? movie.release_date
                      : movie?.first_air_date}
                  </time>
                  {movie?.runtime && <time> {movie?.runtime}min </time>}
                  <RatingDetail movie={movie} />
                  <WatchItemOverview>{movie.overview}</WatchItemOverview>
                </div>
              </WatchItem>
            ))}
          </WatchBox>
          <PageSplit movieData={WatchList} moviesPerPage={moviesPerPage} />
        </>
      ) : (
        <p>Your watchlist is empty.</p>
      )}
    </WatchPage>
  )
}

export default WatchList
