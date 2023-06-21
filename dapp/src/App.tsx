import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ErrorBoundary from './components/ErrorBoundary'
import useRouterElement from './routers/useRouterElement'
import useMetamask from './utils/hooks/useMetamask'
import NoExtensionMetamask from './pages/NoExtensionMetamask'

function App() {
  const routeElements = useRouterElement()
  const { hasProvider } = useMetamask()

  return (
    <ErrorBoundary>
      {hasProvider ? routeElements : <NoExtensionMetamask />}
      <ToastContainer />
    </ErrorBoundary>
  )
}

export default App
