// Render Prop
import React from 'react';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from "yup";
import axios from 'axios';
import { motion } from "framer-motion";
import MaskedInput from "react-text-mask";
import useWindowDimensions from '../hooks/useWindowDimensions';

import { AllContexts } from '@/components/context/Context'

import { useState, useEffect, useContext } from 'react';

import Button from './Button';
import { isSchema } from 'yup';

const styleForm = {
    width: "100%",
    justifyContent: "space-between",
    marginBottom: "50px"
}

const styleInnerInput = {
    margin: "0",
    width: '100%',
    maxWidth: '100%',
    transition: "all 0.2s cubic-bezier(0.55, 0.055, 0.675, 0.19)"
}

const styleInput = {
    display: "inline-block",
    width: '100%',
    maxWidth: '100%',
    height: '35px',
	marginBottom: '40px'
}

const title = 'Зарегистрироваться на день открытых дверей'
const successMessage = 'Заявка успешно отправлена'


// const SignupSchema = Yup.object({
// 		  name: Yup.string()
// 		  .label('Full Name')
// 		  .required(),
//   mobilephone: Yup.number()
// 		  .min(11, 'Минимальное количество символов: 11.')
// 		  .required(),
// })

const phoneNumberMask = [
	"+", "7", " ",
	/[1-9]/,
	/\d/,
	/\d/,
	" ",
	/\d/,
	/\d/,
	/\d/,
	" ",
	/\d/,
	/\d/,
	" ",
	/\d/,
	/\d/
  ];


  const schema = Yup.object({
    name: Yup.string()
            .min(3, 'Минимальное количество символов: 3')
            .required('Обязательное поле'),
    mobilephone: Yup.string()
            .min(16, 'Введите номер полностью')
            .required('Обязательное поле'),
 

  })





const FormС = (props) => {
	const [togglePopup, setTogglePopup] = useState(false)
	const [isSchemaValid, setIsSchemaValid] = useState(false)
	const [disableInput1, setDisableInput1] = useState(true)
	const [disableInput2, setDisableInput2] = useState(true)	
	const [submitDelay, setSumbitDelay] = useState(true)
	const [focused, setFocused] = useState(false)
	const [focused2, setFocused2] = useState(false)
	const onFocus = () => setFocused(true)
	const onFocus2 = () => { setFocused2(true); formik.values.mobilephone= '+7 '  } 
	const onBlur = () => setFocused(false)
	const onBlur2 = () => setFocused2(false)
	const [onBlurOnce1, setOnBlurOnce1] = useState(false)
	const [onBlurOnce2, setOnBlurOnce2] = useState(false)
	const [formData, setFormData] = useState()
    const [choosenItems, setChoosenItems] = useState([''])

    console.log("FORM PROPS", props)

    const {type, firstChoise, secondChoise, firstChoiseSubtitle, secondChoiseSubtitle, firstTextAreaSubtitle, secondTextAreaSubtitle} = props

    const [width, height] = useWindowDimensions();

    const [phonesData, setPhonesData] = useState({})

    const [firstFormChoise, setFirstFormChoise] = useState('')

    const [secondFormChoise, setSecondFormChoise] = useState('')


    // const {currentPage, currentComponent} = useContext(AllContexts) /// ???

	const formik = useFormik({
		initialValues: {
		  name: '',
		  mobilephone: '',
        //   email: '',
		},
		validationSchema: schema,
		onSubmit: function (values) {
			const TOKEN = "6053688346:AAFxpssvCdZY6olrZYed9NVFk0AeSSrnYjM";
			const CHAT_ID = "-1001809937041";
			const URI_API = `https://api.telegram.org/bot${ TOKEN }/sendMessage`;
			let message = `Новая заявка! \n\n<b>Имя:</b> ${values.name} \n<b>Телефон:</b> ${values.mobilephone} \n<b>Ссылка:</b> `;
            console.log('ON SUBMIT')
			axios.post(URI_API,{
				chat_id: CHAT_ID,
				parse_mode: 'html',
				text: message
			})

            // axios.post(STRAPI_API,{
			// 	data: {
			// 		name: values.name,
			// 		phonenumber: values.mobilephone
			// 	}
			// })

            // axios.post(`${process.env.BX24}/crm.lead.add.json?FIELDS[TITLE]=Лид с сайта&FIELDS[NAME]=${values.name}&FIELDS[PHONE][0][VALUE]=${values.mobilephone}`) /// ???

		}
	  })

      useEffect(() => {
		const timer = setTimeout(() => {
			setDisableInput1(false)
			setDisableInput2(false)
		}, 1000);
		return () => clearTimeout(timer);
	}, [])


    const handleSchemaValue = (nameForm, numberForm) => {
	
        const obj = {
            name: nameForm,
            mobilephone: numberForm
        }

        console.log(schema.isValidSync(obj))
    
        setIsSchemaValid(schema.isValidSync(obj))

        }



	setTimeout(() => {
		submitDelay ? '' : setSumbitDelay(true)
	}, 3000);


    // const router = useRouter();
	// const redirectHandler = (c) => {
	// 	if (c === 'CreditStory1') { router.push('https://credistory.ru/rating') }
	// 	else if (c === 'CreditStory2') { router.push('https://nbki.ru/nbki-history/') }
	// 	else { null }
	// } 
    /// ???

    const submitBtnHandler = () => {
		// setRedirect(currentComponent)
		console.log('click')
		setTogglePopup(!togglePopup)
		// redirectHandler(currentComponent)
	}


    const firstChoiseHandler = (el) => {
        // const found = arr1.some(r=> arr.includes(r))

        
        const item = document.getElementById(el)
        
        item.classList.contains("active") ? item.classList.remove("active") : item.classList.add("active")
        
        console.log(el, item)
        // console.log(arr, el, "ARRRRR", arr?.includes(el))

        let arr = choosenItems

        if (arr?.includes(el)) {
            arr = arr.filter(item => item !== el)
            setChoosenItems(arr)
        } else {
            arr.push(el)
            setChoosenItems(arr)
        }
   
        
    }

    const secondChoiseHandler = (el) => {
        const allItemsNL = document.querySelectorAll('.secondChoise')
        const allItemsArr = Array.from(allItemsNL)
        allItemsArr.map((i) => i.classList.remove('active'))
        const item = document.getElementById(el)
        item.classList.contains("active") ? item.classList.remove("active") : item.classList.add("active")
        
        // console.log(arr, el, "ARRRRR", arr?.includes(el))

        // let arr = choosenItems

        // if (arr?.includes(el)) {
        //     arr = arr.filter(item => item !== el)
        //     setChoosenItems(arr)
        // } else {
        //     arr.push(el)
        //     setChoosenItems(arr)
        // }
    }


    if (type === 1) {
        return (
            <div className="flex flex-col form mym container">
              <div className="form-top-text flex flex-col сd8 cm4">
                  <h2>{title}</h2>
              </div>
                <form onSubmit={formik.handleSubmit} id="tg" className='cd3 cm4 pl0'>
                    <div className='input-field relative mb ov-visible mtm'>
                        <div className='input-container w-full relative'>

                            <input
                                disabled={disableInput1}
                                autoComplete="off"
                                type="text"
                                name="name"
                                id="name"
                                placeholder=" "
                                onFocus={(e) => {
                                    onFocus(e)
                                    setDisableInput2(true)
                                }}
                                // onHover={() => {
                                // 	setDisableInput1(false)
                                // }}
                                onChange={(e) => {
                                    formik.handleChange(e)
                                    const timer = setTimeout(() => {
                                        handleSchemaValue(e.target.value, formik.values.mobilephone)
                                    }, 100);
                                    return () => clearTimeout(timer);
                                }
                                }
                                onBlur={(e) => {
                                    onBlur(e)
                                    setDisableInput2(false)
                                    setOnBlurOnce1(true)
                                }}
                                value={formik.values.name}
                            />
                            <label
                                // initial={{x: 0, opacity: 1}}
                                // animate={focused === false && formik.values.name === '' ? '' : animateInput}
                                className={(focused === false && formik.values.name === '' ? 'label' : 'label animate')}
                                htmlFor="name">
                                Имя
                            </label>
                            <br />
                            {formik.errors.name && onBlurOnce1 === true ? (
                                <motion.div
                                    transition={{
                                        duration: .2,
                                        ease: 'easeInOut'
                                    }}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="error-container absolute flex items-center">
                                    <span className='error-message'>{formik.errors.name}</span>
                                </motion.div>
                            ) : ''}
                        </div>
                    </div>
                <div className='input-field relative mbm ov-visible mts'>
                    <div className='input-container w-full relative'>
    
                        <MaskedInput
                            disabled={disableInput2}
                            guide={false}
                            autoComplete="off"
                            mask={phoneNumberMask}
                            type="tel"
                            name="mobilephone"
                            id="mobilephone"
                            placeholder=" "
                            className='mt'
                            onFocus={(e) => {
                                onFocus2(e)
                                setDisableInput1(true)
                            }}
                            onChange={(e) => {
                                formik.handleChange(e)
                                const timer = setTimeout(() => {
                                    handleSchemaValue(formik.values.name, e.target.value)
                                }, 100);
                                return () => clearTimeout(timer);
                            }
                            }
                            onBlur={(e) => {
                                onBlur2(e)
                                setDisableInput1(false)
                                setOnBlurOnce2(true)
                            }}
                            // onBlur={formik.handleBlur} 
                            value={formik.values.mobilephone.replace(/_/g, " ")}
                        />
                        <label 
                            className={(focused2 === false && formik.values.mobilephone === '' ? 'label2 mt' : 'label2 mt animate')}
                            htmlFor="phone">Телефон
                        </label>
                        <br /> 
                        {formik.errors.mobilephone && onBlurOnce2 === true ? (
                            <motion.div 
                                transition={{
                                    duration: .2,
                                    ease: 'easeInOut',
                                    repeatType: 'mirror'
                                }}
                                initial={{opacity: 0, scale: 0.9}}
                                animate={{opacity: 1, scale: 1}}
                                exit={{ opacity: 0 }}
                                className="error-container absolute flex items-center">
                                <span className='error-message'>{formik.errors.mobilephone}</span>
                            </motion.div>
                        ) : ''}
                    </div>
                </div>
                <div className='form-button px0 justify-center'>
                    <button 
                        disabled={submitDelay && isSchemaValid ? false : true}  
                        className={' button ' + (isSchemaValid === true ? "" : "disabled") }
                        onClick={()=>submitBtnHandler()}
                        type='submit'
                    >
                        <a className='py'  onClick={() => console.log('click 111111')}>
                            Оставить заявку
                        </a>
                    </button>
                </div>
                <motion.div
                    className={"flex flex-col popup " + (togglePopup === true ? 'active' : '')}>
                    <div className="popup-container flex flex-col">
                        {isSchemaValid ? <p className=''>{successMessage}</p> : <p className=''>{formData?.data.attributes.rejectionMessage}</p>}
                        <div className='ok-button-container flex justify-end'>
                            <button
                                className='action action--light '
                                onClick={() => setTogglePopup(!togglePopup)}
                            >OK</button>
                        </div>
                    </div>
                </motion.div>
              </form>
            </div>
          );
    }

    if (type === 2) {
        return (
            <form onSubmit={formik.handleSubmit} id="tg" className="cd9 cm4 flex items-center container">
                <div className={"flex flex-col items-center w-full justify-center form-" + type + ""}>
                    <div className={"choise choise-1 mbm flex flex-col cd9 cm4 justify-between" + (width > 800 ? ' ' : ' flex-wrap')}>
                        <div className="mbs subtitle">
                            <p>{firstChoiseSubtitle}</p>
                        </div>
                        <div className={"choise-items flex flex-row flex-wrap" + (width > 800 ? ' justify-between' : ' justify-start')} >
                            {firstChoise.map((c, i) => {
                                return <p id={c.choiseItem} key={i} onClick={() => firstChoiseHandler(c.choiseItem)} className={' firstChoise choise-item' + (width > 800 ? '' : ' mbs mrs')}>{c.choiseItem}</p>
                            })}
                        </div>
                    </div>
                    <div className={"inputs flex mbm justify-between cd9 cm4" + (width > 800 ? ' flex-row' : ' flex-col')}>
                        <div className={"input-field" + (width > 800 ? ' ' : ' mbm')}>
                            <div className="input-container">
                                <input
                                    disabled={disableInput1}
                                    autoComplete="off"
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder=" "
                                    onFocus={(e) => {
                                        onFocus(e)
                                        setDisableInput2(true)
                                    }}
                                    // onHover={() => {
                                    // 	setDisableInput1(false)
                                    // }}
                                    onChange={(e) => {
                                        formik.handleChange(e)
                                        const timer = setTimeout(() => {
                                            handleSchemaValue(e.target.value, formik.values.mobilephone)
                                        }, 100);
                                        return () => clearTimeout(timer);
                                    }
                                    }
                                    onBlur={(e) => {
                                        onBlur(e)
                                        setDisableInput2(false)
                                        setOnBlurOnce1(true)
                                    }}
                                    value={formik.values.name}
                                />
                                <label
                                    // initial={{x: 0, opacity: 1}}
                                    // animate={focused === false && formik.values.name === '' ? '' : animateInput}
                                    className={(focused === false && formik.values.name === '' ? 'label' : 'label animate')}
                                    htmlFor="name">
                                    Имя
                                </label>
                                {formik.errors.name && onBlurOnce1 === true ? (
                                    <motion.div
                                        transition={{
                                            duration: .2,
                                            ease: 'easeInOut'
                                        }}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="error-container absolute flex items-center">
                                        <span className='error-message'>{formik.errors.name}</span>
                                    </motion.div>
                                ) : ''}
                            </div>
                        </div>
                        {/* <div className={"input-field" + (width > 800 ? ' ' : ' mbm')}>
                            <div className="input-container">
                                <input
                                    disabled={disableInput1}
                                    autoComplete="off"
                                    type="text"
                                    name="email"
                                    id="email"
                                    placeholder=" "
                                    onFocus={(e) => {
                                        onFocus(e)
                                        setDisableInput2(true)
                                    }}
                                    // onHover={() => {
                                    // 	setDisableInput1(false)
                                    // }}
                                    onChange={(e) => {
                                        formik.handleChange(e)
                                        // const timer = setTimeout(() => {
                                        //     handleSchemaValue(e.target.value, formik.values.email)
                                        // }, 100);
                                        // return () => clearTimeout(timer);
                                    }
                                    }
                                    onBlur={(e) => {
                                        onBlur(e)
                                        setDisableInput2(false)
                                        setOnBlurOnce1(true)
                                    }}
                                    value={formik.values.email}
                                />
                                <label
                                    // initial={{x: 0, opacity: 1}}
                                    // animate={focused === false && formik.values.name === '' ? '' : animateInput}
                                    className={(focused === false && formik.values.name === '' ? 'label' : 'label animate')}
                                    htmlFor="email">
                                    Email
                                </label>
                                {formik.errors.email && onBlurOnce1 === true ? (
                                    <motion.div
                                        transition={{
                                            duration: .2,
                                            ease: 'easeInOut'
                                        }}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="error-container absolute flex items-center">
                                        <span className='error-message'>{formik.errors.email}</span>
                                    </motion.div>
                                ) : ''}
                            </div>
                        </div> */}
                        <div className="input-field">
                            <div className="input-container">
                                <MaskedInput
                                    disabled={disableInput2}
                                    guide={false}
                                    autoComplete="off"
                                    mask={phoneNumberMask}
                                    type="tel"
                                    name="mobilephone"
                                    id="mobilephone"
                                    placeholder=" "
                                    className=''
                                    onFocus={(e) => {
                                        onFocus2(e)
                                        setDisableInput1(true)
                                    }}
                                    onChange={(e) => {
                                        formik.handleChange(e)
                                        const timer = setTimeout(() => {
                                            handleSchemaValue(formik.values.name, e.target.value)
                                        }, 100);
                                        return () => clearTimeout(timer);
                                    }
                                    }
                                    onBlur={(e) => {
                                        onBlur2(e)
                                        setDisableInput1(false)
                                        setOnBlurOnce2(true)
                                    }}
                                    // onBlur={formik.handleBlur} 
                                    value={formik.values.mobilephone.replace(/_/g, " ")}
                                />
                                <label
                                    className={(focused2 === false && formik.values.mobilephone === '' ? 'label2' : 'label2 animate')}
                                    htmlFor="phone">Телефон
                                </label>
                                <br />
                                {formik.errors.mobilephone && onBlurOnce2 === true ? (
                                    <motion.div
                                        transition={{
                                            duration: .2,
                                            ease: 'easeInOut',
                                            repeatType: 'mirror'
                                        }}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="error-container absolute flex items-center">
                                        <span className='error-message'>{formik.errors.mobilephone}</span>
                                    </motion.div>
                                ) : ''}
                            </div>
                        </div>
                    </div>
                    <div className="message cd9 mbm cm4 flex flex-col">
                        <div className="mbs subtitle">
                            <p>{firstTextAreaSubtitle}</p>
                        </div>
                        <textarea name="message" id="" className='w-full p'></textarea>
                    </div>
                    <div className="choise choise-2 mbm cd9 cm4 flex flex-col justify-between">
                        <div className="mbs subtitle">
                            <p>{secondChoiseSubtitle}</p>
                        </div>
                        <div className={"choise-items flex flex-row flex-wrap" + (width > 800 ? ' justify-between' : ' justify-start')}>
                            {secondChoise.map((c, i) => {
                                return <p key={i} id={c.choiseItem} onClick={() => secondChoiseHandler(c.choiseItem, choosenItems)} className={'secondChoise choise-item' + (width > 800 ? '' : ' mbs mrs')}>{c.choiseItem}</p>
                            })}
                        </div>
                    </div>
                    {/* <div className="question cd9 cm4 mbm flex flex-col">
                        <div className="mbs subtitle">
                            <p>{secondTextAreaSubtitle}</p>
                        </div>
                        <textarea name="question" id="" cols="30" className='w-full p'></textarea>
                    </div> */}
                    <div className='form-button px0 justify-center'
                    onClick={() => console.log('click 11111')}>
                        <button
                            
                            disabled={submitDelay && isSchemaValid ? false : true}
                            className={' ' + (isSchemaValid === true ? "" : "disabled")}
                            onClick={() => console.log('click 22222')}
                            type='submit'
                        >
                            <a className='py' onClick={() => console.log('click 33333')}>
                                Оставить заявку
                            </a>
                        </button>
                    </div>
                </div>
            </form>

        )
    }
}

export default FormС






















