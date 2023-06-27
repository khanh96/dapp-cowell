export const NETWORKS = {
  sepoliaTestnet: {
    chainId: `0xaa36a7`, // The chain ID of the network you want the user to switch to
    chainName: 'Sepolia test network', // The name of the network you want the user to switch to
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrls: ['https://rpc.sepolia.org'],
    blockExplorerUrls: ['https://sepolia.etherscan.io']
  }
}

export const CHAIN_ID_OF_NETWORKS = {
  sepoliaTestnet: '0xaa36a7',
  arbitrum: '0xa4b1'
}
