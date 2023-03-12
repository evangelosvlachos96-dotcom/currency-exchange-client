import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home.js'
import Currencies from './pages/Currencies.js'
import Exchanges from './pages/Exchanges.js'
import Navigation from './components/Navigation.js'
import Register from './pages/Register.js'
import Login from './pages/Login.js'
import Convert from './pages/Convert.js'
import CurrenciesAuth from './pages/CurrenciesAuth.js'
import ExchangesAuth from './pages/ExchangesAuth.js'
import UpdateCurrency from './pages/UpdateCurrency.js'
import UpdateExchange from './pages/UpdateExchange.js'
import { getUser } from './api'

const App = () => {
  const [user, setUser] = useState({})

  const handleUser = (userData) => setUser(userData)

  useEffect(() => {
    const userData = async () => {
      const user = await getUser()
      setUser(user.data)
    }
    userData()
  }, [])

  return (
    <main className='main'>
      <BrowserRouter>
        <Navigation user={user} handleUser={handleUser} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/currencies' element={<Currencies />} />
          <Route path='/exchanges' element={<Exchanges user={user} />} />
          <Route path='/convert' element={<Convert user={user} />} />
          <Route
            path='/currencies-auth'
            element={<CurrenciesAuth user={user} />}
          />
          <Route
            path='/exchanges-auth'
            element={<ExchangesAuth user={user} />}
          />
          <Route
            path='/currencies-auth/:currencyId'
            element={<UpdateCurrency user={user} />}
          />
          <Route
            path='/exchange-auth/:exchangeId'
            element={<UpdateExchange user={user} />}
          />
          <Route path='/login' element={<Login handleUser={handleUser} />} />
          <Route
            path='/register'
            element={<Register handleUser={handleUser} />}
          />
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
