import React, { useState } from 'react'

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <div className='search-container'>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          className='search-input'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Search currencies by name or code'
        />
        <button type='submit' className='btn capitalize text-center'>
          search
        </button>
      </form>
    </div>
  )
}

export default Search
