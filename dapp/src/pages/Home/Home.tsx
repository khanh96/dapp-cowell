import classNames from 'classnames'
import React from 'react'
import Button from 'src/components/Button'
import Metamask from 'src/components/Metamask'

export default function Home() {
  const onClickBtn = () => {
    console.log('onClickBtn')
  }

  return (
    <div className='mx-auto flex h-full items-center justify-center text-center text-white'>
      {/* <Metamask /> */}
      <div className='max-w-[200px]'>
        <div className='mb-3'>
          <Button kindButton='no-active' onClick={onClickBtn} disabled type='submit'>
            Home
          </Button>
        </div>
        <Button
          kindButton='active'
          onClick={onClickBtn}
          className='btn-primary flex min-h-[44px] min-w-[120px] items-center justify-center text-black'
          isLoading={false}
          iconLoading={
            <svg
              viewBox='0 0 24 24'
              fill='text-black'
              width='20px'
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5 animate-spin'
            >
              <path d='M12 6V7.79C12 8.24 12.54 8.46 12.85 8.14L15.64 5.35C15.84 5.15 15.84 4.84 15.64 4.64L12.85 1.85C12.54 1.54 12 1.76 12 2.21V4C7.58 4 4 7.58 4 12C4 13.04 4.2 14.04 4.57 14.95C4.84 15.62 5.7 15.8 6.21 15.29C6.48 15.02 6.59 14.61 6.44 14.25C6.15 13.56 6 12.79 6 12C6 8.69 8.69 6 12 6ZM17.79 8.71C17.52 8.98 17.41 9.4 17.56 9.75C17.84 10.45 18 11.21 18 12C18 15.31 15.31 18 12 18V16.21C12 15.76 11.46 15.54 11.15 15.86L8.36 18.65C8.16 18.85 8.16 19.16 8.36 19.36L11.15 22.15C11.46 22.46 12 22.24 12 21.8V20C16.42 20 20 16.42 20 12C20 10.96 19.8 9.96 19.43 9.05C19.16 8.38 18.3 8.2 17.79 8.71Z' />
            </svg>
          }
          // icon={
          //   <svg
          //     xmlns='http://www.w3.org/2000/svg'
          //     fill='none'
          //     viewBox='0 0 24 24'
          //     strokeWidth={1.5}
          //     stroke='currentColor'
          //     className={classNames('ml-2 inline-block h-4 w-4', {
          //       'rotate-180 transition-all duration-300': true,
          //       'rotate-0  transition-all duration-300': false
          //     })}
          //   >
          //     <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
          //   </svg>
          // }
          // iconPosition='end'
        >
          Home
        </Button>
      </div>
    </div>
  )
}

{
  /* <svg
viewBox='0 0 24 24'
fill='text-black'
width='20px'
xmlns='http://www.w3.org/2000/svg'
className='ml-1 h-5 w-5 animate-spin'
>
<path d='M12 6V7.79C12 8.24 12.54 8.46 12.85 8.14L15.64 5.35C15.84 5.15 15.84 4.84 15.64 4.64L12.85 1.85C12.54 1.54 12 1.76 12 2.21V4C7.58 4 4 7.58 4 12C4 13.04 4.2 14.04 4.57 14.95C4.84 15.62 5.7 15.8 6.21 15.29C6.48 15.02 6.59 14.61 6.44 14.25C6.15 13.56 6 12.79 6 12C6 8.69 8.69 6 12 6ZM17.79 8.71C17.52 8.98 17.41 9.4 17.56 9.75C17.84 10.45 18 11.21 18 12C18 15.31 15.31 18 12 18V16.21C12 15.76 11.46 15.54 11.15 15.86L8.36 18.65C8.16 18.85 8.16 19.16 8.36 19.36L11.15 22.15C11.46 22.46 12 22.24 12 21.8V20C16.42 20 20 16.42 20 12C20 10.96 19.8 9.96 19.43 9.05C19.16 8.38 18.3 8.2 17.79 8.71Z' />
</svg> */
}
