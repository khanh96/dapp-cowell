export default function ProposalCreate() {
  return (
    <main className='container max-w-[960px]'>
      <section>
        <div className='mt-10'>
          <div className='rounded-xl border border-[#1e2740] '>
            <div className='flex items-center py-4 pl-4 text-left font-medium text-white'>Staking Statistics</div>
            <div className='m-0 h-[1px] w-full bg-[#1e2740] p-0'></div>
            <div className='flex justify-around py-3'>
              <div className='my-5 text-center'>
                <div className='text-center text-sm font-normal text-[#677395]'>Current Staking</div>
                <span className='mt-3 block text-center text-lg text-white'>{1212}</span>
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
                <div className='mt-3 text-lg uppercase text-white'></div>
                <div className='mt-5 flex w-full gap-3'></div>
              </div>
              <div className='m-0 h-[1px] w-full bg-[#1e2740] p-0 md:hidden'></div>
              <div className='flex w-full flex-col items-center px-5 py-5'>
                <div className='mr-auto text-left font-[ExtraBold] text-sm font-normal text-white'>My Rewards</div>
                <div className='mt-3 text-center text-sm font-normal text-white'>
                  <img src='https://arbdoge.ai/images/tokens/AIDOGE.svg' className='h-9 w-9' alt='logo' />
                </div>
                <div className='mb-5 mt-3 text-lg uppercase text-white'>1231`31`</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}