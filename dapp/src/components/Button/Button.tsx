import React, { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  icon?: ReactNode
}

export default function Button(props: ButtonProps) {
  const { children, className = 'btn-primary', type = 'button', icon, ...rest } = props
  return (
    <button type={type} className={className} {...rest}>
      {children}
      {icon && icon}
    </button>
  )
}
