import React from 'react';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from "yup";
import axios from 'axios';
import { motion } from "framer-motion";
import MaskedInput from "react-text-mask";

import { AllContexts } from '@/components/context/Context'

import { useState, useEffect, useContext } from 'react';

import Button from './Button';
import { isSchema } from 'yup';

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
            .required('Обязательное поле')


  })



const FormN = () => {
    const [togglePopup, setTogglePopup] = useState(false)
  return (
    <div>
      
    </div>
  )
}

export default FormN
