import React from 'react'
import { Link } from 'react-router-dom'
import { HiUserGroup, HiHome } from 'react-icons/hi'
import { RiSettings4Fill } from 'react-icons/ri'
import { FiLogOut } from 'react-icons/fi'
import { BsCurrencyExchange } from 'react-icons/bs'
import { FaMoneyBillAlt } from 'react-icons/fa'
import { SiConvertio } from 'react-icons/si'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Navigation = ({ user, handleUser }) => {
  const navigate = useNavigate()
  const { userInfo } = user

  const handleLogout = async (e) => {
    e.preventDefault()
    try {
      await axios.get('http://localhost:4550/api/v1/procon-ce/auth/logout', {
        withCredentials: true,
      })
      handleUser({})
      navigate('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <aside>
      <nav className='navbar flex text-center'>
        <div className='logo margin-auto'>
          <p className='uppercase'>ce</p>
        </div>
        <div className='links flex'>
          <Link
            to='/'
            className='capitalize link flex justify-center align-center'
          >
            <HiHome className='icon' />
            home
          </Link>
          <Link
            to='/currencies'
            className='capitalize link flex justify-center align-center'
          >
            <FaMoneyBillAlt className='icon' />
            currencies
          </Link>
          {user && user.userInfo ? (
            <>
              <Link
                to='/exchanges'
                className='capitalize link flex justify-center align-center'
              >
                <BsCurrencyExchange className='icon' />
                exchanges
              </Link>
              <Link
                to='/convert'
                className='capitalize link flex justify-center align-center'
              >
                <SiConvertio className='icon' />
                convert
              </Link>
            </>
          ) : (
            ''
          )}
          {userInfo && userInfo.role === 'superuser' ? (
            <Link
              to='/exchanges-auth'
              className='capitalize link-auth flex justify-center align-center text-center'
            >
              <RiSettings4Fill className='icon' />
              exchanges dashboard
            </Link>
          ) : (
            ''
          )}
          {userInfo &&
          (userInfo.role === 'superuser' || userInfo.role === 'admin') ? (
            <Link
              to='/currencies-auth'
              className='capitalize link-auth flex justify-center align-center text-center'
            >
              <RiSettings4Fill className='icon' />
              currencies dashboard
            </Link>
          ) : (
            ''
          )}
        </div>
        <div className='user-links flex'>
          {userInfo ? (
            <div className='logout-wrapper flex'>
              <span className='capitalize users-name'>
                Hi {user.userInfo.fullName}
              </span>
              <a href='#' className='uppercase' onClick={handleLogout}>
                <span className='flex align-center justify-center logout-text'>
                  logout
                  <FiLogOut className='logout-icon' />
                </span>
              </a>
            </div>
          ) : (
            <>
              <HiUserGroup className='icon-users' />
              <Link to='/login' className='uppercase user-link'>
                login
              </Link>
              /
              <Link to='/register' className='uppercase user-link'>
                register
              </Link>
            </>
          )}
        </div>
      </nav>
    </aside>
  )
}

export default Navigation
