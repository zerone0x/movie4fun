import { useDispatch, useSelector } from 'react-redux'
import {
  addWatchList,
  removeWatchList,
  selectWatchList,
} from '../store/watchListSlice'
import styled from 'styled-components'
import StarRating from './starRating'
import { Link } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import AddWatchBtn from '../ui/AddWatchBtn'
import RatePopup from './RatePopup'
import {
  openPopup,
  closePopup,
  selectIsOpen,
  selectSelectedMovie,
} from '../store/PopupSlice'
import { selectRating } from '../store/ratingSlice'
import Star from '../ui/Star'

const StyledSlider = styled(Slider)`
  .slick-slide {
    padding: 0 10px;
  }
  .slick-slide > div {
    margin: 0 10px;
    flex: 1 1 auto;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .slick-prev,
  .slick-next {
    z-index: 1;
    top: 50%;
    transform: translateY(-50%);
    border: none;
    opacity: 0.9;
    font-size: 50px;
    width: 50px;
    height: 50px;
  }

  .slick-prev:before,
  .slick-next:before {
    font-size: 50px;
    color: #bbbbbb;
    background-color: transparent;
    opacity: 1;
  }
  .slick-prev:hover:before,
  .slick-next:hover:before {
    opacity: 1;
    color: #f5c518 !important;
    // background-color: #F5C518!important;
    z-index: 1000;
    transform: scale(1.1);
  }
  .slick-prev {
    left: 10px;
  }

  .slick-next {
    right: -10px;
  }
`

const MovieDetail = styled.div`
  padding: 10px;
  border-radius: 0 0 4px 4px;
`
const MovieBox = styled.div`
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
`

const SectionTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  &::after {
    content: '>';
  }
  &::before {
    content: '| ';
    color: #f5c518;
  }
`

const Card = styled.div`
  position: relative;
  background: #1a1a1a;
  // margin-right: 20px;
  max-width: 200px;
`

const PosterWrapper = styled.div`
  width: 100%;
  height: 300px;
  min-height: 200px;
`

const PosterItem = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const Title = styled.h3`
  font-size: 16px;
  margin: 10px 0 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Year = styled.p`
  font-size: 14px;
  color: #888;
  margin-bottom: 10px;
`

const Button = styled.button`
  background: #f5c518;
  color: #000;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
`

const RatingStar = styled.div`
  &:hover {
    background-color: grey;
  }
`
const RatingBox = styled.div`
  display: flex;
  gap: 10px;
`

const AverageRate = styled.div`
  display: flex;
  gap: 5px;
`

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  cursor: pointer;
  z-index: 10;
  &:hover {
    border: #f5c518;
  }
`

function PrevArrow(props) {
  const { className, onClick } = props
  return <ArrowButton className={className} onClick={onClick} />
}

function NextArrow(props) {
  const { className, onClick } = props
  return <ArrowButton className={className} onClick={onClick} />
}
function Poster({ movies, header }) {
  const dispatch = useDispatch()

  const settings = {
    dots: true,
    infinite: movies?.length > 6,
    speed: 500,
    slidesToShow: Math.min(6, movies?.length),
    slidesToScroll: Math.min(6, movies?.length),
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  }
  const ratingArr = useSelector(selectRating)
  let rating = false

  return (
    <MovieBox>
      {header && <SectionTitle>{header} </SectionTitle>}
      <StyledSlider {...settings}>
        {movies?.map((movie, index) => (
          <Card key={index}>
            <AddWatchBtn movie={movie} />
            <Link to={`/movie/${movie.id}`}>
              <PosterWrapper>
                {movie.poster_path !== 'N/A' ? (
                  <PosterItem
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.original_title}
                  />
                ) : (
                  <span>No Poster</span>
                )}
              </PosterWrapper>
            </Link>
            <MovieDetail>
              <Title>{movie.original_title}</Title>
              <Year>{movie.release_date}</Year>
              <RatingBox>
                <AverageRate>
                  <Star size={20} color="#F5C518" full={true} />{' '}
                  {movie.vote_average.toFixed(1)}
                </AverageRate>
                {ratingArr.map((item) => {
                  if (item.id === movie.id) {
                    return (
                      <RatingStar
                        key={item.id}
                        onClick={() => {
                          dispatch(openPopup(movie))
                        }}
                      >
                        <Star
                          size={20}
                          color="#128BB5"
                          full={item?.rate != 0}
                        />
                      </RatingStar>
                    )
                  }
                })}
                {ratingArr.filter((item) => item.id === movie.id).length ===
                  0 && (
                  <RatingStar
                    onClick={() => {
                      dispatch(openPopup(movie))
                    }}
                  >
                    <Star size={20} color="#128BB5" full={false} />
                  </RatingStar>
                )}
              </RatingBox>
              {/* <StarRating id={movie.id} /> */}
            </MovieDetail>
          </Card>
        ))}
      </StyledSlider>
    </MovieBox>
  )
}

export default Poster
