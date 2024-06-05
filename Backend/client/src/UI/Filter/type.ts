export type PropsFilterSelect = {
    type: string;
    label: string;
    name: string;
    options: string[];
    value?: string;
    cssSelector?: string,
    defaultValue?: string,
    onChange?: React.ChangeEventHandler<HTMLSelectElement>;
};