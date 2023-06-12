import { motion } from 'framer-motion'

interface MenuToggle {
  toggle: () => void
}

export default function MenuToggle({ toggle }: MenuToggle) {
  return (
    // <motion.button className='md:hidden' onClick={toggle}>
    //   <svg
    //     xmlns='http://www.w3.org/2000/svg'
    //     fill='none'
    //     viewBox='0 0 24 24'
    //     strokeWidth={1.5}
    //     stroke='currentColor'
    //     className='h-8 w-8'
    //   >
    //     <path strokeLinecap='round' strokeLinejoin='round' d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' />
    //   </svg>
    // </motion.button>
    <button
      onClick={toggle}
      className='absolute left-7 top-4 h-[50px] w-[50px] rounded-[50%] border-none bg-transparent outline-none'
    >
      <svg width='23' height='23' viewBox='0 0 23 23'>
        <Path
          variants={{
            closed: { d: 'M 2 2.5 L 20 2.5' },
            open: { d: 'M 3 16.5 L 17 2.5' }
          }}
        />
        <Path
          d='M 2 9.423 L 20 9.423'
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 }
          }}
          transition={{ duration: 0.1 }}
        />
        <Path
          variants={{
            closed: { d: 'M 2 16.346 L 20 16.346' },
            open: { d: 'M 3 2.5 L 17 16.346' }
          }}
        />
      </svg>
    </button>
  )
}

const Path = (props) => (
  <motion.path fill='transparent' strokeWidth='3' stroke='hsl(0, 0%, 18%)' strokeLinecap='round' {...props} />
)
