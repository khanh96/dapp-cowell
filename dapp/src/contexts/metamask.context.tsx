import { ethers } from 'ethers'
import React, { useContext, useEffect, useState } from 'react'
import { formatEther } from 'src/utils/utils'
import ERC20_ABI_TOKEN from '../abi/ERC20_ABI_TOKEN.json'
import ERC20_ABI_STAKING from '../abi/ERC20_ABI_STAKING.json'
import useStaking from 'src/utils/hooks/useStaking'

interface MetamaskContextInterface {
  defaultAccount: string
  setDefaultAccount: React.Dispatch<React.SetStateAction<string>>
  errorMessage: string
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>
  userBalance: string
  setUserBalance: React.Dispatch<React.SetStateAction<string>>
  connectWalletHandler: () => void
  tokenSymbol: string
  contractToken?: ethers.Contract
  signer?: ethers.providers.JsonRpcSigner
  contractStaking?: ethers.Contract
  stakingBalance: string
  setStakingBalance: React.Dispatch<React.SetStateAction<string>>
}

export const initialMetamaskContext = {
  defaultAccount: '',
  setDefaultAccount: () => null,
  errorMessage: '',
  setErrorMessage: () => null,
  userBalance: '',
  setUserBalance: () => null,
  connectWalletHandler: () => null,
  tokenSymbol: 'CW',
  stakingBalance: '',
  setStakingBalance: () => null
}

export const MetamaskContext = React.createContext<MetamaskContextInterface>(initialMetamaskContext)

const provider = new ethers.providers.Web3Provider(window.ethereum)

export const MetamaskContextProvider = ({
  children,
  defaultValue = initialMetamaskContext
}: {
  children: React.ReactNode
  defaultValue?: MetamaskContextInterface
}) => {
  const [defaultAccount, setDefaultAccount] = useState<string>(defaultValue.defaultAccount)
  const [errorMessage, setErrorMessage] = useState<string>(defaultValue.errorMessage)
  const [userBalance, setUserBalance] = useState<string>(defaultValue.userBalance)
  const [tokenSymbol, setTokenSymbol] = useState<string>(defaultValue.tokenSymbol)
  const [contractToken, setContractToken] = useState<ethers.Contract>()
  const [contractStaking, setContractStaking] = useState<ethers.Contract>()
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner>()
  const [stakingBalance, setStakingBalance] = useState<string>(defaultValue.stakingBalance)

  const connectWalletHandler = () => {
    if (window.ethereum) {
      provider.send('eth_requestAccounts', []).then(async () => {
        await accountChangedHandler(provider.getSigner())
      })
    } else {
      setErrorMessage('Please Install Metamask!!!')
    }
  }

  const accountChangedHandler = async (newAccount: ethers.providers.JsonRpcSigner) => {
    const contractTokenCowell = new ethers.Contract(
      import.meta.env.VITE_CONTRACT_TOKEN_COWELL,
      ERC20_ABI_TOKEN,
      newAccount
    )
    const contractStakingCowell = new ethers.Contract(
      import.meta.env.VITE_CONTRACT_STAKING,
      ERC20_ABI_STAKING,
      newAccount
    )
    setContractStaking(contractStakingCowell)
    setContractToken(contractTokenCowell)
    setSigner(newAccount)
    try {
      const tokenSymbol = await contractTokenCowell.symbol()
      setTokenSymbol(tokenSymbol)
      const address = await newAccount.getAddress() // address account metamask
      setDefaultAccount(address)
      const balance = await newAccount.getBalance() // native token
      const tokenBalanceOfContract = await contractTokenCowell.balanceOf(address)
      setUserBalance(formatEther(tokenBalanceOfContract))
      const contractWithSigner = contractStakingCowell.connect(newAccount)
      const stakingBalanceOfContract = await contractWithSigner.balanceOf(address)
      setStakingBalance(formatEther(stakingBalanceOfContract))
    } catch (error) {
      console.log(error)
    }
    // const userBalance = await getUserBalance(address)
  }

  // TODO: lam sao de

  // const getUserBalance = async (address: string) => {
  //   const balance = await provider.getBalance(address, 'latest')
  // }
  console.log('stakingBalance=>', stakingBalance)

  return (
    <MetamaskContext.Provider
      value={{
        defaultAccount,
        setDefaultAccount,
        errorMessage,
        setErrorMessage,
        setUserBalance,
        userBalance,
        connectWalletHandler,
        tokenSymbol,
        contractToken,
        signer,
        contractStaking,
        stakingBalance,
        setStakingBalance
      }}
    >
      {children}
    </MetamaskContext.Provider>
  )
}
