import React, {useState, useEffect} from 'react';
import Button from '@/components/atoms/Button'

import startPlay from '@/components/atoms/Play'

import axios from 'axios';

function BetInput(props) {

  const [bet, setBet] = useState(10)

  const handleInput = (e) => {
    var b = e.target.value.replace(/\s+/g, '')
    if (b.match(/^(\d*\.{0,1}\d{0,2}$)/)) {
      if (parseInt(b) > 10000) { setBet('10 000') } else {
        if(b.toString().slice(0,1) == 0 && b.toString().slice(1,2) > 0) {
          setBet(b.toString().slice(1, b.length))
        } else {
          setBet(b?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ").replace(/,/g, '.'))
        }
      }
      
    }

    console.log(bet)
  }

  const handleChanger = (e) => {
    var p = bet.toString().replace(/\s+/g, '')
    var b = parseFloat(p) * e
    if (b.toFixed(2).toString().match(/^(\d*\.{0,1}\d{0,2}$)/)) {
      parseInt(b) > 10000 ? setBet('10 000')
        : setBet(parseFloat(b).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "))
    }
    
  }

  // document && setInterval(()=> startPlay(), 1000)



      return (
        <>
          <div className='flex flex-row relative betInput mt mx w-fill'>
            <div className="inputContainer relative flex flex-row w-fill">
              <div className="fakeInput absolute flex flex-row">
                  <div className="afterInput">$</div>
                  <div className="resetInput">{bet}</div>
							</div>
              <div className="betChanger z-100 flex flex-row items-center">
                <div onClick={() => handleChanger(0.5)} className="option relative">1/2</div>
                <div onClick={() => handleChanger(2)} className="option relative">x2</div>
              </div>
              <div className="back"></div>
              <input 
                type="text" 
                value={bet} 
                className={'w-full'}
                onChange={(e) => handleInput(e)}
                autoComplete="off"
              />
            </div>
            <div className={'z-100 flex flex-row'} onClick={startPlay}>
              <Button text={'Играть'} className='green mr0'/>
            </div>
          </div>
        </>
      )
}

export default BetInput