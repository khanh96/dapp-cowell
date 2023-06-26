export const NETWORKS = {
  sepoliaTestnet: {
    chainId: '0xaa36a7', // The chain ID of the network you want the user to switch to
    chainName: 'Sepolia test network', // The name of the network you want the user to switch to
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    blockExplorerUrls: ['https://sepolia.etherscan.io'],
    rpcUrls: ['https://sepolia.infura.io/v3/']
  }
}
