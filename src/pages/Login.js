import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../api'

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  let timeout

  const handleLogin = async (e) => {
    e.preventDefault()
    if (timeout) clearTimeout(timeout)
    try {
      const response = await login({ email, password })
      props.handleUser(response.data)
      navigate('/')
    } catch (error) {
      timeout = setTimeout(() => {
        setError('')
      }, 3500)
      setError(error.response.data.msg) // Update the error state
    }
  }

  return (
    <div className='wrapper-in'>
      <h2 className='capitalize header flex justify-center align-center'>
        login
      </h2>
      <div className='wrapper margin-auto flex justify-center align-center'>
        <form onSubmit={handleLogin} className='form flex justify-center'>
          <input
            type='text'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder='Email...'
            className='form-input'
          />
          <input
            type='password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder='Password...'
            className='form-input'
          />
          <button type='submit' className='btn capitalize text-center'>
            login
          </button>
        </form>
        {error && <p className='error'>{error}</p>}
      </div>
    </div>
  )
}

export default Login
