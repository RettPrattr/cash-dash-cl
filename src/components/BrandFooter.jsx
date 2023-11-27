
import useWindowDimensions from './hooks/useWindowDimensions'
import Button from './atoms/Button.jsx';
import SocialIcons from './atoms/SocialIcons.jsx';
import React from 'react';
import Link from "next/link";
import Image from 'next/image'
import delve from 'dlv';
import findImageUrl from './utils/findImageUrl';


export default function BrandFooter(props){
    const [width] = useWindowDimensions()
    // console.log("BRAND", props)


    const { layoutLinks, BrandFooter } = props.data

    const { title, subtitle, type, logo, policy, phoneNumber, email, address, label, schedule} = BrandFooter

    // console.log(footerLinks)

    function scrollTo() {
        document.getElementById(`contacts`).scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.scrollBy(0, -120);
        console.log("IOOOOOO")
     }

    // const {text, address, phone, info, policy} = props
    // const address = 'Мы на связи 24/7'
    // const phone = 'dmitrii@kapustin.team'
    // const subtitle = 'Ваш надежный партнёр в области разработки'
    // const footerLinks = ['Work', 'About Us', 'Engagements', 'Career', 'Privacy Policy', 'Terms of Service', 'Customer Terms', 'Designer Terms']

    function currentYear() {
        return new Date().getFullYear();
    }

    if (type === 1) {
        return(
            <footer className={"brand-footer bc-fill brand-footer-" + type}> 
            {/* bc-fill убрал временно*/}
                <div className="container">
                    <div className={"footer-top  cd12 justify-between flex w-full " + (width > 800 ? ' flex-row' : ' flex-col items-center')}>
                        <h3 className={width > 800 ? '' : 'w-full text-center'}>{subtitle}</h3>
                        <div className={(width > 800 ? ' ' : 'flex justify-center w-full mbs')}>
                            <Image quality={100} width={1000} className='logo' height={1000} src={findImageUrl(logo, "url")}></Image>
                        </div>
                        <p>{address}</p>
                        <a className='link' href={"tel:" + phoneNumber}>{phoneNumber}</a>
                    </div>
                    <div className="footer-bottom mtm justify-between flex flex-row w-full">
                        <div className={"w-full flex justify-between " + (width > 800 ? ' flex-row items-end' : ' flex-col items-center')}>
                            <p className='cd3 cm4'>{schedule}</p>
                            <div className='cd-s-1'></div>
                            {/* <p className={'cd4 cm4' + (width > 800 ? ' text-center' : ' text-start')}>какая то зунйя</p>  НЕАКТУАЛЬНОЕ */}
                            {/* <div className='cd-s-2'></div>
                            <p className={'cd3 cm4' + (width > 800 ? ' text-right' : ' text-start')}>{currentYear()}, команда Капустина ©</p> */}
                            <a className={'cd4 cm4 link' + (width > 800 ? ' text-center' : ' text-center')}>{policy}</a>
                            {/* <div className='cd-s-2 justify-center flex'></div> */}
                                <Link href='https://kapustin.team' target='_blank' className={"label" + (width > 800 ? ' ' : ' mtm mbs')}>
                                    <img src={findImageUrl(label, "url")} alt="" />
                                </Link>                         
                            </div>
                    </div>
                </div>
            </footer>
        )
    }
    if (type === 2) {
        return(
            <footer className={"brand-footer brand-footer-" + type}>
                <div className="container flex flex-col">
                    <div className={"flex justify-between mbm" + (width > 800 ? '  flex-row' : ' flex-col')}>
                        <div className="flex flex-col cd6 cm4 h-auto">
                            <h2>{title}</h2>
                            <Button 
                                type={1}
                                className='mb'
                                text={phoneNumber}
                                href={`tel:${phoneNumber}`}
                            />
                        </div>
                        <div className={"flex flex-col cd5 cm4 flex-wrap footerLinks " + (width > 800 ? '' : 'mt')}>
                            {layoutLinks?.map((f, i) => {
                                return f.text === "Контакты" ? <p onClick={() => scrollTo()} className={width > 800 ? ' mb' : ' mb'} key={i} href={''}>{f.text}</p> : <Link className={width > 800 ? ' mb' : ' mb'} key={i} href={`${f.href}`}>{f.text}</Link>
                            })}
                        </div>
                    </div>
                    <div className={"flex items-center" + (width > 800 ? ' flex-row justify-between' : ' flex-col-reverse')}>
                        <div className={"flex cd6 cm4 items-center" + (width > 800 ? ' flex-row' : ' flex-col-reverse mt')}>
                            <Image quality={100} width={1000} className={'logo mr ' + (width > 800 ? ' ' : ' mt') } height={1000} src={findImageUrl(logo, "url")} alt={''}></Image>
                            <Link href='https://kapustin.team' target='_blank' className={"label" + (width > 800 ? ' ' : ' mtm mbs')}>
                                <img src={findImageUrl(label, "url")} alt="" />
                            </Link> 
                        </div>
                        <div className={"flex flex-row cd4 cm4" + (width > 800 ? ' ' : ' justify-center mbs')}>
                            <SocialIcons 
                            />
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
    if (type === 3) {
        return(
            <footer className={"brand-footer brand-footer-" + type}> 
            {/* bc-fill убрал временно*/}
                <div className="container">
                    <div className={"footer-top justify-between flex w-full " + (width > 800 ? ' flex-row' : ' flex-col')}>
                        <div className={"left-side cd4 cm4 flex items-start" + (width > 800 ? ' flex-row justify-between' : ' flex-col-reverse justify-center') }>
                            <h3>{title}</h3>
                        </div>
                        <div className={('cd4 cm4 flex justify-center w-full my')}>
                            <Image quality={100} width={1000} className='logo' height={1000} src={findImageUrl(logo, "url")}></Image>
                        </div>
                        <div className={"right-side cd4 cm4 flex items-center " + (width > 800 ? ' flex-row justify-end' : ' flex-col justify-center')}>
                            <Button 
                                type={1}
                                text={phoneNumber}
                                href={`tel:${phoneNumber}`}
                                className={'mr0 mt0'}
                            />
                        </div>
                    </div>
                    <div className="footer-bottom op mtm justify-between flex flex-row w-full">
                        <div className={"w-full flex justify-between items-end" + (width > 800 ? ' flex-row' : ' flex-col')}>
                            <p className='cd3 cm4'>{info}</p>
                            <div className='cd-s-1'></div>
                            {/* <p className={'cd4 cm4' + (width > 800 ? ' text-center' : ' text-start')}>какая то зунйя</p> */}
                            <div className='cd-s-2'></div>
                                <Link href='https://kapustin.team' target='_blank' className={"label" + (width > 800 ? ' ' : ' mtm mbs')}>
                                    <img src={findImageUrl(label, "url")} alt="" />
                                </Link>                        
                            </div>
                    </div>
                </div>
            </footer>
        )
    }
    if (type === 4) {
        return (
            <footer className={"brand-footer bc-fill brand-footer-" + type}> 
            {/* bc-fill убрал временно*/}
                <div className="container">
                    <div className={"footer-top justify-between flex w-full " + (width > 800 ? ' flex-row' : ' flex-col')}>
                        <div className={"logo cd3 cm4 mb"}>
                            <Link href="/">
                                <Image quality={100} width={1000} className={'logo ' + (width > 800 ? ' ' : ' ') } height={1000} src={findImageUrl(logo, "url")} alt={''}></Image>
                            </Link>
                        </div>
                        <div className={"left-links cd3 cm4 col flex flex-col" + (width > 800 ? '' : ' mt')}>
                            {footerLinks?.map((f, i) => {
                                return f.text === "Контакты" ? <p onClick={() => scrollTo()} className={width > 800 ? ' mb' : ' '} key={i} href={''}>{f.text}</p> : <Link className={width > 800 ? ' mb' : ' '} key={i} href={`${f.href}`}>{f.text}</Link>
                            })}
                        </div>
                        <div className={(width > 800 ? "" : " mtm") + " middle-links cd3 cm4 col flex flex-col" }>
                            <a className={width > 800 ? 'mb' : ''} href={"tel:" + phoneNumber}>{phoneNumber}</a>
                            <a className={width > 800 ? 'mb' : ''} href={"mailto:" + email}>{email}</a>
                            <p className={width > 800 ? 'mb' : ''}>{address}</p>
                        </div>
                        <div className={(width > 800 ? "" : " mtm") + " right-links cd3 cm4 col flex flex-col"}>
                            <p className={width > 800 ? 'mb' : ''}>{address}</p>
                            <p className={width > 800 ? 'mb' : ''}>{schedule}</p>
                        </div>
                    </div>
                    <div className={"footer-bottom flex justify-between mtm cd12 cm4" + (width > 800 ? ' flex-row' : ' flex-col')}>
                        <Link href="/" className="policy w-half">
                            {policy}
                        </Link>
                        <Link href='https://kapustin.team' target='_blank' className={"label" + (width > 800 ? ' ' : ' mtm mbs')}>
                            <img src={findImageUrl(label, "url")} alt="" />
                        </Link>
                    </div>
                </div>
            </footer>
        )
    }
}