import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import Button from '../Button'
import ModalStartStaking from '../ModalStartStaking'
import useModal from 'src/utils/hooks/useModal'
import { MetamaskContext } from 'src/contexts/metamask.context'
import useStaking from 'src/utils/hooks/useStaking'
import ModalUnStaking from '../ModalUnstaking/ModalUnstaking'
import { formatEther } from 'ethers/lib/utils'
import { BigNumber } from 'ethers'
import logoCoin from 'src/assets/images/logo-cw.png'

export default function CardStake() {
  const funcOpenModalRef = useRef<{ openModal: () => void; getReward: () => void }>({
    openModal: () => null,
    getReward: () => null
  })
  // const { isModalOpen, openModal } = useStaking()
  const { stakingBalance, tokenSymbol, totalSupply, earnedTokens, contractStaking, signer, setTotalSupply } =
    useContext(MetamaskContext)
  const { isLoadingClaimReward, setIsOpenModalUnStaking, isOpenModalUnStaking, withdraw, isLoadingUnstaking } =
    useStaking()
  console.log('isOpenModalUnStaking=>', isOpenModalUnStaking)

  const onClickStartStaking = () => {
    funcOpenModalRef.current.openModal()
  }

  const onClickUnStaking = () => {
    console.log('onClickUnStaking')
    setIsOpenModalUnStaking(true)
  }

  const onClickClaimReward = () => {
    console.log('Claim Rewards')
    funcOpenModalRef.current.getReward()
  }

  const isDisableBtnClaimReward = useMemo(() => {
    if (Number(earnedTokens) <= 0) {
      return true
    }
    return false
  }, [earnedTokens])

  const getTotalSupply = useCallback(async () => {
    if (contractStaking && signer) {
      const contractWithSigner = contractStaking.connect(signer)
      const totalSupplyOfContract = await contractWithSigner.totalSupply()
      console.log('formatEther(totalSupplyOfContract),', formatEther(totalSupplyOfContract))
      setTotalSupply(formatEther(totalSupplyOfContract))
    }
  }, [signer, contractStaking, setTotalSupply])

  useEffect(() => {
    //from: BigNumber, to: any, value, event
    contractStaking?.on('Withdraw', (from: BigNumber, to: any, value, event) => {
      console.log('listen Withdraw')
      if (to.transactionHash && signer) {
        console.log('call total supply')
        getTotalSupply()
      }
    })
    contractStaking?.on('Stake', (from: BigNumber, to: any, value, event) => {
      console.log('listen Stake')
      if (to.transactionHash && signer) {
        getTotalSupply()
      }
    })
  }, [contractStaking, stakingBalance, signer, getTotalSupply])

  console.log('claimReward', isDisableBtnClaimReward)
  return (
    <section>
      <div className='mt-10'>
        <div className='rounded-xl border border-[#1e2740] '>
          <div className='flex items-center py-4 pl-4 text-left font-medium text-white'>
            {tokenSymbol} Staking Statistics
          </div>
          <div className='m-0 h-[1px] w-full bg-[#1e2740] p-0'></div>
          <div className='flex justify-around py-3'>
            <div className='my-5 text-center'>
              <div className='text-center text-sm font-normal text-[#677395]'>Current Staking</div>
              <span className='mt-3 block text-center text-lg text-white'>{Number(totalSupply).toFixed(0)}</span>
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
                {/* <img src={logoCoin} alt='logo' className='h-9 w-11' /> */}
              </div>
              <div className='mt-3 text-lg uppercase text-white'>
                {stakingBalance ? stakingBalance : '0.000'} {tokenSymbol}
              </div>
              <div className='mt-5 flex w-full gap-3'>
                <Button onClick={onClickStartStaking} className='btn-primary'>
                  Start Staking
                </Button>
                <Button
                  disabled={Number(stakingBalance) <= 0}
                  onClick={onClickUnStaking}
                  className='w-full rounded-xl bg-gradient-to-bl from-[#7d33fa] to-[#175ff3] px-4 py-3 text-center text-sm font-normal text-white hover:opacity-80'
                >
                  Unstaking
                </Button>
              </div>
            </div>
            <div className='m-0 h-[1px] w-full bg-[#1e2740] p-0 md:hidden'></div>
            <div className='flex w-full flex-col items-center px-5 py-5'>
              <div className='mr-auto text-left font-[ExtraBold] text-sm font-normal text-white'>My Rewards</div>
              <div className='mt-3 text-center text-sm font-normal text-white'>
                <img src='https://arbdoge.ai/images/tokens/AIDOGE.svg' className='h-9 w-9' alt='logo' />
              </div>
              <div className='mb-5 mt-3 text-lg uppercase text-white'>
                {earnedTokens ? Number(earnedTokens).toFixed(2) : '0.000'} {tokenSymbol}
              </div>
              <Button
                disabled={isDisableBtnClaimReward}
                onClick={onClickClaimReward}
                className='btn-outline flex justify-center'
                iconPosition='end'
                icon={
                  isLoadingClaimReward && (
                    <svg
                      viewBox='0 0 24 24'
                      fill='#17f3dd'
                      width='20px'
                      xmlns='http://www.w3.org/2000/svg'
                      className='ml-1 h-5 w-5 animate-spin'
                    >
                      <path d='M12 6V7.79C12 8.24 12.54 8.46 12.85 8.14L15.64 5.35C15.84 5.15 15.84 4.84 15.64 4.64L12.85 1.85C12.54 1.54 12 1.76 12 2.21V4C7.58 4 4 7.58 4 12C4 13.04 4.2 14.04 4.57 14.95C4.84 15.62 5.7 15.8 6.21 15.29C6.48 15.02 6.59 14.61 6.44 14.25C6.15 13.56 6 12.79 6 12C6 8.69 8.69 6 12 6ZM17.79 8.71C17.52 8.98 17.41 9.4 17.56 9.75C17.84 10.45 18 11.21 18 12C18 15.31 15.31 18 12 18V16.21C12 15.76 11.46 15.54 11.15 15.86L8.36 18.65C8.16 18.85 8.16 19.16 8.36 19.36L11.15 22.15C11.46 22.46 12 22.24 12 21.8V20C16.42 20 20 16.42 20 12C20 10.96 19.8 9.96 19.43 9.05C19.16 8.38 18.3 8.2 17.79 8.71Z' />
                    </svg>
                  )
                }
              >
                Claim Rewards
              </Button>
            </div>
          </div>
        </div>
      </div>
      <ModalStartStaking ref={funcOpenModalRef} />
      {isOpenModalUnStaking && (
        <ModalUnStaking
          closeModalUnStaking={() => setIsOpenModalUnStaking(false)}
          withdraw={withdraw}
          isLoadingUnstaking={isLoadingUnstaking}
        />
      )}
    </section>
  )
}
