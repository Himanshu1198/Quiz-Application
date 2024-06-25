import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import appWriteService from '../appwrite/config'
import { Container, PostCard } from '../components'

function MyQuizes() {
  const [quizzes, setQuizzes] = useState([])
  const [posts, setPosts] = useState([])

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
      <div>
        <div className='flex flex-wrap'>
          {quizzes.map((post) => (
            <div key={post.$id} className='p-2 w-1/4'>
              <PostCard {...post} deletebutton={true} />
            </div>
          ))}
        </div>
      </div>
    </Container>
  )
}

export default MyQuizes
