import React from 'react'


type PropsErrorPage = {
    children: string
}

const ErrorPage: React.FC<PropsErrorPage> = ({ children }) => {
    return (
        <div>{children}</div>
    )
}

export default ErrorPage