import React, { useEffect, useState } from 'react'
import appWriteService from '../appwrite/config'
import { Container, PostCard } from '../components/index'
import { useNavigate } from 'react-router-dom'

function AllPosts() {
  const [posts, setPosts] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    appWriteService
      .getQuizes([])
      .then((posts) => {
        if (posts) {
          setPosts(posts.documents)
        }
      })
      .catch((error) => console.log('Error while fetching quizzes', error))
    // console.log(posts)
  }, [])

  return (
    <div className='w-full py-8'>
      <Container>
        <div className='flex flex-wrap'>
          {posts.map((post) => (
            <div key={post.$id} className='p-2 w-1/4'>
              <PostCard {...post} deletebutton={false} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default AllPosts
