import React from 'react'
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa'

const Pagination = ({ page, handlePageChange }) => {
  return (
    <div className='pagination text-center flex justify-center'>
      <button
        onClick={() => handlePageChange(page - 1)}
        className='arrow low-margin-right flex align-center'
      >
        <FaArrowCircleLeft />
      </button>
      <span className='information'>{page}</span>
      <button
        onClick={() => handlePageChange(page + 1)}
        className='arrow low-margin-left flex align-center'
      >
        {' '}
        <FaArrowCircleRight />
      </button>
    </div>
  )
}

export default Pagination
