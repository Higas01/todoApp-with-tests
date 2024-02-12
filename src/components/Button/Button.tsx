import React from 'react'

type ButtonProps = {
    background: "red" | "green" | "blue",
    children: React.ReactNode,
    handleClick?: () => void

}

const Button = ({background, children, handleClick}: ButtonProps) => {
  return (
    <button style={{backgroundColor: background} } onClick={handleClick}>{children}</button>
  )
}

export default Button