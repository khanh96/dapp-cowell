import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { MetamaskContext } from 'src/contexts/metamask.context'
import { transaction } from 'src/constants/transaction'
import useModal from './useModal'
import {
  readAllowance,
  readBalanceOfContract,
  readEarnedToken,
  readStakingBalanceOfContract,
  writeApprove,
  writeGetReward,
  writeStake,
  writeWithdraw
} from 'src/abi/common.abi'
import useMetamask from './useMetamask'

export default function useStaking() {
  const { isModalOpen, closeModal, openModal } = useModal()
  const { wallet, contractToken, contractStaking, stakingBalance, setStakingBalance, setUserBalance, setEarnedTokens } =
    useMetamask()
  const [isLoadingApprove, setIsLoadingApprove] = useState<boolean>(false)
  const [isLoadingStake, setIsLoadingStake] = useState<boolean>(false)
  const [isDisabledStake, setIsDisabledStake] = useState<boolean>(false)
  const [isLoadingClaimReward, setIsLoadingClaimReward] = useState<boolean>(false)
  const [isLoadingUnstaking, setIsLoadingUnstaking] = useState<boolean>(false)
  const [isOpenModalUnStaking, setIsOpenModalUnStaking] = useState(false)

  const stake = async (amount: string) => {
    if (contractStaking && contractToken) {
      try {
        setIsLoadingStake(true)
        const transactionStake = await writeStake(contractToken, contractStaking, amount)
        transactionStake.wait().then(async (res) => {
          if (res.status === transaction.success) {
            // transaction success
            const tokenBalance = await readStakingBalanceOfContract(contractStaking, wallet.accounts[0])
            const tokenBalanceOfContract = await readBalanceOfContract(contractToken, wallet.accounts[0])
            const earnedTokensOfContract = await readEarnedToken(contractStaking, wallet.accounts[0])
            setStakingBalance(tokenBalance)
            setUserBalance(tokenBalanceOfContract)
            setEarnedTokens(earnedTokensOfContract)
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
    if (contractToken) {
      try {
        // const transactionApprove = await approveWrite(contractToken, signer, amount)
        const transactionApprove = await writeApprove(contractToken, amount)
        transactionApprove.wait().then(async (res) => {
          if (res.status === transaction.success) {
            // transaction success
            const numberAllowance = await readAllowance(contractToken, wallet.accounts[0])
            // allow transfer token with numberAllowance
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
    if (contractToken) {
      // const numberAllowance = await allowanceRead(contractToken, signer)
      const numberAllowance = await readAllowance(contractToken, wallet.accounts[0])
      return Number(numberAllowance)
    }
  }

  const getReward = async () => {
    setIsLoadingClaimReward(true)
    if (contractStaking && contractToken) {
      try {
        const transactionReward = await writeGetReward(contractStaking)
        transactionReward.wait().then(async (res) => {
          if (res.status === transaction.success) {
            const earnedTokensOfContract = await readEarnedToken(contractStaking, wallet.accounts[0])
            const tokenBalanceOfContract = await readBalanceOfContract(contractToken, wallet.accounts[0])
            setEarnedTokens(earnedTokensOfContract)
            setUserBalance(tokenBalanceOfContract)
          }
          setIsLoadingClaimReward(false)
        })
      } catch (error) {
        console.log(error)
        setIsLoadingClaimReward(false)
      }
    }
  }

  const withdraw = async (amount: string) => {
    setIsLoadingUnstaking(true)
    if (contractStaking && contractToken) {
      try {
        const transactionWithWithdraw = await writeWithdraw(contractToken, contractStaking, amount)
        transactionWithWithdraw.wait().then(async (res) => {
          if (res && res.status === transaction.success) {
            console.log('transactionWithWithdraw', res)
            const tokenBalance = await readStakingBalanceOfContract(contractStaking, wallet.accounts[0])
            const tokenBalanceOfContract = await readBalanceOfContract(contractToken, wallet.accounts[0])
            setUserBalance(tokenBalanceOfContract)
            setStakingBalance(tokenBalance)
            setIsLoadingUnstaking(false)
            setIsOpenModalUnStaking(false)
            return res
          }
        })
      } catch (error) {
        console.log(error)
        setIsLoadingUnstaking(false)
      }
    }
  }

  // Check if allow transfer wallet
  useEffect(() => {
    if (contractToken) {
      readAllowance(contractToken, wallet.accounts[0]).then((res) => {
        if (Number(res) <= 0) {
          setIsDisabledStake(true)
        } else {
          setIsDisabledStake(false)
        }
      })
    }
  }, [contractToken, wallet.accounts, stakingBalance])

  return {
    checkAllowanceToken,
    approveStaking,
    isLoadingApprove,
    isDisabledStake,
    stake,
    isLoadingStake,
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
