import React, { useState } from 'react'
import { createCurrency } from '../api'

const CreateCurrency = (props) => {
  const [name, setName] = useState('')
  const [symbol, setSymbol] = useState('')
  const [code, setCode] = useState('')
  const [result, setResult] = useState('')
  const [error, setError] = useState('')

  let eTimeout, rTimeout

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      if (rTimeout) clearTimeout(rTimeout)
      const response = await createCurrency({ name, symbol, code })
      setResult(response.data.result)
      if (error) setError('')
      if (eTimeout) clearTimeout(eTimeout)
      rTimeout = setTimeout(() => {
        setResult('')
      }, 5000)
      props.onCurrencyCreated()
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
      <h3 className='capitalize margin-auto'>Create Currency</h3>
      <form onSubmit={handleSubmit} className='create-form flex'>
        <label>
          Name:
          <input
            type='text'
            className='form-input'
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <label>
          Symbol:
          <input
            type='text'
            className='form-input'
            value={symbol}
            onChange={(event) => setSymbol(event.target.value)}
          />
        </label>
        <label>
          Code:
          <input
            type='text'
            className='form-input'
            value={code}
            onChange={(event) => setCode(event.target.value)}
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

export default CreateCurrency
