import { Suspense, lazy } from 'react'
import { useRoutes } from 'react-router-dom'
import { path } from 'src/constants/path'
import MainLayout from 'src/layouts/MainLayout'

import NotFound from 'src/pages/NotFound'
import ProposalCreate from 'src/pages/ProposalCreate'
import ProposalDetail from 'src/pages/ProposalDetail'
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
          path: path.proposal_create,
          element: <ProposalCreate />
        },
        {
          path: path.proposal_detail,
          element: <ProposalDetail />
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
