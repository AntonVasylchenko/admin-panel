export type PropsButton = {
    children: string,
    cssSelector: string,
    typeButton: "button" | "submit" | "reset",
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}