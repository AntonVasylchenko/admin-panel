import React from 'react';

type InputFieldType =
    | 'text'
    | 'password'
    | 'number'
    | 'email'
    | 'tel'
    | 'url'
    | 'search';

type PropsInputField = {
    type: InputFieldType;
    name: string;
    label: string;
    placeholder?: string;
    value?: string | number;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    autoFocus?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    autoComplete?: 'on' | 'off';
    inputMode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search';
    cssSelector?: string
};

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
