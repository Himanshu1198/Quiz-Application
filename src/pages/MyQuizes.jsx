import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import appWriteService from '../appwrite/config'
import { Container, PostCard } from '../components'
import { useNavigate } from 'react-router-dom'

function MyQuizes() {
  const [quizzes, setQuizzes] = useState([])
  const [posts, setPosts] = useState([])

  const navigate = useNavigate()
  const userData = useSelector((state) => state.auth.userData)

  useEffect(() => {
    appWriteService.getQuizes([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents)
      }
    })
  }, [posts])

  useEffect(() => {
    if (posts.length > 0) {
      const filteredArr = posts.filter((post) => post.userId === userData.$id)
      setQuizzes(filteredArr)
    }
  }, [posts, userData.$id])

  return (
    <Container>
      {quizzes.length > 0 ? (
        <div>
          <div className='flex flex-wrap'>
            {quizzes.map((post) => (
              <div key={post.$id} className='p-2 w-1/4'>
                <PostCard {...post} deletebutton={true} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className='flex flex-col justify-center items-center  dark:text-white'>
          <div className='my-40 text-5xl'>You have not created a Quiz</div>
          <div>
            <button
              onClick={() => {
                navigate('/create-quiz')
              }}
              className='p-3 bg-gray-400 dark:bg-gray-800 rounded-2xl px-6'
            >
              Tap to start creating a new Quiz
            </button>
          </div>
        </div>
      )}
    </Container>
  )
}

export default MyQuizes
