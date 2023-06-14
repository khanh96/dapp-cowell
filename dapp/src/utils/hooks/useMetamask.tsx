import { useContext, useEffect } from 'react'
import useModal from './useModal'
import { MetamaskContext } from 'src/contexts/metamask.context'

export default function useMetamask() {
  const { isModalOpen, closeModal, openModal } = useModal()
  const { defaultAccount, connectWalletHandler } = useContext(MetamaskContext)
  const connectMetamask = () => {
    connectWalletHandler()
  }
  useEffect(() => {
    if (defaultAccount) {
      closeModal()
    }
  }, [defaultAccount, closeModal])
  return {
    connectMetamask,
    isModalOpen,
    defaultAccount,
    closeModal,
    openModal
  }
}
