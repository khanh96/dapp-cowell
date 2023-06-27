export type AddEthereumChainParameter = {
  chainId: string
  blockExplorerUrls?: string[]
  chainName?: string
  iconUrls?: string[]
  nativeCurrency?: {
    name: string
    symbol: string
    decimals: number
  }
  rpcUrls?: string[]
}

export type ErrorWithCode = {
  code: number
  [key: string]: any
}
// MetaMask - RPC Error: Request of type 'wallet_requestPermissions' already pending for origin [origin]. Please wait.
export const ERROR_CODE_REQUEST_PENDING = -32002
