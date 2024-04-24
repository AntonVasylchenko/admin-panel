import React from 'react'
import style from "./menuItem.module.css"
import { Link } from 'react-router-dom'
import { Icon } from '../../ui'

type MenuItemType = {
    title: string,
    list: {
        name: string,
        path: string,
        id: string
    }[]
}

const MenuItem: React.FC<MenuItemType> = ({ title, list }) => {
    const [open, setOpen] = React.useState<boolean>(false);
    const refNavigation = React.useRef<HTMLElement | null>(null);
    const handelMenu = () => {
        if (!refNavigation.current) null;
        setOpen((prev) => !prev);
    }

    return (
        <div className={style["menu-item"]}>
            <button onClick={handelMenu} className={style["menu-item__button"]}>
                <span>
                    <Icon type={title} />
                    {title}
                </span>
                <Icon type='arrow' />
            </button>
            <nav role='list' className={`${style["menu-item__nav"]} ${open ? style["menu-item__nav--active"] : ""}`} ref={refNavigation}>
                <ul className={`${style["menu-item__nav-list"]} ${style["menu-list"]}`}>
                    {
                        list && list.map(linkElement => {
                            return (
                                <li key={linkElement.id} className={style["menu-list__item"]} >
                                    <Link className={style["menu-list__link"]} to={linkElement.path}>{linkElement.name}</Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </nav>
        </div>
    )
}

export default MenuItem