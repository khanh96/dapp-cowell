import { BigNumberish, ethers } from 'ethers'

export const formatEther = (number: BigNumberish): string => {
  return ethers.utils.formatEther(number)
}

export const formatDotAccount = (address: string): string => {
  const firstAddress = address.substring(0, 3)
  const lastAddress = address.substr(address.length - 5)
  return `${firstAddress}...${lastAddress}`
}
