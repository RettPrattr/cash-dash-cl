import React from 'react'

const Hint = (props) => {


  return (
    <div className='hint flex flex-col'>
      <p className='hint-text mbs'>
        {props.hintText}
      </p>
      {props.balanceText ? <p className="balanceText ">{props.balanceText}</p> : ''}
    </div>
  )
}

export default Hint
