interface FormInputProps {
    label: string;
    type: string;
    placeholder: string;
    name: string;
    value: string;
    error: string;
    required: boolean;
    touched: boolean;
    onChange(event: React.ChangeEvent<HTMLInputElement>): void;
    onBlur(event: React.ChangeEvent<HTMLInputElement>): void;
}

function FormInput(props: FormInputProps) {
    const { label, error, touched, ...inputProps } = props;

    return (
        <div className='w-full'>
            <label>{props.label}</label>
            <input
                {...inputProps}
                className={`py-1 px-1 w-full border-solid border-2 rounded-md focus:outline-none ${!touched && error ? 'border-gray-300 hover:border-sky-400 focus:border-sky-600' : ''} ${touched && !error ? 'border-sky-400 hover:border-sky-600 focus:border-sky-800' : ''} ${touched && error ? 'border-red-400 hover:border-red-600 focus:border-red-800' : ''}`}
            />
        </div>
    );
}

export default FormInput;