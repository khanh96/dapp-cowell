import React from 'react'
import { NavLink } from 'react-router-dom'
import { path } from 'src/constants/path'
import classNames from 'classnames'

export default function NavigationDesktop() {
  return (
    <div className='flex items-center justify-around'>
      <NavLink
        className={({ isActive }) => {
          return classNames('nav-link', {
            'text-[#17f3dd]': isActive,
            'text-[#677395]': !isActive
          })
        }}
        to={path.home}
      >
        Home
      </NavLink>
      {/* <NavLink
        className={({ isActive }) => {
          return classNames('nav-link', {
            'text-[#17f3dd]': isActive,
            'text-[#677395]': !isActive
          })
        }}
        to={path.lp}
      >
        LP
      </NavLink> */}
      <NavLink
        className={({ isActive }) => {
          return classNames('nav-link', {
            'text-[#17f3dd]': isActive,
            'text-[#677395]': !isActive
          })
        }}
        to={path.earn}
      >
        Earn
      </NavLink>
      <NavLink
        className={({ isActive }) => {
          return classNames('nav-link', {
            'text-[#17f3dd]': isActive,
            'text-[#677395]': !isActive
          })
        }}
        to={path.lucky}
      >
        Lucky Drop
      </NavLink>
      <NavLink
        className={({ isActive }) => {
          return classNames('nav-link', {
            'text-[#17f3dd]': isActive,
            'text-[#677395]': !isActive
          })
        }}
        to={path.nft}
      >
        NFT
      </NavLink>
      {/* <NavLink
        className={({ isActive }) => {
          return classNames('nav-link', {
            'text-[#17f3dd]': isActive,
            'text-[#677395]': !isActive
          })
        }}
        to={path.aifi}
      >
        AIFI
      </NavLink> */}
      <NavLink
        className={({ isActive }) => {
          return classNames('nav-link', {
            'text-[#17f3dd]': isActive,
            'text-[#677395]': !isActive
          })
        }}
        to={path.dao}
      >
        DAO
      </NavLink>
    </div>
  )
}
