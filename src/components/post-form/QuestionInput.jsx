import React from 'react'

function QuestionInput({ title, value, setValue, className }) {
  return (
    <input
      type='text'
      placeholder={title}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className={className}
    />
  )
}

export default QuestionInput
