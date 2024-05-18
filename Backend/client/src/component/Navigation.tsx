import React from 'react'
import { menuList } from '../constant'
import { NavLink } from 'react-router-dom'
import { IconList } from '../UI'

const Navigation: React.FC = () => {
    return (
        <aside className='aside'>
            <nav className='aside__nav'>
                <ul className='aside__nav-list'>
                    {menuList.map(menuItem => {
                        return (
                            <NavigationItem path={menuItem.path} name={menuItem.name}/>   
                        )
                    })}
                </ul>
            </nav>
        </aside>
    )
}

type PropsNavigationItem = {
    path: string,
    name: string
}
const NavigationItem: React.FC<PropsNavigationItem> = ({ path, name }) => {
    return (
        <li className='aside__nav-list__item'>
            <NavLink
                to={path}
                className={({ isActive }) => isActive ? "active" : ""}
            >
                <IconList type={name.toLocaleLowerCase()} />
                <span className='body-text'>{name}</span>
            </NavLink>
        </li>
    )
}

export default Navigation