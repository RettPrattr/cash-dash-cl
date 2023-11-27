import React from 'react';

import WinPoint from '@/components/atoms/WinPoint'

function Notify(props) {

    // props.winValue

    /// RICH TEXT 

    return (
        <>
          <div className={'notify flex flex-row rounded align-center items-center '}>
            <div className={"rounded icon flex mrs items-center justify-center " + props.color + ' shadow-' + props.color}>
                {props.color === 'green' ? <p><span>$</span></p> : <p><span>!</span></p>}
            </div>
            <div className='flex flex-row justify-center items-center'>
                {props.text
                    ? <p className='mrs'><span>Авторизуйся</span>, чтобы играть </p>
                    : <p className='mrs'><span>Победа!</span> Вы выиграли <span>300₽</span> на </p>
                }
                {props.winValue && <WinPoint value={props.winValue}/>}
            </div>
          </div>
        </>
      )
}

export default Notify