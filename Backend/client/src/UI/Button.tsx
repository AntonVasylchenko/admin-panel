import React from 'react';

type PropsButton = {
    children: string,
    cssSelector: string,
    typeButton: "button" | "submit" | "reset",
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const Button: React.FC<PropsButton> = React.memo(({ children, cssSelector, typeButton, onClick }) => {
    return (
        <button onClick={onClick} type={typeButton} className={cssSelector}>{children}</button>
    );
});

export default Button;
