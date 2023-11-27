import React from 'react';

function PromoCode(props) {

    return (
        <>
          <div className="promoCode flex flex-row pm mrm mtm justify-between">
            <h3 className='mb0 mrm' style={{lineHeight: 1.2}}>
              Поделись кодом <br/>
              и получи 10$ <br/>
              за каждого друга! <br/>
            </h3>
                <div className="flex flex-col">
                <p className="hint">Твой промокод</p>
                <div className='flex flex-row relative mts w-half'>
                  <div className="inputContainer relative flex flex-row w-fill">
                  <form id="tg" className='pl0'>
                    <div className={"input-field cb-mid "}>
                        <div className="input-container">
                          <input
                              readOnly
                              autoComplete="off"
                              type="text"
                              name="email"
                              id="email"
                              placeholder=" "
                              value="AS76S"
                              // readOnly
                              // onHover={() => {
                              // 	setDisableInput1(false)
                              // }}
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
          </div>
        </>
      )
}

export default PromoCode