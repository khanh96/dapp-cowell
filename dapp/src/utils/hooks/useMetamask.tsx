import { useContext, useEffect } from 'react'
import useModal from './useModal'
import { MetamaskContext } from 'src/contexts/metamask.context'

export default function useMetamask() {
  const contextMetamask = useContext(MetamaskContext)
  if (contextMetamask === undefined) {
    throw new Error('useMetaMask must be used within a "MetaMaskContextProvider"')
  }

  return contextMetamask
}
