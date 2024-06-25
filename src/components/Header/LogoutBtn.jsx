import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
import { useNavigate } from 'react-router-dom'

function LogoutBtn() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutHandler = () => {
    authService
      .logout()
      .then(() => {
        dispatch(logout())
      })
      .catch((error) => {
        console.log(error)
      })
    navigate('/')
  }

  return (
    <button
      onClick={logoutHandler}
      className='p-2 bg-slate-800 text-white px-4 rounded-xl'
    >
      Logout
    </button>
  )
}

export default LogoutBtn
