import { ethers } from 'ethers'
import React, { useState } from 'react'
import { formatEther } from 'src/utils/utils'
import ERC20_ABI_TOKEN from '../abi/ERC20_ABI_TOKEN.json'

interface MetamaskContextInterface {
  defaultAccount: string
  setDefaultAccount: React.Dispatch<React.SetStateAction<string>>
  errorMessage: string
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>
  userBalance: string
  setUserBalance: React.Dispatch<React.SetStateAction<string>>
  connectWalletHandler: () => void
  tokenSymbol: string
}

export const initialMetamaskContext = {
  defaultAccount: '',
  setDefaultAccount: () => null,
  errorMessage: '',
  setErrorMessage: () => null,
  userBalance: '',
  setUserBalance: () => null,
  connectWalletHandler: () => null,
  tokenSymbol: 'CW'
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
    const tokenSymbol = await contractTokenCowell.symbol()
    setTokenSymbol(tokenSymbol)
    const address = await newAccount.getAddress()
    setDefaultAccount(address)
    const balance = await newAccount.getBalance()
    setUserBalance(formatEther(balance))
    await getUserBalance(address)
  }
  const getUserBalance = async (address: string) => {
    const balance = await provider.getBalance(address, 'latest')
  }

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
        tokenSymbol
      }}
    >
      {children}
    </MetamaskContext.Provider>
  )
}
