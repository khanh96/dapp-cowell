import { ReactNode } from 'react'

interface ModalOverlay {
  children: ReactNode
}
export default function ModalOverlay(props: ModalOverlay) {
  return (
    <div className='fixed left-2/4 top-2/4 z-30 m-auto w-[90%] max-w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-transparent'>
      {props.children}
    </div>
  )
}
