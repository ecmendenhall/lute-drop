interface Props {
  color: string
  children: React.ReactNode
}

const Button = ({ color, children }: Props) => {
  const buttonClass = `font-body text-xl px-4 py-2 rounded-md shadow bg-${color}-300 text-${color}-800 hover:bg-${color}-400`

  return <button className={buttonClass}>{children}</button>
}

export default Button
