import { Link } from 'react-router-dom'
import useMetamask from 'src/utils/hooks/useMetamask'

export default function NoExtensionMetamask() {
  const { hasProvider } = useMetamask()
  return (
    <div className='m-auto flex h-screen w-full items-center justify-center text-center'>
      {!hasProvider && (
        <Link
          to='https://metamask.io'
          target='_blank'
          className='bg-gradient-to-r from-[#33d4fa] to-[#17f3dd] bg-clip-text text-2xl font-extrabold text-transparent'
        >
          Install MetaMask
        </Link>
      )}
    </div>
  )
}
