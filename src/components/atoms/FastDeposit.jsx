import React, {useState, useEffect} from 'react';

import { useSession, signOut, getServerSession, getSession } from "next-auth/react"

import CryptoInput from './CryptoInput';

import Button from './Button'
import useWindowDimensions from '@/components/hooks/useWindowDimensions';
import Hint from "@/components/atoms/Hint";

import { useFormik } from 'formik';

function FastDeposit(props) {

  const [amount, setAmount] = useState("")
  
  const [width, height] = useWindowDimensions();

  const { data: session, status } = useSession()

  const listOfCurrencies = [
    {
        id: '0',
        type: 'USDT',
        src: '/images/usdt.svg'
    },
    {
        id: '1',
        type: 'BTC',
        src: '/images/btc.svg'
    },
    {
        id: '2',
        type: 'ETH',
        src: '/images/eth.svg'
    },
    {
        id: '3',
        type: 'BNB',
        src: '/images/bnb.svg'
    },
    {
        id: '4',
        type: 'MATIC',
        src: '/images/matic.svg'
    }
]

  return (
    <>
      <div className="fastDeposit flex flex-row pm mrm mtm justify-between">
        <div className={"input-field relative cb-mid w-full"}>
          <div className="flex flex-row justify-between items-center mb">
            <h3 className='mb0 mrm' style={{lineHeight: 1.2}}>
                Быстрое пополнение
            </h3>
            <Button text={"пополнить"} className={'green mr0'}/>
          </div>
          <div className="flex flex-row no-wrap crypto-container gap10">
              <CryptoInput type={1} list={listOfCurrencies}/>
              <CryptoInput type={2}/>
              <div className={"input-field relative cb-mid " + (width > 800 ? ' ' : ' ')}>
                        <div className="input-container-sum relative flex flex-row items-center justify-end">
                            {/* <input type="hidden" name="test" value="true" /> */}
                            <input type="hidden" name="email" value={session?.user?.user?.email} />
                            <input type="hidden" name="name" value={session?.user?.user?.username} />
                            <input type="hidden" name="ClientId" value={session?.user?.user?.id} />
                            <input type="hidden" name="currency" value={''} />
                            <input type="hidden" name="amount" value={amount} />
                            <input type="hidden" name="MerchantId" value={"0xMR1324227"} />
                            {/* <input type="hidden" name="ReturnUrl" value="true" /> */}
                            <input
                                autoComplete="off"
                                name="amount"
                                id="amount"
                                type="text"
                                onChange={(e) => {
									                  setAmount(e.target.value)
                                    
                                    return () => clearTimeout(timer);
								                }}
                            />
                            <div className="dlr absolute mr">
                                <svg width="11" height="16" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.69" d="M6.768 2.588H4.302V1.958C4.638 1.91 4.992 1.886 5.364 1.886C5.892 1.886 6.36 1.928 6.768 2.012V2.588ZM4.338 14.108C2.058 13.7 0.804 12.332 0.576 10.004H3.168C3.264 10.7 3.558 11.222 4.05 11.57C4.554 11.906 5.184 12.074 5.94 12.074C6.504 12.074 6.984 11.96 7.38 11.732C7.788 11.504 7.992 11.126 7.992 10.598C7.992 10.214 7.872 9.92 7.632 9.716C7.392 9.5 7.092 9.344 6.732 9.248C6.384 9.152 5.886 9.05 5.238 8.942C4.338 8.798 3.606 8.636 3.042 8.456C2.478 8.264 1.992 7.928 1.584 7.448C1.188 6.956 0.99 6.26 0.99 5.36C0.99 4.28 1.308 3.476 1.944 2.948C2.58 2.42 3.366 2.09 4.302 1.958V0.139999H6.768V2.012C7.74 2.204 8.514 2.606 9.09 3.218C9.678 3.818 10.026 4.658 10.134 5.738H7.542C7.446 5.186 7.2 4.766 6.804 4.478C6.42 4.19 5.94 4.046 5.364 4.046C4.836 4.046 4.392 4.166 4.032 4.406C3.672 4.634 3.492 4.982 3.492 5.45C3.492 5.762 3.6 6.014 3.816 6.206C4.032 6.386 4.308 6.524 4.644 6.62C4.98 6.704 5.448 6.794 6.048 6.89C6.972 7.046 7.728 7.226 8.316 7.43C8.904 7.634 9.414 8 9.846 8.528C10.278 9.044 10.494 9.776 10.494 10.724C10.494 11.864 10.146 12.704 9.45 13.244C8.766 13.772 7.884 14.09 6.804 14.198C6.42 14.222 6.132 14.234 5.94 14.234C5.34 14.234 4.806 14.192 4.338 14.108V13.532H6.804V15.98H4.338V14.108Z" fill="white"/>
                                </svg>
                            </div>
                        </div>
                    </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FastDeposit