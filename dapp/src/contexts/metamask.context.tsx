import { ethers } from 'ethers'
import React, { useCallback, useEffect, useState } from 'react'
import { formatEther } from 'src/utils/utils'
import ERC20_ABI_TOKEN from '../abi/ERC20_ABI_TOKEN.json'
import ERC20_ABI_STAKING from '../abi/ERC20_ABI_STAKING.json'
import detectEthereumProvider from '@metamask/detect-provider'
import {
  ContractStaking,
  ContractToken,
  readBalanceOfContract,
  readEarnedToken,
  readStakingBalanceOfContract,
  readTokenSymbol,
  readTotalSupply
} from 'src/abi/common.abi'
import { NETWORKS } from 'src/constants/metamask.constants'

interface MetamaskContextInterface {
  errorMessage: string
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>
  userBalance: string
  setUserBalance: React.Dispatch<React.SetStateAction<string>>
  tokenSymbol: string
  contractToken: (ethers.Contract & ContractToken) | null
  contractStaking: (ethers.Contract & ContractStaking) | null
  // setContractStaking: React.Dispatch<React.SetStateAction<ethers.Contract & ContractStaking>>
  stakingBalance: string
  setStakingBalance: React.Dispatch<React.SetStateAction<string>>
  totalSupply: string
  setTotalSupply: React.Dispatch<React.SetStateAction<string>>
  earnedTokens: string
  setEarnedTokens: React.Dispatch<React.SetStateAction<string>>
  disconnectWallet: () => void
}

interface WalletState {
  accounts: any[]
  balance: string
  chainId: string
}

interface MetaMaskContextData {
  wallet: WalletState
  hasProvider: boolean | null
  errorMessage: string
  isConnecting: boolean
  connectMetaMask: () => void
  clearError: () => void
}

const initialWalletState = {
  accounts: [],
  balance: '',
  chainId: ''
}

export const initialMetamaskContext: MetaMaskContextData & MetamaskContextInterface = {
  errorMessage: '',
  setErrorMessage: () => null,
  userBalance: '',
  setUserBalance: () => null,
  tokenSymbol: 'CW',
  stakingBalance: '',
  setStakingBalance: () => null,
  totalSupply: '',
  setTotalSupply: () => null,
  earnedTokens: '',
  setEarnedTokens: () => null,
  wallet: initialWalletState,
  hasProvider: false || null,
  isConnecting: false,
  connectMetaMask: () => null,
  clearError: () => null,
  disconnectWallet: () => null,
  contractToken: null,
  contractStaking: null
}

export const disconnectedState: WalletState = { accounts: [], balance: '', chainId: '' }

export const MetamaskContext = React.createContext<MetaMaskContextData & MetamaskContextInterface>({})

export const MetamaskContextProvider = ({
  children,
  defaultValue = initialMetamaskContext
}: {
  children: React.ReactNode
  defaultValue?: MetamaskContextInterface & MetaMaskContextData
}) => {
  const [errorMessage, setErrorMessage] = useState<string>(defaultValue.errorMessage)
  const [userBalance, setUserBalance] = useState<string>(defaultValue.userBalance)
  const [tokenSymbol, setTokenSymbol] = useState<string>(defaultValue.tokenSymbol)
  const [contractToken, setContractToken] = useState<(ethers.Contract & ContractToken) | null>(
    defaultValue.contractToken
  )
  const [contractStaking, setContractStaking] = useState<(ethers.Contract & ContractStaking) | null>(
    defaultValue.contractStaking
  )
  const [stakingBalance, setStakingBalance] = useState<string>(defaultValue.stakingBalance)
  const [totalSupply, setTotalSupply] = useState<string>(defaultValue.totalSupply)
  const [earnedTokens, setEarnedTokens] = useState<string>(defaultValue.earnedTokens)

  const [hasProvider, setHasProvider] = useState<boolean | null>(null)
  const [isConnecting, setIsConnecting] = useState(defaultValue.isConnecting)
  const [wallet, setWallet] = useState(disconnectedState)
  const clearError = () => setErrorMessage('')

  const _updateWallet = useCallback(async (providedAccounts?: any) => {
    const accounts =
      providedAccounts ||
      (await window.ethereum.request({
        method: 'eth_accounts'
      }))

    if (accounts.length === 0) {
      // If there are no accounts, then the user is disconnected
      setWallet(disconnectedState)
      return
    }
    // native token
    const balance = formatEther(
      await window.ethereum.request({
        method: 'eth_getBalance',
        params: [accounts[0], 'latest']
      })
    )
    const chainId = await window.ethereum.request({
      method: 'eth_chainId'
    })
    if (chainId !== '0xaa36a7') {
      console.log('chainId=>', chainId)
      changeNetwork()
    }

    // have connected with wallet=accounts and network=chainId

    setWallet({ accounts, balance, chainId })
  }, [])

  const updateWalletAndAccounts = useCallback(() => _updateWallet(), [_updateWallet])
  const updateWallet = useCallback(
    (accounts: any) => {
      _updateWallet(accounts)
    },
    [_updateWallet]
  )

  const switchNetwork = useCallback(async () => {
    console.log('switchNetwork')
    try {
      if (!window.ethereum) throw new Error('No crypto wallet found')
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            ...NETWORKS['sepoliaTestnet']
          }
        ]
      })
    } catch (error) {
      console.log(error)
    }
  }, [])

  const changeNetwork = useCallback(() => switchNetwork(), [switchNetwork])

  useEffect(() => {
    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true })
      setHasProvider(Boolean(provider))
      console.log('provider=>', provider)
      if (provider) {
        updateWalletAndAccounts()
        window.ethereum.on('accountsChanged', updateWallet)
        window.ethereum.on('chainChanged', updateWalletAndAccounts)
      }
      window.ethereum.on('disconnect', () => {
        console.log('disconnect')
      })
    }
    getProvider()
    return () => {
      window.ethereum?.removeListener('accountsChanged', updateWallet)
      window.ethereum?.removeListener('chainChanged', updateWalletAndAccounts)
    }
  }, [updateWallet, updateWalletAndAccounts])

  const connectMetaMask = async () => {
    setIsConnecting(true)
    console.log('connectMetaMask')
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      })
      clearError()
      updateWallet(accounts)
    } catch (err: any) {
      setErrorMessage(err.message)
    }
    setIsConnecting(false)
  }

  const accountChangedHandler = useCallback(
    async (newAccount: ethers.providers.JsonRpcSigner) => {
      const contractTokenCowell = new ethers.Contract(
        import.meta.env.VITE_CONTRACT_TOKEN_COWELL,
        ERC20_ABI_TOKEN,
        newAccount
      ) as ContractToken
      const contractStakingCowell = new ethers.Contract(
        import.meta.env.VITE_CONTRACT_STAKING,
        ERC20_ABI_STAKING,
        newAccount
      ) as ContractStaking
      const contractStakingWithSigner = contractStakingCowell.connect(newAccount) as ContractStaking
      setContractToken(contractTokenCowell)
      setContractStaking(contractStakingWithSigner)
      console.log('contractTokenCowell=>', contractTokenCowell)
      console.log('aaaaa=>', import.meta.env.VITE_CONTRACT_TOKEN_COWELL, ERC20_ABI_TOKEN, newAccount)
      try {
        const tokenSymbol = await readTokenSymbol(contractTokenCowell)
        const tokenBalanceOfContract = await readBalanceOfContract(
          contractTokenCowell as ContractToken,
          wallet.accounts[0]
        )
        const stakingBalanceOfContract = await readStakingBalanceOfContract(contractStakingCowell, wallet.accounts[0])
        const totalSupplyOfContract = await readTotalSupply(contractStakingCowell)
        const earnedTokensOfContract = await readEarnedToken(contractStakingCowell, wallet.accounts[0])
        setTokenSymbol(tokenSymbol)
        setUserBalance(tokenBalanceOfContract)
        setStakingBalance(stakingBalanceOfContract)
        // total supply (current staking)
        setTotalSupply(totalSupplyOfContract)
        setEarnedTokens(earnedTokensOfContract)
      } catch (error) {
        console.log(error)
      }
    },
    [wallet]
  )

  const clearAccount = useCallback(async () => {
    console.log('clearAccount')
    setWallet(disconnectedState)
  }, [])

  const disconnectWallet = useCallback(() => {
    clearAccount()
  }, [clearAccount])

  useEffect(() => {
    if (wallet.accounts[0]) {
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum)
      web3Provider.send('eth_requestAccounts', []).then(async () => {
        await accountChangedHandler(web3Provider.getSigner())
      })
    }
  }, [wallet.accounts, accountChangedHandler])

  console.log('stakingBalance=>', stakingBalance)

  return (
    <MetamaskContext.Provider
      value={{
        errorMessage,
        setErrorMessage,
        setUserBalance,
        userBalance,
        tokenSymbol,
        contractToken,
        contractStaking,
        stakingBalance,
        setStakingBalance,
        totalSupply,
        setTotalSupply,
        earnedTokens,
        setEarnedTokens,
        // ---new
        connectMetaMask,
        wallet,
        hasProvider,
        isConnecting,
        clearError,
        disconnectWallet
      }}
    >
      {children}
    </MetamaskContext.Provider>
  )
}
