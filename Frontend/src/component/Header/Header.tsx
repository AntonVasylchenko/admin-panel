import React from 'react'
import style from "./header.module.css"
import { Icon } from '../../ui'
import { Link, useLocation } from 'react-router-dom'


const Header: React.FC = () => {
  let { pathname } = useLocation();

  return (
    <header className={style["header"]}>
      <div className={style["header__logo"]}>
        {pathname === "/"
          ?
          <Link to="/" className={style["header__logo-link"]}>
            <Icon type='logo' />
          </Link>
          :
          <Icon type='logo' />
        }
      </div>
      <div className={style["header__search"]}>
        <div className={style["header__search-input"]}>
          <Icon type='search' selectorClass={style["header__search-input__icon"]} />
          <input type="search" />
        </div>
      </div>
      <div className={style["header__account"]}>
        <div className={style["header__account-avatar"]}></div>
      </div>
    </header>
  )
}

export default Header