import React from 'react'
import Button from '../Button'
import ModalStartStaking from '../ModalStartStaking'
import useModal from 'src/utils/hooks/useModal'

export default function CardStake() {
  const { isModalOpen, setIsModalOpen } = useModal()

  const onclickStartStaking = () => {
    console.log('onclickStartStaking')
    setIsModalOpen(true)
  }
  return (
    <section>
      <div className='mt-10'>
        <div className='rounded-xl border border-[#1e2740] '>
          <div className='flex items-center py-4 pl-4 text-left font-medium text-white'>Co-well Staking Statistics</div>
          <div className='m-0 h-[1px] w-full bg-[#1e2740] p-0'></div>
          <div className='flex justify-around py-3'>
            <div className='my-5 text-center'>
              <div className='text-center text-sm font-normal text-[#677395]'>Current Staking</div>
              <span className='mt-3 block text-center text-lg text-white'>23,760.2T</span>
            </div>
            <div className='my-5 text-center'>
              <div className='text-center text-sm font-normal text-[#677395]'>APY</div>
              <span className='mt-3 block text-center text-lg text-white'>1.109 %</span>
            </div>
          </div>
          <div className='m-0 h-[1px] w-full bg-[#1e2740] p-0'></div>
          <div className='flex flex-col md:flex-row'>
            <div className='flex w-full flex-col items-center px-5 py-5 md:border-r-[1px] md:border-[#1e2740]'>
              <div className='mr-auto text-left font-[ExtraBold] text-sm text-white'>My Staking</div>
              <div className='mt-3 text-center text-sm font-normal text-white'>
                <img src='https://arbdoge.ai/images/tokens/AIDOGE.svg' className='h-9 w-9' alt='logo' />
              </div>
              <div className='mt-3 text-lg uppercase text-white'>0 aidoge</div>
              <Button onClick={onclickStartStaking} className='btn-primary mt-5'>
                Start Staking
              </Button>
            </div>
            <div className='m-0 h-[1px] w-full bg-[#1e2740] p-0 md:hidden'></div>
            <div className='flex w-full flex-col items-center px-5 py-5'>
              <div className='mr-auto text-left font-[ExtraBold] text-sm font-normal text-white'>My Rewards</div>
              <div className='mt-3 text-center text-sm font-normal text-white'>
                <img src='https://arbdoge.ai/images/tokens/AIDOGE.svg' className='h-9 w-9' alt='logo' />
              </div>
              <div className='mt-3 text-lg uppercase text-white'>0 aidoge</div>
              <Button className='btn-outline mt-5'>Claim Rewards</Button>
            </div>
          </div>
        </div>
      </div>
      <ModalStartStaking isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </section>
  )
}
