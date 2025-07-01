import React from 'react'
import './Input.css'
const Input = ({type,placeholder,id,onChange}) => {
  return (
    <div>
      <input type={type} placeholder={placeholder} id={id} onChange={onChange}/>
    </div>
  )
}

export default Input