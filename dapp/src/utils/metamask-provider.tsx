function getMetaMaskProvider() {
  const ethereum = window.ethereum
  if (!ethereum) return null
  if (Array.isArray(ethereum.providers)) {
    const metaMaskProvider = ethereum.providers.find((p: any) => p.isMetaMask && !p.isBraveWallet)
    if (metaMaskProvider) return metaMaskProvider
    const braveWalletProvider = ethereum.providers.find((p: any) => p.isMetaMask && p.isBraveWallet)
    if (!braveWalletProvider) return null
    return braveWalletProvider
  }
  if (!ethereum.isMetaMask) return null
  return ethereum
}

function getSafeMetaMaskProvider() {
  const ethereum = getMetaMaskProvider()
  if (!ethereum) {
    throw new Error('MetaMask provider must be present in order to use this method')
  }
  return ethereum
}
