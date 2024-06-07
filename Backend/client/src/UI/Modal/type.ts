type TrigerElement = HTMLDivElement | HTMLButtonElement

export type PropsModalType = {
  onClick: React.MouseEventHandler<TrigerElement>
  children: React.ReactNode
  isActive: boolean
}