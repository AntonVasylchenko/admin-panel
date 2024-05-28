import React from 'react'
import style from "./style.module.css";

import { PropsLogType } from "./type";
import { Link } from 'react-router-dom';
import { tranformFormatDate, createClasses } from '../../utility';

const LogItem: React.FC<PropsLogType> = (props) => {
    const { id, position, name, action, time } = props;
    return (
        <Link className={createClasses(style.log_item, 'small-text')} to={`products/${id}`}>
            <span className={style.position}>Position: {position}</span>
            <span className={style.log_type}>Log Type: {name}</span>
            <span className={style.action}>Action: {action}</span>
            <span className={style.timestamp}>Change Timestamp: {tranformFormatDate(time)}</span>
        </Link>
    )
}
export default LogItem