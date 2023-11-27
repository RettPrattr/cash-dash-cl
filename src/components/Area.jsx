import React from 'react'

const Area = () => {

    const area = document.getElementById("area")
    const ball = document.getElementById("ball") 
    
    let leftright = Math.floor(Math.random() * 2)
    let right = leftright ? true : false
    let updown = Math.floor(Math.random() * 2)
    let up = updown ? true: false

  return (
    <div id="area" className='Area'>
      <div id="ball" className="Ball"></div>
    </div>
  )
}

export default Area
