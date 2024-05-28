import React from 'react';
import "./style.css"
import { PropsInputField } from "./type"

const InputField: React.FC<PropsInputField> = ({
    type,
    name,
    label,
    placeholder,
    value,
    onChange,
    onFocus,
    onBlur,
    autoFocus,
    disabled,
    readOnly,
    required,
    minLength,
    maxLength,
    pattern,
    autoComplete,
    inputMode,
    cssSelector
}) => {
    const id = `input-${name}-${Math.random().toString(36).substr(2, 9)}`;

    return (
        <div className={`field-row ${cssSelector ? cssSelector : ""}`}>
            <label className='field-row__label' htmlFor={id}>{label}</label>
            <input
                className='field-row__input'
                type={type}
                name={name}
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                autoFocus={autoFocus}
                disabled={disabled}
                readOnly={readOnly}
                required={required}
                minLength={minLength}
                maxLength={maxLength}
                pattern={pattern}
                autoComplete={autoComplete}
                inputMode={inputMode}
            />
        </div>
    );
};

export default InputField;
