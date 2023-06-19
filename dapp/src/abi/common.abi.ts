import type { ethers } from 'ethers'
import { useContext } from 'react'
import { MetamaskContext } from 'src/contexts/metamask.context'
import { formatEther } from 'src/utils/utils'

interface AbiContractToken {
  symbol: () => Promise<string>
  balanceOf: (address: string) => Promise<string>
}

interface AbiContractStacking {
  balanceOf: (address: string) => Promise<string>
  totalSupply: () => Promise<string>
  earned: (address: string) => Promise<string>
}

export type ContractToken = AbiContractToken & ethers.Contract
export type ContractStaking = AbiContractStacking & ethers.Contract

export const readTokenSymbol = async (contractToken: ContractToken): Promise<string> => {
  const tokenSymbol = await contractToken.symbol()
  return tokenSymbol
}
export const readBalanceOfContract = async (contractToken: ContractToken, address: string): Promise<string> => {
  const tokenBalanceOfContract = await contractToken.balanceOf(address)
  return formatEther(tokenBalanceOfContract)
}
export const readStakingBalanceOfContract = async (
  contractStaking: ContractStaking,
  address: string
): Promise<string> => {
  const stakingBalanceOfContract = await contractStaking.balanceOf(address)
  return formatEther(stakingBalanceOfContract)
}

export const readTotalSupply = async (contractStaking: ContractStaking): Promise<string> => {
  const totalSupplyOfContract = await contractStaking.totalSupply()
  return formatEther(totalSupplyOfContract)
}

export const readEarnedToken = async (contractStaking: ContractStaking, address: string): Promise<string> => {
  const earnedTokensOfContract = await contractStaking.earned(address)
  return formatEther(earnedTokensOfContract)
}
