import React, { useState } from 'react'
import Modal from '../Modal'
import Button from '../Button'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { validDelegateSchema } from 'src/utils/rules'
import useMetamask from 'src/utils/hooks/useMetamask'
import { useProposal } from 'src/utils/hooks/useProposal'
import { transaction } from 'src/constants/transaction'
import { toast } from 'react-toastify'

interface ModalDelegate {
  closeModal: () => void
}
type FormData = {
  address: ''
}

export default function ModalDelegate(props: ModalDelegate) {
  const { closeModal } = props
  const [isSomeoneElse, setIsSomeoneElse] = useState(false)
  const { metamaskCTX, delegate, isLoading } = useProposal()

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      address: ''
    },
    resolver: yupResolver(validDelegateSchema)
  })

  const onSubmitDelegate = handleSubmit(async (data) => {
    // TODO: Call smart contract with address metamaskCTX
    handleDelegate(data.address)
  })
  const onClickDelegate = (type: 'my-self' | 'someone-else') => {
    if (type === 'my-self') {
      // TODO: Call smart contract with address metamaskCTX
      console.log('bbb', metamaskCTX.wallet.accounts[0])
      handleDelegate(metamaskCTX.wallet.accounts[0])
    } else if (type === 'someone-else') {
      setIsSomeoneElse(true)
    }
  }

  const handleDelegate = async (address: string) => {
    console.log('handleDelegate', address)
    const resMetamask = await delegate(address)
    if (resMetamask && resMetamask.status === transaction.success) {
      toast.success('Delegate success', {
        autoClose: 1000
      })
      closeModal()
    }
  }

  return (
    <Modal onClose={() => closeModal()}>
      <div className='relative mx-auto mt-2 w-[350px] rounded-2xl border-transparent bg-gradient-to-tl from-[#ffe96f] to-[#00e4ce] p-[2px]'>
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
          {!isSomeoneElse && (
            <div className='mt-4'>
              <Button
                onClick={() => onClickDelegate('my-self')}
                kindButton='active'
                className='w-full flex-col items-center justify-center rounded-2xl border-2 border-[#00e4ce] bg-[#1e2740] px-3 py-4 font-[Manrope-Regular] text-sm text-white hover:opacity-80'
              >
                Myself
              </Button>
              <Button
                onClick={() => onClickDelegate('someone-else')}
                kindButton='active'
                className='mt-4 w-full flex-col items-center justify-center rounded-2xl border-2 border-[#00e4ce] bg-[#1e2740] px-3 py-4 font-[Manrope-Regular] text-sm text-white hover:opacity-80'
              >
                Someone else
              </Button>
            </div>
          )}
          {isSomeoneElse && (
            <form onSubmit={onSubmitDelegate} className='mt-4'>
              <div className=''>
                <label htmlFor='name' className='mb-2 block text-sm font-medium text-white'>
                  Address
                </label>
                <input
                  type='text'
                  id='name'
                  className='block w-full rounded-lg border border-gray-600 bg-gray-900 p-2.5  text-sm text-white placeholder-gray-400 focus:border-[#9c51ff] focus:outline-none  focus:ring-1'
                  placeholder='Enter an ETH address'
                  {...register('address')}
                />
                <div className='my-1 min-h-[1.25rem] text-left text-sm font-normal text-[#ff0000]'>
                  {errors.address?.message}
                </div>
              </div>
              <Button
                kindButton='active'
                isLoading={isLoading}
                disabled={isLoading}
                iconLoading={
                  <svg
                    viewBox='0 0 24 24'
                    fill='#17f3dd'
                    width='20px'
                    xmlns='http://www.w3.org/2000/svg'
                    className='ml-1 h-5 w-5 animate-spin'
                  >
                    <path d='M12 6V7.79C12 8.24 12.54 8.46 12.85 8.14L15.64 5.35C15.84 5.15 15.84 4.84 15.64 4.64L12.85 1.85C12.54 1.54 12 1.76 12 2.21V4C7.58 4 4 7.58 4 12C4 13.04 4.2 14.04 4.57 14.95C4.84 15.62 5.7 15.8 6.21 15.29C6.48 15.02 6.59 14.61 6.44 14.25C6.15 13.56 6 12.79 6 12C6 8.69 8.69 6 12 6ZM17.79 8.71C17.52 8.98 17.41 9.4 17.56 9.75C17.84 10.45 18 11.21 18 12C18 15.31 15.31 18 12 18V16.21C12 15.76 11.46 15.54 11.15 15.86L8.36 18.65C8.16 18.85 8.16 19.16 8.36 19.36L11.15 22.15C11.46 22.46 12 22.24 12 21.8V20C16.42 20 20 16.42 20 12C20 10.96 19.8 9.96 19.43 9.05C19.16 8.38 18.3 8.2 17.79 8.71Z' />
                  </svg>
                }
                type='submit'
                className='w-full rounded-xl bg-gradient-to-bl from-[#7d33fa] to-[#175ff3] px-4 py-3 text-center text-sm font-normal text-white hover:opacity-80'
              >
                Delegate votes
              </Button>
            </form>
          )}
        </div>
      </div>
    </Modal>
  )
}
