export type PropsButton = {
    children: string,
    cssSelector: string,
    typeButton: "button" | "submit" | "reset",
    disabled?: boolean
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}