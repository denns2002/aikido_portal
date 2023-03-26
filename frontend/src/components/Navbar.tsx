import { NavLink } from "react-router-dom";
import { INavLink } from "../models";


function Navbar() {
    const navLinks: INavLink[] = [
        {
            title: 'Главная',
            path: '/'
        },
        {
            title: 'Авторизация',
            path: '/signin'
        },
        {
            title: 'Регистрация',
            path: '/signup'
        },
    ];

    return (
        <aside className='bg-sky-200 h-full rounded-tr-xl rounded-br-xl'>
            <nav className='flex flex-col gap-1 pl-3 mr-2 mt-2'>
            {navLinks.map((nav, index) => {
                return (
                    <NavLink key={index} to={nav.path} className='font-semibold hover:shadow-lg hover:bg-sky-300'>
                        {nav.title}
                    </NavLink>)
            })}
        </nav>
        </aside>
    );
}

export default Navbar;