import { useNavigate, useParams } from "react-router-dom";
import { useGetClubBySlugQuery, usePatchClubBySlugMutation, usePostClubMutation, usePostRegisterUserMutation } from "../../store/apis";
import { IClub, IInputAttributes, IUserRegister, monthes } from "../../store/types";
import { FormEvent, useState } from "react";
import Input from "../forms/Input";
import TextArea from "../forms/TextArea";

function UserRegister() {

    const [registerUser] = usePostRegisterUserMutation()
    const navigate = useNavigate()

    const [inputsValues, setInputValues] = useState<IUserRegister>(
        {
            first_name:"",
            last_name: "",
            mid_name: "",
            birth_date: "",
            username: "",
            password: "",
        }
    )
    const [errors, setErrors] = useState({
        first_name:"Это поле необходимо заполнить!",
        last_name: "Это поле необходимо заполнить!",
        mid_name: "",
        birth_date: "",
        username: "",
        password: ""
    })
    const [touched, setTouched] = useState({
		    first_name:false,
            last_name: false,
            mid_name: false,
            birth_date: false,
            username: false,
            password: false
	})

    const formInputs: IInputAttributes[] = [
        {
            label: "Имя",
			type: "text",
			placeholder: "first_name",
			name: "first_name",
			value: inputsValues.first_name,
			required: true,
			touched: touched.first_name,
        },
        {
            label: "Фамилия",
			type: "text",
			placeholder: "last_name",
			name: "last_name",
			value: inputsValues.last_name,
			required: true,
			touched: touched.last_name
        },
        {
            label: "Отчество",
			type: "text",
			placeholder: "mid_name",
			name: "mid_name",
			value: inputsValues.mid_name,
			required: false,
			touched: touched.mid_name
        },
        {
            label: "День рождения",
			type: "date",
			placeholder: "birth_date",
			name: "birth_date",
			value: inputsValues.birth_date,
			required: false,
			touched: touched.birth_date
        }
    ]

    function handleChange(event: 
        React.ChangeEvent<HTMLInputElement> | 
        React.ChangeEvent<HTMLTextAreaElement>) {
            setInputValues({
                ...inputsValues,
                [event.target.name]: event.target.value
            })
            if (!event.target.value) {
                setErrors({
                    ...errors,
                    [event.target.name]: "Это поле необходимо заполнить!"
                })

                return
            } else {
                setErrors({
                    ...errors,
                    [event.target.name]: ""
                })
            }
        }
        
        function getCorrectDate(date: string) {
            const arr = date.split("-")
    
            const time = arr[2].split("T").length > 1 ? arr[2].split("T")[1] : ""
    
            type ObjectKey = keyof typeof monthes
    
            return (
                [
                    time
                        ? arr[2][0] === "0"
                            ? arr[2][1]
                            : arr[2].slice(0, 2)
                        : arr[2][0] === "0"
                        ? arr[2][1]
                        : arr[2],
                    monthes[arr[1] as ObjectKey],
                    arr[0],
                ].join(" ") + (time ? `, ${time.slice(0, 5)}` : "")
            )
        }

        function handleBlur(event: 
            React.ChangeEvent<HTMLInputElement> | 
            React.ChangeEvent<HTMLTextAreaElement>
            ) {
                setTouched({...touched, [event.target.name]: true})    
        }

        async function handleSubmit(event: FormEvent<HTMLFormElement>) {
            event.preventDefault()


            // if (!inputsValues.birth_date) {
            //     setInputValues((prev) => {
            //         delete prev.birth_date

            //         return prev
            //     })
            // }
            console.log(inputsValues)
            await registerUser(inputsValues)
            console.log({registerUser})
            navigate(`/popo`)

        }
    
    return ( 
        <div className="relative my-auto">
            <div className="z-5 border-2 border-sky-700 relative top-0 left-0 bottom-0 right-0 mx-auto flex flex-col items-center rounded-xl px-8 py-7">
                <label className="font-bold text-2xl">
					Создать пользователя
				</label>
                <form autoComplete="off"
					className="flex flex-col gap-2 mt-6 w-[30rem]"
					onSubmit={handleSubmit}
				>
                    <Input 
                        {...formInputs[0]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        errors={[errors.first_name]}
                    />
                    <Input 
                        {...formInputs[1]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        errors={[errors.last_name]}
                    />
                    <Input 
                        {...formInputs[2]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <Input 
                        {...formInputs[3]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <div className="">
                        {(errors.first_name && touched.first_name) || (errors.last_name && touched.last_name) ?
                        (<span className="text-red-700">
                            Заполните все необходимые поля!
                        </span>) : null}
                    </div>
                    <div className=" flex justify-center flex-row gap-4">
						<button
							className="transition-all duration-200 font-semibold rounded-md p-1 w-28 h-9 mt-2 enabled:hover:bg-sky-300 enabled:bg-sky-500 disabled:bg-sky-100 text-white"
							type="submit"
							disabled={
								!(
									!errors.first_name &&
                                    !errors.last_name
								)
							}
						>
							Создать
						</button>
						<button
							className="transition-all duration-200 font-semibold rounded-md p-1 w-28 h-9 mt-2 hover:bg-slate-300 bg-slate-500 text-white"
							type="button"
							onClick={() => navigate(`/clubs`)}
						>
							Отменить
						</button>
					</div>
                </form>
            </div>
        </div>
    );
}

export default UserRegister;