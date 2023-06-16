import React, { useCallback, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { path } from 'src/constants/path'
import Button from '../Button'
import Popover from '../Popover'
import Wallet from '../Wallet'
import NavigationDesktop from '../NavigationDesktop'
import ModalConnectWallet from '../ModalConnectWallet'
import useMetamask from 'src/utils/hooks/useMetamask'
import { formatDotAccount } from 'src/utils/utils'
export default function Header() {
  const [activeRotateArrow, setActiveRotateArrow] = useState(false)
  const { defaultAccount, isModalOpen, openModal, closeModal, connectMetamask } = useMetamask()
  const rotateArrowUp = useCallback((isOpen: boolean) => {
    setActiveRotateArrow(isOpen)
  }, [])

  const onClickConnectWallet = () => {
    openModal()
  }

  return (
    <header className='sticky left-0 right-0 top-0 bg-darkBlue pb-5 pt-3 text-white'>
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
          <div className='hidden md:block'>
            <NavigationDesktop />
          </div>
          {/* Connect wallet */}
          <div className='flex items-center justify-start'>
            {/* Chưa có ví thì show button  */}
            {!defaultAccount && (
              <Button kindButton='active' className='btn-primary' type='button' onClick={onClickConnectWallet}>
                Connect Wallet
              </Button>
            )}
            {Boolean(defaultAccount) && (
              <Popover renderPopover={<Wallet />} className='' rotateArrow={rotateArrowUp}>
                <Button
                  kindButton='active'
                  className='btn-outline'
                  iconPosition='end'
                  icon={
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className={classNames('ml-2 inline-block h-4 w-4', {
                        'rotate-180 transition-all duration-300': activeRotateArrow,
                        'rotate-0  transition-all duration-300': !activeRotateArrow
                      })}
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
                    </svg>
                  }
                >
                  {formatDotAccount(defaultAccount)}
                </Button>
              </Popover>
            )}
            {isModalOpen && <ModalConnectWallet closeModal={closeModal} connectMetamask={connectMetamask} />}
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
            {/* <FloatingPortal>
              <NavigationMobile />
            </FloatingPortal> */}
          </div>
        </div>
      </div>
    </header>
  )
}
