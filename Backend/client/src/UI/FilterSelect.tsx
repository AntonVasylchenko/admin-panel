import React from 'react';

type PropsFilterSelect = {
    type: string;
    label: string;
    name: string;
    options: string[];
    value: string;
    onChange: React.ChangeEventHandler<HTMLSelectElement>;
};

const FilterSelect: React.FC<PropsFilterSelect> = React.memo(({ type, label, name, options = [], value, onChange }) => {
    console.count(type);
    
    return (
        <div className='filter-field'>
            <label className='filter-field__label' htmlFor={type}>{label}</label>
            <select className='filter-field__select' onChange={onChange} value={value} name={name} id={type}>
                {options.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    );
});

export default FilterSelect;
