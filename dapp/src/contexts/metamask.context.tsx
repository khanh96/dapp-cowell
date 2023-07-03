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
import { AddEthereumChainParameter, ERROR_CODE_REQUEST_PENDING, ErrorWithCode } from 'src/types/metamask.type'

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
  addChain: (parameters: AddEthereumChainParameter) => void
  switchChain: (chainId: string) => void
  signer: ethers.providers.JsonRpcSigner | null
  provider: ethers.providers.Web3Provider
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
  contractStaking: null,
  addChain: () => null,
  switchChain: () => null,
  signer: null
}

export const disconnectedState: WalletState = { accounts: [], balance: '', chainId: '' }

export const MetamaskContext = React.createContext<MetaMaskContextData & MetamaskContextInterface>(
  initialMetamaskContext
)

function getMetaMaskProvider() {
  const ethereum = window.ethereum
  if (!ethereum) return null
  // The `providers` field is populated
  // - when CoinBase Wallet extension is also installed
  // - when user is on Brave and Brave Wallet is not deactivated
  // The expected object is an array of providers, the MetaMask provider is inside
  // See https://docs.cloud.coinbase.com/wallet-sdk/docs/injected-provider-guidance for more information
  // See also https://metamask.zendesk.com/hc/en-us/articles/360038596792-Using-Metamask-wallet-in-Brave-browser
  if (Array.isArray(ethereum.providers)) {
    const metaMaskProvider = ethereum.providers.find((p: any) => p.isMetaMask && !p.isBraveWallet)
    if (metaMaskProvider) return metaMaskProvider
    const braveWalletProvider = ethereum.providers.find((p: any) => p.isMetaMask && p.isBraveWallet)
    if (!braveWalletProvider) return null
    return braveWalletProvider
  }
  if (!ethereum.isMetaMask) return null
  return ethereum
}

function getSafeMetaMaskProvider() {
  const ethereum = getMetaMaskProvider()
  if (!ethereum) {
    throw new Error('MetaMask provider must be present in order to use this method')
  }
  return ethereum
}

async function switchEthereumChain(chainId: string) {
  const ethereum = getSafeMetaMaskProvider()
  try {
    await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId }]
    })
  } catch (err: unknown) {
    if ('code' in (err as { [key: string]: any })) {
      if ((err as ErrorWithCode).code === ERROR_CODE_REQUEST_PENDING) return
    }
    throw err
  }
}

async function addEthereumChain(parameters: AddEthereumChainParameter) {
  const ethereum = getSafeMetaMaskProvider()
  try {
    await ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [parameters]
    })
  } catch (err: unknown) {
    if ('code' in (err as { [key: string]: any })) {
      if ((err as ErrorWithCode).code === ERROR_CODE_REQUEST_PENDING) return
    }
    throw err
  }
}

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
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner | null>(null)
  const [provider] = useState<ethers.providers.Web3Provider>(new ethers.providers.Web3Provider(getMetaMaskProvider()))
  const [stakingBalance, setStakingBalance] = useState<string>(defaultValue.stakingBalance)
  const [totalSupply, setTotalSupply] = useState<string>(defaultValue.totalSupply)
  const [earnedTokens, setEarnedTokens] = useState<string>(defaultValue.earnedTokens)

  const [hasProvider, setHasProvider] = useState<boolean | null>(null)
  const [isConnecting, setIsConnecting] = useState(defaultValue.isConnecting)
  const [wallet, setWallet] = useState(disconnectedState)
  const clearError = () => setErrorMessage('')

  const _updateWallet = useCallback(async (providedAccounts?: any) => {
    const ethereum = getSafeMetaMaskProvider()
    const accounts =
      providedAccounts ||
      (await ethereum.request({
        method: 'eth_accounts'
      }))

    if (accounts.length === 0) {
      // If there are no accounts, then the user is disconnected
      setWallet(disconnectedState)
      return
    }
    // native token
    const balance = formatEther(
      await ethereum.request({
        method: 'eth_getBalance',
        params: [accounts[0], 'latest']
      })
    )
    const chainId = await ethereum.request({
      method: 'eth_chainId'
    })
    // have connected with wallet=accounts and network=chainId
    setWallet({ accounts, balance, chainId })
  }, [])

  const switchChain = React.useCallback((chainId: string) => {
    console.log('switchChain')
    const ethereum = getSafeMetaMaskProvider()
    if (!ethereum) {
      console.warn(
        '`switchChain` method has been called while MetaMask is not available or synchronising. Nothing will be done in this case.'
      )
      return Promise.resolve()
    }
    return switchEthereumChain(chainId)
  }, [])

  const addChain = React.useCallback((parameters: AddEthereumChainParameter) => {
    const ethereum = getSafeMetaMaskProvider()
    if (!ethereum) {
      console.warn(
        '`addChain` method has been called while MetaMask is not available or synchronising. Nothing will be done in this case.'
      )
      return Promise.resolve()
    }
    return addEthereumChain(parameters)
  }, [])

  const updateWalletAndAccounts = useCallback(async () => _updateWallet(), [_updateWallet])
  const updateWallet = useCallback(
    (accounts: any) => {
      _updateWallet(accounts)
    },
    [_updateWallet]
  )

  const connectMetaMask = useCallback(async () => {
    setIsConnecting(true)
    const ethereum = getSafeMetaMaskProvider()
    try {
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts'
      })
      clearError()
      updateWallet(accounts)
    } catch (err: any) {
      setErrorMessage(err.message)
    }
    setIsConnecting(false)
  }, [updateWallet])

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

      // Ký với account ethereum
      setSigner(newAccount)
      // Ký với account ethereum
      setContractToken(contractTokenCowell)
      setContractStaking(contractStakingWithSigner)
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

  useEffect(() => {
    const ethereum = getSafeMetaMaskProvider()
    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true })
      setHasProvider(Boolean(provider))

      if (provider) {
        updateWalletAndAccounts()
        ethereum.on('accountsChanged', updateWallet)
        ethereum.on('chainChanged', updateWalletAndAccounts)
      }
      ethereum.on('disconnect', () => {
        console.log('disconnect')
      })
    }
    getProvider()
    return () => {
      window.ethereum?.removeListener('accountsChanged', updateWallet)
      window.ethereum?.removeListener('chainChanged', updateWalletAndAccounts)
    }
  }, [updateWallet, updateWalletAndAccounts])

  const value = React.useMemo(
    () => ({
      // ---staking, token
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
      // ---metamask
      connectMetaMask,
      wallet,
      hasProvider,
      isConnecting,
      clearError,
      disconnectWallet,
      addChain,
      switchChain,
      signer,
      provider
    }),
    [
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
      connectMetaMask,
      wallet,
      hasProvider,
      isConnecting,
      clearError,
      disconnectWallet,
      addChain,
      switchChain,
      signer,
      provider
    ]
  )

  return <MetamaskContext.Provider value={value}>{children}</MetamaskContext.Provider>
}
