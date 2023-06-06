import React, { Component, useState } from 'react'
import { ethers } from 'ethers'
import ERC20_ABI from '../../abi/ERC20_ABI.json'

const ACCOUNT_1 = '0xF89568201Ac27FCF56f3350B6e00E524c8a6045B'
const ACCOUNT_2 = '0x755915F49ee6B7108f1a9c0f968BcaE242B0C682'

function Metamask() {
  const [address, setAddress] = useState()
  const [balance, setBalance] = useState<string>('')
  const [block, setBlock] = useState<number>(0)
  const [tokenName, setTokenName] = useState<number>(0)
  const [tokenBalanceInEther, setTokenBalanceInEther] = useState<string>('')

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
    const daiContract = new ethers.Contract('0x3125aA646f095761B887972D1381468A41f8d32B', ERC20_ABI, provider)
    const tokenName = await daiContract.name()
    console.log('tokenName=>', tokenName)
    const tokenBalance = await daiContract.balanceOf(accounts[0])
    const tokenUnits = await daiContract.decimals()
    const tokenBalanceInEther = ethers.utils.formatUnits(tokenBalance, tokenUnits)

    // state changing methods
    const signer = provider.getSigner()
    const daiWithSigner = daiContract.connect(signer)
    const dai = ethers.utils.parseUnits('1.0', 18)
    console.log('daiWithSigner=>', daiWithSigner)
    console.log('dai=>', dai)

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
        to: '0x755915F49ee6B7108f1a9c0f968BcaE242B0C682',
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

  console.log({ address, balance, tokenBalanceInEther })

  return (
    <div>
      {!address && <button onClick={() => connectToMetamask()}>Connect to Metamask</button>}
      {address && (
        <div>
          <p>Welcome {address}</p>
          <p>Your ETH Balance is: {balance}</p>
          <p>Current ETH Block is: {block}</p>
          <p>
            Balance of {tokenName} is: {tokenBalanceInEther}
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
      </div>
    </div>
  )
}

export default Metamask
