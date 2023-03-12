import React from 'react'
import { useEffect, useState } from 'react'
import { formatDate } from '../utils/formatDate.js'
import { getExchanges } from '../api'
import { useNavigate } from 'react-router-dom'
import Pagination from '../components/Pagination.js'

const Exchanges = ({ user }) => {
  const navigate = useNavigate()
  const [exchanges, setExchanges] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState('')

  const { userInfo } = user
  useEffect(() => {
    if (!userInfo) navigate('/')
    fetchExchanges(page)
  }, [page])

  const fetchExchanges = async (page) => {
    const response = await getExchanges(page)
    setExchanges(response.data.exchanges)
    setTotalPages(response.data.totalPages)
  }

  const handlePageChange = (page) => {
    if (page > totalPages) setPage(1)
    else if (page < 1) setPage(totalPages)
    else setPage(page)
  }

  return (
    <div className='wrapper-in exachanges-wrapper'>
      <h2 className='capitalize header flex justify-center align-center'>
        Exhanges
      </h2>
      <div className='wrapper margin-auto'>
        <div className='container flex justify-space-between'>
          {exchanges.map((exchange) => {
            const formattedDate = formatDate(exchange.updatedAt)
            const { _id, baseCurrency, targetCurrency, ratio, createdBy } =
              exchange
            return (
              <div key={_id} className='exchange-wrapper flex align-center'>
                <div className='exchange-in flex align-center'>
                  <div className='main-exchange-information'>
                    <p className='capitalize'>
                      base currency :{' '}
                      <span className='information'>{baseCurrency.name}</span>
                    </p>
                    <p className='capitalize'>
                      code :{' '}
                      <span className='information'>{baseCurrency.code}</span>
                    </p>
                  </div>
                  <div className='main-exchange-information'>
                    <p className='capitalize'>
                      target currency :{' '}
                      <span className='information'>{targetCurrency.name}</span>
                    </p>
                    <p className='capitalize'>
                      code :{' '}
                      <span className='information'>{targetCurrency.code}</span>
                    </p>
                  </div>
                </div>
                <div className='text-center capitalize ratio'>
                  updated : <span className='information'>{formattedDate}</span>{' '}
                  ratio :{' '}
                  <span className='information'>{ratio.toFixed(3)}</span>
                </div>
                <div className='creator-wrapper flex'>
                  <p className='capitalize'>
                    created by :{' '}
                    <span className='information user low-margin-right'>
                      {createdBy.fullName}
                    </span>
                  </p>
                  <p>
                    Contact :{' '}
                    <span className='information user'>{createdBy.email}</span>{' '}
                  </p>
                </div>
              </div>
            )
          })}
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

export default Exchanges
