import React from 'react';

function Balance(props) {

      return (
        <>
          <div className="balance rounded relative flex flex-row ps">
            <p className='mrs'>₽</p>
            <p>800.00</p>
            <div className={"rounded icon flex mrs items-center justify-center green shadow-green"}>
                <p><span>+</span></p>
            </div>
          </div>
        </>
      )
}

export default Balance