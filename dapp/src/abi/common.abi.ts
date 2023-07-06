import { type ethers, type Bytes, BigNumber } from 'ethers'
import { formatEther, parseUnits } from 'src/utils/utils'
import type { ContractTransaction } from 'ethers/src.ts'
import {} from 'ethers/lib/utils'
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
  queue: (targets: string[], values: number[], calldatas: string[], description: string) => Promise<ContractTransaction>
  castVote: (proposalId: string, support: number) => Promise<ContractTransaction>
  cancel: (
    targets: string[],
    values: number[],
    calldatas: string[],
    descriptionHash: string
  ) => Promise<ContractTransaction>
  execute: (
    targets: string[],
    values: number[],
    calldatas: string[],
    descriptionHash: string
  ) => Promise<ContractTransaction>
  state: (proposalId: string) => Promise<number>
  proposalVotes: (proposalId: string) => Promise<{ againstVotes: number; forVotes: number; abstainVotes: number }>
  votingDelay: () => Promise<number>
  votingPeriod: () => Promise<number>
  proposalThreshold: () => Promise<string>
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

// DAO - Governor
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
  descriptionHash: string
) => {
  const writeQueueResult = await contractDao.queue(targets, values, calldatas, descriptionHash)
  return writeQueueResult
}
export const writeCastVote = async (contractDao: ContractDao, proposalId: string, support: number) => {
  const writeCastVoteResult = await contractDao.castVote(proposalId, support)
  return writeCastVoteResult
}

export const writeCancel = async (
  contractDao: ContractDao,
  targets: string[],
  values: number[],
  calldatas: string[],
  descriptionHash: string
) => {
  const writeCancelResult = await contractDao.cancel(targets, values, calldatas, descriptionHash)
  return writeCancelResult
}

export const writeExecute = async (
  contractDao: ContractDao,
  targets: string[],
  values: number[],
  calldatas: string[],
  descriptionHash: string
) => {
  const writeExecuteResult = await contractDao.execute(targets, values, calldatas, descriptionHash)
  return writeExecuteResult
}

export const readState = async (contractDao: ContractDao, proposalId: string) => {
  const stateVoteResult = await contractDao.state(proposalId)
  return stateVoteResult
}
export const readProposalVotes = async (contractDao: ContractDao, proposalId: string) => {
  const voteResult = await contractDao.proposalVotes(proposalId)
  return voteResult
}

export const readVotingDelay = async (contractDao: ContractDao) => {
  const votingDelayResult = await contractDao.votingDelay()
  return votingDelayResult.toNumber()
}

export const readVotingPeriod = async (contractDao: ContractDao) => {
  const votingPeriodResult = await contractDao.votingPeriod()
  return votingPeriodResult.toNumber()
}
export const readProposalThreshold = async (contractDao: ContractDao) => {
  const proposalThresholdResult = await contractDao.proposalThreshold()
  return formatEther(proposalThresholdResult)
}
