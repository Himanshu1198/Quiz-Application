import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import appwriteServices from '../appwrite/config'

function IncorrQs() {
  const { slug } = useParams()
  const userData = useSelector((state) => state.auth.userData)
  const [data, setData] = useState()

  const fetchData = async () => {
    try {
      const stats = await appwriteServices.getStats(userData.$id)
      const parsedData = await JSON.parse(stats.userData)
      const filteredData = parsedData.find((que) => que.id == slug)
      console.log(filteredData)
      setData(filteredData)
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [slug])

  return (
    <div className='px-20 py-10'>
      {data &&
        data.incorrectQs.map((iq) => (
          <div key={iq.id} className='mb-10'>
            <TableComponent iq={iq} />
          </div>
        ))}
    </div>
    // <div>Hello World</div>
  )
}

export default IncorrQs

const TableComponent = ({ iq }) => {
  return (
    <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
      <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th scope='col' className='px-6 py-3'>
              Question
            </th>
            <th scope='col' className='px-6 py-3'>
              Your Answer
            </th>
            <th scope='col' className='px-6 py-3'>
              Correct Answer
            </th>
            <th scope='col' className='px-6 py-3'>
              Explanation
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'>
            <th
              scope='row'
              className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
            >
              {iq.question}
            </th>
            <td className='px-6 py-4'>{iq.yourAnswer}</td>
            <td className='px-6 py-4'>{iq.correctAns}</td>
            <td className='px-6 py-4'>{iq.explanation}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
