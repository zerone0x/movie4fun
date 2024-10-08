import { IconContext } from 'react-icons'
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai'
import ReactPaginate from 'react-paginate'
import styled from 'styled-components'
import { setCurrentPage } from '../store/watchListSlice'
import { useDispatch } from 'react-redux'
import { mediaProperty } from '../utils/interface'

const PaginationContainer = styled(ReactPaginate)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5%;
  gap: 10px;
  cursor: pointer;

  .page-item {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: #445566;
    font-size: 16px;
    font-weight: 500;
    transition:
      background-color 0.3s,
      color 0.3s;

    &:hover {
      background-color: #cf7a65;
      color: #fffef8;
    }
  }

  .active {
    background-color: #445566;
    color: #fffef8;
    font-weight: 600;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
`
interface PageSplitProps {
  movieData: [] | mediaProperty[]
  moviesPerPage: number
}
// TODO 分页路由
function PageSplit({ movieData, moviesPerPage }: PageSplitProps) {
  const dispatch = useDispatch()
  const handlePageClick = (data: { selected: number }) => {
    dispatch(setCurrentPage(data.selected + 1))
  }
  return (
    <PaginationContainer
      breakLabel="..."
      pageCount={Math.ceil(movieData.length / moviesPerPage)}
      onPageChange={handlePageClick}
      pageClassName={'page-item'}
      activeClassName={'active'}
      previousLabel={
        <IconContext.Provider value={{ color: '#445566', size: '36px' }}>
          <AiFillLeftCircle />
        </IconContext.Provider>
      }
      nextLabel={
        <IconContext.Provider value={{ color: '#445566', size: '36px' }}>
          <AiFillRightCircle />
        </IconContext.Provider>
      }
    />
  )
}

export default PageSplit
