import React, { Component, useState } from 'react'
import { ethers } from 'ethers'
import ERC20_ABI from '../../abi/ERC20_ABI.json'

function Metamask() {
  const [address, setAddress] = useState()
  const [balance, setBalance] = useState<string>('')
  const [block, setBlock] = useState<number>(0)
  const [tokenName, setTokenName] = useState<number>(0)
  const [tokenBalanceInEther, setTokenBalanceInEther] = useState<string>('')

  const connectToMetamask = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    console.log('provider => ', provider)
    const accounts = await provider.send('eth_requestAccounts', [])
    const balance = await provider.getBalance(accounts[0])
    const balanceInEther = ethers.utils.formatEther(balance)
    const block = await provider.getBlockNumber()

    const daiContract = new ethers.Contract('0x3125aA646f095761B887972D1381468A41f8d32B', ERC20_ABI, provider)
    console.log('daiContract=>', daiContract)
    const tokenName = await daiContract.name()
    console.log('tokenName=>', tokenName)
    const tokenBalance = await daiContract.balanceOf(accounts[0])
    const tokenUnits = await daiContract.decimals()
    const tokenBalanceInEther = ethers.utils.formatUnits(tokenBalance, tokenUnits)

    setBlock(block)
    setAddress(accounts[0])
    setBalance(balanceInEther)
    setTokenName(tokenName)
    setTokenBalanceInEther(tokenBalanceInEther)
  }

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
    </div>
  )
}

export default Metamask
