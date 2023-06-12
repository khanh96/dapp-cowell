import React, { useRef, useState } from 'react'
import { motion, sync, useCycle } from 'framer-motion'
import MenuToggle from '../MenuToggle'
import useDimensions from 'src/utils/hooks/useDimensions'
import MenuItem from '../MenuItem'

// Thuộc tính css
// clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
// ${height * 2 + 200}px => width của clip path
// position x  => vị trí theo trục x
// position y  => vị trí theo trục y
const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 100% 0px)`,
    transition: {
      type: 'spring',
      stiffness: 20, // giá trị chiều cao chuyển đổi đột ngột
      restDelta: 2
    }
  }),
  closed: {
    clipPath: 'circle(30px at 100% 0px)',
    transition: {
      delay: 0.5,
      type: 'spring',
      stiffness: 400,
      damping: 40
    }
  }
}

export default function NavigationMobile() {
  const [isOpen, toggleOpen] = useCycle(false, true)
  const containerRef = useRef(null)
  const { height } = useDimensions(containerRef)
  return (
    <motion.nav
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      custom={height}
      ref={containerRef}
      className='absolute bottom-0  right-0 top-0 w-[300px]'
    >
      <motion.div className='absolute bottom-0 left-0 top-0 w-[300px] bg-white' variants={sidebar} />
      <Navigation />
      <MenuToggle toggle={() => toggleOpen()} />
    </motion.nav>
  )
}

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
}

export const Navigation = () => (
  <motion.ul variants={variants} className='absolute top-[100px] w-full p-6'>
    {itemIds.map((i) => (
      <MenuItem i={i} key={i} />
    ))}
  </motion.ul>
)

const itemIds = [0, 1, 2, 3, 4]
