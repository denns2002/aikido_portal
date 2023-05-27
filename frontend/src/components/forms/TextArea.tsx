import React from "react"

interface TextAreaProps {
	label: string
	placeholder: string
	name: string
	value?: string
	errors?: string[]
	required: boolean
	touched?: boolean
	onChange(event: React.ChangeEvent<HTMLTextAreaElement>): void
	onBlur?(event: React.ChangeEvent<HTMLTextAreaElement>): void
}

function TextArea(props: TextAreaProps) {
	const { label, errors, touched, ...inputProps } = props

	const filterdErrors = errors?.filter((element) => {
		return element
	})

	return (
		<div className="w-full relative">
			<textarea
				{...inputProps}
				id={inputProps.name}
				className={`py-1 px-2.5 mt-2 text-white peer placeholder-transparent w-full border-solid border-2 rounded-md focus:outline-none bg-sky-700 ${
					filterdErrors
						? (!touched && filterdErrors.length > 0) ||
						  (!touched && filterdErrors.length === 0) ||
						  (touched && filterdErrors.length === 0)
							? "border-sky-100 hover:border-sky-300 focus:border-sky-500"
							: "border-red-400 hover:border-red-600 focus:border-red-200"
						: "border-sky-100 hover:border-sky-300 focus:border-sky-500"
				}`}
			/>
			<label
				htmlFor={inputProps.name}
				className="absolute left-2 -top-0.5 bg-sky-700 text-sm transition-all text-slate-200 px-0.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-200 peer-placeholder-shown:top-5 peer-focus:-top-0.5 peer-focus:text-slate-200 peer-focus:text-sm"
			>
				{label}
			</label>
		</div>
	)
}

export default TextArea
