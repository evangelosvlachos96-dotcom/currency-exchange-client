import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getCurrency, updateCurrency } from '../api'
import { useNavigate } from 'react-router-dom'

const UpdateCurrency = (props) => {
  const { currencyId } = useParams()
  const [currency, setCurrency] = useState('')
  const [result, setResult] = useState('')
  const [error, setError] = useState('')
  const [updated, setUpdated] = useState(false)
  const [form, setForm] = useState({ name: '', code: '', symbol: '' })
  const navigate = useNavigate()

  let eTimeout, uTimeout

  useEffect(() => {
    if (eTimeout) clearTimeout(eTimeout)
    if (uTimeout) clearTimeout(uTimeout)
    const role = props.user.userInfo?.role
    if (role !== 'superuser' && role !== 'admin') navigate('/')
    const fetchCurrency = async () => {
      const response = await getCurrency(currencyId)
      setCurrency(response.data)
      setForm(response.data)
    }
    fetchCurrency()
  }, [updated])

  const handleUpdate = async () => {
    try {
      const response = await updateCurrency(currencyId, form)
      setResult(response.data.result)
      setCurrency(response.data)
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
      {currency ? (
        <div className='wrapper-in'>
          <h2 className='capitalize header flex justify-center align-center'>
            Update {form.name}
          </h2>
          <div className='wrapper margin-auto flex justify-center align-center'>
            <form className='form-update'>
              <div className='inputs-wrapper capitalize flex align-center'>
                <div className='single-input'>
                  <span> name </span>
                  <input
                    type='text'
                    value={form.name}
                    className='form-input'
                    onChange={(e) =>
                      setForm({
                        ...form,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className='single-input'>
                  <span> code </span>
                  <input
                    type='text'
                    value={form.code}
                    className='form-input'
                    onChange={(e) =>
                      setForm({
                        ...form,
                        code: e.target.value,
                      })
                    }
                  />
                </div>
                <div className='single-input'>
                  <span> symbol </span>
                  <input
                    type='text'
                    value={form.symbol}
                    className='form-input'
                    onChange={(e) =>
                      setForm({
                        ...form,
                        symbol: e.target.value,
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

export default UpdateCurrency
