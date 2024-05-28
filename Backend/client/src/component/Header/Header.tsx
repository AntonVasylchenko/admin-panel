import React from 'react'
import { ProductLogs } from "./type"
import style from "./style.module.css"

import axios from 'axios';
import { useSubmit, useLocation, useRouteLoaderData } from 'react-router-dom'
import { useStore } from '../../store';

import { endPoints, findName, menuList } from '../../constant';
import { createCustomerFromCookie, deleteCookie, createClasses } from '../../utility';
import { Button, IconList } from '../../UI';
import { LogList } from '..';



const Header: React.FC = () => {
  const { log: productLogs = [] } = useRouteLoaderData("root") as ProductLogs;

  const submit = useSubmit();
  const { pathname } = useLocation();
  const { changeMessage } = useStore();

  const titlePage = findName(menuList, pathname)
  const { firstName, lastName } = createCustomerFromCookie();

  const handleLogOut = async () => {
    try {
      ["customer", "isLogin"].forEach(typeCookie => deleteCookie(typeCookie))
      const response = await axios(`${endPoints.auth}/logout`)
      const data = response.data as { msg: string };
      changeMessage(data.msg, "success");
      submit({}, { method: "get", action: "/", });
    } catch (error) {
      changeMessage("Error", "error")
    }

  }

  return (
    <header className={createClasses(style.header, 'header')}>
      <h1 className={createClasses(style.header__title, 'main-title')}>{titlePage}</h1>
      <div className="header__notification">
        <IconList type='notification' />
        <LogList logList={productLogs} />
      </div>
      <div className={style.header__customer}>
        <div className={createClasses(style.header__customer_name, 'small-text')}>
          <span>{firstName.slice(0, 1)}</span>
          <span>{lastName.slice(0, 1)}</span>
        </div>
        <div className={style.header__customer_menu}>
          <Button
            onClick={handleLogOut}
            typeButton='button'
            cssSelector={createClasses(style.header__customer_menu__button, "body-text")}
          >
            Log out
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Header