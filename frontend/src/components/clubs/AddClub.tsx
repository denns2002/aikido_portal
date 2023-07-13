import { useNavigate, useParams } from "react-router-dom";
import { useGetClubBySlugQuery, usePatchClubBySlugMutation, usePostClubMutation } from "../../store/apis";
import { IClub, IInputAttributes } from "../../store/types";
import { FormEvent, useState } from "react";
import Input from "../forms/Input";
import TextArea from "../forms/TextArea";

function AddClub() {

    const [addClub] = usePostClubMutation()
    const navigate = useNavigate()

    const [inputsValues, setInputValues] = useState<IClub>(
        {
            id: 0,
            name: "",
            info: "",
            slug:"",
            is_active: false,
            addresses: [],
            groups: [],
            photos: []
        }
    )
    const [errors, setErrors] = useState({
            id: 0,
            name: "Это поле необходимо заполнить!",
            info: "Это поле необходимо заполнить!",
            slug:"",
            is_active: false,
            addresses: [],
            groups: [],
            photos: []
    })
    const [touched, setTouched] = useState({
		id: false,
        name: false,
        info: false,
        slug:false,
        is_active: false,
        addresses: false,
        groups: false,
        photos: false
	})

    const formInputs: IInputAttributes[] = [
        {
            label: "Название",
			type: "text",
			placeholder: "name",
			name: "name",
			value: inputsValues.name,
			required: true,
			touched: touched.name,
        },
        {
            label: "Информация",
			type: "text",
			placeholder: "info",
			name: "info",
			value: inputsValues.info,
			required: true,
			touched: touched.info,
        }
    ]

    const [settings, setSettings] = useState(
        {
            is_active: false,
            addresses: [],
            groups: [],
            photos: []
        }
    )

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

        function handleBlur(event: 
            React.ChangeEvent<HTMLInputElement> | 
            React.ChangeEvent<HTMLTextAreaElement>
            ) {
                setTouched({...touched, [event.target.name]: true})    
        }

        async function handleSubmit(event: FormEvent<HTMLFormElement>) {
            event.preventDefault()

            await addClub({
                ...inputsValues,
                name: inputsValues.name, 
                info: inputsValues.info, 
                is_active: settings.is_active}).unwrap()

            navigate(`/clubs`)

        }
    
    return ( 
        <div className="relative my-auto">
            <div className="z-5 border-2 border-sky-700 relative top-0 left-0 bottom-0 right-0 mx-auto flex flex-col items-center rounded-xl px-8 py-7">
                <label className="font-bold text-2xl">
					Создать клуб
				</label>
                <form
					className="flex flex-col gap-2 mt-6 w-[30rem]"
					onSubmit={handleSubmit}
				>
                    <Input 
                        {...formInputs[0]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        errors={[errors.name]}
                    />
                    <TextArea 
                        {...formInputs[1]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        errors={[errors.info]}
                    />
                    <button
                        className={`${
                            settings.is_active
                                ? "bg-green-500 hover:bg-green-300"
                                : "bg-slate-500 hover:bg-slate-300"
                        } flex-1 font-semibold rounded-md p-1 h-9 text-white transition-all duration-200`}
                        type="button"
                        onClick={() => {
                            setSettings((prev) => ({
                                ...prev,
                                is_active: !prev.is_active
                            }))
                        }}
                    >
                        {settings.is_active ? "Клуб активен" : "Клуб не активен"}
                    </button>
                    <div className="">
                        {(errors.name && touched.name) || (errors.info && touched.info) ?
                        (<span className="text-red-700">
                            Заполните все необходимые поля!
                        </span>) : null}
                    </div>
                    <div className="peer-pla flex justify-center flex-row gap-4">
						<button
							className="transition-all duration-200 font-semibold rounded-md p-1 w-28 h-9 mt-2 enabled:hover:bg-sky-300 enabled:bg-sky-500 disabled:bg-sky-100 text-white"
							type="submit"
							disabled={
								!(
									!errors.name &&
                                    !errors.info
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

export default AddClub;