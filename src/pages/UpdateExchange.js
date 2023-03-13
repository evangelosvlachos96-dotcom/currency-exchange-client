import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getExchange, updateExhange } from '../api'
import { useNavigate } from 'react-router-dom'

const UpdateExchange = (props) => {
  const { exchangeId } = useParams()
  const [exchange, setExchange] = useState('')
  const [result, setResult] = useState('')
  const [error, setError] = useState('')
  const [updated, setUpdated] = useState(false)
  const [form, setForm] = useState({
    baseCurrencyCode: '',
    targetCurrencyCode: '',
    ratio: '',
  })
  const navigate = useNavigate()

  let eTimeout, uTimeout

  useEffect(() => {
    if (eTimeout) clearTimeout(eTimeout)
    if (uTimeout) clearTimeout(uTimeout)
    const role = props.user.userInfo?.role
    if (role !== 'superuser') navigate('/')
    const fetchExhange = async () => {
      const response = await getExchange(exchangeId)
      setExchange(response.data)
      const formObj = {
        baseCurrencyCode: response.data.baseCurrency.code,
        targetCurrencyCode: response.data.targetCurrency.code,
        ratio: response.data.ratio,
      }
      setForm(formObj)
    }
    fetchExhange()
  }, [updated])

  const handleUpdate = async () => {
    try {
      const response = await updateExhange(exchangeId, form)
      setResult(response.data.result)
      setExchange(response.data)
      setUpdated(true)
      uTimeout = setTimeout(() => {
        setResult('')
      }, 3500)
    } catch (error) {
      setError(error.response.data.msg)
      eTimeout = setTimeout(() => {
        setError('')
      }, 3500)
    }
  }

  return (
    <>
      {exchange ? (
        <div className='wrapper-in'>
          <h2 className='capitalize header flex justify-center align-center'>
            Update {exchange.baseCurrency?.name} to{' '}
            {exchange.targetCurrency?.name} exhange
          </h2>
          <div className='wrapper margin-auto flex justify-center align-center'>
            <form className='form-update'>
              <div className='inputs-wrapper capitalize flex align-center'>
                <div className='single-input'>
                  <span> Base Currency </span>
                  <input
                    type='text'
                    value={form.baseCurrencyCode}
                    className='form-input'
                    onChange={(e) =>
                      setForm({
                        ...form,
                        baseCurrencyCode: e.target.value,
                      })
                    }
                  />
                </div>
                <div className='single-input'>
                  <span> ratio </span>
                  <input
                    type='text'
                    value={form.ratio}
                    className='form-input'
                    onChange={(e) =>
                      setForm({
                        ...form,
                        ratio: e.target.value,
                      })
                    }
                  />
                </div>
                <div className='single-input'>
                  <span> Target Currency </span>
                  <input
                    type='text'
                    value={form.targetCurrencyCode}
                    className='form-input'
                    onChange={(e) =>
                      setForm({
                        ...form,
                        targetCurrencyCode: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <button
                type='button'
                className='btn capitalize text-center margin-auto'
                onClick={handleUpdate}
              >
                update
              </button>
              {result && <p className='info'>{result}</p>}
              {error && <p className='error'>{error}</p>}
            </form>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  )
}

export default UpdateExchange
