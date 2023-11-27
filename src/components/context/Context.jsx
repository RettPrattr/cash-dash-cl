import React from 'react'

import { createContext, useState } from 'react';

export const AllContexts = createContext([])

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
        type: 'LTC',
        src: '/images/ltc.svg'
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

export function Context({children}) {
    const [popupState, setPopupState] = useState(false)
    const [currentPage, setCurrentPage] = useState('')
    const [currentComponent, setCurrentComponent] = useState('')
    const [phonesData, setPhonesData] = useState([])
    const [user, setUser] = useState()
    const [userSession, setUserSession] = useState("")
    const [currency, setCurrency] = useState(listOfCurrencies[0])
    const [network, setNetwork] = useState("ERC20")

    const setActualUser = (value) => {
        if (value) {
            setUser(value)
        }
    }


    return (
        <AllContexts.Provider value={{
            popupState, setPopupState, 
            currentPage, setCurrentPage, 
            currentComponent, setCurrentComponent,
            phonesData, setPhonesData,
            user, setActualUser,
            currency, setCurrency,
            network, setNetwork
            }}>
            {children}
        </AllContexts.Provider>
    )
}