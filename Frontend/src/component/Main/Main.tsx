import React from 'react'
import style from "./header.module.css"
import Aside from '../Aside/Aside'
import { Outlet } from 'react-router-dom'

const Main: React.FC = () => {
    return (
        <main>
            <Aside />
            <div>
                <Outlet/>
            </div>
        </main>
    )
}

export default Main