import React from 'react'
import { useState, useEffect } from 'react'
import { getCurrencies, convert } from '../api'
import { useNavigate } from 'react-router-dom'

const Convert = ({ user }) => {
  const [currencies, setCurrencies] = useState([])
  const [baseCurrencyCode, setBaseCurrencyCode] = useState('')
  const [targetCurrencyCode, setTargetCurrencyCode] = useState('')
  const [amount, setAmount] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const navigate = useNavigate()
  const { userInfo } = user
  useEffect(() => {
    if (!userInfo) navigate('/')
    const fetchCurrencies = async () => {
      const response = await getCurrencies()
      setCurrencies(response.data)
    }
    fetchCurrencies()
  }, [])

  let timeout

  const handleConvert = async (event) => {
    event.preventDefault()
    if (timeout) clearTimeout(timeout)
    setError('')
    setResult('')
    try {
      const response = await convert({
        baseCurrencyCode,
        targetCurrencyCode,
        amount,
      })
      setResult(response.data)
    } catch (error) {
      if (timeout) clearTimeout(timeout)
      timeout = setTimeout(() => {
        setError('')
      }, 5000)
      setError(error.response.data.msg)
    }
  }

  return (
    <div className='wrapper-in'>
      <h2 className='capitalize header flex justify-center align-center'>
        Covert Currencies
      </h2>
      <div className='wrapper margin-auto'>
        <div className='covert-container text-center flex justify-center align-center'>
          Base code currency
          <select
            className='low-margin-right'
            id='base-currency'
            value={baseCurrencyCode}
            onChange={(event) => {
              setBaseCurrencyCode(event.target.value)
            }}
          >
            <option value=''>Select</option>
            {currencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.code}
              </option>
            ))}
          </select>
          Amount{' '}
          <input
            type='text'
            className='small-input low-margin-right'
            id='amount'
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
          Target code currency
          <select
            id='target-currency'
            value={targetCurrencyCode}
            className='low-margin-right'
            onChange={(event) => {
              setTargetCurrencyCode(event.target.value)
            }}
          >
            <option value=''>Select</option>
            {currencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.code}
              </option>
            ))}
          </select>
          <a href='#' onClick={handleConvert} className='btn'>
            Convert
          </a>
        </div>
        {result && (
          <p className='result text-center'>
            <span className='information low-margin-right'>
              {result.amount} {result.base_currency}
            </span>
            {Number(result.amount) === 1 ? 'is' : 'are'}
            <span className='information low-margin-left'>
              {result.converted_amount} {result.targer_currency}
            </span>
          </p>
        )}
        {error && <p className='error'>{error}</p>}
      </div>
    </div>
  )
}

export default Convert
