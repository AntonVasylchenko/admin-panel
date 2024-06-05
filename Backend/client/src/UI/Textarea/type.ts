export type PropsTextField = {
    type: string,
    label: string,
    name: string,
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
    value?: string,
}