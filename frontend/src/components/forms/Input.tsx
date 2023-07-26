import React from "react"

interface InputProps {
	label: string
	type: string
	placeholder: string
	name: string
	value?: string
	errors?: string[]
	required: boolean
	touched?: boolean
	disabled?: boolean
	onChange(event: React.ChangeEvent<HTMLInputElement>): void
	onBlur?(event: React.ChangeEvent<HTMLInputElement>): void
}

function Input({ label, errors, touched, disabled, ...inputProps }: InputProps) {
	const filterdErrors = errors?.filter((element) => {
		return element
	})

	return (
		<div className="w-full relative">
			<input
				{...inputProps}
				id={inputProps.name}
				disabled={disabled}
				className={`p-1 h-12 mt-2 peer transition-all placeholder-transparent w-full border-solid border-b-2 focus:outline-none ${
					filterdErrors
						? (!touched && filterdErrors.length > 0) ||
						  (!touched && filterdErrors.length === 0) ||
						  (touched && filterdErrors.length === 0)
							? "border-sky-700 hover:border-sky-500 focus:border-sky-300"
							: "border-red-700 hover:border-red-500 focus:border-red-300"
						: "border-sky-700 hover:border-sky-500 focus:border-sky-300"
				} disabled:border-slate-300 disabled:text-slate-300`}
			/>
			<label
				htmlFor={inputProps.name}
				className={`absolute left-1 -top-0.5 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-5 peer-focus:-top-0.5 ${disabled ? "peer-focus:text-slate-300 peer-placeholder-shown:text-slatte-300 text-slate-300" : "peer-placeholder-shown:text-black peer-focus:text-black"} peer-focus:text-sm`}
			>
				{label}
			</label>
		</div>
	)
}

export default Input
