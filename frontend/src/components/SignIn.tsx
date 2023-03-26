import { useState } from "react";
import FormInput from "./forms/FormInput";
import { IInputAttributes } from "../models";

function SignIn() {
    const [inputsValues, setInputValues] = useState({
        username: '',
        password: ''
    })

    const [errors, setErrors] = useState({
        username: 'Это поле необходимо заполнить!',
        password: 'Это поле необходимо заполнить!'
    })

    const [touched, setTouched] = useState({
        username: false,
        password: false
    })

    const formInputs: IInputAttributes[] = [
        {
            label: 'Имя пользователя',
            type: 'text',
            placeholder: 'Логин',
            name: 'username',
            value: inputsValues.username,
            error: errors.username,
            required: true,
            touched: touched.username
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
    }

    function handleBlur(event: React.ChangeEvent<HTMLInputElement>) {
        setTouched({...touched, [event.target.name]: true})
    }

    return (
        <div className='flex w-full justify-center items-center'>
            <div className='flex flex-col items-center bg-sky-200 rounded-xl px-8 py-7'>
                <label className='font-bold text-xl'>Авторизация</label>
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
                    <button className='font-semibold rounded-md p-1 w-52 h-9 mt-3 enabled:hover:bg-sky-500 enabled:bg-sky-400 disabled:bg-sky-100' type='submit' disabled={!(!errors.password && !errors.username)}>Войти</button>
                </form>
            </div>
        </div>
    );
}

export default SignIn;