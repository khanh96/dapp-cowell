import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '../public/vite.svg'
import './App.css'
import Metamask from './components/Metamask'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Metamask />
      </div>
    </>
  )
}

export default App
