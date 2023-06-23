import React from 'react'

interface TabContentProps {
  data: any
  addresses: any[]
}

export default function TabContent(props: TabContentProps) {
  const { data, addresses } = props
  return (
    <div className='' id='for' role='tabpanel' aria-labelledby='for-tab'>
      <div className='flex items-center justify-between border-b border-[#1e2740] p-4'>
        <span className='text-sm text-[#667085]'>{data}</span>
        <span className='text-sm text-[#667085]'>157.32M votes</span>
      </div>
      {Array(3)
        .fill(1)
        .map((x) => {
          return (
            <div className='flex items-center justify-between border-b border-[#1e2740] p-4' key={x}>
              <div className='flex items-center justify-start'>
                <div className='mr-3 h-12 w-12'>
                  <img
                    src='https://images.unsplash.com/photo-1687314100832-d99ea1fe1c2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80'
                    alt='avatar'
                    className='h-full w-full rounded-full object-cover'
                  />
                </div>
                <p className='text-base font-semibold text-[#475467]'>Treasure</p>
              </div>
              <p className='text-[#475467]'>18.42M</p>
            </div>
          )
        })}
    </div>
  )
}
