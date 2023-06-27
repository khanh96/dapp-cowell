import { Link } from 'react-router-dom'
import { path } from 'src/constants/path'
import logoCoin from 'src/assets/images/logo-cw.png'
import useMetamask from 'src/utils/hooks/useMetamask'
import Button from '../Button'
import { CHAIN_ID_OF_NETWORKS, NETWORKS } from 'src/constants/metamask.constants'

export default function Wallet() {
  const { userBalance, tokenSymbol, disconnectWallet, wallet, switchChain } = useMetamask()

  const onClickDisconnectWallet = async () => {
    disconnectWallet()
  }
  const onClickSwitchNetwork = (chainId: string) => {
    switchChain(chainId)
  }

  return (
    <div className='relative mx-auto mt-2 w-[300px] rounded-2xl border-transparent bg-gradient-to-tl from-[#ffe96f] to-[#00e4ce] p-[2px]'>
      <div className='h-full w-full rounded-2xl bg-darkBlue p-3'>
        <div className='flex flex-col items-center'>
          <div className='mt-4 text-center'>
            {/* <img src='https://arbdoge.ai/images/tokens/AIDOGE.svg' alt='AIDOGE' className='h-10 w-10' /> */}
            <img src={logoCoin} alt='logo' className='h-9 w-11' />
          </div>
          <div className='mt-2 text-lg font-bold text-white'>
            <span>
              {Number(userBalance).toFixed(4)} {tokenSymbol}
            </span>
          </div>
          <div className='mt-2 text-xs font-bold text-[#677395]'>
            <span>{Number(wallet.balance).toFixed(4)} ETH</span>
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
          <Button
            kindButton='active'
            className='mt-5 w-full rounded-xl bg-gradient-to-bl from-[#33d4fa] to-[#17f3dd] px-4 py-3 text-center text-sm font-normal text-black  hover:opacity-80'
            onClick={() => onClickSwitchNetwork(CHAIN_ID_OF_NETWORKS.arbitrum)}
          >
            Switch network Arbitrum
          </Button>
          <button
            onClick={onClickDisconnectWallet}
            className='mt-3 w-full rounded-xl bg-[#1e2740] px-4 py-3 text-center text-sm font-normal  text-white hover:opacity-80'
          >
            Disconnect
          </button>
        </div>
      </div>
    </div>
  )
}
