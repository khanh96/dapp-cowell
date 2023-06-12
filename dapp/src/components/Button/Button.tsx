import React, { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  icon?: ReactNode
  iconPosition?: 'start' | 'end'
}

export default function Button(props: ButtonProps) {
  const { children, className = 'btn-primary', type = 'button', icon, iconPosition, ...rest } = props
  return (
    <button type={type} className={className} {...rest}>
      {iconPosition === 'start' && icon && icon}
      {children}
      {iconPosition === 'end' && icon && icon}
    </button>
  )
}
