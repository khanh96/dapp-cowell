import { Suspense, lazy } from 'react'
import { useRoutes } from 'react-router-dom'
import { path } from 'src/constants/path'
import MainLayout from 'src/layouts/MainLayout'

import NotFound from 'src/pages/NotFound'
import Proposals from 'src/pages/Proposals'
// import Earn from 'src/pages/Earn'
// import Home from 'src/pages/Home'

const Home = lazy(() => import('src/pages/Home'))
const Earn = lazy(() => import('src/pages/Earn'))

export default function useRouterElement() {
  const routeElements = useRoutes([
    {
      path: '',
      element: <MainLayout />,
      children: [
        {
          path: path.home,
          index: true,
          element: <Home />
        },
        {
          path: path.earn,
          element: <Earn />
        },
        {
          path: path.dao,
          element: <Proposals />
        },
        {
          path: '*',
          element: <NotFound />
        }
      ]
    }
  ])
  return <Suspense>{routeElements}</Suspense>
}
