import React from 'react';
import Tabs from '@/components/atoms/Tabs'
import Button from '@/components/atoms/Button'
import UsersCounter from '@/components/atoms/UsersCounter'
import BetInput from '@/components/atoms/BetInput'
import Notify from '@/components/atoms/Notify'
import Balance from '@/components/atoms/Balance'
import GameArea from '@/components/atoms/GameArea'
import PopupOverlay from '@/components/atoms/PopupOverlay'

import startPlay from '@/components/atoms/Play'
// WinPoint


import useWindowDimensions from '@/components/hooks/useWindowDimensions'


import PromoCode from '@/components/atoms/PromoCode'
import FastDeposit from '@/components/atoms/FastDeposit'
  

function Components(props) {

  const [width] = useWindowDimensions()

      return (
        <>
        <div 
          // className='image-bc'
        >
          {/* <Notify color='green' winValue={3}/>
          <Notify color='violent' text={'dad'}/> */}
          <div className="header">
            <Balance />
          </div>
        </div>
        <div className={"wrapper " + (width > 800 && 'flex flex-row no-wrap')}>
          {/* <Tabs /> */}
          {width > 800 &&
            <div className='pcLeft w-full relative mtl ov-hidden flex flex-col justify-between'>
              <UsersCounter />
              <div className="flex flex-col">
                <FastDeposit />
                <PromoCode />
              </div>
            </div>
          }
          {width <= 800 &&
            <UsersCounter />
          }

          <div className="gameBlock flex flex-col relative items-center">
          {/* <Notify color='green' winValue={3}/>
          <Notify color='violent' text={'dad'}/> */}
            <GameArea />
            <BetInput />
          </div>
        </div>
        </>
      )
}

export default Components