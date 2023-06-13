import React, { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  icon?: ReactNode
  iconPosition?: 'start' | 'end'
  disabled?: boolean
}

export default function Button(props: ButtonProps) {
  const { children, className = 'btn-primary', type = 'button', icon, iconPosition, disabled, ...rest } = props
  const classNameDisable = 'border-[#1e2740] bg-[#1e2740] text-[#677395] shadow-none  rounded-xl px-6 py-3 w-full'
  console.log(disabled)
  return (
    <button type={type} className={`${disabled ? classNameDisable : className}`} {...rest}>
      {iconPosition === 'start' && icon && icon}
      {children}
      {iconPosition === 'end' && icon && icon}
    </button>
  )
}
