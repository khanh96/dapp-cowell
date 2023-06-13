import { useContext, useEffect } from 'react'
import useModal from './useModal'
import { MetamaskContext } from 'src/contexts/metamask.context'

export default function useMetamask() {
  const { isModalOpen, setIsModalOpen } = useModal()
  const { defaultAccount, connectWalletHandler } = useContext(MetamaskContext)
  const connectMetamask = () => {
    connectWalletHandler()
  }
  useEffect(() => {
    if (defaultAccount) {
      setIsModalOpen(false)
    }
  }, [defaultAccount, setIsModalOpen])

  return {
    connectMetamask,
    isModalOpen,
    defaultAccount,
    setIsModalOpen
  }
}
