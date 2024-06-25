import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import authservice from './appwrite/auth'
import { login, logout } from './store/authSlice'
import { Outlet } from 'react-router-dom'
import { Header, Footer } from './components'
import { ThemeProvider } from './context/theme'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  const [themeMode, setThemeMode] = useState('light')
  const lightTheme = () => {
    setThemeMode('light')
  }
  const darkTheme = () => {
    setThemeMode('dark')
  }

  useEffect(() => {
    document.querySelector('html').classList.remove('light', 'dark')
    document.querySelector('html').classList.add(themeMode)
  }, [themeMode])

  useEffect(() => {
    authservice
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }, [])

  return loading ? (
    <h1 className=''>loading...</h1>
  ) : (
    <ThemeProvider value={{ themeMode, lightTheme, darkTheme }}>
      <div className='min-h-screen flex flex-wrap content-between '>
        <div className='w-full block'>
          <Header />
          <Outlet />
          {/* <Footer /> */}
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
