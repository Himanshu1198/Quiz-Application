import React from 'react'
import { Container } from '../index.js'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import UserLogo from '../UserLogo.jsx'
import ThemeBtn from '../ThemeBtn.jsx'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true,
    },
    {
      name: 'Login',
      slug: '/login',
      active: !authStatus,
    },
    {
      name: 'Signup',
      slug: '/signup',
      active: !authStatus,
    },
    {
      name: 'All Quizes',
      slug: '/all-quizzes',
      active: authStatus,
    },
  ]

  return (
    <header className='py-5'>
      <Container>
        <nav className='flex'>
          {
            <div>
              <ThemeBtn />
            </div>
          }
          <ul className='flex ml-auto'>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className='inline-bock px-6 py-2 duration-200  rounded-full'
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li className='px-6'>
                <UserLogo />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header
