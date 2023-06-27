import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ErrorBoundary from './components/ErrorBoundary'
import useRouterElement from './routers/useRouterElement'
import useMetamask from './utils/hooks/useMetamask'
import NoExtensionMetamask from './pages/NoExtensionMetamask'
import { useEffect } from 'react'
import { CHAIN_ID_OF_NETWORKS, NETWORKS } from './constants/metamask.constants'

function App() {
  const routeElements = useRouterElement()
  const { hasProvider, addChain, wallet } = useMetamask()

  useEffect(() => {
    if (wallet.chainId !== CHAIN_ID_OF_NETWORKS.sepoliaTestnet) {
      addChain(NETWORKS['sepoliaTestnet'])
    }
  }, [wallet, addChain])

  return (
    <ErrorBoundary>
      {hasProvider ? routeElements : <NoExtensionMetamask />}
      <ToastContainer />
    </ErrorBoundary>
  )
}

export default App
