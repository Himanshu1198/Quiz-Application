import React from 'react'

function Question({ que, update, handleDelete }) {
  return (
    <div className='shadow-2xl p-7 py-10 flex flex-col gap-4 my-6 mx-20 rounded-xl bg-gray-100 dark:bg-gray-800'>
      <div className='flex justify-between'>
        {que.question}
        <div className='flex gap-5 text-white'>
          <button
            onClick={() => {
              update(que.id)
            }}
            className='bg-green-600 px-4 py-2 -mt-2 rounded-lg'
          >
            Update
          </button>
          <button
            onClick={() => {
              handleDelete(que.id)
            }}
            className='bg-red-600 px-4 py-2 -mt-2 rounded-lg'
          >
            Delete
          </button>
        </div>
      </div>
      <div className='flex gap-3'>
        <div className='p-2 bg-red-300 rounded-lg px-3 dark:bg-red-400'>
          1. {que.options.option1}
        </div>
        <div className='p-2 bg-red-300 rounded-lg px-3 dark:bg-red-400'>
          2. {que.options.option2}
        </div>
        <div className='p-2 bg-red-300 rounded-lg px-3 dark:bg-red-400'>
          3. {que.options.option3}
        </div>
        <div className='p-2 bg-red-300 rounded-lg px-3 dark:bg-red-400'>
          4. {que.options.option4}
        </div>
        <div className='p-2 bg-green-300 rounded-lg dark:bg-green-400'>
          {que.answer}
        </div>
      </div>
      <div className='bg-blue-200 p-2 px-3 rounded-lg dark:bg-blue-400'>
        {que.explnation}
      </div>
    </div>
  )
}

export default Question
