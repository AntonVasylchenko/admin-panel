type InputFieldType =
    | 'text'
    | 'password'
    | 'number'
    | 'email'
    | 'tel'
    | 'url'
    | 'search'
    | 'file';

export type PropsInputField = {
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