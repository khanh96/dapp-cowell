import React, { Fragment, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import Backdrop from './Backdrop'
import ModalOverlay from './ModalOverlay'

const portalElement = document.getElementById('overlays') as Element | DocumentFragment

interface ModalProps {
  onClose: () => void
  children: ReactNode
}

export default function Modal(props: ModalProps) {
  const { onClose } = props
  return (
    <Fragment>
      {createPortal(<Backdrop onClose={onClose} />, portalElement)}
      {createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
    </Fragment>
  )
}
