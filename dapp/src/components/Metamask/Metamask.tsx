import React, { Component, useEffect, useState } from 'react'
import { BaseContract, BigNumber, ContractFunction, providers } from 'ethers/src.ts/index'
import { ethers } from 'ethers'
import ERC20_ABI from '../../abi/ERC20_ABI_TOKEN.json'

const ACCOUNT_1 = '0xF89568201Ac27FCF56f3350B6e00E524c8a6045B'
const ACCOUNT_2 = '0x755915F49ee6B7108f1a9c0f968BcaE242B0C682'
const ADDRESS_CONTACT = '0x3125aA646f095761B887972D1381468A41f8d32B'

type SolidityType = 'address' | 'address[]' | 'bool' | 'bytes' | 'string' | 'uint8' | 'uint64' | 'uint256' | 'uint256[]'

interface USDTContract extends BaseContract {
  burn: (amount: BigNumber) => void
  decimals: () => number
  balanceOf: ContractFunction
  mint: (to: string, amount: BigNumber) => any
}

function Metamask() {
  const [address, setAddress] = useState('')
  const [balance, setBalance] = useState<string>('')
  const [block, setBlock] = useState<number>(0)
  const [tokenName, setTokenName] = useState<number>(0)
  const [tokenBalanceInEther, setTokenBalanceInEther] = useState<string>('')
  const [approveTransferFrom, setApproveTransferFrom] = useState(false)

  const connectToMetamask = async () => {
    // PROVIDERS
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    console.log('provider => ', provider)
    const accounts = await provider.send('eth_requestAccounts', [])
    // get the balance of an account
    const balance = await provider.getBalance(accounts[0])
    // format balance in wallet more user-friend
    const balanceInEther = ethers.utils.formatEther(balance)
    const block = await provider.getBlockNumber()

    // Read-Only Methods from Contract
    const USDTContract = new ethers.Contract(ADDRESS_CONTACT, ERC20_ABI, provider)
    const tokenName = await USDTContract.name()
    const tokenBalanceUSDT = await USDTContract.balanceOf(accounts[0]) // get balance của smart contract đó.
    const tokenUnits = await USDTContract.decimals() // 18
    const tokenBalanceInEther = ethers.utils.formatUnits(tokenBalanceUSDT, tokenUnits)

    // state changing methods
    const signer = provider.getSigner()
    const daiWithSigner = USDTContract.connect(signer)
    const dai = ethers.utils.parseUnits('1.0', 18)

    setBlock(block)
    setAddress(accounts[0])
    setBalance(balanceInEther)
    setTokenName(tokenName)
    setTokenBalanceInEther(tokenBalanceInEther)
  }
  const connectToRPC = async () => {
    // connecting to Ethereum RPC
    const provider = new ethers.providers.JsonRpcProvider('https://api.sepolia.kroma.network')
    const signer = provider.getSigner()
    console.log('signer=>', signer)
    const listAccount = await provider.listAccounts()
  }
  // send token from address A to address B
  const writeToTheBlockchain = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    // const sender = new ethers.Wallet(import.meta.env.VITE_PRIVATE_KEY_ACCOUNT_1, provider)
    // console.log('sender', sender)
    // console.log('address', address)
    const balance = await provider.getBalance(address as any)
    const balanceBefore = ethers.utils.formatEther(balance)
    console.log(`Destination balance before sending: ${balanceBefore} ETH`)
    // console.log('Sending...\n')
    const signer = provider.getSigner()
    try {
      const tx = await signer.sendTransaction({
        to: ACCOUNT_2,
        value: ethers.utils.parseEther('0.5')
      })
      console.log('send success=>', tx.data)
    } catch (error) {
      console.log(error)
    }
  }

  // send token RPC
  const sendTokenFromRPC = async () => {
    const provider = new ethers.providers.JsonRpcProvider('https://rpc.sepolia.org')
    const myProvider = new ethers.providers.Web3Provider(window.ethereum)
    const sender = new ethers.Wallet(import.meta.env.VITE_PRIVATE_KEY_ACCOUNT_2, provider)
    const accounts = await myProvider.send('eth_requestAccounts', [])
    const balance = await myProvider.getBalance(accounts[0])
    const balanceUserFriendly = ethers.utils.formatEther(balance)
    console.log(`Destination balance before sending: ${balanceUserFriendly} ETH`)

    try {
      const tx = await sender.sendTransaction({
        to: ACCOUNT_1,
        value: ethers.utils.parseEther('0.5')
      })
      console.log('Sent! 🎉')
      console.log(`TX hash: ${tx.hash}`)
    } catch (error) {
      // check user confirm or reject
      console.log(error)
    }
  }

  const sendTokenUSDTContract = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()

    const USDTContract = new ethers.Contract(ADDRESS_CONTACT, ERC20_ABI, provider)
    const accounts = await provider.send('eth_requestAccounts', [])
    const tokenBalanceOfContract = await USDTContract.balanceOf(accounts[0])

    const tokenUnits = await USDTContract.decimals()
    const amountInEther = '100'
    const tokenAmountInEther = ethers.utils.parseUnits(amountInEther, tokenUnits)
    console.log('tokenAmountInEther=>', tokenAmountInEther)
    const USDTContractWithSigner = USDTContract.connect(signer)
    console.log(`Số tiền còn trong ví: ${ethers.utils.formatEther(tokenBalanceOfContract)} USDT`)
    console.log(`Số tiền muốn gửi ${ethers.utils.formatEther(tokenAmountInEther)} USDT`)

    // USDTContractWithSigner.transfer(ACCOUNT_2, tokenAmountInEther)
  }

  const burnToken = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const USDTContract = new ethers.Contract(ADDRESS_CONTACT, ERC20_ABI, signer) as USDTContract
    const tokenUnits = await USDTContract.decimals()
    const amountInEther = '100'
    const tokenAmountInEther = ethers.utils.parseUnits(amountInEther, tokenUnits)
    console.log(`Số tiền xả là ${ethers.utils.formatEther(tokenAmountInEther)}`)
    const USDTContractConnectSigner = USDTContract.connect(signer) as USDTContract
    console.log(USDTContractConnectSigner)
    const burn = await USDTContractConnectSigner.burn(tokenAmountInEther)
    console.log('burn success', burn)
  }

  useEffect(() => {
    window.ethereum.on('accountsChanged', handleAccountsChanged)
    return () => {
      window.ethereum.removeListener('accountsChanged', () => {
        console.log('remove listen')
      })
    }
  })
  function handleAccountsChanged(accounts: Array<string>) {
    console.log(accounts)
    setAddress(accounts[0])
  }

  const sendTokenFromToUSDTContract = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()

    const USDTContract = new ethers.Contract(ADDRESS_CONTACT, ERC20_ABI, provider)
    const accounts = await provider.send('eth_requestAccounts', [])
    const tokenBalanceOfContract = await USDTContract.balanceOf(accounts[0])

    const tokenUnits = await USDTContract.decimals()
    const amountInEther = '100'
    const tokenAmountInEther = ethers.utils.parseUnits(amountInEther, tokenUnits)
    const USDTContractWithSigner = USDTContract.connect(signer)
    console.log(`Số tiền còn trong ví: ${ethers.utils.formatEther(tokenBalanceOfContract)} USDT`)
    console.log(`Số tiền muốn gửi ${ethers.utils.formatEther(tokenAmountInEther)} USDT`)
    const allowMaxToken = await USDTContractWithSigner.allowance(ACCOUNT_1, ACCOUNT_2)
    console.log(`Số tiền tối đa có thể lấy là: ${ethers.utils.formatEther(allowMaxToken)}`)

    USDTContractWithSigner.transferFrom(ACCOUNT_1, ACCOUNT_2, tokenAmountInEther)
  }

  const approveTransfer = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()

    const USDTContract = new ethers.Contract(ADDRESS_CONTACT, ERC20_ABI, provider)
    const accounts = await provider.send('eth_requestAccounts', [])
    const tokenBalanceOfContract = await USDTContract.balanceOf(accounts[0])
    console.log('accounts=>', accounts)

    const tokenUnits = await USDTContract.decimals()
    // const amountInEther = '100'
    // const tokenAmountInEther = ethers.utils.parseUnits(amountInEther, tokenUnits)
    const USDTContractWithSigner = USDTContract.connect(signer)
    // console.log(`Số tiền còn trong ví: ${ethers.utils.formatEther(tokenBalanceOfContract)} USDT`)
    // console.log(`Số tiền muốn gửi ${ethers.utils.formatEther(tokenAmountInEther)} USDT`)
    const amountMax = '1000'
    const tokenAmountMaxInEther = ethers.utils.parseUnits(amountMax, tokenUnits)

    try {
      const approve = await USDTContractWithSigner.approve(ACCOUNT_2, tokenAmountMaxInEther)
      console.log(approve)
      if (approve) {
        setApproveTransferFrom(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='flex h-[400px] flex-col items-center justify-center text-center text-white'>
      {!address && <button onClick={() => connectToMetamask()}>Connect to Metamask</button>}
      {address && (
        <div>
          <p>Welcome {address}</p>
          <p>Your ETH Balance is: {balance} ETH</p>
          <p>Current ETH Block is: {block}</p>
          <p>
            Balance of {tokenName} is: {tokenBalanceInEther} USDT
          </p>
        </div>
      )}
      <div className='my-3 h-0.5 w-full bg-white'></div>
      <div className='flex justify-center'>
        <button className='mr-2' onClick={() => connectToRPC()}>
          Connect To RPC
        </button>
        <button className='mr-2' onClick={() => writeToTheBlockchain()}>
          Send eth
        </button>
        <button className='' onClick={() => sendTokenFromRPC()}>
          Send token from RPC
        </button>
        <button className='' onClick={() => sendTokenUSDTContract()}>
          Transfer Token USDT Contract
        </button>
      </div>
      <div className='my-3 h-0.5 w-full bg-white'></div>
      <div className='flex justify-center'>
        <button className='mr-2' onClick={() => burnToken()}>
          Burn token
        </button>
        {!approveTransferFrom && (
          <button className='mr-2' onClick={() => approveTransfer()}>
            Approve Transfer
          </button>
        )}
        {approveTransferFrom && (
          <button className='mr-2' onClick={() => sendTokenFromToUSDTContract()}>
            Transfer from
          </button>
        )}
      </div>
    </div>
  )
}

export default Metamask
