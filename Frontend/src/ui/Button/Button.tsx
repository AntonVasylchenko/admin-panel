import React from 'react'
import { Link } from 'react-router-dom'

type Props = {
    link: boolean,
    path?: string,
    children: string
    cssSelector: string
    type?: "submit" | "reset" | "button"
}

const Button: React.FC<Props> = ({ children, link, path, cssSelector,type }) => {
    const typeLink = () => {
        return (
            path ? <Link className={cssSelector} to={path}>{children}</Link> : ""
        )
    }
    const typeButton = () => {
        return (
            <button type={type} className={cssSelector} >{children}</button>
        )
    }

    return link ? typeLink() : typeButton()
}

export default Button