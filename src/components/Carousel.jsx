import React, { useState } from 'react'

function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const slides = [
    'https://plus.unsplash.com/premium_photo-1681248156511-200ffb3b66cc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cXVpenxlbnwwfHwwfHx8MA%3D%3D',
    'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cXVpenxlbnwwfHwwfHx8MA%3D%3D',
    'https://media.istockphoto.com/id/1398462038/photo/online-exam-or-test.webp?b=1&s=170667a&w=0&k=20&c=rPmfkbaVJ5zY_WcFe5TV9LfLGaamTIW6F-YGrC1jzmc=',
    'https://media.istockphoto.com/id/1969854518/photo/man-student-in-headphones-and-laptop-for-classroom-education-e-learning-and-studying-or.webp?b=1&s=170667a&w=0&k=20&c=Zvx7t4bdgwNrhWoEE35cPkh5dgyflQfH3Ov3oN6kQWQ=',
    'https://media.istockphoto.com/id/2050489925/photo/blue-question-marks-background-faq-concept.webp?b=1&s=170667a&w=0&k=20&c=GrfZ4Rx4BzlUZ8YTtIyIM3O1dzLz6FaA2HPTytgBe7M=',
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className='mx-10 my-20'>
      <div
        id='default-carousel'
        className='relative w-full'
        data-carousel='slide'
      >
        <div className='relative h-56 overflow-hidden rounded-2xl md:h-96'>
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 duration-700 ease-in-out ${
                index === currentSlide ? '' : 'hidden'
              }`}
            >
              <img src={slide} className='w-full' alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </div>
        <div className='absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse'>
          {slides.map((_, index) => (
            <button
              key={index}
              type='button'
              className={`w-3 h-3 rounded-full ${
                index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
              }`}
              aria-current={index === currentSlide}
              aria-label={`Slide ${index + 1}`}
              onClick={() => setCurrentSlide(index)}
            ></button>
          ))}
        </div>
        <button
          type='button'
          className='absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none'
          onClick={prevSlide}
        >
          <span className='inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none'>
            <svg
              className='w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 6 10'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M5 1 1 5l4 4'
              />
            </svg>
            <span className='sr-only'>Previous</span>
          </span>
        </button>
        <button
          type='button'
          className='absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none'
          onClick={nextSlide}
        >
          <span className='inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none'>
            <svg
              className='w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 6 10'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='m1 9 4-4-4-4'
              />
            </svg>
            <span className='sr-only'>Next</span>
          </span>
        </button>
      </div>
    </div>
  )
}

export default Carousel
