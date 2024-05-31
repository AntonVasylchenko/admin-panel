import React from 'react'
import style from "./style.module.css"
const Loader:React.FC = () => {
    return (
        <div className={style.preloader_wrapper}>
            <div className={style.preloader}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default Loader