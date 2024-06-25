import React, { useEffect, useState, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Question from './Question'
import QuestionInput from './QuestionInput'
import appWriteServices from '../../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PostForm() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [slug, setSlug] = useState('')
  const navigate = useNavigate()
  const currUserData = useSelector((state) => state.auth.userData)

  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: 'Sample Question',
      explnation: 'Sample Explanation',
      answer: 'Sample Answer',
      options: {
        option1: 'Option 1',
        option2: 'Option 2',
        option3: 'Option 3',
        option4: 'Option 4',
      },
    },
  ])
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [explnation, setExplanation] = useState('')
  const [option1, setOption1] = useState('')
  const [option2, setOption2] = useState('')
  const [option3, setOption3] = useState('')
  const [option4, setOption4] = useState('')

  const add = () => {
    if (!question || !answer || !option1 || !option2 || !option3 || !option4) {
      alert('Please fill all the fields')
      return
    }
    const id = uuidv4()
    const quizQ = {
      id: id,
      question: question,
      answer: answer,
      explnation: explnation,
      options: {
        option1: option1,
        option2: option2,
        option3: option3,
        option4: option4,
      },
    }
    setQuestions([...questions, quizQ])
    setQuestion('')
    setAnswer('')
    setExplanation('')
    setOption1('')
    setOption2('')
    setOption3('')
    setOption4('')
  }

  const update = (id) => {
    const [que] = questions.filter((ques) => ques.id === id)
    if (que) {
      setQuestions(questions.filter((ques) => ques.id !== id))
      setQuestion(que.question)
      setAnswer(que.answer)
      setExplanation(que.explnation)
      setOption1(que.options.option1)
      setOption2(que.options.option2)
      setOption3(que.options.option3)
      setOption4(que.options.option4)
    } else {
      console.log('Question not found')
    }
  }

  const handleDelete = (id) => {
    setQuestions(questions.filter((que) => que.id !== id))
  }

  const handleSubmit = async () => {
    const status = 'active'
    const generatedSlug = slugTransform(name)
    setSlug(generatedSlug)
    console.log(questions)
    if (!isValidDocumentId(generatedSlug)) {
      console.error('Invalid slug:', generatedSlug)
      return
    }
    try {
      const newId = await appWriteServices.createQuiz({
        slug,
        name,
        questions,
        status,
        userId: currUserData.$id,
      })

      console.log(currUserData.$id)

      const statsExist = await appWriteServices.getStats(currUserData.$id)
      if (!statsExist) {
        await appWriteServices.createStat(currUserData.$id)
      }
      navigate('/my-quiz')
    } catch (error) {
      console.log(error)
    }
  }

  const isValidDocumentId = (id) => {
    const regex = /^[a-zA-Z0-9][a-zA-Z0-9\._-]{0,35}$/
    return regex.test(id)
  }

  useEffect(() => {
    setSlug(slugTransform(name))
  }, [questions])

  const slugTransform = useCallback((value) => {
    if (value && typeof value === 'string')
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, '-')
        .replace(/\s/g, '-')
        .substring(0, 36)

    return ''
  }, [])

  return (
    <div>
      <div className='w-full flex flex-col justify-center items-center'>
        <div className='flex'>
          <QuestionInput
            title={'Quiz Name'}
            value={name}
            setValue={setName}
            className={
              'shadow-2xl p-3 outline-none rounded-xl my-3 mx-3 dark:bg-gray-700'
            }
          />
          <QuestionInput
            title={'Quiz Description'}
            value={description}
            setValue={setDescription}
            className={
              'shadow-2xl p-3 outline-none rounded-xl my-3 dark:bg-gray-700'
            }
          />
        </div>
        <div className='shadow-2xl rounded-xl my-10 p-5 px-10 bg-gray-100 dark:bg-gray-900'>
          <div className='flex items-center justify-center'>
            <QuestionInput
              title={'Question'}
              value={question}
              setValue={setQuestion}
              className={' p-3 outline-none rounded-xl my-3 dark:bg-gray-700'}
            />
            <button
              onClick={add}
              className=' p-3 mx-7 bg-slate-400 text-white rounded-lg'
            >
              Add
            </button>
          </div>
          <div className='flex gap-2 '>
            <div className='flex flex-col'>
              <QuestionInput
                title={'Answer'}
                value={answer}
                setValue={setAnswer}
                className={'p-2 outline-none rounded-xl mb-1 dark:bg-green-800'}
              />
              <QuestionInput
                title={'Option 1'}
                value={option1}
                setValue={setOption1}
                className={'p-2 outline-none rounded-xl mb-1 dark:bg-blue-900'}
              />
              <QuestionInput
                title={'Option 2'}
                value={option2}
                setValue={setOption2}
                className={'p-2 outline-none rounded-xl mb-1 dark:bg-blue-900'}
              />
              <QuestionInput
                title={'Option 3'}
                value={option3}
                setValue={setOption3}
                className={'p-2 outline-none rounded-xl mb-1 dark:bg-blue-900'}
              />
              <QuestionInput
                title={'Option 4'}
                value={option4}
                setValue={setOption4}
                className={'p-2 outline-none rounded-xl mb-1 dark:bg-blue-900'}
              />
            </div>
            <div>
              <textarea
                title={'Explanation'}
                value={explnation}
                onChange={(e) => setExplanation(e.target.value)}
                className={
                  'p-3 outline-none rounded-xl h-64 w-80 dark:bg-gray-700'
                }
              />
            </div>
          </div>
        </div>
      </div>

      <div className='w-full flex flex-col justify-center items-center'>
        {questions.map((que) => (
          <div key={que.id} className='w-full'>
            <Question que={que} update={update} handleDelete={handleDelete} />
          </div>
        ))}
      </div>
      <div className='w-full flex justify-center items-center my-6'>
        <button
          onClick={handleSubmit}
          className=' bg-lime-500 text-white p-4 rounded-lg'
        >
          Submit
        </button>
      </div>
    </div>
  )
}

export default PostForm
