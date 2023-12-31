import React, {useState} from 'react';

import Button from '@/components/atoms/Button'

function PopupOverlay(props) {

      return (
        <>
            <div className="popupOverlay">
                <div className="close flex justify-center items-center"  onCLick={() => {}}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.226473 8.6205C-0.0734506 8.92042 -0.0795715 9.45294 0.232594 9.76511C0.55088 10.0773 1.0834 10.0712 1.3772 9.77735L5.00076 6.15379L8.61821 9.77123C8.92425 10.0773 9.45065 10.0773 9.76282 9.76511C10.075 9.44682 10.075 8.92655 9.76894 8.6205L6.15149 5.00306L9.76894 1.3795C10.075 1.07346 10.0811 0.547059 9.76282 0.234894C9.45065 -0.0772704 8.92425 -0.0772704 8.61821 0.228774L5.00076 3.84621L1.3772 0.228774C1.0834 -0.0711496 0.544759 -0.0833913 0.232594 0.234894C-0.0795715 0.547059 -0.0734506 1.0857 0.226473 1.3795L3.84392 5.00306L0.226473 8.6205Z" fill="#3C3C43" fill-opacity="0.6"/>
                    </svg>
                </div>
                <div className="content flex flex-col">
                    <h2>Приложение в 1 клик</h2>
                    <p>Мы используем самые современные технологии, поэтому приложение устанавливается моментально!</p>
                    
                    {/* <Button text={'Играть'} color='green' className='mr0 mt w-full'/> */}
                </div>
            </div>
            <div className="overlay" onClick={() => {}}></div>
        </>
      )
}

export default PopupOverlay