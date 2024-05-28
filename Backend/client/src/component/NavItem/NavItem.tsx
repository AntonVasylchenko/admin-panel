import React from 'react'
import style from "./style.module.css"
import { PropsNavigationItem } from './type'

import { NavLink } from 'react-router-dom'
import { IconList } from '../../UI'

const NavItem: React.FC<PropsNavigationItem> = ({ path, name }) => {
    return (
        <li className={style.aside__item}>
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

export default NavItem