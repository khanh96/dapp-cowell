import React from 'react'

export default function Earn() {
  return (
    <main className='container max-w-[960px]'>
      <h2 className='mx-auto mt-10 text-center text-3xl font-normal text-white'>Staking to Earn</h2>
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
              <div className='mr-auto text-left text-sm font-normal text-white'>My Staking</div>
              <div className='mt-3 text-center text-sm font-normal text-white'>
                <img src='https://arbdoge.ai/images/tokens/AIDOGE.svg' className='h-9 w-9' alt='logo' />
              </div>
              <div className='mt-3 text-lg uppercase text-white'>0 aidoge</div>
              <div className='mt-3 w-full rounded-xl bg-gradient-to-r from-[#33d4fa] to-[#17f3dd] px-6 py-3 text-center text-sm text-black hover:opacity-80'>
                Start Staking
              </div>
            </div>
            <div className='m-0 h-[1px] w-full bg-[#1e2740] p-0 md:hidden'></div>
            <div className='flex w-full flex-col items-center px-5 py-5'>
              <div className='mr-auto text-left text-sm font-normal text-white'>My Rewards</div>
              <div className='mt-3 text-center text-sm font-normal text-white'>
                <img src='https://arbdoge.ai/images/tokens/AIDOGE.svg' className='h-9 w-9' alt='logo' />
              </div>
              <div className='mt-3 text-lg uppercase text-white'>0 aidoge</div>
              <div className='mt-3 w-full rounded-xl border border-[#17f3dd] px-6 py-3 text-center text-sm text-[#17f3dd] hover:opacity-80'>
                Claim Rewards
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
