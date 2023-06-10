import { FloatingPortal, Placement, offset, shift, useFloating, useHover, useInteractions } from '@floating-ui/react'
import React, { ElementType, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface PopoverProps {
  children: React.ReactNode
  renderPopover: React.ReactNode
  className?: string
  placement?: Placement
  rotateArrow?: (isOpen: boolean) => void
}

export default function Popover(props: PopoverProps) {
  const { children, renderPopover, className, placement = 'bottom', rotateArrow } = props

  const [isOpen, setIsOpen] = useState(false)
  const { refs, floatingStyles, context, middlewareData } = useFloating({
    // open: isOpen,
    // onOpenChange: setIsOpen,
    middleware: [shift()],
    placement: placement
  })

  const hover = useHover(context)
  const { getReferenceProps, getFloatingProps } = useInteractions([hover])

  const showPopover = () => {
    setIsOpen(true)
    rotateArrow && rotateArrow(true)
  }
  const hidePopover = () => {
    setIsOpen(false)
    rotateArrow && rotateArrow(false)
  }
  return (
    <div
      ref={refs.setReference}
      {...getReferenceProps()}
      className={className}
      onMouseEnter={showPopover}
      onMouseLeave={hidePopover}
    >
      {children}
      <AnimatePresence>
        <FloatingPortal>
          {isOpen && (
            <div ref={refs.setFloating} style={floatingStyles} {...getFloatingProps}>
              <motion.div
                initial={{ opacity: 0, animation: 'ease-in' }}
                animate={{ opacity: 1, animation: 'ease-in' }}
                exit={{ opacity: 0, animation: 'ease-in' }}
                transition={{ duration: 0.3 }}
              >
                {renderPopover}
              </motion.div>
            </div>
          )}
        </FloatingPortal>
      </AnimatePresence>
    </div>
  )
}
