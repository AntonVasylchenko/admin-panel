import React from 'react';
import "./style.css"
import { PropsIcon, IconType } from "./type"

import checkmark from "./../../icon/checkmark.svg";
import close from "./../../icon/close.svg";
import collection from "./../../icon/collection.svg";
import edit from "./../../icon/edit.svg";
import home from "./../../icon/home.svg";
import media from "./../../icon/media.svg";
import minus from "./../../icon/minus.svg";
import plus from "./../../icon/plus.svg";
import product from "./../../icon/product.svg";
import settings from "./../../icon/settings.svg";
import tooltip from "./../../icon/tooltip.svg";
import trash from "./../../icon/trash.svg";
import user from "./../../icon/user.svg";
import notification from "./../../icon/notification.svg";


const icons: IconType = {
    checkmark,
    close,
    collection,
    edit,
    home,
    media,
    minus,
    plus,
    product,
    settings,
    tooltip,
    trash,
    user,
    notification
};

const IconList: React.FC<PropsIcon> = React.memo(({ type }) => {
    const IconComponent = icons[type];
    if (!IconComponent) {
        return null;
    }
    return <img src={IconComponent} alt={type} loading='lazy' className={`icon icon--${type}`} />;
}, (prevProps, nextProps) => prevProps.type === nextProps.type);

export default IconList;
