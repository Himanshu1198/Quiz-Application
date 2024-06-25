import React, { useEffect } from 'react'
import Carousel from '../components/Carousel'
import './Home.css'

function Home() {
  useEffect(() => {
    var text1 = document.getElementById('text1')
    var text2 = document.getElementById('text2')
    var newDom1 = ''
    var newDom2 = ''
    var animationDelay = 6

    for (let i = 0; i < text1.innerText.length; i++) {
      newDom1 +=
        '<span class="char">' +
        (text1.innerText[i] == ' ' ? '&nbsp;' : text1.innerText[i]) +
        '</span>'
    }
    for (let i = 0; i < text2.innerText.length; i++) {
      newDom2 +=
        '<span class="char">' +
        (text2.innerText[i] == ' ' ? '&nbsp;' : text2.innerText[i]) +
        '</span>'
    }

    text1.innerHTML = newDom1
    text2.innerHTML = newDom2
    var length1 = text1.children.length
    var length2 = text2.children.length

    for (let i = 0; i < length1; i++) {
      text1.children[i].style['animation-delay'] = animationDelay * i + 'ms'
    }
    for (let i = 0; i < length2; i++) {
      text2.children[i].style['animation-delay'] = animationDelay * i + 'ms'
    }
  }, [])
  return (
    <div>
      <div className='center bg-gray-50 text-black dark:bg-slate-950 dark:text-white '>
        <p id='text1' className='my-7'>
          Quiz Creation Simplified,
        </p>
        <p id='text2'>Analytics Amplified</p>
      </div>
      {/* <div>
        <Carousel />
      </div> */}
    </div>
  )
}

export default Home
