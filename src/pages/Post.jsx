import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import appWriteServices from '../appwrite/config'
import { ColorRing } from 'react-loader-spinner'
import { useSelector } from 'react-redux'

function Post() {
  const [post, setPost] = useState(null)
  const [questions, setQuestions] = useState([])

  const [correct, setCorrect] = useState(0)
  const [incorrect, setIncorrect] = useState(0)
  const [incorrectQs, setIncorrectQs] = useState([])

  const [userAnswers, setUserAnswers] = useState([])
  const [shouldSubmit, setShouldSubmit] = useState(false)
  const [result, setResult] = useState(false)

  const [currStats, setCurrStats] = useState(null)

  const { slug } = useParams()
  const navigate = useNavigate()
  const userData = useSelector((state) => state.auth.userData)

  useEffect(() => {
    if (slug) {
      getPost()
    } else {
      navigate('/')
    }
  }, [slug])

  const getPost = async () => {
    try {
      const post = await appWriteServices.getQuiz(slug)
      let currStats
      try {
        currStats = await appWriteServices.getStats(userData.$id)
      } catch (error) {
        console.log(error)
      }
      if (post) {
        setPost(post)
        if (currStats) {
          setCurrStats(currStats)
        } else {
          appWriteServices.createStat(userData.$id)
        }

        const arr =
          typeof post.Questions === 'string'
            ? JSON.parse(post.Questions)
            : post.Questions

        setQuestions(arr)
      } else {
        navigate('/')
      }
    } catch (error) {
      console.error('Error fetching post:', error)
      navigate('/')
    }
  }

  const handleSubmit = async () => {
    // const userData = await userServices.getCurrentUser()
    evaluate()
  }

  const evaluate = () => {
    let correctCount = 0
    let incorrectCount = 0
    let tempIncorrectQs = []

    questions.forEach((que) => {
      const answerId = userAnswers.find((ans) => que.id === ans.id)
      let QuestionObj = {
        id: que.id,
        question: que.question,
        yourAnswer: '',
        correctAns: que.answer,
        explanation: que.explnation,
      }
      if (answerId) {
        if (que.answer === answerId.userAns) {
          correctCount += 1
        } else {
          incorrectCount += 1
          QuestionObj.yourAnswer = answerId.userAns
          tempIncorrectQs.push(QuestionObj)
        }
      } else {
        incorrectCount += 1
        tempIncorrectQs.push(QuestionObj)
      }
    })

    setCorrect(correctCount)
    setIncorrect(incorrectCount)
    setIncorrectQs(tempIncorrectQs)
    setShouldSubmit(true)
    setResult(true)
  }

  const selectedOption = (optionValue, questionId) => {
    const updatedAnswers = userAnswers.filter((que) => que.id !== questionId)
    updatedAnswers.push({ id: questionId, userAns: optionValue })
    setUserAnswers(updatedAnswers)
  }

  useEffect(() => {
    if (shouldSubmit) {
      const submitData = async () => {
        try {
          const now = new Date()
          const userObj = {
            id: userData.$id,
            correct: correct,
            incorrect: incorrect,
            timeStamp: now,
          }
          const users = post.attemptedUsers || '[]'
          let parsedUsers = JSON.parse(users)
          parsedUsers.push(userObj)

          const statObject = {
            id: post.name,
            correct: correct,
            incorrect: incorrect,
            incorrectQs: incorrectQs,
            timeStamp: now,
          }
          const stats = currStats.userData || '[]'
          let parsedStats = await JSON.parse(stats)
          parsedStats.push(statObject)

          await appWriteServices.updateAttempts(slug, parsedUsers)
          await appWriteServices.updateStats(userData.$id, parsedStats)

          console.log('Submitted')
        } catch (error) {
          console.log(error)
        } finally {
          setShouldSubmit(false) // Reset submit trigger
        }
      }

      submitData()
    }
  }, [shouldSubmit, correct, incorrect])

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  return (
    <div className=''>
      <div className='flex flex-col items-center text-center justify-center mt-10'>
        <div className='text-4xl font-extrabold'>
          {post ? capitalizeFirstLetter(post.name) : ''}
        </div>
        <div className='text-lg mx-32'>{post ? post.description : ''}</div>
      </div>
      <div>
        {questions.length > 0 ? (
          questions.map((question, index) => (
            <div
              className='flex flex-col justify-center items-center'
              key={question.id}
            >
              <div
                className='shadow-2xl flex flex-col justify-center items-center w-3/4 mt-10 p-5 rounded-lg dark:bg-blue-950'
                style={{
                  WebkitBoxShadow: '7px 18px 125px -30px rgba(0,0,0,0.75)',
                  MozBoxShadow: '7px 18px 125px -30px rgba(0,0,0,0.75)',
                  boxShadow: '7px 18px 125px -30px rgba(0,0,0,0.75)',
                }}
              >
                <div className='my-3 font-bold text-xl'>
                  {question.question}
                </div>
                <div className='flex gap-32'>
                  <div className='flex bg-red-200 dark:bg-red-600 p-2 pr-3 rounded-3xl'>
                    <input
                      type='radio'
                      name={`question-${question.id}`}
                      className='h-5 w-5 mx-2 mt-0.5 hover:bg-slate-400 cursor-pointer'
                      onChange={() => {
                        selectedOption(question.options.option1, question.id)
                      }}
                    />
                    {question.options.option1}
                  </div>
                  <div className='flex bg-green-200 dark:bg-green-600 p-2 pr-3 rounded-3xl'>
                    <input
                      type='radio'
                      name={`question-${question.id}`}
                      className='h-5 w-5 mx-2 mt-0.5 hover:bg-slate-400 cursor-pointer'
                      onChange={() => {
                        selectedOption(question.options.option2, question.id)
                      }}
                    />
                    {question.options.option2}
                  </div>
                  <div className='flex  bg-orange-200 dark:bg-orange-600 p-2 pr-3 rounded-3xl'>
                    <input
                      type='radio'
                      name={`question-${question.id}`}
                      className='h-5 w-5 mx-2 mt-0.5 hover:bg-slate-400 cursor-pointer'
                      onChange={() => {
                        selectedOption(question.options.option3, question.id)
                      }}
                    />
                    {question.options.option3}
                  </div>
                  <div className='flex  bg-blue-200 dark:bg-blue-600 p-2 pr-3 rounded-3xl'>
                    <input
                      type='radio'
                      name={`question-${question.id}`}
                      className='h-5 w-5 mx-2 mt-0.5 hover:bg-slate-400 cursor-pointer'
                      onChange={() => {
                        selectedOption(question.options.option4, question.id)
                      }}
                    />
                    {question.options.option4}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className='flex justify-center items-center'>
            <ColorRing
              visible={true}
              height='150'
              width='150'
              ariaLabel='color-ring-loading'
              wrapperStyle={{}}
              wrapperClass='color-ring-wrapper'
              colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />
          </div>
        )}
      </div>
      <div className='flex justify-center items-center'>
        <div className=''>
          {!result && (
            <button
              onClick={handleSubmit}
              className='my-20 bg-red-500 text-white
              p-3 rounded-2xl font-semibold px-5 hover:bg-red-600'
              style={{
                WebkitBoxShadow: '11px 11px 45px -6px rgba(255,0,0,1)',
                MozBoxShadow: '11px 11px 45px -6px rgba(255,0,0,1)',
                boxShadow: '11px 11px 45px -6px rgba(255,0,0,1)',
              }}
            >
              Submit
            </button>
          )}
        </div>
      </div>
      {result && (
        <div className='flex justify-center items-center font-semibold mt-16'>
          <div className=''>
            <div className='mb-4 bg-green-600 p-3 rounded-xl text-white px-6 text-xl flex justify-between'>
              Correct : <strong className='ml-10'>{correct}</strong>
            </div>
            <div className='mb-10 bg-red-600 p-3 rounded-xl text-white px-6 text-xl flex justify-between'>
              Incorrect : <strong className='ml-10'>{incorrect}</strong>
            </div>
          </div>
        </div>
      )}
      {result && (
        <div className='flex justify-center items-center'>
          <button
            onClick={() => {
              navigate('/')
            }}
            className='mb-20 p-3 px-6 text-white bg-blue-500 font-semibold rounded-xl'
          >
            Go To Home
          </button>
        </div>
      )}
    </div>
  )
}

export default Post
