import React from 'react'
import axios from 'axios';
import { useSubmit, useLocation, useRouteLoaderData } from 'react-router-dom'
import { useStore } from '../store';

import { endPoints, findName, menuList } from '../constant';
import { createCustomerFromCookie, deleteCookie } from '../utility';
import { Button, IconList } from '../UI';
import { Log } from '../App';
import { LogList } from '.';



const Header: React.FC = () => {
  const { log: productLogs = [] } = useRouteLoaderData("root") as { isLogin: boolean, log: Log[] };

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
    <header className='header'>
      <h1 className='header__title main-title'>{titlePage}</h1>
      <div className='header__notification'>
        <IconList type='notification' />
        <LogList logList={productLogs} />
      </div>
      <div className='header__customer'>
        <div className="header__customer-name small-text">
          <span>{firstName.slice(0, 1)}</span>
          <span>{lastName.slice(0, 1)}</span>
        </div>
        <div className="header__customer-menu">
          <Button
            onClick={handleLogOut}
            typeButton='button'
            cssSelector='header__customer-menu__button body-text'
          >
            Log out
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Header