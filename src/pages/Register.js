import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { register } from '../api'

export const Register = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  let timeout

  const handleRegister = async (event) => {
    event.preventDefault()
    if (timeout) clearTimeout(timeout)
    try {
      const response = await register({ fullName, email, password })
      props.handleUser(response.data)
      navigate('/')
    } catch (error) {
      timeout = setTimeout(() => {
        setError('')
      }, 5000)
      setError(error.response.data.msg) // Update the error state
    }
  }

  return (
    <div className='wrapper-in'>
      <h2 className='capitalize header flex justify-center align-center'>
        register
      </h2>
      <div className='wrapper margin-auto flex justify-center align-center'>
        <form onSubmit={handleRegister} className='form flex justify-center'>
          <input
            type='text'
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            placeholder='Name...'
            className='form-input'
          />
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
            register
          </button>
        </form>
        {error && <p className='error'>{error}</p>}
      </div>
    </div>
  )
}

export default Register
