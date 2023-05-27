import React from "react"

interface TextAreaProps {
	label: string
	placeholder: string
	name: string
	value?: string
	errors?: string[]
	required: boolean
	touched?: boolean
	disabled?: boolean
	onChange(event: React.ChangeEvent<HTMLTextAreaElement>): void
	onBlur?(event: React.ChangeEvent<HTMLTextAreaElement>): void
}

function TextArea({ label, errors, touched, ...inputProps }: TextAreaProps) {
	const filterdErrors = errors?.filter((element) => {
		return element
	})

	return (
		<div className="w-full relative">
			<textarea
				{...inputProps}
				id={inputProps.name}
				className={`py-1 px-2.5 mt-2 peer placeholder-transparent w-full border-solid border-2 rounded-md focus:outline-none ${
					filterdErrors
						? (!touched && filterdErrors.length > 0) ||
						  (!touched && filterdErrors.length === 0) ||
						  (touched && filterdErrors.length === 0)
							? "border-sky-700 hover:border-sky-500 focus:border-sky-300"
							: "border-red-700 hover:border-red-500 focus:border-red-300"
						: "border-sky-700 hover:border-sky-500 focus:border-sky-300"
				}`}
			/>
			<label
				htmlFor={inputProps.name}
				className="absolute left-2 -top-0.5 bg-white text-sm transition-all px-0.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-placeholder-shown:top-5 peer-focus:-top-0.5 peer-focus:text-black peer-focus:text-sm"
			>
				{label}
			</label>
		</div>
	)
}

export default TextArea
