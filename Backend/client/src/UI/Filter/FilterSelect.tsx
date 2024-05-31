import React from 'react';
import "./style.css";
import { PropsFilterSelect } from "./type";

const FilterSelect: React.FC<PropsFilterSelect> = React.memo(({ type, label, name, options = [], value, onChange }) => {
    console.count(type);

    return (
        <div className='filter-field'>
            <label className='filter-field__label body-text' htmlFor={type}>{label}</label>
            <select className='filter-field__select body-text' onChange={onChange} value={value} name={name} id={type}>
                {options.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    );
});

export default FilterSelect;