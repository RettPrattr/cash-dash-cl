import React, { Fragment, useState, useEffect } from "react";
import generateSequence from '@/components/utils/generateSequence'
import useWindowDimensions from '@/components/hooks/useWindowDimensions';
import { motion } from "framer-motion";
import MaskedInput from "react-text-mask";
import Link from "next/link";
import { useNavigate } from "react-router-dom";
// import { API } from "../../constants";
import { setToken } from "@/components/utils/helpers";
import Header from "@/components/Header";

import { useSession, signOut, getServerSession, getSession } from "next-auth/react"



import regSignUp from "@/components/utils/regSignUp";

const title = "История транзакций"


export async function getServerSideProps(ctx) {
    const session = await getSession(ctx)
    console.log(session, "SESSION")
    return {
      props: { session },
    }
  }



export default function History () {

    const [isOnline, setIsOnline] = useState(true)

    const [width, height] = useWindowDimensions();

    useEffect(() => {
        const timer = setTimeout(() => {
          navigator.onLine ? setIsOnline(true) : setIsOnline(false)
            }, 1000);
            return () => clearTimeout(timer);
    
      }, [])

    const { data: session, status } = useSession()

    useEffect(() => {
        const timer = setTimeout(() => {
            // console.log(session, status, "DATA!!!!")
        }, 1000);
        return () => clearTimeout(timer);
    }, [])



    return (
        <div className={"history flex" + (width > 800 ? ' items-center justify-center ' : ' items-end ')}>
            {!isOnline && <PopupOffline/>}
            {width > 800 ? '' : <Header />}
            <div className="history-container desk-bc cd6 cm4 flex flex-col">
                <div className="title">
                    <h3 className={(width > 800 ? "" : " mb0")}>{title}</h3>
                </div>
                <div className="transactions flex flex-col">
                    {session?.user?.user?.transactions ?  
                        session?.user?.user?.transactions?.map((t, i) => {
                            return <div key={i} className={(i % 2 == 0 ? 'dark ' : 'light ') + "flex flex-row justify-between pys flex-wrap"}>
                                <div className="left-side flex flex-col">
                                    <p className="type">{t.type}</p>
                                    <p className="date">{t.date}</p>
                                </div>
                                <div className="right-side flex flex-col">
                                    <div className="sum-container text-right flex justify-end flex-row">
                                        <p className="sum prs">{t.sum}</p>
                                        {t.status === "Подтверждено" ? <span className=" coin greenCoin"></span> : <span className=" coin violentCoin"></span>}
                                    </div>
                                    <p className="status">{t.status}</p>
                                </div>
                                {t.message && <div className="w-full">
                                    <p className="message">{t.message}</p>
                                </div>}
                            </div>
                    }) : <p className="message">У вас нет заверешённых транзакций.</p>

                }
                </div>
                {width > 800 ? <Link href='/' className="back-svg">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.40994 6.99994L12.7099 2.70994C12.8982 2.52164 13.004 2.26624 13.004 1.99994C13.004 1.73364 12.8982 1.47825 12.7099 1.28994C12.5216 1.10164 12.2662 0.99585 11.9999 0.99585C11.7336 0.99585 11.4782 1.10164 11.2899 1.28994L6.99994 5.58994L2.70994 1.28994C2.52164 1.10164 2.26624 0.99585 1.99994 0.99585C1.73364 0.99585 1.47824 1.10164 1.28994 1.28994C1.10164 1.47825 0.995847 1.73364 0.995847 1.99994C0.995847 2.26624 1.10164 2.52164 1.28994 2.70994L5.58994 6.99994L1.28994 11.2899C1.19621 11.3829 1.12182 11.4935 1.07105 11.6154C1.02028 11.7372 0.994141 11.8679 0.994141 11.9999C0.994141 12.132 1.02028 12.2627 1.07105 12.3845C1.12182 12.5064 1.19621 12.617 1.28994 12.7099C1.3829 12.8037 1.4935 12.8781 1.61536 12.9288C1.73722 12.9796 1.86793 13.0057 1.99994 13.0057C2.13195 13.0057 2.26266 12.9796 2.38452 12.9288C2.50638 12.8781 2.61698 12.8037 2.70994 12.7099L6.99994 8.40994L11.2899 12.7099C11.3829 12.8037 11.4935 12.8781 11.6154 12.9288C11.7372 12.9796 11.8679 13.0057 11.9999 13.0057C12.132 13.0057 12.2627 12.9796 12.3845 12.9288C12.5064 12.8781 12.617 12.8037 12.7099 12.7099C12.8037 12.617 12.8781 12.5064 12.9288 12.3845C12.9796 12.2627 13.0057 12.132 13.0057 11.9999C13.0057 11.8679 12.9796 11.7372 12.9288 11.6154C12.8781 11.4935 12.8037 11.3829 12.7099 11.2899L8.40994 6.99994Z" fill="white"/>
                    </svg>  
                </Link> : ''}
            </div>
        </div>
    )


}