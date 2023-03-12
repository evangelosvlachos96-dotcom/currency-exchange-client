import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:4550/api/v1/procon-ce',
  withCredentials: true,
})

export const login = (body) => API.post('/auth/login', body)
export const register = (body) => API.post('/auth/register', body)
export const logout = () => API.get('/auth/logout')
export const getUser = () => API.get('/user/getCurrentUser')

export const getExchanges = (page = 1) => {
  const params = {
    page,
  }

  return API.get('/exchange/getExchanges', { params })
}
export const deleteExchange = (id) =>
  API.delete(`/exchange/deleteExchange/${id}`)
export const getExchange = (id) => API.get(`/exchange/getExchange/${id}`)
export const updateExhange = (id, body) =>
  API.patch(`/exchange/updateExchange/${id}`, body)
export const createExchange = (body) =>
  API.post('/exchange/createExchange', body)

export const convert = (body) => API.post('/convert/convertCurrency', body)

export const getCurrencies = () => API.get('/currency/getCurrencies')
export const deleteCurrency = (id) =>
  API.delete(`/currency/deleteCurrency/${id}`)
export const getCurrency = (id) => API.get(`/currency/getSignleCurrency/${id}`)
export const updateCurrency = (id, body) =>
  API.patch(`/currency/updateCurrency/${id}`, body)
export const createCurrency = (body) =>
  API.post('/currency/createCurrency', body)
export const searchCurr = (query) =>
  API.get(`/currency/searchCurrencies/?query=${query}`)
