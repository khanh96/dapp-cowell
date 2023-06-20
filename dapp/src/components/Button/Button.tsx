import classNames from 'classnames'
import React, { ButtonHTMLAttributes, ReactNode } from 'react'

const KIND_BUTTON = {
  active: 'active',
  noActive: 'no-active'
}

type KindButton = 'active' | 'no-active'
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  icon?: ReactNode
  iconPosition?: 'start' | 'end'
  kindButton: KindButton
  isLoading?: boolean
  iconLoading?: ReactNode
}

export default function Button(props: ButtonProps) {
  const { className, type, disabled } = props
  const { kindButton, children, icon, iconPosition, isLoading, iconLoading, ...rest } = props

  return (
    <>
      {kindButton === KIND_BUTTON.active && (
        <ButtonActive
          className={className}
          type={type}
          icon={icon}
          iconPosition={iconPosition}
          disabled={isLoading}
          isLoading={isLoading}
          iconLoading={iconLoading}
          {...rest}
        >
          {children}
        </ButtonActive>
      )}
      {kindButton === KIND_BUTTON.noActive && (
        <ButtonNonActive type={type} className={className} disabled={disabled} {...rest}>
          {children}
        </ButtonNonActive>
      )}
    </>
  )
}

interface ButtonNonActiveProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

function ButtonNonActive(props: ButtonNonActiveProps) {
  const { children, className, disabled, type = 'button', ...rest } = props
  return (
    <button
      type={type}
      className='flex w-full justify-center rounded-xl border-[#1e2740] bg-[#1e2740] px-6 py-3 text-[#677395] shadow-none'
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  )
}

interface ButtonActiveProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  icon?: ReactNode
  iconPosition?: 'start' | 'end'
  isLoading?: boolean
  iconLoading?: ReactNode
}

function ButtonActive(props: ButtonActiveProps) {
  const { className = 'btn-primary', type } = props
  const { children, isLoading, iconPosition = 'end', icon, iconLoading, ...rest } = props

  return (
    <button type={type} className={className} disabled={isLoading} {...rest}>
      {isLoading && <div>{iconLoading}</div>}
      {!isLoading && (
        <>
          {iconPosition === 'start' && icon && icon}
          {children}
          {iconPosition === 'end' && icon && icon}
        </>
      )}
    </button>
  )
}
