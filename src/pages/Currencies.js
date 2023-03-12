import React from 'react'
import { useEffect, useState } from 'react'
import { formatDate } from '../utils/formatDate.js'
import { getCurrencies, searchCurr } from '../api'
import Search from '../components/Search.js'

const Currencies = () => {
  const [currencies, setCurrencies] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState('')

  let timeout

  useEffect(() => {
    fetchCurrencies()
  }, [])

  const fetchCurrencies = async () => {
    setLoading('loading')
    const response = await getCurrencies()
    setCurrencies(response.data)
    setLoading('')
  }

  const handleSearch = async (query) => {
    try {
      setLoading('Loading')
      if (error) setError('')
      const response = await searchCurr(query)
      setCurrencies(response.data)
      setLoading('')
    } catch (error) {
      if (loading) setLoading('')
      if (timeout) clearTimeout(timeout)
      setCurrencies('')
      setError(error.response.data.msg)
      timeout = setTimeout(() => setError(''), 5000)
    }
  }

  return (
    <div className='wrapper-in'>
      <h2 className='capitalize header flex justify-center align-center'>
        supported currencies
      </h2>
      <div className='wrapper margin-auto'>
        <Search onSearch={handleSearch} />
        {error && <p className='error'>{error}</p>}
        {!loading ? (
          <div className='container flex justify-space-between'>
            {currencies
              ? currencies.map((currency) => {
                  const formattedDate = formatDate(currency.updatedAt)
                  const { _id, name, code, symbol } = currency
                  return (
                    <div
                      key={_id}
                      className='currency-wrapper flex align-center'
                    >
                      <div className='main-currency-information'>
                        <p className='capitalize'>
                          name : <span className='information'>{name}</span>
                        </p>
                        <p className='capitalize'>
                          code : <span className='information'>{code}</span>
                        </p>
                        <p className='capitalize'>
                          symbol : <span className='information'>{symbol}</span>
                        </p>
                        <span className='capitalize'>
                          updated :{' '}
                          <span className='information'>{formattedDate}</span>
                        </span>
                      </div>
                      <div className='creator-wrapper flex'>
                        <p className='capitalize'>
                          created by :{' '}
                          <span className='information user'>
                            {currency.createdBy.fullName}
                          </span>
                        </p>
                        <p>
                          Contact :{' '}
                          <span className='information user'>
                            {currency.createdBy.email}
                          </span>{' '}
                        </p>
                      </div>
                    </div>
                  )
                })
              : ''}
          </div>
        ) : (
          <p className='text-center'>Loading....</p>
        )}
      </div>
    </div>
  )
}

export default Currencies
