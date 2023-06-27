import { BigNumber, BigNumberish, ethers } from 'ethers'

export const formatEther = (number: BigNumberish): string => {
  return ethers.utils.formatEther(number)
}
export const parseUnits = (value: string, unitName?: BigNumberish | undefined): BigNumber => {
  return ethers.utils.parseUnits(value, unitName)
}

export const formatDotAccount = (address: string): string => {
  const firstAddress = address.substring(0, 3)
  const lastAddress = address.substr(address.length - 5)
  return `${firstAddress}...${lastAddress}`
}

export const calculatePercent = (number: number, total: number) => {
  return Math.round((number / total) * 100)
}
