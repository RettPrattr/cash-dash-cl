import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Context } from '../context/Context';
import Header from '../Header';
import BrandFooter from '../BrandFooter';


export default function Layout({children}) {

    const [headerData, setHeaderData] = useState()
    const [footerData, setFooterData] = useState()
    const [layoutData, setLayoutData] = useState()

//     useEffect(() => {
//         (async () => {
//             const { data } = await axios.get('http://localhost:1337/api/layout?populate=deep').then(result => result.data)

//             setLayoutData(data?.attributes)
//             // setFooterData(footerData?.attributes.Header)
//             // setHeaderData(headerData?.attributes.Header)
//           })()
// }, [])

        return (
            <Context>
                <main>
                    {children}
                </main>
            </Context>
        )
}