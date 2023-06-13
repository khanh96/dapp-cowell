import { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
interface ModalOverlay {
  children: ReactNode
}
export default function ModalOverlay(props: ModalOverlay) {
  return (
    <div className='fixed left-2/4 top-2/4 z-30 m-auto w-[90%] max-w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-transparent '>
      <motion.div
        initial={{ animation: '', transform: 'rotateX(90deg)' }}
        animate={{ animation: '', transform: 'rotateX(0deg)' }}
        exit={{ animation: '', transform: 'rotateX(0deg)' }}
        transition={{ duration: 0.3 }}
      >
        {props.children}
      </motion.div>
    </div>
  )
}
