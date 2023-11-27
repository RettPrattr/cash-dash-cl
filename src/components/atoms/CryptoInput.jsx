import React, { Fragment, useState, useEffect, useContext, useRef } from "react";
import { motion, animate } from "framer-motion";
import useWindowDimensions from '@/components/hooks/useWindowDimensions';
import { AllContexts } from '@/components/context/Context'
import Hint from "./Hint";

const itemVariants = {
	open: {
	  opacity: 1,
	  y: 0,
	  transition: { type: "spring", stiffness: 300, damping: 24 }
	},
	closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
  };

const CryptoInput = (props) => {

    const { type } = props

    const [width, height] = useWindowDimensions();


    const [isOpen, setIsOpen] = useState(false);
    const [display, setDisplay] = useState(true);
    const [list, setList] = useState(props.list)

    const { currency, setCurrency } = useContext(AllContexts);
    const { network, setNetwork } = useContext(AllContexts);


    // if (!props.list) {
    //     switch (currency) {
    //         case 'USDT': list = ['ERC20', 'TRC20', 'BEP20', 'SOL', 'POLYGON']; break;
    //         case 'ETH': list = ['ERC20', 'TRC20', 'BEP20']; break;
    //         case 'BTC': setNetwork('BTC') break;
    //         case 'LTC': list = ['LTC']; break;
    //       }
    // }

    useEffect(() => {
        console.log(display, '- Has changed')
    }, [display])


    useEffect(() => {
        console.log("CURRENCY CHANGED", display)
        if (props.list) { 
            setList(props.list)
            console.log(list, props.list, "LISTTT")
            setDisplay(true)
        } else if (!props.list && currency.type === "USDT") {
            setList(['ERC20', 'TRC20', 'BEP20', 'SOL', 'POLYGON'])
            setDisplay(true)
        } else if (!props.list && currency.type === "ETH") {
            setList(['ERC20', 'TRC20', 'BEP20'])
            setDisplay(true)
        } else if (!props.list && currency.type === "BTC") {
            setNetwork("BTC")
            setDisplay(false)
        } else if (!props.list && currency.type === "LTC") {
            setNetwork("LTC")
            setDisplay(false)
        } else if (!props.list && currency.type === "XRP") {
            setNetwork("XRP")
            setDisplay(false)
        } else if (!props.list && currency.type === "SOL") {
            setNetwork("SOL")
            setDisplay(false)
        } else if (!props.list && currency.type === "MATIC") {
            setNetwork("MATIC")
            setDisplay(false)
        } else if (!props.list && currency.type === "TRX") {
            setNetwork("TRX")
            setDisplay(false)
        } else if (!props.list && currency.type === "BNB") {
            setNetwork("BNB")
            setDisplay(false)
        }
    }, [currency, display])

    

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
    if ( type == 1 )
        {
            return (
                <motion.nav
                    ref={wrapperRef}
                    initial={false}
                    animate={isOpen ? "open" : "closed"}
                    className={"menuVariants menuVar-1"}
                    >

                        
                   
                    <motion.input
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setIsOpen(!isOpen)}
                        value={currency.type}
                        readOnly
                        name="cryptoCurrency"
                        id="cryptoCurrency"
                        className="w-fill"
                        style={{width: '100%'}}
                    />
                    <div className="flex flex-row items-center pr">
                        <div className="svg-container svg-container-coin Coin">
                            {<img src={currency.src}></img>}
                        </div>
                        <motion.div
                            variants={{
                                open: { rotate: 180 },
                                closed: { rotate: 0 }
                            }}
                            className="flex flex-row justify-center items-center svg-container svg-container-arrow"
                            transition={{ duration: 0.2 }}
                            onClick={() => setIsOpen(!isOpen)}
                            >
                                <svg width="21" height="21" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g filter="url(#filter0_b_203_380)">
                                        <rect y="0.5" width="22" height="22" rx="11" fill="white" fill-opacity="0.13" />
                                        <path d="M11.0033 16.5C11.2771 16.5 11.5042 16.3997 11.7179 16.1858L16.7462 11.0377C16.9199 10.8639 17 10.6566 17 10.4093C17 9.90783 16.606 9.5 16.1052 9.5C15.8581 9.5 15.6311 9.60697 15.4508 9.78749L11.01 14.3606L6.55593 9.78749C6.37563 9.60697 6.15526 9.5 5.9015 9.5C5.40067 9.5 5 9.90783 5 10.4093C5 10.6566 5.08681 10.8639 5.26043 11.0377L10.2888 16.1858C10.5025 16.4064 10.7295 16.5 11.0033 16.5Z" fill="white" fill-opacity="0.69" />
                                    </g>
                                    <defs>
                                        <filter id="filter0_b_203_380" x="-54.3656" y="-53.8656" width="130.731" height="130.731" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                            <feGaussianBlur in="BackgroundImageFix" stdDeviation="27.1828" />
                                            <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_203_380" />
                                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_203_380" result="shape" />
                                        </filter>
                                    </defs>
                                </svg>
                        </motion.div>
                    </div>
                    <motion.ul
                        variants={{
                        open: {
                            clipPath: "inset(0% 0% 0% 0% round 10px)",
                            transition: {
                            type: "spring",
                            bounce: 0,
                            duration: 0.7,
                            delayChildren: 0.3,
                            staggerChildren: 0.05
                            }
                        },
                        closed: {
                            clipPath: "inset(10% 50% 90% 50% round 10px)",
                            transition: {
                            type: "spring",
                            bounce: 0,
                            duration: 0.3
                            }
                        }
                        }}
                        style={{ pointerEvents: isOpen ? "auto" : "none" }}
                    >
                        {list?.map((l, i) => {
                            return (
                                <div className="flex flex-row items-center">
                                    <motion.li onClick={() => {setCurrency(l); setIsOpen(false)}} key={l.id + i} id={l.id} variants={itemVariants} className={(i % 2 == 0 ? ' light ' : ' lighter ') + (i === 0 ? ' brt ' : ' ') + (i + 1 === list.length ? ' brb ' : ' ')}>
                                        {l.type}
                                        <img src={l.src} alt={l.type} />
                                    </motion.li>
                                    
                                </div>
                            )
                        })}
                    </motion.ul>
                </motion.nav>
              ) 
        }

    if ( type == 2)
        {
         if (display) {
            return (
                <motion.nav
                    ref={wrapperRef}
                    initial={false}
                    animate={isOpen ? "open" : "closed"}
                    className={"menuVariants" + ' menuVar-2 ' + (display ? ' two-blocks ' : ' ')}
                    >
                    <motion.input
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setIsOpen(!isOpen)}
                        value={network}
                        readOnly
                        name="network"
                        id="network"
                        style={{width: '100%'}}
                    />
                    <div className="flex flex-row items-center pr">
                        <motion.div
                            variants={{
                                open: { rotate: 180 },
                                closed: { rotate: 0 }
                            }}
                            className="flex flex-row justify-center items-center svg-container svg-container-arrow"
                            transition={{ duration: 0.2 }}
                            onClick={() => setIsOpen(!isOpen)}
                            >
                                <svg width="21" height="21" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g filter="url(#filter0_b_203_380)">
                                        <rect y="0.5" width="22" height="22" rx="11" fill="white" fill-opacity="0.13" />
                                        <path d="M11.0033 16.5C11.2771 16.5 11.5042 16.3997 11.7179 16.1858L16.7462 11.0377C16.9199 10.8639 17 10.6566 17 10.4093C17 9.90783 16.606 9.5 16.1052 9.5C15.8581 9.5 15.6311 9.60697 15.4508 9.78749L11.01 14.3606L6.55593 9.78749C6.37563 9.60697 6.15526 9.5 5.9015 9.5C5.40067 9.5 5 9.90783 5 10.4093C5 10.6566 5.08681 10.8639 5.26043 11.0377L10.2888 16.1858C10.5025 16.4064 10.7295 16.5 11.0033 16.5Z" fill="white" fill-opacity="0.69" />
                                    </g>
                                    <defs>
                                        <filter id="filter0_b_203_380" x="-54.3656" y="-53.8656" width="130.731" height="130.731" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                            <feGaussianBlur in="BackgroundImageFix" stdDeviation="27.1828" />
                                            <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_203_380" />
                                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_203_380" result="shape" />
                                        </filter>
                                    </defs>
                                </svg>
                        </motion.div>
                    </div>
                    <motion.ul
                        variants={{
                        open: {
                            clipPath: "inset(0% 0% 0% 0% round 10px)",
                            transition: {
                            type: "spring",
                            bounce: 0,
                            duration: 0.7,
                            delayChildren: 0.3,
                            staggerChildren: 0.05
                            }
                        },
                        closed: {
                            clipPath: "inset(10% 50% 90% 50% round 10px)",
                            transition: {
                            type: "spring",
                            bounce: 0,
                            duration: 0.3
                            }
                        }
                        }}
                        style={{ pointerEvents: isOpen ? "auto" : "none" }}
                    >
                        {list?.map((l, i) => {
                            return (
                                <motion.li onClick={() => {setNetwork(l); setIsOpen(false)}} key={i} id={i} variants={itemVariants} className={(i % 2 == 0 ? ' light ' : ' lighter ') + (i === 0 ? ' brt ' : ' ') + (i + 1 === list.length ? ' brb ' : ' ')}>
                                    {l}
                                </motion.li>
                            )
                        })}
                    </motion.ul>
                </motion.nav>
              ) 
         }
        }
}

export default CryptoInput
