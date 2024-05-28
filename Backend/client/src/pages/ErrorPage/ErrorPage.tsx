import React from 'react'
import style from "./style.module.css"
import { PropsErrorPage } from "./type"

const ErrorPage: React.FC<PropsErrorPage> = ({ children }) => {
    return (
        <div className={style.error}>{children}</div>
    )
}

export default ErrorPage