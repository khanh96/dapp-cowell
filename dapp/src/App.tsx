import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ErrorBoundary from './components/ErrorBoundary'
import useRouterElement from './routers/useRouterElement'

function App() {
  const routeElements = useRouterElement()
  return (
    <ErrorBoundary>
      {routeElements}
      <ToastContainer />
    </ErrorBoundary>
  )
}

export default App
