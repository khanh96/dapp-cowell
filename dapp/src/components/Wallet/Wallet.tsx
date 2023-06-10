import { Link } from 'react-router-dom'
import { path } from 'src/constants/path'

export default function Wallet() {
  return (
    <div className='relative mx-auto mt-2 w-[300px] rounded-2xl border-transparent bg-gradient-to-tl from-[#ffe96f] to-[#00e4ce] p-[2px]'>
      <div className='h-full w-full rounded-2xl bg-[#060818] p-3'>
        <div className='flex flex-col items-center'>
          <div className='mt-4 text-center'>
            <img src='https://arbdoge.ai/images/tokens/AIDOGE.svg' alt='AIDOGE' className='h-10 w-10' />
          </div>
          <div className='mt-2 text-lg font-bold text-white'>
            <span>0.000 AIDOGE</span>
          </div>
          <div className='mt-2 text-xs font-bold text-[#677395]'>
            <span>$0.000</span>
          </div>
          <Link
            to={path.home}
            className='mt-5 w-full rounded-xl bg-gradient-to-bl from-[#33d4fa] to-[#17f3dd] px-4 py-3 text-center text-sm font-normal text-black  hover:opacity-80'
          >
            Buy AIDOGE
          </Link>
          <Link
            to={path.home}
            className='mt-3 w-full rounded-xl bg-gradient-to-bl from-[#7d33fa] to-[#175ff3] px-4 py-3 text-center text-sm font-normal text-white hover:opacity-80'
          >
            My NFT (0)
          </Link>
          <button className='mt-3 w-full rounded-xl bg-[#1e2740] px-4 py-3 text-center text-sm font-normal  text-white hover:opacity-80'>
            Disconnect
          </button>
        </div>
      </div>
    </div>
  )
}