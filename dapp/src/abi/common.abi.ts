import type { ethers, Bytes } from 'ethers'
import { formatEther, parseUnits } from 'src/utils/utils'
import type { ContractTransaction } from 'ethers/src.ts'
export interface TransactionData {
  status: number
}

export interface AbiContractToken {
  symbol: () => Promise<string>
  balanceOf: (address: string) => Promise<string>
  allowance: (owner: string, spender: string) => Promise<string>
  decimals: () => number
  approve: (spender: string, amount: ethers.BigNumber) => Promise<ContractTransaction>
  nonces: (address: string) => Promise<any>
  name: () => Promise<string>
  permit: (
    owner: string,
    spender: string,
    value: ethers.BigNumber,
    deadline: number,
    v: number,
    r: string,
    s: string,
    objGas: { gasPrice: ethers.BigNumber; gasLimit: number }
  ) => Promise<ContractTransaction>
  transferFrom: (
    from: string,
    to: string,
    amount: ethers.BigNumber,
    objGas: { gasPrice: ethers.BigNumber; gasLimit: number }
  ) => Promise<ContractTransaction>
  //DAO
  getVotes: (address: string) => Promise<string>
  delegate: (address: string) => Promise<ContractTransaction>
}

export interface AbiContractStacking {
  balanceOf: (address: string) => Promise<string>
  totalSupply: () => Promise<string>
  earned: (address: string) => Promise<string>
  stake: (amount: ethers.BigNumber) => Promise<ContractTransaction>
  withdraw: (amount: ethers.BigNumber) => Promise<ContractTransaction>
  getReward: () => Promise<ContractTransaction>
}

export interface AbiContractDao {
  propose: (
    targets: string[],
    values: number[],
    calldatas: string[],
    description: string
  ) => Promise<ContractTransaction>
  queue: (targets: string[], values: number[], calldatas: string[], description: any) => Promise<ContractTransaction>
}

export type ContractToken = AbiContractToken & ethers.Contract
export type ContractStaking = AbiContractStacking & ethers.Contract
export type ContractDao = AbiContractDao & ethers.Contract

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

export const readAllowance = async (contractToken: ContractToken, address: string): Promise<string> => {
  const allowStakingToken = await contractToken.allowance(address, import.meta.env.VITE_CONTRACT_STAKING)
  return formatEther(allowStakingToken)
}

export const writeApprove = async (contractToken: ContractToken, amount: string): Promise<ContractTransaction> => {
  const tokenUnits = await contractToken.decimals()
  const tokenAmount = parseUnits(amount, tokenUnits)
  const transactionApprove = await contractToken.approve(import.meta.env.VITE_CONTRACT_STAKING, tokenAmount)
  return transactionApprove
}

export const writeStake = async (
  contractToken: ContractToken,
  contractStaking: ContractStaking,
  amount: string
): Promise<ContractTransaction> => {
  const tokenUnits = await contractToken.decimals()
  const tokenAmount = parseUnits(amount, tokenUnits)
  const stakeResult = await contractStaking.stake(tokenAmount)
  return stakeResult
}

export const writeWithdraw = async (contractToken: ContractToken, contractStaking: ContractStaking, amount: string) => {
  const tokenUnits = await contractToken.decimals()
  const tokenAmount = parseUnits(amount, tokenUnits)
  const withdrawResult = await contractStaking.withdraw(tokenAmount)
  return withdrawResult
}

export const writeGetReward = async (contractStaking: ContractStaking) => {
  const rewardResult = await contractStaking.getReward()
  return rewardResult
}
export const readNonces = async (contractToken: ContractToken, address: string) => {
  const noncesResult = await contractToken.nonces(address)
  return noncesResult
}

export const readName = async (contractToken: ContractToken) => {
  const nameResult = await contractToken.name()
  return nameResult
}
export const writePermit = async (
  contractToken: ContractToken,
  owner: string,
  spender: string,
  value: ethers.BigNumber,
  deadline: number,
  v: number,
  r: string,
  s: string,
  objGas: { gasPrice: ethers.BigNumber; gasLimit: number }
) => {
  const objectGas = {
    gasPrice: objGas.gasPrice,
    gasLimit: objGas.gasLimit
  }
  const permitResult = await contractToken.permit(owner, spender, value, deadline, v, r, s, objectGas)
  return permitResult
}

export const writeTransferFrom = async (
  contractToken: ContractToken,
  from: string,
  to: string,
  amount: ethers.BigNumber,
  objGas: { gasPrice: ethers.BigNumber; gasLimit: number }
) => {
  const objectGas = {
    gasPrice: objGas.gasPrice,
    gasLimit: objGas.gasLimit
  }
  const transferFromResult = await contractToken.transferFrom(from, to, amount, objectGas)
  return transferFromResult
}

// DAO
export const readGetVotes = async (contractToken: ContractToken, address: string) => {
  const getVotesResult = await contractToken.getVotes(address)
  return formatEther(getVotesResult)
}

export const writeDelegate = async (contractToken: ContractToken, address: string) => {
  const writeDelegateResult = await contractToken.delegate(address)
  return writeDelegateResult
}

export const writePropose = async (
  contractDao: ContractDao,
  targets: string[],
  values: number[],
  calldatas: string[],
  description: string
) => {
  const writeProposeResult = await contractDao.propose(targets, values, calldatas, description)
  return writeProposeResult
}

export const writeQueue = async (
  contractDao: ContractDao,
  targets: string[],
  values: number[],
  calldatas: string[],
  description: any
) => {
  const writeQueueResult = await contractDao.queue(targets, values, calldatas, description)
  return writeQueueResult
}
