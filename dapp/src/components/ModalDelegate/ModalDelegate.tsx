import React from 'react'
import Modal from '../Modal'

interface ModalDelegate {
  closeModal: () => void
}

export default function ModalDelegate(props: ModalDelegate) {
  const { closeModal } = props

  const onSubmitDelegate = () => {
    console.log('onSubmitDelegate')
  }
  return (
    <Modal onClose={() => closeModal()}>
      <div className='relative mx-auto mt-2 w-[350px] rounded-2xl border-transparent bg-gradient-to-tl from-[#ffe96f] to-[#00e4ce] p-[2px]'>
        <form onSubmit={onSubmitDelegate}>
          <div className='h-full w-full rounded-2xl bg-darkBlue p-4'>
            <div className='flex justify-end'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='#4c556f'
                viewBox='0 0 24 24'
                strokeWidth={2.0}
                stroke='#4c556f'
                className='h-6 w-6 cursor-pointer'
                onClick={() => closeModal()}
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
              </svg>
            </div>
            <h2 className='text-center font-[ExtraBold] text-xl font-normal text-[#17f3dd]'>Delegate</h2>
            <div className='mt-4 flex w-full flex-col rounded-2xl border-2 border-[#f67712] bg-[#1e2740] px-3 py-4'>
              <div className='flex items-center justify-between'>
                <div className='font-[Manrope-Regular] text-xs text-[#677395]'>Stake</div>
                <div className='font-[Manrope-Regular] text-xs text-[#677395]'>Balance: 1111</div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  )
}
