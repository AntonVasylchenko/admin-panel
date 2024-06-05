import React from 'react';
import "./style.css";
import { PropsFilterSelect } from "./type";
import { createClasses } from '../../utility';

const FilterSelect: React.FC<PropsFilterSelect> = React.memo(({ type, label, name, options = [], value, onChange, cssSelector,defaultValue }) => {
    console.count(type);

    return (
        <div className={createClasses('filter-field', cssSelector ? cssSelector : "")}>
            <label className='filter-field__label body-text' htmlFor={type}>{label}</label>
            <select className='filter-field__select body-text' onChange={onChange} defaultValue={defaultValue} value={value} name={name} id={type}>
                {options.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    );
});

export default FilterSelect;
