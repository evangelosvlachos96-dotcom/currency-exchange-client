import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrencies, deleteCurrency, searchCurr } from '../api'
import { Link } from 'react-router-dom'
import Search from '../components/Search.js'
import CreateCurrency from '../components/CreateCurrency'

const CurrenciesAuth = (props) => {
  const navigate = useNavigate()
  const [currencies, setCurrencies] = useState([])
  const [result, setResult] = useState('')
  const [currencyDeleted, setCurrencyDeleted] = useState(false)
  const [currencyCreated, setCurrencyCreated] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState('')

  let timeout

  useEffect(() => {
    const role = props.user.userInfo?.role
    if (role !== 'superuser' && role !== 'admin') navigate('/')
    if (timeout) clearTimeout(timeout)
    fetchCurrencies()
  }, [currencyDeleted, currencyCreated])

  const fetchCurrencies = async () => {
    setLoading('Loading...')
    const response = await getCurrencies()
    setCurrencies(response.data)
    setLoading('')
  }

  const handleSearch = async (query) => {
    try {
      if (error) setError('')
      const response = await searchCurr(query)
      setCurrencies(response.data)
    } catch (error) {
      if (timeout) clearTimeout(timeout)
      setCurrencies('')
      setError(error.response.data.msg)
      timeout = setTimeout(() => setError(''), 5000)
    }
  }

  const handleCurrencyCreated = () => setCurrencyCreated(!currencyCreated)

  const handleDeleteCurrency = async (id) => {
    try {
      const deleteRes = await deleteCurrency(id)
      const response = await getCurrencies()
      setCurrencies(response.data)
      setResult(deleteRes.data.result)
      setCurrencyDeleted(true)
      timeout = setTimeout(() => {
        setResult('')
      }, 5000)
    } catch (error) {}
  }

  return (
    <div className='wrapper-in'>
      <h2 className='capitalize header flex justify-center align-center'>
        currencies dashboard
      </h2>
      <div className='wrapper flex justify-center align-center margin-auto'>
        <Search onSearch={handleSearch} />
        {error && <p className='error no-margin'>{error}</p>}
        <div className='content flex'>
          {!loading ? (
            <div className='dashboard-wrapper flex justify-center'>
              {currencies
                ? currencies.map((currency) => {
                    return (
                      <div key={currency._id} className='card capitalize'>
                        <p>name : {currency.name}</p>
                        <p>symbol : {currency.symbol}</p>
                        <p>code : {currency.code}</p>
                        <button
                          className='btn danger capitalize text-center'
                          onClick={() => handleDeleteCurrency(currency._id)}
                        >
                          delete
                        </button>
                        <Link
                          to={`/currencies-auth/${currency._id}`}
                          className='btn capitalize text-center low-margin-left'
                        >
                          update
                        </Link>
                      </div>
                    )
                  })
                : ''}
              {result && <p className='info'>{result}</p>}
            </div>
          ) : (
            <p className='text-center'>Loading...</p>
          )}
          <CreateCurrency onCurrencyCreated={handleCurrencyCreated} />{' '}
        </div>
      </div>
    </div>
  )
}

export default React.memo(CurrenciesAuth)
