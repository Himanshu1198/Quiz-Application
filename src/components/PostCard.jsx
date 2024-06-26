import React from 'react'
import appWriteServices from '../appwrite/config'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Tilt from 'react-parallax-tilt'

function PostCard({ $id, name, difficulty, slug, deletebutton, description }) {
  const navigate = useNavigate()
  const userData = useSelector((state) => state.auth.userData)
  return (
    // <div
    //   className='flex flex-wrap bg-slate-100 rounded-3xl my-4 p-3'
    //   style={{
    //     WebkitBoxShadow: '10px 10px 90px -24px rgba(0,0,0,0.75)',
    //     MozBoxShadow: '10px 10px 90px -24px rgba(0,0,0,0.75)',
    //     boxShadow: '10px 10px 90px -24px rgba(0,0,0,0.75)',
    //   }}
    // >
    //   <div className='w-full rounded-xl p-4'>
    //     <h2 className='text-xl font-bold'>{name}</h2>
    //   </div>
    //   <div className='flex gap-3 my-2 ml-4 text-white font-semibold'>
    //     <button
    //       onClick={() => {
    //         navigate(`/quiz/${$id}`)
    //       }}
    //       className='p-2 px-4 bg-green-500 rounded-3xl hover:bg-green-600'
    //       style={{
    //         WebkitBoxShadow: '10px 10px 30px 0px rgba(2,87,2,1)',
    //         MozBoxShadow: '10px 10px 30px 0px rgba(2,87,2,1)',
    //         boxShadow: '10px 10px 30px 0px rgba(2,87,2,1)',
    //       }}
    //     >
    //       Take Quiz
    //     </button>
    //     {deletebutton && (
    //       <button
    //         onClick={() => {
    //           appWriteServices.deleteQuiz($id, userData.$id)
    //         }}
    //         className='p-2 px-4 bg-red-500 rounded-3xl hover:bg-red-600'
    //         style={{
    //           WebkitBoxShadow: '10px 10px 30px 0px rgba(128,0,0,1)',
    //           MozBoxShadow: '10px 10px 30px 0px rgba(128,0,0,1)',
    //           boxShadow: '10px 10px 30px 0px rgba(128,0,0,1)',
    //         }}
    //       >
    //         Delete Quiz
    //       </button>
    //     )}
    //   </div>
    // </div>
    <Tilt>
      <div class='max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700'>
        <a href='#'>
          <h5 class='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
            {name}
          </h5>
        </a>
        <div className='my-2'>
          Difficulty :{' '}
          <span
            className={`
              px-3 py-1 rounded-xl
              ${
                difficulty === 'easy'
                  ? 'bg-green-500'
                  : difficulty === 'moderate'
                  ? 'bg-yellow-500'
                  : 'bg-red-500'
              }
              `}
          >
            {difficulty}
          </span>
        </div>
        <p class='mb-3 font-normal text-gray-700 dark:text-gray-400'>
          {description
            ? description.slice(0, 70)
            : 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.'.split(
                0,
                70
              )}
          ...
        </p>
        <button
          onClick={() => {
            navigate(`/quiz/${$id}`)
          }}
          class='inline-flex items-center px-3 py-2 my-2 mr-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
        >
          Take Quiz
        </button>
        {deletebutton && (
          <button
            onClick={() => {
              appWriteServices.deleteQuiz($id, userData.$id)
            }}
            class='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'
          >
            Delete Quiz
          </button>
        )}
      </div>
    </Tilt>
  )
}

export default PostCard
