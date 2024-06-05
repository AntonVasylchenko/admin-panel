import React from 'react'
import "./style.css";
import { PropsTextField } from "./type";

const TextField: React.FC<PropsTextField> = ({ type, label, name, onChange, value }) => {
    return (
        <div className='text-field'>
            <label className='text-field__label body-text' htmlFor={type}>{label}</label>
            <textarea className='text-field__area body-text' value={value} name={name} id={type} onChange={onChange}></textarea>
        </div>
    )
}

export default TextField