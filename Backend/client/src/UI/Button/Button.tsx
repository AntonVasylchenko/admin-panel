import React from 'react';
import "./style.css"
import { PropsButton } from "./type"


const Button: React.FC<PropsButton> = React.memo(({ children, cssSelector, typeButton, onClick, ...rest }) => {
    return (
        <button onClick={onClick} type={typeButton} className={cssSelector} {...rest} >{children}</button>
    );
});

export default Button;
