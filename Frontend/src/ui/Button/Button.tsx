import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
    link: boolean;
    children: string;
    cssSelector: string;
    path?: string;
    type?: "submit" | "reset" | "button";
    onClick?: () => void;
};

const Button: React.FC<Props> = ({ children, link, path, cssSelector, type, onClick }) => {
    const renderLink = () => (
        <Link className={cssSelector} to={path!}>
            {children}
        </Link>
    );

    const renderButton = () => (
        <button onClick={onClick} type={type} className={cssSelector}>
            {children}
        </button>
    );

    return link ? renderLink() : renderButton();
};

export default Button;
