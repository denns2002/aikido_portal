import { useState } from "react"
import { IoIosArrowDown } from "react-icons/io"

interface DropdownProps {
    title: string
	children: React.ReactElement
    defaultShow: boolean
}

function Dropdown({title, children, defaultShow}: DropdownProps) {
	const [show, setShow] = useState(defaultShow)

	return (
		<div className="w-full flex flex-col items-center">
			<button
				className="group w-full py-1 flex flex-row justify-center items-center px-2 border-b-2 border-sky-500"
				onClick={() => setShow((prev) => !show)}
			>
				<span className="font-medium text-xl">{title}:</span>
				<div className="flex-1" />
				<IoIosArrowDown
					className={`font-extrabold h-7 w-7 duration-300 ${
						show ? "-rotate-180" : null
					}`}
				/>
			</button>
			<div
				className={`${
					show ? null : "hidden"
				} w-full p-1`}
			>
				{children}
			</div>
		</div>
	)
}

export default Dropdown
