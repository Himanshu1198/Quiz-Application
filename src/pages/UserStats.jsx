import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import appwriteServices from '../appwrite/config'
import { useSelector } from 'react-redux'
import { PieChart } from '@mui/x-charts/PieChart'
import Tilt from 'react-parallax-tilt'
import { Container } from '../components'

function UserStats() {
  const userData = useSelector((state) => state.auth.userData)
  const navigate = useNavigate()
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userData?.$id) {
          const stats = await appwriteServices.getStats(userData.$id)
          console.log('Stats fetched:', stats.userData)

          if (stats && Array.isArray(JSON.parse(stats.userData))) {
            setData(JSON.parse(stats.userData))
          } else {
            console.log('Stats is empty or not an array:', stats)
          }
        }
      } catch (error) {
        console.error('Error fetching stats:', error)
      }
    }

    fetchData()
  }, [userData?.$id])

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true, // Use 12-hour format
  }

  return (
    <div className='text-black flex flex-wrap mb-20'>
      {data.length > 0 ? (
        data.map((dataItem) => (
          <Tilt>
            <div
              key={dataItem.id}
              className='pt-7 text-center ml-10 mt-10 shadow-2xl rounded-xl p-1 dark:bg-gray-800 dark:text-white'
            >
              <div>
                <div>{dataItem.id}</div>
                <div>
                  {new Date(dataItem.timeStamp).toLocaleDateString(
                    'en-US',
                    options
                  )}
                </div>
              </div>
              <div className='flex flex-col justify-center items-center w-80 p-5 ml-5 mr-5 rounded-3xl'>
                <PieChart
                  className='dark:text-white'
                  series={[
                    {
                      data: [
                        {
                          id: 0,
                          value: dataItem.correct,
                          label: 'Correct',
                          color: '#58db63 ',
                        },
                        {
                          id: 1,
                          value: dataItem.incorrect,
                          label: 'Incorrect',
                          color: '#f05959',
                        },
                      ],
                    },
                  ]}
                  width={300}
                  height={100}
                />
                <div>
                  <button
                    className='p-2 px-5 text-white rounded-xl my-2 font-semibold bg-blue-500 hover:bg-blue-600'
                    onClick={() => {
                      navigate(`/incorrectQs/${dataItem.id}`)
                    }}
                  >
                    Show All Incorrect Questions
                  </button>
                </div>
              </div>
            </div>
          </Tilt>
        ))
      ) : (
        <Container>
          <div className='flex flex-col justify-center items-center  dark:text-white'>
            <div className='my-40 text-5xl'>No Stats for now</div>
            <div>
              <button
                onClick={() => {
                  navigate('/all-quizzes')
                }}
                className='p-3 bg-gray-400 dark:bg-gray-800 rounded-2xl px-6'
              >
                Tap to attempt Quiz
              </button>
            </div>
          </div>
        </Container>
      )}
    </div>
  )
}

const IncorrQs = () => {
  return <div></div>
}

export default UserStats
