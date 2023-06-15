import { BigNumber, ethers } from 'ethers'
import React, { useCallback, useContext, useEffect, useState } from 'react'
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
  totalSupply: string
  setTotalSupply: React.Dispatch<React.SetStateAction<string>>
  earnedTokens: string
  setEarnedTokens: React.Dispatch<React.SetStateAction<string>>
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
  setStakingBalance: () => null,
  totalSupply: '',
  setTotalSupply: () => null,
  earnedTokens: '',
  setEarnedTokens: () => null
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
  const [totalSupply, setTotalSupply] = useState<string>(defaultValue.totalSupply)
  const [earnedTokens, setEarnedTokens] = useState<string>(defaultValue.earnedTokens)

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
      // total supply (current staking)
      const totalSupplyOfContract = await contractWithSigner.totalSupply()
      setTotalSupply(formatEther(totalSupplyOfContract))
      const earnedTokensOfContract = await contractWithSigner.earned(address)
      console.log('earnedTokensOfContract', formatEther(earnedTokensOfContract))
      setEarnedTokens(formatEther(earnedTokensOfContract))
    } catch (error) {
      console.log(error)
    }
    // const userBalance = await getUserBalance(address)
  }
  // const getTotalSupply = useCallback(async () => {
  //   if (contractStaking && signer) {
  //     const contractWithSigner = contractStaking.connect(signer)
  //     const totalSupplyOfContract = await contractWithSigner.totalSupply()
  //     console.log('formatEther(totalSupplyOfContract),', formatEther(totalSupplyOfContract))
  //     setTotalSupply(formatEther(totalSupplyOfContract))
  //   }
  // }, [signer, contractStaking])

  // useEffect(() => {
  //   console.log('listen ', contractStaking)
  //   // contractStaking?.filters.Withdraw
  //   contractStaking?.on('Withdraw', (from: BigNumber, to: any, value, event) => {
  //     console.log('listen Withdraw')
  //     if (to.transactionHash && signer) {
  //       console.log('call total supply')
  //       getTotalSupply()
  //     }
  //   })
  // }, [contractStaking, stakingBalance, signer, getTotalSupply])

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
        setStakingBalance,
        totalSupply,
        setTotalSupply,
        earnedTokens,
        setEarnedTokens
      }}
    >
      {children}
    </MetamaskContext.Provider>
  )
}
