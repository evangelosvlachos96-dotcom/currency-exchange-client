import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getExchanges, deleteExchange } from '../api'
import { Link } from 'react-router-dom'
import CreateExchange from '../components/CreateExchange'
import Pagination from '../components/Pagination'

const ExchangesAuth = (props) => {
  const navigate = useNavigate()
  const [exchanges, setExchanges] = useState([])
  const [exhangeDeleted, setExchangeDeleted] = useState(false)
  const [result, setResult] = useState(false)
  const [created, setCreated] = useState(false)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState('')
  const [loading, setLoading] = useState('')

  let timeout

  useEffect(() => {
    const role = props.user.userInfo?.role
    if (role !== 'superuser') navigate('/')
    if (timeout) clearTimeout(timeout)
    try {
      fetchExchanges(page)
    } catch (error) {}
  }, [created, page])

  const fetchExchanges = async (page) => {
    setLoading('Loading')
    const response = await getExchanges(page)
    setExchanges(response.data.exchanges)
    setTotalPages(response.data.totalPages)
    setLoading('')
  }

  const handlePageChange = (page) => {
    setLoading('Loading')
    if (page > totalPages) setPage(1)
    else if (page < 1) setPage(totalPages)
    else setPage(page)
    setLoading('')
  }

  const handleExchangeCreated = () => setCreated(!created)

  const handleDeleteExchange = async (id) => {
    try {
      const deleteRes = await deleteExchange(id)
      const response = await fetchExchanges(page)
      setExchanges(response.data)
      setExchangeDeleted(true)
      setResult(deleteRes.data.result) // set result state to message after deleting exchange
      timeout = setTimeout(() => {
        setResult('')
      }, 5000)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='wrapper-in'>
      <h2 className='capitalize header flex justify-center align-center'>
        exchanges dashboard
      </h2>
      <div className='wrapper flex justify-center align-center margin-auto min-height-500'>
        <div className='content flex'>
          <div className='dashboard-wrapper flex justify-center'>
            {!loading ? (
              <>
                {exchanges.map((exchange) => {
                  const { baseCurrency, targetCurrency, ratio } = exchange
                  return (
                    <div
                      key={exchange._id}
                      className='card capitalize h-240 flex justify-center'
                    >
                      <p>
                        base c. :{' '}
                        <span className='information'>{baseCurrency.name}</span>
                      </p>
                      <p>
                        target c. :{' '}
                        <span className='information'>
                          {targetCurrency.name}
                        </span>
                      </p>
                      <p>
                        ratio :{' '}
                        <span className='information'>{ratio.toFixed(3)}</span>
                      </p>
                      <div className='buttons-container'>
                        <button
                          href='#'
                          className='btn danger capitalize text-center'
                          onClick={() => handleDeleteExchange(exchange._id)}
                        >
                          delete
                        </button>
                        <Link
                          to={`/exchange-auth/${exchange._id}`}
                          className='btn capitalize text-center low-margin-left'
                        >
                          update
                        </Link>
                      </div>
                    </div>
                  )
                })}
                {result && <p className='info text-center'>{result}</p>}
              </>
            ) : (
              <p className='text-center'>Loading...</p>
            )}{' '}
          </div>
          <CreateExchange onExchangeCreated={handleExchangeCreated} />{' '}
        </div>
      </div>
      <Pagination
        page={page}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </div>
  )
}

export default ExchangesAuth
