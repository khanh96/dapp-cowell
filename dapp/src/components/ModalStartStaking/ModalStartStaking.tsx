import React from 'react'
import { useForm } from 'react-hook-form'
import Modal from '../Modal'
import useMetamask from 'src/utils/hooks/useMetamask'
import Button from '../Button'

interface ModalStartStakingProps {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}

export default function ModalStartStaking(props: ModalStartStakingProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      stake: '0'
    }
  })
  const { isOpen, setIsOpen } = props

  const onSubmitStartStaking = handleSubmit((data) => {
    console.log(data)
  })
  return (
    <>
      {/* Popup */}
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          {/* <div className='m-auto w-[600px] rounded-2xl bg-[#151b2c] px-3 py-4'> */}
          <div className='relative mx-auto mt-2 w-[350px] rounded-2xl border-transparent bg-gradient-to-tl from-[#ffe96f] to-[#00e4ce] p-[2px]'>
            <form onSubmit={onSubmitStartStaking}>
              <div className='h-full w-full rounded-2xl bg-[#060818] p-4'>
                <div className='flex justify-end'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='#4c556f'
                    viewBox='0 0 24 24'
                    strokeWidth={2.0}
                    stroke='#4c556f'
                    className='h-6 w-6 cursor-pointer'
                    onClick={() => setIsOpen(false)}
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                  </svg>
                </div>
                <h2 className='text-center font-[ExtraBold] text-xl font-normal text-[#17f3dd]'>Start Staking</h2>
                <div className='mt-4 flex w-full flex-col rounded-2xl border-2 border-[#f67712] bg-[#1e2740] px-3 py-4'>
                  <div className='flex items-center justify-between'>
                    <div className='font-[Manrope-Regular] text-xs text-[#677395]'>Stake</div>
                    <div className='font-[Manrope-Regular] text-xs text-[#677395]'>Balance: 0 AIDOGE</div>
                  </div>
                  <div className='mt-2 flex items-center justify-between'>
                    <input
                      className='w-full bg-[#1e2740]  text-left text-lg font-semibold text-white outline-none'
                      {...register('stake')}
                    />
                    <button className='rounded-xl  border border-[#17f3dd] px-2 text-center text-xs text-[#17f3dd] hover:opacity-80'>
                      max
                    </button>
                  </div>
                </div>
                <div className='mt-4 flex gap-2'>
                  <Button className='btn-outline' type='submit'>
                    Approve
                  </Button>
                  <Button className='btn-primary' disabled={true}>
                    Stake
                  </Button>
                </div>
              </div>
            </form>
          </div>
          {/* </div> */}
        </Modal>
      )}
    </>
  )
}
