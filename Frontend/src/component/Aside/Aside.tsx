import React from 'react'
import style from "./aside.module.css"
import { mainNav } from '../../constans/mainNav'
import MenuItem from '../MenuItem/MenuItem'

const Aside: React.FC = () => {
  Object.entries(mainNav);

  return (
    <aside>
      {
        Object.entries(mainNav).map(el => {
          const titleGroup = el[0];
          const navList = el[1];
          return (
            <MenuItem key={titleGroup} list={navList} title={titleGroup} />
          )
        })
      }
    </aside>
  )
}

export default Aside