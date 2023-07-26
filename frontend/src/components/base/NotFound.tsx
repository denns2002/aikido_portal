import { NavLink } from "react-router-dom"

function NotFound() {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center">
            <div className="h-full w-[50rem] flex flex-col items-center">
                <h1 className="text-[5rem] font-medium text-sky-700">
                   404
                </h1>
                <p className="text-2xl text-center">
                    Кажется, страница, на которую вы хотите перейти, перемещена или больше не существует
                </p>
                <p className="text-2xl text-center">
                    Вы можете перейти на
                    <NavLink to={"/events"} className="text-sky-700 duration-200 transition-all hover:text-sky-600 focus:text-sky-600">
                        <span> главную страницу</span>
                    </NavLink>
                </p>
            </div>
        </div>
    )
}

export default NotFound