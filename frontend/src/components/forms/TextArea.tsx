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
				className={`shadom-md py-2 px-1.5 mt-2 peer placeholder-transparent w-full border-solid border-b-2 focus:outline-none ${
					filterdErrors
						? (!touched && filterdErrors.length > 0) ||
						  (!touched && filterdErrors.length === 0) ||
						  (touched && filterdErrors.length === 0)
							? "border-sky-500 hover:border-sky-400 focus:border-sky-500"
							: "border-red-500 hover:border-red-400 focus:border-red-500"
						: "border-sky-500 hover:border-sky-400 focus:border-sky-500"
				}`}
			/>
			<label
				htmlFor={inputProps.name}
				className="absolute left-1 -top-1 text-sm transition-all px-0.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-placeholder-shown:top-5 peer-focus:-top-1 peer-focus:text-black peer-focus:text-sm"
			>
				{label}
			</label>
		</div>
	)
}

export default TextArea
