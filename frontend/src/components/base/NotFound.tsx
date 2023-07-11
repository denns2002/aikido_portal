import { NavLink } from "react-router-dom"

function NotFound() {
    return (
        <div className="text-center">
            <h1 className="font-medium text-[10vw] text-sky-700">
               404
            </h1>
            <p className="text-[2vw] w-[70%] mx-auto">
                Кажется, страница, на которую вы хотите перейти, перемещена или больше не существует
            </p>
            <p className="text-[2vw] w-[70%] mx-auto">
                Вы можете перейти на
                <NavLink to={"/events"} className="text-sky-700 transition duration-200 ease-in-out hover:text-sky-500 focus:text-sky-500 active:text-sky-700">
                    <span> главную страницу</span>
                </NavLink>
            </p>
        </div>
    )
}

export default NotFound