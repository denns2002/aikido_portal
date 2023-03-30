import { useState } from "react"
import FormInput from "./forms/FormInput"
import { IInputAttributes } from "../models"

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

function SignUp() {
    const [inputsValues, setInputValues] = useState({
        secondName: '',
        firstName:'',
        username:'',
        email:'',
        password: '',
        checkpassword:''
    })

    const [errors, setErrors] = useState({
        secondName: 'Это поле необходимо заполнить!',
        firstName: 'Это поле необходимо заполнить!',
        username:'Это поле необходимо заполнить!',
        email:'Это поле необходимо заполнить!',
        password: 'Это поле необходимо заполнить!',
        checkpassword:'Это поле необходимо заполнить!'
    })

    const [touched, setTouched] = useState({
        secondName: false,
        firstName: false,
        username:false,
        email:false,
        password: false,
        checkpassword:false
    })

    const formInputs: IInputAttributes[] = [
        {
            label: 'Фамилия',
            type: 'text',
            placeholder: 'Фамилия',
            name: 'secondName',
            value: inputsValues.secondName,
            error: errors.secondName,
            required: true,
            touched: touched.secondName
        },
        {
            label: 'Имя',
            type: 'text',
            placeholder: 'Имя',
            name: 'firstName',
            value: inputsValues.firstName,
            error: errors.firstName,
            required: true,
            touched: touched.firstName
        },
        {
            label: 'Логин',
            type: 'text',
            placeholder: 'Логин',
            name: 'username',
            value: inputsValues.username,
            error: errors.username,
            required: true,
            touched: touched.username
        },
        {
            label: 'Почта',
            type: 'email',
            placeholder: 'Почта',
            name: 'email',
            value: inputsValues.email,
            error: errors.email,
            required: true,
            touched: touched.email
        },
        {
            label: 'Пароль',
            type: 'password',
            placeholder: 'Пароль',
            name: 'password',
            value: inputsValues.password,
            error: errors.password,
            required: true,
            touched: touched.password
        },
        {
            label: 'Подвердите пароль',
            type: 'password',
            placeholder: 'Подвердите пароль',
            name: 'checkpassword',
            value: inputsValues.checkpassword,
            error: errors.checkpassword,
            required: true,
            touched: touched.checkpassword
        },
    ]

    function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
        event.preventDefault()

        console.log(inputsValues);
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setInputValues({ ...inputsValues, [event.target.name]: event.target.value })
        if (!event.target.value) {
            setErrors({... errors, [event.target.name]: 'Это поле необходимо заполнить!'})
            return
        } else {
            setErrors({... errors, [event.target.name]: ''})
        }

        if (event.target.name === 'password') {
            if (!event.target.value.match(/[0-9]/g) || !event.target.value.match(/[A-Za-z]/g) || event.target.value.length < 8) {
                setErrors({... errors, [event.target.name]: 'Пароль должен соответствовать требованиям:\n- длина не меньше 8 символов\n- минимум одна буква\n- минимум одна цифра'})
            } else {
                setErrors({... errors, [event.target.name]: ''})
            }
        }
        
        if (event.target.name === 'checkpassword') {
            if (!(event.target.value === inputsValues.password)) {
                setErrors({... errors, [event.target.name]: 'Пароли должны совпадать'})
            } else {
                setErrors({... errors, [event.target.name]: ''})
            }
        }

        if (event.target.name === 'email') {
            if (!(event.target.value.match(emailRegex))) {
                setErrors({... errors, [event.target.name]: 'Введите валидную почту'})
            } else {
                setErrors({... errors, [event.target.name]: ''})
            }
        }
    }

    function handleBlur(event: React.ChangeEvent<HTMLInputElement>) {
        setTouched({...touched, [event.target.name]: true})
    }

    return (
        <div className='flex w-full justify-center items-center'>
            <div className='flex flex-col items-center bg-sky-200 rounded-xl px-8 py-7'>
                <label className='font-bold text-xl'>Регистрация</label>
                <form className='flex flex-col gap-2 mt-5 w-72 items-center' onSubmit={handleSubmit}
                >
                    {formInputs.map((attrs, index) => {
                        return (
                            <FormInput
                                key={index}
                                {...attrs}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />)
                    })}
                    <button className='font-semibold rounded-md p-1 w-52 h-9 mt-3 enabled:hover:bg-sky-500 enabled:bg-sky-400 disabled:bg-sky-100' type='submit' 
                        disabled={!(!errors.secondName && !errors.firstName && !errors.username && !errors.email && !errors.password && !errors.checkpassword)}>
                        Зарегистрироваться
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SignUp
