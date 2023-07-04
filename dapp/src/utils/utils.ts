import { BigNumber, BigNumberish, BytesLike, ethers } from 'ethers'

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

// convert string to byte
export const toUtf8Bytes = (string: string) => {
  return ethers.utils.toUtf8Bytes(string)
}

// return KECCAK256 digest aBytesLike.
export const keccak256 = (bytes: BytesLike) => {
  return ethers.utils.keccak256(bytes)
}

//Returns the string represented by the UTF-8 bytes of aBytesLike.
export const toUtf8String = (bytes: BytesLike) => {
  return ethers.utils.toUtf8String(bytes)
}
