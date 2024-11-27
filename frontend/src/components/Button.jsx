import React from 'react'

const Button = ({text, addClass, onClick}) => {
  return (
    <button className={`btn btn-accent text-white py-2 px-5 font-bold rounded-badge ${addClass}`} onClick={onClick}>
      {text}
    </button>
  )
}

export default Button