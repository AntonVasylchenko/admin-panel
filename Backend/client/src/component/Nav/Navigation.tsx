import React from 'react'
import style from "./style.module.css"

import { menuList } from '../../constant'
import NavItem from '../NavItem/NavItem'


const Navigation: React.FC = () => {
    return (
        <aside className={style.aside}>
            <nav className={style.aside__nav}>
                <ul className={style.aside__nav_list}>
                    {menuList.map(menuItem => {
                        return (
                            <NavItem key={menuItem.name} path={menuItem.path} name={menuItem.name} />
                        )
                    })}
                </ul>
            </nav>
        </aside>
    )
}
export default Navigation