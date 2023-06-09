import React from 'react'
import { Link } from 'react-router-dom'
import { path } from 'src/constants/path'

export default function Header() {
  return (
    <header className='sticky left-0 right-0 top-0 pb-5 pt-3 text-white'>
      <div className='container'>
        <div className='flex items-center justify-between'>
          {/* LOGO */}
          <Link to={path.home} className=''>
            <img
              src='https://co-well.vn/wp-content/themes/cowell/assets/img/logo.jpg'
              alt='logo'
              className='w-25 h-12'
            />
          </Link>
          {/* MENU Desktop */}
          <div className='hidden md:col-span-7 md:block'>menu desktop</div>
          {/* Connect wallet */}
          <div className='flex items-center justify-start'>
            <button
              className='rounded-xl bg-gradient-to-r from-[#33d4fa] to-[#17f3dd] px-6 py-3 text-black'
              type='button'
            >
              Connect Wallet
            </button>
            <button className='md:hidden'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-8 w-8'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
