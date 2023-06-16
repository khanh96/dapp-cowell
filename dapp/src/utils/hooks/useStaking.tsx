import { BigNumber, ethers } from 'ethers'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { MetamaskContext } from 'src/contexts/metamask.context'
import { formatEther, parseUnits } from '../utils'
import { transaction } from 'src/constants/transaction'
import useModal from './useModal'

export default function useStaking() {
  const { isModalOpen, closeModal, openModal } = useModal()
  const { contractToken, signer, defaultAccount, contractStaking, setStakingBalance, setUserBalance, setEarnedTokens } =
    useContext(MetamaskContext)
  const [isLoadingApprove, setIsLoadingApprove] = useState<boolean>(false)
  const [isLoadingStake, setIsLoadingStake] = useState<boolean>(false)
  const [isDisabledStake, setIsDisabledStake] = useState<boolean>(false)
  const [isLoadingClaimReward, setIsLoadingClaimReward] = useState<boolean>(false)
  const [isLoadingUnstaking, setIsLoadingUnstaking] = useState<boolean>(false)
  const [isOpenModalUnStaking, setIsOpenModalUnStaking] = useState(false)

  const balanceOfRead = async (contract: ethers.Contract, newAccount: ethers.providers.JsonRpcSigner) => {
    const contractWithSigner = contract.connect(newAccount)
    const tokenBalance = await contractWithSigner.balanceOf(defaultAccount)
    return formatEther(tokenBalance)
  }

  const allowanceRead = useCallback(
    async (contract: ethers.Contract, newAccount: ethers.providers.JsonRpcSigner) => {
      const contractWithSigner = contract.connect(newAccount)
      const allowStakingToken = await contractWithSigner.allowance(
        defaultAccount,
        import.meta.env.VITE_CONTRACT_STAKING
      )
      return formatEther(allowStakingToken)
    },
    [defaultAccount]
  )

  const approveWrite = async (
    contract: ethers.Contract,
    newAccount: ethers.providers.JsonRpcSigner,
    amount: string
  ) => {
    const contractWithSigner = contract.connect(newAccount)
    const tokenUnits = await contract.decimals()
    const tokenAmount = parseUnits(amount, tokenUnits)
    const approveResult = await contractWithSigner.approve(import.meta.env.VITE_CONTRACT_STAKING, tokenAmount)
    return approveResult
  }

  const stakeWrite = async (contract: ethers.Contract, newAccount: ethers.providers.JsonRpcSigner, amount: string) => {
    const contractWithSigner = contract.connect(newAccount)
    const tokenUnits = await (contractToken as ethers.Contract).decimals()
    console.log(amount)
    const tokenAmount = parseUnits(amount, tokenUnits)
    const stakeResult = await contractWithSigner.stake(tokenAmount)
    return stakeResult
  }

  const stake = async (amount: string) => {
    if (contractStaking && signer) {
      try {
        setIsLoadingStake(true)
        const transactionStake = await stakeWrite(contractStaking, signer, amount)
        transactionStake.wait().then(async (res: any) => {
          if (res.status === transaction.success) {
            // transaction success
            const tokenBalance = await balanceOfRead(contractStaking, signer)
            console.log('result', tokenBalance)

            setStakingBalance(tokenBalance)
            if (contractToken) {
              const tokenBalanceOfContract = await contractToken.balanceOf(defaultAccount)
              setUserBalance(formatEther(tokenBalanceOfContract))
            }
            const contractWithSigner = contractStaking.connect(signer)
            const earnedTokensOfContract = await contractWithSigner.earned(defaultAccount)
            setEarnedTokens(formatEther(earnedTokensOfContract))
            setIsLoadingStake(false)
            closeModal()
          }
        })
        return {
          message: 'Stake success'
        }
      } catch (error: any) {
        if (error.code === 'ACTION_REJECTED') {
          toast.error('user rejected transaction')
        }
        console.log('error', error)
        if (error.code === -32603) {
          console.log(error.message)
        }

        setIsDisabledStake(false)
        setIsLoadingStake(false)
      }
    }
  }

  const approveStaking = async (amount: string) => {
    setIsLoadingApprove(true)

    if (contractToken && signer) {
      try {
        const transactionApprove = await approveWrite(contractToken, signer, amount)
        transactionApprove.wait().then(async (res: any) => {
          if (res.status === transaction.success) {
            // transaction success
            const numberAllowance = await allowanceRead(contractToken, signer)
            // allow transfer token with numberAllowance
            console.log('number allow => ', numberAllowance)
            setIsLoadingApprove(false)
            if (Number(numberAllowance) >= 0) {
              setIsDisabledStake(false)
            }
          }
        })
        // TODO: approve thanh coong
        // Call stake
      } catch (error: any) {
        console.log(error.code)
        if (error.code === 'ACTION_REJECTED') {
          toast.error('user rejected transaction')
        }
        setIsLoadingApprove(false)
      }
    }
  }

  const checkAllowanceToken = async () => {
    if (contractToken && signer) {
      const numberAllowance = await allowanceRead(contractToken, signer)
      return Number(numberAllowance)
    }
  }

  const getRewardWrite = async (contract: ethers.Contract, newAccount: ethers.providers.JsonRpcSigner) => {
    const reward = await contract.connect(newAccount).getReward()
    return reward
  }

  const getReward = async () => {
    setIsLoadingClaimReward(true)
    if (contractStaking && signer) {
      try {
        const transactionReward = await getRewardWrite(contractStaking, signer)
        transactionReward.wait().then(async (res: any) => {
          if (res.status === transaction.success) {
            const contractWithSigner = contractStaking.connect(signer)
            const earnedTokensOfContract = await contractWithSigner.earned(defaultAccount)
            setEarnedTokens(formatEther(earnedTokensOfContract))
            if (contractToken) {
              const tokenBalanceOfContract = await contractToken.balanceOf(defaultAccount)
              setUserBalance(formatEther(tokenBalanceOfContract))
            }
          }
          setIsLoadingClaimReward(false)
        })
      } catch (error) {
        console.log(error)
        setIsLoadingClaimReward(false)
      }
    }
  }

  const withdrawWrite = async (
    contract: ethers.Contract,
    newAccount: ethers.providers.JsonRpcSigner,
    amount: string
  ) => {
    const contractWithSigner = contract.connect(newAccount)
    const tokenUnits = await (contractToken as ethers.Contract).decimals()
    console.log(amount)
    const tokenAmount = parseUnits(amount, tokenUnits)
    const withdrawResult = await contractWithSigner.withdraw(tokenAmount)
    return withdrawResult
  }

  const withdraw = async (amount: string) => {
    setIsLoadingUnstaking(true)
    if (contractStaking && signer) {
      try {
        const transactionWithWithdraw = await withdrawWrite(contractStaking, signer, amount)
        transactionWithWithdraw.wait().then(async (res: any) => {
          if (res && res.status === transaction.success) {
            console.log('transactionWithWithdraw', res)
            const tokenBalance = await balanceOfRead(contractStaking, signer)
            console.log('result', tokenBalance)
            setStakingBalance(tokenBalance)
            if (contractToken) {
              const tokenBalanceOfContract = await contractToken.balanceOf(defaultAccount)
              setUserBalance(formatEther(tokenBalanceOfContract))
            }
            setIsLoadingUnstaking(false)
            setIsOpenModalUnStaking(false)
            console.log('zzzzzz')
            return res
          }
        })
      } catch (error) {
        console.log(error)
        setIsLoadingUnstaking(false)
      }
    }
  }

  useEffect(() => {
    if (contractToken && signer) {
      allowanceRead(contractToken, signer).then((res) => {
        console.log(`Allowance: ${res} CW`)
        if (Number(res) <= 0) {
          setIsDisabledStake(true)
        } else {
          console.log('bbbb')
          setIsDisabledStake(false)
        }
      })
    }
  }, [allowanceRead, contractToken, signer])

  return {
    checkAllowanceToken,
    approveStaking,
    isLoadingApprove,
    isDisabledStake,
    stake,
    isLoadingStake,
    balanceOfRead,
    isModalOpen,
    openModal,
    closeModal,
    getReward,
    isLoadingClaimReward,
    withdraw,
    isLoadingUnstaking,
    isOpenModalUnStaking,
    setIsOpenModalUnStaking
  }
}
