import React, { Fragment, useState, useEffect, useContext } from "react";
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from "yup";
import axios from 'axios';
import { motion } from "framer-motion";
import useWindowDimensions from '@/components/hooks/useWindowDimensions';
import Link from "next/link";
import { setToken } from "@/components/utils/helpers";
import Button from "@/components/atoms/Button"
import { getProviders, signIn } from "next-auth/react"
import { getServerSession } from "next-auth"
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { useSession, signOut } from "next-auth/react"
import { AllContexts } from "@/components/context/Context";

import generateSequence from "@/components/utils/generateSequence";



const title = "Регистрация"


export default function SignUp() {

    const [isOnline, setIsOnline] = useState(true)


    const [togglePopup, setTogglePopup] = useState(false)
    const [isSchemaValid, setIsSchemaValid] = useState(false)
    const [disableInput1, setDisableInput1] = useState(true)
    const [disableInput2, setDisableInput2] = useState(true)
    const [disableInput3, setDisableInput3] = useState(true)
    const [submitDelay, setSumbitDelay] = useState(true)
    const [focused, setFocused] = useState(false)
    const [focused2, setFocused2] = useState(false)
    const [focused3, setFocused3] = useState(false)
    const onFocus = () => setFocused(true)
    const onFocus2 = () => setFocused2(true)
    const onFocus3 = () => setFocused3(true)
    const onBlur = () => setFocused(false)
    const onBlur2 = () => setFocused2(false)
    const onBlur3 = () => setFocused3(false)
    const [onBlurOnce1, setOnBlurOnce1] = useState(false)
    const [onBlurOnce2, setOnBlurOnce2] = useState(false)
    const [onBlurOnce3, setOnBlurOnce3] = useState(false)
    const [formData, setFormData] = useState()
    const [message, setMessage] = useState('')


    const [passwordType, setPasswordType] = useState("password");
    const [showPassword, setShowPassword] = useState(false)

    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }


    useEffect(() => {
        const timer = setTimeout(() => {
          navigator.onLine ? setIsOnline(true) : setIsOnline(false)
            }, 1000);
            return () => clearTimeout(timer);
    
      }, [])


    const { user, setActualUser } = useContext(AllContexts);

    const { data: session, status } = useSession()

    useEffect(() => {
        // const timer = setTimeout(() => {
        //     console.log(session, status, "DATA")
        // }, 1000);
        // return () => clearTimeout(timer);
    }, [user])

    const handleUser = (arg) => {
        setActualUser(arg)
        // console.log("HANDLE", arg, user)
    }

    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState("");

    const [width, height] = useWindowDimensions();


    const schema = Yup.object({
        username: Yup.string()
            .min(3, 'Минимальное количество символов: 3')
            .required('Обязательное поле'),
        email: Yup.string().email('Введите корректный адрес')
            .min(6, 'Минимальное количество символов: 6')
            .required('Обязательное поле'),
        password: Yup.string()
            .min(8, 'Слишком короткий пароль')
            .required('Обязательное поле')

    })


    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            email: '',
        },
        validationSchema: schema,
        onSubmit: async function (values) {
            const res = await signIn('credentials', {
                redirect: false,
                username: values.username,
                email: values.email,
                password: values.password,
                callbackUrl: `${window.location.origin}`,
            });
            if (res?.error) {
                setError(res.error);
            } else {
                setError(null);
            }
            if (res.url) setMessage("smth happening")

            try {
                const response = await fetch(`${process.env.API_LINK}/api/auth/local/register`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                });

                const data = await response.json();
                if (data?.error) {
                    setMessage(`${data?.error.message}`)
                    throw data?.error;
                } else {
                    // set the token
                    setToken(data.jwt);

                    // set the user
                    handleUser(data.user);

                    //   message.success(`Welcome to Social Cards ${data.user.username}!`);


                    setMessage(`Welcome to casino, ${data.user.username}`)


                    // const timer = setTimeout(() => {
                    //     console.log(session, status, data.jwt, data.user, user, "JJJWWWWW")
                    // }, 2000);
                    // return () => clearTimeout(timer);

                    //   navigate("/profile", { replace: true });
                }
            } catch (error) {
                console.error(error);
                setError(error?.message ?? "Something went wrong!");
            } finally {
                setIsLoading(false);
            }

        }
    })

    useEffect(() => {
        const timer = setTimeout(() => {
            setDisableInput1(false)
            setDisableInput2(false)
            setDisableInput3(false)
        }, 1000);
        return () => clearTimeout(timer);
    }, [])


    const handleSchemaValue = (nameForm, passwordForm, emailForm) => {

        const obj = {
            username: nameForm,
            password: passwordForm,
            email: emailForm
        }

        // console.log(schema.isValidSync(obj))

        setIsSchemaValid(schema.isValidSync(obj))

    }



    setTimeout(() => {
        submitDelay ? '' : setSumbitDelay(true)
    }, 3000);

 
    return (
        <div className={"image-bc flex signup" + (width > 800 ? ' items-center justify-center ' : ' items-end ')}>
            {!isOnline && <PopupOffline />}
            <div className="flex flex-col desk-bc form cd6 cm4 w-full">
                <div className="form-top-text flex flex-col justify-center w-full">
                    <h3 className="text-center mys main-title">{title}</h3>
                </div>
                <form onSubmit={formik.handleSubmit} id="tg" className='pl0'>
                    <div className={'input-field relative cb-mid ov-visible ' + (width > 800 ? ' ' : ' mtm pbs')}>
                        <div className='input-container'>

                            <input
                                disabled={disableInput1}
                                autoComplete="off"
                                type="text"
                                name="username"
                                id="username"
                                placeholder=" "
                                onFocus={(e) => {
                                    onFocus(e)
                                    setDisableInput2(true)
                                    setDisableInput3(true)
                                }}
                                onChange={(e) => {
                                    formik.handleChange(e)
                                    const timer = setTimeout(() => {
                                        handleSchemaValue(e.target.value, formik.values.password, formik.values.email)
                                    }, 100);
                                    return () => clearTimeout(timer);
                                }
                                }
                                onBlur={(e) => {
                                    onBlur(e)
                                    setDisableInput2(false)
                                    setDisableInput3(false)
                                    setOnBlurOnce1(true)
                                }}
                                value={formik.values.username}
                            />
                            <label
                                className={(focused === false && formik.values.username === '' ? 'label' : 'label animate')}
                                htmlFor="username">
                                Username
                            </label>
                            <br />
                        </div>
                        {formik.errors.username && onBlurOnce1 === true ? (
                            <motion.div
                                transition={{
                                    duration: .2,
                                    ease: 'easeInOut'
                                }}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="error-container flex items-center">
                                <span className='error-message'>{formik.errors.username}</span>
                            </motion.div>
                        ) : ''}
                    </div>
                    <div className={"input-field cb-mid " + (width > 800 ? ' ' : ' mtm pbs')}>
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

                                onChange={(e) => {
                                    formik.handleChange(e)
                                    const timer = setTimeout(() => {
                                        handleSchemaValue(formik.values.username, formik.values.password, e.target.value)
                                    }, 100);
                                    return () => clearTimeout(timer);
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
                                className={(focused === false && formik.values.email === '' ? 'label' : 'label animate')}
                                htmlFor="email">
                                Введите email
                            </label>
                        </div>
                        {formik.errors.email && onBlurOnce1 === true ? (
                            <div

                                className="error-container flex items-center cb-mid">
                                <span className='error-message'>{formik.errors.email}</span>
                            </div>
                        ) : ''}
                    </div>
                    <div className={"input-field relative cb-mid " + (width > 800 ? ' mr' : ' ')}>
                        <div className="input-container">
                            <input
                                disabled={disableInput2}
                                autoComplete="none"
                                type={passwordType}
                                name="password"
                                id="password"
                                placeholder=" "
                                onFocus={(e) => {
                                    onFocus2(e)
                                    setDisableInput1(true)
                                }}
                                // onHover={() => {
                                // 	setDisableInput1(false)
                                // }}
                                onChange={(e) => {
                                    formik.handleChange(e)
                                    const timer = setTimeout(() => {
                                        handleSchemaValue(formik.values.username, e.target.value, formik.values.email)
                                    }, 100);
                                    return () => clearTimeout(timer);
                                }
                                }
                                onBlur={(e) => {
                                    onBlur2(e)
                                    setDisableInput1(false)
                                    setOnBlurOnce2(true)
                                }}
                                value={formik.values.password}
                            />
                            <div className="eye-off" onClick={() => {togglePassword(); setShowPassword(!showPassword)}}>
                                {!showPassword ?                                 
                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g opacity="0.5" clip-path="url(#clip0_142_365)">
                                        <path d="M12 14C12.8284 14 13.5 13.3284 13.5 12.5C13.5 11.6716 12.8284 11 12 11C11.1716 11 10.5 11.6716 10.5 12.5C10.5 13.3284 11.1716 14 12 14Z" fill="white" />
                                        <path d="M15.2901 18.6201L14.0001 17.2801L13.9301 17.2101L12.6601 15.9401C12.4585 15.9754 12.2546 15.9955 12.0501 16.0001C11.5863 16.0067 11.1257 15.9211 10.6953 15.7482C10.2649 15.5753 9.87313 15.3185 9.54281 14.9928C9.21249 14.6672 8.9502 14.2791 8.77119 13.8512C8.59218 13.4232 8.50002 12.964 8.50007 12.5001C8.50471 12.2956 8.52476 12.0917 8.56007 11.8901L6.56007 9.89012L5.00007 8.37012C3.87139 9.43359 2.90448 10.6566 2.13007 12.0001C2.0423 12.1521 1.99609 12.3246 1.99609 12.5001C1.99609 12.6757 2.0423 12.8481 2.13007 13.0001C2.76007 14.0901 6.13007 19.5001 12.0201 19.5001H12.2701C13.3776 19.4673 14.4708 19.2405 15.5001 18.8301L15.2901 18.6201Z" fill="white" />
                                        <path d="M8.59 6.26012L11.39 9.06012C11.5915 9.02481 11.7954 9.00475 12 9.00012C12.9283 9.00012 13.8185 9.36887 14.4749 10.0252C15.1313 10.6816 15.5 11.5719 15.5 12.5001C15.4954 12.7047 15.4753 12.9086 15.44 13.1101L18.12 15.7901L18.96 16.6301C20.1028 15.5694 21.0834 14.3463 21.87 13.0001C21.9578 12.8481 22.004 12.6757 22.004 12.5001C22.004 12.3246 21.9578 12.1521 21.87 12.0001C21.23 10.8901 17.71 5.32012 11.73 5.50012C10.6225 5.53297 9.52924 5.75974 8.5 6.17012L8.59 6.26012Z" fill="white" />
                                        <path d="M20.7102 19.7899L19.4102 18.4999L17.4102 16.4999L7.89019 6.96994L6.42019 5.49994L4.71019 3.78994C4.61695 3.6967 4.50626 3.62274 4.38443 3.57228C4.26261 3.52182 4.13204 3.49585 4.00019 3.49585C3.86833 3.49585 3.73776 3.52182 3.61594 3.57228C3.49411 3.62274 3.38342 3.6967 3.29019 3.78994C3.10188 3.97825 2.99609 4.23364 2.99609 4.49994C2.99609 4.76624 3.10188 5.02164 3.29019 5.20994L5.53019 7.49994L7.28019 9.19994L14.5902 16.4999L14.6602 16.5699L16.0002 17.9099L16.5902 18.4999L19.2902 21.2099C19.3831 21.3037 19.4937 21.3781 19.6156 21.4288C19.7375 21.4796 19.8682 21.5057 20.0002 21.5057C20.1322 21.5057 20.2629 21.4796 20.3848 21.4288C20.5066 21.3781 20.6172 21.3037 20.7102 21.2099C20.8039 21.117 20.8783 21.0064 20.9291 20.8845C20.9798 20.7627 21.006 20.632 21.006 20.4999C21.006 20.3679 20.9798 20.2372 20.9291 20.1154C20.8783 19.9935 20.8039 19.8829 20.7102 19.7899Z" fill="white" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_142_365">
                                            <rect width="24" height="24" fill="white" transform="translate(0 0.5)" />
                                        </clipPath>
                                    </defs>
                                </svg> : 
                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g opacity="0.5" clip-path="url(#clip0_215_362)">
                                    <path d="M12 14C12.8284 14 13.5 13.3284 13.5 12.5C13.5 11.6716 12.8284 11 12 11C11.1716 11 10.5 11.6716 10.5 12.5C10.5 13.3284 11.1716 14 12 14Z" fill="white"/>
                                    <path d="M21.8701 12.0001C21.2301 10.8901 17.7101 5.32012 11.7301 5.50012C6.20007 5.64012 3.00007 10.5001 2.13007 12.0001C2.0423 12.1521 1.99609 12.3246 1.99609 12.5001C1.99609 12.6757 2.0423 12.8481 2.13007 13.0001C2.76007 14.0901 6.13007 19.5001 12.0201 19.5001H12.2701C17.8001 19.3601 21.0101 14.5001 21.8701 13.0001C21.9578 12.8481 22.004 12.6757 22.004 12.5001C22.004 12.3246 21.9578 12.1521 21.8701 12.0001V12.0001ZM12.0001 16.0001C11.3078 16.0001 10.6311 15.7948 10.0556 15.4103C9.48 15.0257 9.0314 14.479 8.76649 13.8395C8.50158 13.2 8.43227 12.4962 8.56732 11.8173C8.70237 11.1384 9.03571 10.5147 9.52519 10.0252C10.0147 9.53576 10.6383 9.20242 11.3173 9.06737C11.9962 8.93232 12.6999 9.00163 13.3395 9.26654C13.979 9.53144 14.5256 9.98005 14.9102 10.5556C15.2948 11.1312 15.5001 11.8079 15.5001 12.5001C15.5001 13.4284 15.1313 14.3186 14.4749 14.975C13.8186 15.6314 12.9283 16.0001 12.0001 16.0001V16.0001Z" fill="white"/>
                                    </g>
                                    <defs>
                                    <clipPath id="clip0_215_362">
                                    <rect width="24" height="24" fill="white" transform="translate(0 0.5)"/>
                                    </clipPath>
                                    </defs>
                                </svg>
                                }

                                
                            </div>
                            <label
                                className={(focused2 === false && formik.values.password === '' ? 'label' : 'label animate')}
                                htmlFor="password">
                                Придумайте пароль
                            </label>
                        </div>
                        {formik.errors.password && onBlurOnce2 === true ? (
                            <motion.div
                                transition={{
                                    duration: .2,
                                    ease: 'easeInOut'
                                }}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="error-container flex items-center cb-mid">
                                <span className='error-message'>{formik.errors.password}</span>
                            </motion.div>
                        ) : ''}
                    </div>
                    <Button 
                        type={1}
                        text={'ЗАРЕГИСТРИРОВАТЬСЯ'}
                        disabled={submitDelay && isSchemaValid ? false : true}  
                        className={' green pb ' + (isSchemaValid === true ? "" : "disabled") }
                    />
                    <motion.div
                        className={"flex flex-col popup " + (togglePopup === true ? 'active' : '')}>
                        <div className="popup-container flex flex-col">
                            {isSchemaValid ? <p className=''>OK</p> : <p className=''>{formData?.data.attributes.rejectionMessage}</p>}
                            <div className='ok-button-container flex justify-end'>
                                <button
                                    className='action action--light '
                                    onClick={() => setTogglePopup(!togglePopup)}
                                >OK</button>
                            </div>
                        </div>
                    </motion.div>

                </form>
                {width > 800 ? <Link href='/' className="back-svg">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.40994 6.99994L12.7099 2.70994C12.8982 2.52164 13.004 2.26624 13.004 1.99994C13.004 1.73364 12.8982 1.47825 12.7099 1.28994C12.5216 1.10164 12.2662 0.99585 11.9999 0.99585C11.7336 0.99585 11.4782 1.10164 11.2899 1.28994L6.99994 5.58994L2.70994 1.28994C2.52164 1.10164 2.26624 0.99585 1.99994 0.99585C1.73364 0.99585 1.47824 1.10164 1.28994 1.28994C1.10164 1.47825 0.995847 1.73364 0.995847 1.99994C0.995847 2.26624 1.10164 2.52164 1.28994 2.70994L5.58994 6.99994L1.28994 11.2899C1.19621 11.3829 1.12182 11.4935 1.07105 11.6154C1.02028 11.7372 0.994141 11.8679 0.994141 11.9999C0.994141 12.132 1.02028 12.2627 1.07105 12.3845C1.12182 12.5064 1.19621 12.617 1.28994 12.7099C1.3829 12.8037 1.4935 12.8781 1.61536 12.9288C1.73722 12.9796 1.86793 13.0057 1.99994 13.0057C2.13195 13.0057 2.26266 12.9796 2.38452 12.9288C2.50638 12.8781 2.61698 12.8037 2.70994 12.7099L6.99994 8.40994L11.2899 12.7099C11.3829 12.8037 11.4935 12.8781 11.6154 12.9288C11.7372 12.9796 11.8679 13.0057 11.9999 13.0057C12.132 13.0057 12.2627 12.9796 12.3845 12.9288C12.5064 12.8781 12.617 12.8037 12.7099 12.7099C12.8037 12.617 12.8781 12.5064 12.9288 12.3845C12.9796 12.2627 13.0057 12.132 13.0057 11.9999C13.0057 11.8679 12.9796 11.7372 12.9288 11.6154C12.8781 11.4935 12.8037 11.3829 12.7099 11.2899L8.40994 6.99994Z" fill="white"/>
                    </svg>  
                </Link> : ''}
            </div>
        </div>

    );
}