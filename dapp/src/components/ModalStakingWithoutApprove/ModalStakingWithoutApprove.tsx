import React from 'react'
import Modal from '../Modal'
import Button from '../Button'
import useStaking from 'src/utils/hooks/useStaking'
import useMetamask from 'src/utils/hooks/useMetamask'
import InputNumber from '../InputNumber'
import { Controller, useForm } from 'react-hook-form'
import useEIP2612 from 'src/utils/hooks/useEIP2612'

interface ModalStakingWithoutApproveProps {
  closeModal: () => void
}

type FormData = {
  stake: string
}
function ModalStakingWithoutApprove(props: ModalStakingWithoutApproveProps) {
  const { closeModal } = props
  const { userBalance, tokenSymbol, contractToken, wallet } = useMetamask()
  const { signature } = useEIP2612()

  const {
    formState: { errors },
    control,
    handleSubmit
  } = useForm<FormData>({
    defaultValues: {
      stake: '0'
    },
    shouldFocusError: false // off tự động focus để tự handle focus
  })

  const handleClickStake = handleSubmit((data) => {
    console.log('handleClickStake', data)
    signature()
  })
  return (
    <Modal onClose={closeModal}>
      <div className='relative mx-auto mt-2 w-[350px] rounded-2xl border-transparent bg-gradient-to-tl from-[#ffe96f] to-[#00e4ce] p-[2px]'>
        <form onSubmit={handleClickStake}>
          <div className='h-full w-full rounded-2xl bg-darkBlue p-4'>
            <div className='flex justify-end'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='#4c556f'
                viewBox='0 0 24 24'
                strokeWidth={2.0}
                stroke='#4c556f'
                className='h-6 w-6 cursor-pointer'
                onClick={closeModal}
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
              </svg>
            </div>
            <h2 className='text-center font-[ExtraBold] text-xl font-normal text-[#17f3dd]'>Start Staking</h2>
            <div className='mt-4 flex w-full flex-col rounded-2xl border-2 border-[#f67712] bg-[#1e2740] px-3 py-4'>
              <div className='flex items-center justify-between'>
                <div className='font-[Manrope-Regular] text-xs text-[#677395]'>Stake</div>
                <div className='font-[Manrope-Regular] text-xs text-[#677395]'>
                  Balance: {Number(userBalance).toFixed(4)} {tokenSymbol}
                </div>
              </div>
              <div className='mt-2 flex items-center justify-between'>
                <Controller
                  control={control}
                  name='stake'
                  render={({ field, formState, fieldState }) => (
                    <InputNumber
                      classNameInput='w-full bg-[#1e2740]  text-left text-lg font-semibold text-white outline-none placeholder:text-[#677395] placeholder:text-sm'
                      classNameWrap=''
                      type='text'
                      placeholder='enter amount token'
                      onChange={(event) => {
                        field.onChange(event)
                      }}
                      value={field.value}
                      name={field.name}
                      ref={field.ref}
                      onBlur={field.onBlur}
                      classNameError='hidden'
                    />
                  )}
                />
                <button
                  onClick={() => null}
                  className='rounded-xl  border border-[#17f3dd] px-2 text-center text-xs text-[#17f3dd] hover:opacity-80'
                  type='button'
                >
                  max
                </button>
              </div>
            </div>
            {/* <div className='my-1 min-h-[1.25rem] text-left text-sm font-normal text-[#ff0000]'>
              {errors.stake?.message}
            </div> */}
            <div className='mt-4 flex gap-2'>
              <Button
                kindButton='active'
                className='btn-primary flex justify-center'
                // disabled={isLoadingStake}
                // isLoading={isLoadingStake}
                iconLoading={
                  <svg
                    viewBox='0 0 24 24'
                    fill='#060818'
                    width='20px'
                    xmlns='http://www.w3.org/2000/svg'
                    className='ml-1 h-5 w-5 animate-spin'
                  >
                    <path d='M12 6V7.79C12 8.24 12.54 8.46 12.85 8.14L15.64 5.35C15.84 5.15 15.84 4.84 15.64 4.64L12.85 1.85C12.54 1.54 12 1.76 12 2.21V4C7.58 4 4 7.58 4 12C4 13.04 4.2 14.04 4.57 14.95C4.84 15.62 5.7 15.8 6.21 15.29C6.48 15.02 6.59 14.61 6.44 14.25C6.15 13.56 6 12.79 6 12C6 8.69 8.69 6 12 6ZM17.79 8.71C17.52 8.98 17.41 9.4 17.56 9.75C17.84 10.45 18 11.21 18 12C18 15.31 15.31 18 12 18V16.21C12 15.76 11.46 15.54 11.15 15.86L8.36 18.65C8.16 18.85 8.16 19.16 8.36 19.36L11.15 22.15C11.46 22.46 12 22.24 12 21.8V20C16.42 20 20 16.42 20 12C20 10.96 19.8 9.96 19.43 9.05C19.16 8.38 18.3 8.2 17.79 8.71Z' />
                  </svg>
                }
                onClick={handleClickStake}
                type='submit'
              >
                Stake
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default ModalStakingWithoutApprove
