import React, { useState } from 'react'

interface ProposalContextInterface {
  vote: string
}

export const initialProposalContext: ProposalContextInterface = {
  vote: ''
}

export const ProposalContext = React.createContext<ProposalContextInterface>({})

export const ProposalContextProvider = ({
  children,
  defaultValue = initialProposalContext
}: {
  children: React.ReactNode
  defaultValue?: ProposalContextInterface
}) => {
  const [vote, setVote] = useState(defaultValue.vote)
  const value = React.useMemo(
    () => ({
      vote
    }),
    [vote]
  )

  return <ProposalContext.Provider value={value}>{children}</ProposalContext.Provider>
}
