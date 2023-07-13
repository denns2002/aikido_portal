import { FormEvent, useState } from "react"
import { usePatchProfileBySlugMutation
} from "../../store/apis"
import { useNavigate } from "react-router-dom"
import Input from "../forms/Input"
import TextArea from "../forms/TextArea"
import { IInputAttributes } from "../../store/types/components"
import { IRootState } from "../../store/store"
import { connect } from "react-redux"
import { IProfile } from "../../store/types/profiles"

interface EditProfileMeProps {
    profile: IProfile
}

function EditProfileMe({profile}: EditProfileMeProps) {
    const [editProfile, {error}] = usePatchProfileBySlugMutation()

	const navigate = useNavigate()

	const [inputsValues, setInputValues] = useState<IProfile>({
		...profile,
        last_name: profile.last_name ? profile.last_name : "",
        first_name: profile.first_name ? profile.first_name : "",
        mid_name: profile.mid_name ? profile.mid_name : "",
        birth_date: profile.birth_date ? profile.birth_date : "",
    })

	const [touched, setTouched] = useState({
		last_name: false,
		first_name: false,
		mid_name: false,
		birth_date: false,
	})

	const [errors, setErrors] = useState({
		last_name: "",
		first_name: "",
		mid_name: "",
		birth_date: "",
	})

	const formInputs: IInputAttributes[] = [
		{
			label: "Фамилия",
			type: "text",
			placeholder: "last_name",
			name: "last_name",
			value: inputsValues.last_name,
			required: true,
			touched: touched.last_name,
		},
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
			label: "Отчество",
			type: "text",
			placeholder: "mid_name",
			name: "mid_name",
			value: inputsValues.mid_name,
			required: true,
			touched: touched.mid_name,
        },
		{
			label: "Дата рождения",
			type: "date",
			placeholder: "birth_date",
			name: "birth_date",
			value: inputsValues.birth_date,
			required: true,
			touched: touched.birth_date,
        },
	]

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()

		await editProfile({ slug: profile.slug ? profile.slug : "", profile: inputsValues }).unwrap()

		navigate("/profile/me")
	}

	function handleChange(
		event:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement>
	) {
		setInputValues({
			...inputsValues,
			[event.target.name]: event.target.value,
		})

		if (!event.target.value) {
			setErrors({
				...errors,
				[event.target.name]: "Это поле необходимо заполнить!",
			})

			return
		} else {
			setErrors({ ...errors, [event.target.name]: "" })
		}
	}

	function handleBlur(
		event:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement>
	) {
		setTouched({ ...touched, [event.target.name]: true })
	}

	return (
		<div className="relative flex h-full w-full">
			<div className="z-5 border-2 border-sky-700 relative top-0 left-0 bottom-0 right-0 m-auto flex flex-col items-center rounded-xl px-8 py-7">
				<label className="font-bold text-2xl">
					Редактировать профиль
				</label>
				<form
					className="flex flex-col gap-2 mt-6 w-[20rem]"
					onSubmit={handleSubmit}
				>
					<Input
						{...formInputs[0]}
						onChange={handleChange}
						onBlur={handleBlur}
						errors={[errors.last_name]}
					/>  
					<Input
						{...formInputs[1]}
						onChange={handleChange}
						onBlur={handleBlur}
						errors={[errors.first_name]}
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
					<div className="flex flex-col">
						{(errors.last_name && touched.last_name) ||
						(errors.first_name && touched.first_name) ? (
							<span className="text-red-700">
								Заполните все необходимые поля!
							</span>
						) : null}
					</div>
					<div className="peer-pla flex justify-center flex-row gap-4">
						<button
							className="transition-all duration-200 font-semibold rounded-md p-1 w-28 h-9 mt-2 enabled:hover:bg-sky-300 enabled:bg-sky-500 disabled:bg-sky-100 text-white"
							type="submit"
							disabled={!(!errors.last_name && !errors.first_name)}
						>
							Сохранить
						</button>
						<button
							className="transition-all duration-200 font-semibold rounded-md p-1 w-28 h-9 mt-2 hover:bg-slate-300 bg-slate-500 text-white"
							type="button"
							onClick={() => navigate("/profile/me")}
						>
							Отменить
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

function mapStateToProps(state: IRootState) {
    return {
        profile: state.profile.profile
    }
}

export default connect(mapStateToProps, {})(EditProfileMe)
