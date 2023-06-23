import React, { ButtonHTMLAttributes, useTransition } from 'react'

export type ActiveTab = 'for' | 'against' | 'abstain'

interface TabButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  isActive: boolean
  tab: ActiveTab
  onClick: () => void
}

export default function TabButton(props: TabButtonProps) {
  const { children, id, isActive, onClick, tab } = props
  const [isPending, startTransition] = useTransition()

  if (isPending) {
    return <b className='pending'>{children}</b>
  }

  const classNameActiveTab = () => {
    let classNameActiveTab = ''
    switch (tab) {
      case 'against':
        classNameActiveTab = 'border-[#f44061] text-[#f44061]'
        break
      case 'abstain':
        classNameActiveTab = 'border-[#718096]  text-[#718096]'
        break
      default:
        classNameActiveTab = 'border-[#25C9A1] text-[#25C9A1]'
        break
    }
    return classNameActiveTab
  }

  const onClickTab = () => {
    startTransition(() => {
      onClick && onClick()
    })
  }

  if (isActive) {
    return (
      <span className={`inline-block w-full rounded-t-lg border-b-2 p-4 font-semibold ${classNameActiveTab()}`}>
        {children}
      </span>
    )
  }

  return (
    <button
      onClick={onClickTab}
      className={`inline-block w-full rounded-t-lg border-b-2 border-[#1e2740] p-4 font-normal text-white ${classNameActiveTab}`}
      id={id}
      data-tabs-target='#for'
      type='button'
      role='tab'
      aria-controls='for'
      aria-selected='false'
    >
      {children}
    </button>
  )
}
