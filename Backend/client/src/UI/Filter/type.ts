export type PropsFilterSelect = {
    type: string;
    label: string;
    name: string;
    options: string[];
    value: string;
    onChange: React.ChangeEventHandler<HTMLSelectElement>;
};