import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import AllPosts from './pages/AllPosts.jsx'
import Post from './pages/Post.jsx'
import PostForm from './components/post-form/PostForm.jsx'
import { Login, SignUp, AuthLayout } from './components/index.js'
import { Provider } from 'react-redux'
import store from './store/store.js'
import MyQuizes from './pages/MyQuizes.jsx'
import UserStats from './pages/UserStats.jsx'
import IncorrQs from './pages/IncorrQs.jsx'
import Home from './pages/Home.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'signup',
        element: (
          <AuthLayout authentication={false}>
            <SignUp />,
          </AuthLayout>
        ),
      },
      {
        path: 'login',
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: 'all-quizzes',
        element: (
          <AuthLayout authentication>
            <AllPosts />
          </AuthLayout>
        ),
      },
      {
        path: 'create-quiz',
        element: (
          <AuthLayout authentication>
            <PostForm />
          </AuthLayout>
        ),
      },
      {
        path: 'my-quiz',
        element: (
          <AuthLayout authentication>
            <MyQuizes />
          </AuthLayout>
        ),
      },
      {
        path: 'quiz/:slug',
        element: (
          <AuthLayout authentication>
            <Post />
          </AuthLayout>
        ),
      },
      {
        path: 'my-stat/:slug',
        element: (
          <AuthLayout authentication>
            <UserStats />
          </AuthLayout>
        ),
      },
      {
        path: 'incorrectQs/:slug',
        element: (
          <AuthLayout>
            <IncorrQs />
          </AuthLayout>
        ),
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
