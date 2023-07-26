interface ModalProps {
    show: boolean
    height: string
	children: React.ReactElement
}

function Modal({show, height, children}: ModalProps) {
    return ( <div className={`h-[${height}] w-full z-40 absolute -top-20 left-0 bg-sky-900 opacity-70 ${show ? null : "hidden"}`}>
        {children}
    </div> );
}

export default Modal;