import React from 'react'

const Button = ({text, addClass}) => {
  return (
    <button className={`py-2 px-5 font-bold rounded-badge ${addClass}`}>
      {text}
    </button>
  )
}

export default Button