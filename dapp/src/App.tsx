import { ToastContainer, toast } from 'react-toastify'
import { useEffect } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import Metamask from './components/Metamask'
import ErrorBoundary from './components/ErrorBoundary'
import useRouterElement from './routers/useRouterElement'

function App() {
  const routeElements = useRouterElement()
  return (
    <ErrorBoundary>
      {/* <div>
        <Metamask />
      </div> */}
      {routeElements}
      <ToastContainer />
    </ErrorBoundary>
  )
}

export default App
