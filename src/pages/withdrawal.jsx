import React, { useContext, useState, useRef, useEffect } from "react";
import generateSequence from '@/components/utils/generateSequence'
import useWindowDimensions from '@/components/hooks/useWindowDimensions';
import Link from "next/link";
import axios from 'axios';
import * as Yup from "yup";
import { useFormik } from 'formik';
import Header from "@/components/Header";
import PopupOffline from "@/components/PopupOffline";
import Hint from "@/components/atoms/Hint";
import CryptoInput from "@/components/atoms/CryptoInput";
import { AllContexts } from '@/components/context/Context'
import Button from "@/components/atoms/Button"



import { useSession, signOut, getServerSession, getSession } from "next-auth/react"



import regSignUp from "@/components/utils/regSignUp";

const title = "Вывод средств"
const balanceText = "Для вывода доступно 11.43$"


const itemVariants = {
    open: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
};


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
    },
    {
        id: '5',
        type: 'TRX',
        src: '/images/trx.svg'
    },
    {
        id: '6',
        type: 'XRP',
        src: '/images/xrp.svg'
    },

]


export async function getServerSideProps(ctx) {
    const session = await getSession(ctx)
    console.log(session, "SESSION")
    return {
        props: { session },
    }
}



export default function Withdrawal() {

    const [isOnline, setIsOnline] = useState(true)
    const [submitDelay, setSumbitDelay] = useState(true)
    const [isSchemaValid, setIsSchemaValid] = useState(false) 

    useEffect(() => {
        const timer = setTimeout(() => {
            navigator.onLine ? setIsOnline(true) : setIsOnline(false)
        }, 1000);
        return () => clearTimeout(timer);

    }, [])


    const { data: session, status } = useSession()

    const [width, height] = useWindowDimensions();

    const [amount, setAmount] = useState("")
    const [address, setAddress] = useState("")
    const [isSuccessful, setIsSucessful] = useState(true)

    // socket.on('disconnect',function(){
    //     console.log('user disconnected');  });

    const { currency, setCurrency } = useContext(AllContexts);    const [isOpen, setIsOpen] = useState(false);

    setTimeout(() => {
		submitDelay ? '' : setSumbitDelay(true)
	}, 3000);

    const wrapperRef = useRef(null);

    useOutsideAlerter(wrapperRef);

    function useOutsideAlerter(ref) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setIsOpen(false)
                }
            }
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    const withDrawalFunc = () => {
        const API_KEY = ""
        const headers = {
            'Content-Type': 'application/json',
            "APIKEY": `${process.env.APIKEY}`
        }
        const res = axios.post(`https://app.0xprocessing.com/Api/Withdraw`, {
            headers: headers,
            Currency: currency,
            Amount: amount,
            Address: address,
            ClientId: session?.user?.user?.id,
            ExternalId: "1234",
            Test: true,
            AutoWithDraw: false
        })
        if (res) {
            console.log(res)
        }
    }

    const handleSchemaValue = (addressForm, amountForm) => {
	
        const obj = {
            // username: nameForm,
            address: addressForm,
            amount: amountForm
        }

        // console.log(schema.isValidSync(obj))
    
        setIsSchemaValid(schema.isValidSync(obj))

        }

    const schema = Yup.object({
        address: Yup.string()
                .required('Обязательное поле'),
        amount: Yup.string()
                .required('Обязательное поле')

      })

      const formik = useFormik({
		initialValues: {
		  address: '',
          amount: '',
		},
		validationSchema: schema,
		onSubmit: async function (values) {

		}
	  })


    return (
        <div className={"withdrawal flex" + (width > 800 ? ' items-center justify-center ' : ' items-end ')}>
            {!isOnline && <PopupOffline />}
            {width > 800 ? '' : <Header />}
            {isSuccessful ?
                <div className="withdrawal-container desk-bc cd6 cm4 flex flex-col">
                    <div className="title">
                        <h3 className={width > 800 ? "text-center main-title" : ''}>{title}</h3>
                    </div>
                    <form onSubmit={formik.handleSubmit} className='pl0'>
                    <Hint 
                        hintText={'Выберите криптовалюту и сеть'}
                    />
                    <div className="flex flex-row input-container">
                        <div className="flex flex-row no-wrap crypto-container">
                        <CryptoInput 
                            type="1"
                      list={listOfCurrencies}
                        />
                        <CryptoInput 
                            type="2"
                        />
                        </div>
                    </div>
                        <div className={"input-field relative cb-mid " + (width > 800 ? ' ' : ' ')}>
                            <Hint 
                                hintText={'Введите адрес кошелька'}
                            />
                            <div className="input-container">
                            <input
                                    autoComplete="off"
                                    name="address"
                                    id="address"
                                    type="text"
                                    placeholder=" "
                                    onChange={(e) => {
                                        formik.handleChange(e)
                                        setAddress(e.target.value)
                                        const timer = setTimeout(() => {
                                            handleSchemaValue(e.target.value, formik.values.amount)
                                        }, 100);
                                        return () => clearTimeout(timer);
                                    }}
                                    
                                    value={formik.values.address}

                                />
                            </div>
                        </div>
                        <div className={"input-field relative cb-mid " + (width > 800 ? ' ' : '  ')}>
                            <Hint 
                                hintText={'Сумма вывода (в долларах)'}
                                balanceText={`Для вывода доступно ${session?.user?.user?.balance}$`}
                            />
                            <div className="input-container-sum relative">
                                <input type="hidden" name="test" value="false" />
                                <input
                                    autoComplete="off"
                                    name="amount"
                                    id="amount"
                                    type="text"
                                    onChange={(e) => {
                                        formik.handleChange(e)
                                        setAmount(e.target.value)
                                        const timer = setTimeout(() => {
                                            handleSchemaValue(formik.values.address, e.target.value)
                                        }, 100);
                                        return () => clearTimeout(timer);
                                    }}
                                    value={formik.values.amount}


                                />
                                <div className="dlr absolute">
                                    <svg width="11" height="16" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path opacity="0.69" d="M6.768 2.588H4.302V1.958C4.638 1.91 4.992 1.886 5.364 1.886C5.892 1.886 6.36 1.928 6.768 2.012V2.588ZM4.338 14.108C2.058 13.7 0.804 12.332 0.576 10.004H3.168C3.264 10.7 3.558 11.222 4.05 11.57C4.554 11.906 5.184 12.074 5.94 12.074C6.504 12.074 6.984 11.96 7.38 11.732C7.788 11.504 7.992 11.126 7.992 10.598C7.992 10.214 7.872 9.92 7.632 9.716C7.392 9.5 7.092 9.344 6.732 9.248C6.384 9.152 5.886 9.05 5.238 8.942C4.338 8.798 3.606 8.636 3.042 8.456C2.478 8.264 1.992 7.928 1.584 7.448C1.188 6.956 0.99 6.26 0.99 5.36C0.99 4.28 1.308 3.476 1.944 2.948C2.58 2.42 3.366 2.09 4.302 1.958V0.139999H6.768V2.012C7.74 2.204 8.514 2.606 9.09 3.218C9.678 3.818 10.026 4.658 10.134 5.738H7.542C7.446 5.186 7.2 4.766 6.804 4.478C6.42 4.19 5.94 4.046 5.364 4.046C4.836 4.046 4.392 4.166 4.032 4.406C3.672 4.634 3.492 4.982 3.492 5.45C3.492 5.762 3.6 6.014 3.816 6.206C4.032 6.386 4.308 6.524 4.644 6.62C4.98 6.704 5.448 6.794 6.048 6.89C6.972 7.046 7.728 7.226 8.316 7.43C8.904 7.634 9.414 8 9.846 8.528C10.278 9.044 10.494 9.776 10.494 10.724C10.494 11.864 10.146 12.704 9.45 13.244C8.766 13.772 7.884 14.09 6.804 14.198C6.42 14.222 6.132 14.234 5.94 14.234C5.34 14.234 4.806 14.192 4.338 14.108V13.532H6.804V15.98H4.338V14.108Z" fill="white"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <Hint 
                            hintText={'Комиссия составит 10$'}
                        />
                        <Button 
                            type={1}
                            text={'ВЫВОД'}
                            disabled={submitDelay && isSchemaValid ? false : true}  
                            className={' green ' + (isSchemaValid === true ? "" : "disabled") }
                        />

                        {width > 800 ? <Link href={'/'} className="back-svg">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.40994 6.99994L12.7099 2.70994C12.8982 2.52164 13.004 2.26624 13.004 1.99994C13.004 1.73364 12.8982 1.47825 12.7099 1.28994C12.5216 1.10164 12.2662 0.99585 11.9999 0.99585C11.7336 0.99585 11.4782 1.10164 11.2899 1.28994L6.99994 5.58994L2.70994 1.28994C2.52164 1.10164 2.26624 0.99585 1.99994 0.99585C1.73364 0.99585 1.47824 1.10164 1.28994 1.28994C1.10164 1.47825 0.995847 1.73364 0.995847 1.99994C0.995847 2.26624 1.10164 2.52164 1.28994 2.70994L5.58994 6.99994L1.28994 11.2899C1.19621 11.3829 1.12182 11.4935 1.07105 11.6154C1.02028 11.7372 0.994141 11.8679 0.994141 11.9999C0.994141 12.132 1.02028 12.2627 1.07105 12.3845C1.12182 12.5064 1.19621 12.617 1.28994 12.7099C1.3829 12.8037 1.4935 12.8781 1.61536 12.9288C1.73722 12.9796 1.86793 13.0057 1.99994 13.0057C2.13195 13.0057 2.26266 12.9796 2.38452 12.9288C2.50638 12.8781 2.61698 12.8037 2.70994 12.7099L6.99994 8.40994L11.2899 12.7099C11.3829 12.8037 11.4935 12.8781 11.6154 12.9288C11.7372 12.9796 11.8679 13.0057 11.9999 13.0057C12.132 13.0057 12.2627 12.9796 12.3845 12.9288C12.5064 12.8781 12.617 12.8037 12.7099 12.7099C12.8037 12.617 12.8781 12.5064 12.9288 12.3845C12.9796 12.2627 13.0057 12.132 13.0057 11.9999C13.0057 11.8679 12.9796 11.7372 12.9288 11.6154C12.8781 11.4935 12.8037 11.3829 12.7099 11.2899L8.40994 6.99994Z" fill="white"/>
                            </svg>  
                        </Link> : ''}
                    </form>

                </div>
                :
                <div className="unsuccessful flex flex-col items-center justify-center">
                    <div className="svg mb">
                        <svg width="168" height="167" viewBox="0 0 168 167" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_254_91)">
                                <path d="M144.606 134.226L33.2729 22.8928C32.6241 22.244 31.8539 21.7294 31.0062 21.3783C30.1586 21.0272 29.25 20.8464 28.3325 20.8464C27.415 20.8464 26.5065 21.0272 25.6588 21.3783C24.8111 21.7294 24.0409 22.244 23.3921 22.8928C22.0818 24.2031 21.3457 25.9802 21.3457 27.8332C21.3457 29.6863 22.0818 31.4634 23.3921 32.7737L134.725 144.107C135.372 144.759 136.142 145.277 136.99 145.63C137.838 145.983 138.747 146.165 139.666 146.165C140.584 146.165 141.494 145.983 142.342 145.63C143.19 145.277 143.959 144.759 144.606 144.107C145.258 143.46 145.776 142.691 146.129 141.843C146.483 140.995 146.665 140.085 146.665 139.167C146.665 138.248 146.483 137.338 146.129 136.491C145.776 135.643 145.258 134.873 144.606 134.226Z" fill="#233D50" />
                                <path d="M87.7569 125.668L89.6357 108.828L70.0828 89.0667H48.3032L56.9315 76.1242L46.9115 66.1042L29.5157 92.1284C28.8078 93.1757 28.3985 94.3961 28.3319 95.6585C28.2653 96.9208 28.5439 98.1775 29.1376 99.2935C29.7314 100.409 30.6179 101.343 31.7021 101.993C32.7862 102.643 34.027 102.985 35.2911 102.983H76.2757L70.9178 152.318C70.7449 153.866 71.0966 155.428 71.9167 156.753C72.7368 158.077 73.9777 159.089 75.4407 159.624C76.1991 159.9 76.9997 160.041 77.8065 160.042C78.9463 160.043 80.0691 159.765 81.0761 159.231C82.0832 158.697 82.9436 157.924 83.5819 156.98L105.292 124.485L95.2719 114.465L87.7569 125.668Z" fill="#233D50" />
                                <path d="M80.242 41.3326L78.3633 58.1718L97.9162 77.9334H119.487L110.859 90.8759L120.879 100.896L138.275 74.8718C138.973 73.8391 139.382 72.6377 139.457 71.3931C139.532 70.1485 139.272 68.9066 138.703 67.7971C138.134 66.6877 137.278 65.7514 136.223 65.0864C135.168 64.4214 133.954 64.0519 132.708 64.0168H91.7233L97.0812 14.6822C97.1747 13.1904 96.7853 11.7082 95.9706 10.4549C95.156 9.20168 93.9595 8.24407 92.5583 7.72384C91.1007 7.19433 89.5079 7.16692 88.033 7.64597C86.558 8.12502 85.2853 9.08307 84.417 10.368L62.707 42.5155L72.727 52.5355L80.242 41.3326Z" fill="#233D50" />
                            </g>
                            <defs>
                                <clipPath id="clip0_254_91">
                                    <rect width="167" height="167" fill="white" transform="translate(0.5)" />
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                    <div className="text cm3 mb">
                        <h3 className='text-center'>При выводе средств возникла ошибка</h3>
                    </div>
                    <div className='unsuccessful-btn px0 flex justify-center input-container'>
                        <Link className='' href={"/"}>
                            ПОВТОРИТЬ ПОПЫТКУ
                        </Link>
                    </div>

                </div>
            }


        </div>
    )

}