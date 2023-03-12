import React from 'react'
import { createExchange, getCurrencies } from '../api'
import { useEffect, useState } from 'react'

const CreateExchange = (props) => {
  const [base, setBase] = useState('')
  const [target, setTarget] = useState('')
  const [ratio, setRatio] = useState('')
  const [result, setResult] = useState('')
  const [error, setError] = useState('')
  const [currencies, setCurrencies] = useState([])

  useEffect(() => {
    const fetchCurrencies = async () => {
      const response = await getCurrencies()
      setCurrencies(response.data)
    }
    fetchCurrencies()
  }, [])

  let eTimeout, rTimeout

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      if (rTimeout) clearTimeout(rTimeout)
      const form = {
        baseCurrencyCode: base,
        targetCurrencyCode: target,
        ratio,
      }
      const response = await createExchange(form)
      setResult(response.data.result)
      if (error) setError('')
      if (eTimeout) clearTimeout(eTimeout)
      rTimeout = setTimeout(() => {
        setResult('')
      }, 5000)
      props.onExchangeCreated()
    } catch (error) {
      if (rTimeout) clearTimeout(rTimeout)
      if (result) setResult('')
      if (eTimeout) clearTimeout(eTimeout)
      setError(error.response.data.msg)
      eTimeout = setTimeout(() => {
        setError('')
      }, 5000)
    }
  }

  return (
    <div className='create-wrapper flex justify-center align-center'>
      <h3 className='capitalize margin-auto capitalize'>create exchange</h3>
      <form onSubmit={handleSubmit} className='create-form flex align-center'>
        <label className='create-select-wrapper flex align-center'>
          Base currency:
          <select
            className='low-margin-right'
            id='base-currency'
            value={base}
            onChange={(event) => {
              setBase(event.target.value)
            }}
          >
            <option value=''>Select</option>
            {currencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.code}
              </option>
            ))}
          </select>
        </label>
        <label className='create-select-wrapper flex align-center'>
          Target currency:
          <select
            className='low-margin-right'
            id='base-currency'
            value={target}
            onChange={(event) => {
              setTarget(event.target.value)
            }}
          >
            <option value=''>Select</option>
            {currencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.code}
              </option>
            ))}
          </select>
        </label>
        <label className='create-select-wrapper'>
          Ratio:
          <input
            type='text'
            className='form-input'
            value={ratio}
            onChange={(event) => setRatio(event.target.value)}
          />
        </label>
        <button type='submit' className='btn margin-auto'>
          Create
        </button>
        {result && <p className='info'>{result}</p>}
        {error && <p className='error'>{error}</p>}
      </form>
    </div>
  )
}

export default CreateExchange
