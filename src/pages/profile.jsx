import React, { Fragment, useState, useEffect, useContext } from "react";
import generateSequence from '@/components/utils/generateSequence'
import useWindowDimensions from '@/components/hooks/useWindowDimensions';
import MaskedInput from "react-text-mask";
import Link from "next/link";
import { useNavigate } from "react-router-dom";
import { AllContexts } from "@/components/context/Context";
// import { API } from "../../constants";
import { setToken } from "@/components/utils/helpers";
import { motion, animate } from "framer-motion";
import Header from "@/components/Header";
import Layout from "@/components/layouts/Layout"
import { authOptions } from "./api/auth/[...nextauth]";
import Button from "@/components/atoms/Button"
import { useSession, signOut, getServerSession, getSession } from "next-auth/react"


import regSignUp from "@/components/utils/regSignUp";

const title = "Профиль"
const email = "dmitriikapustin@gmail.com"
const password = "abcdefg123"


// export async function getServerSideProps(context) {
//     const session = await getServerSession(authOptions)
//     const user = session?.user;
  
//     if (!user) {
//       return {
//         redirect: {
//           destination: "/",
//           permanent: false,
//         },
//       };
//     }
  
//     return {
//       props: {
//         user,
//       },
//     };
// }


export async function getServerSideProps(ctx) {
    const session = await getSession(ctx)
    console.log(session, "SESSION")
    return {
      props: { session },
    }
  }







export default function Profile (props) {

    const [isOnline, setIsOnline] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
          navigator.onLine ? setIsOnline(true) : setIsOnline(false)
            }, 1000);
            return () => clearTimeout(timer);
    
      }, [])

    const context = useContext(AllContexts);


    const { data: session, status } = useSession()



    useEffect(() => {
        const timer = setTimeout(() => {
            console.log(props, session, status, "DATA!!!!")
        }, 1000);
        return () => clearTimeout(timer);
    }, [])

    const [width, height] = useWindowDimensions();


    const signOutFunc = () => {
        signOut('credentials',
        {
            redirect: true,
            email: '',
            password: '',
            callbackUrl: `${window.location.origin}`
        }
        )
    }

    return (
        <Layout>
            <div className={"profile flex" + (width > 800 ? ' items-center justify-center ' : ' items-end ')}>
                {!isOnline && <PopupOffline/>}
                {width > 800 ? '' : <Header />}
                <div className="profile-container desk-bc cd6 cm4 flex flex-col">
                    <div className="title">
                        <h3 className="text-center">{title}</h3>
                    </div>
                    <form id="tg" className=''>

                        <div className={"input-field cb-mid " + (width > 800 ? ' ' : ' mtm pbs')}>
                            <div className="input-container">
                                <input
                                    autoComplete="off"
                                    type="text"
                                    name="email"
                                    id="email"
                                    placeholder=" "
                                    readOnly
                                    // onHover={() => {
                                    // 	setDisableInput1(false)
                                    // }}
                                    value={session?.user?.user?.email}
                                />
                                <label
                                    // initial={{x: 0, opacity: 1}}
                                    // animate={focused === false && formik.values.name === '' ? '' : animateInput}
                                    className={'label'}
                                    htmlFor="email">
                                    Email
                                </label>
                            </div>
                        </div>
                        <div className={"input-field relative  cb-mid " + (width > 800 ? ' ' : ' mtm pb')}>
                            <div className="input-container">
                                <input
                                    autoComplete="off"
                                    name="password"
                                    id="password"
                                    placeholder=" "
                                    readOnly
                                    // onHover={() => {
                                    // 	setDisableInput1(false)
                                    // }}
                                    value={session?.user?.user?.password}
                                />

                                <label
                                    // initial={{x: 0, opacity: 1}}
                                    // animate={focused === false && formik.values.name === '' ? '' : animateInput}
                                    className={'label'} htmlFor="password">
                                    Пароль
                                </label>
                            </div>
                        </div>
                        {/* <div className='profile-btn main-btn px0 flex justify-center input-container'>
                            <Link className='' href="/signin" onClick={() => { signOutFunc() }}>
                                ВЫЙТИ ИЗ ПРОФИЛЯ
                            </Link>
                        </div> */}
                        <Button 
                            type={2}
                            text={'ВЫЙТИ ИЗ ПРОФИЛЯ'}
                            href="/signin"
                            onClick={() => { signOutFunc() }}
                            className="green"
                        />
                        {/* <p className="cursor-pointer mtm" onClick={() => signOut({
                            callbackUrl: `http://localhost:4000/signin`
                    })}>SIGN OUT</p>
                    <p className="mtm">{isOnline}</p> */}
                        {width > 800 ? <Link href='/' className="back-svg">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.40994 6.99994L12.7099 2.70994C12.8982 2.52164 13.004 2.26624 13.004 1.99994C13.004 1.73364 12.8982 1.47825 12.7099 1.28994C12.5216 1.10164 12.2662 0.99585 11.9999 0.99585C11.7336 0.99585 11.4782 1.10164 11.2899 1.28994L6.99994 5.58994L2.70994 1.28994C2.52164 1.10164 2.26624 0.99585 1.99994 0.99585C1.73364 0.99585 1.47824 1.10164 1.28994 1.28994C1.10164 1.47825 0.995847 1.73364 0.995847 1.99994C0.995847 2.26624 1.10164 2.52164 1.28994 2.70994L5.58994 6.99994L1.28994 11.2899C1.19621 11.3829 1.12182 11.4935 1.07105 11.6154C1.02028 11.7372 0.994141 11.8679 0.994141 11.9999C0.994141 12.132 1.02028 12.2627 1.07105 12.3845C1.12182 12.5064 1.19621 12.617 1.28994 12.7099C1.3829 12.8037 1.4935 12.8781 1.61536 12.9288C1.73722 12.9796 1.86793 13.0057 1.99994 13.0057C2.13195 13.0057 2.26266 12.9796 2.38452 12.9288C2.50638 12.8781 2.61698 12.8037 2.70994 12.7099L6.99994 8.40994L11.2899 12.7099C11.3829 12.8037 11.4935 12.8781 11.6154 12.9288C11.7372 12.9796 11.8679 13.0057 11.9999 13.0057C12.132 13.0057 12.2627 12.9796 12.3845 12.9288C12.5064 12.8781 12.617 12.8037 12.7099 12.7099C12.8037 12.617 12.8781 12.5064 12.9288 12.3845C12.9796 12.2627 13.0057 12.132 13.0057 11.9999C13.0057 11.8679 12.9796 11.7372 12.9288 11.6154C12.8781 11.4935 12.8037 11.3829 12.7099 11.2899L8.40994 6.99994Z" fill="white"/>
                            </svg>  
                        </Link> : ''}
                    </form>
                </div>
            </div>
        </Layout>
    )

}