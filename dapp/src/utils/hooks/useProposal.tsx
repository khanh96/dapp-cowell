import React, { useEffect, useState } from 'react'
import useMetamask from './useMetamask'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { CreateProposalBody, UpdateProposalBody, proposalApi } from 'src/apis/proposal.api'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { path } from 'src/constants/path'
import { readGetVotes, writeDelegate } from 'src/abi/common.abi'
import { transaction } from 'src/constants/transaction'

export const useProposal = () => {
  const queryClient = useQueryClient()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [votingPower, setVotingPower] = useState<string>('')
  const metamaskCTX = useMetamask()
  const navigate = useNavigate()

  const { data: proposalData, refetch: proposalRefetch } = useQuery({
    queryKey: ['proposals'],
    queryFn: () => proposalApi.getProposals(),
    staleTime: 2 * 60 * 1000
  })

  const updateProposalMutation = useMutation({
    mutationFn: ({ id, body }: { id: string; body: UpdateProposalBody }) => {
      return proposalApi.updateProposal(id, body)
    },
    onSuccess: ({ data }) => {
      proposalRefetch()
      toast.success('Voting Success', {
        autoClose: 1000
      })
      queryClient.invalidateQueries({ queryKey: ['proposal'] })
    }
  })

  const proposalMutation = useMutation({
    mutationFn: (body: CreateProposalBody) => {
      return proposalApi.createProposal(body)
    },
    onSuccess: ({ data }) => {
      proposalRefetch()
      toast.success('Create proposal success', {
        autoClose: 1000
      })
      navigate({ pathname: path.dao })
    }
  })

  const createProposal = (body: CreateProposalBody) => {
    proposalMutation.mutate(body)
  }

  const delegate = async (address: string) => {
    setIsLoading(true)
    if (metamaskCTX.contractToken)
      try {
        const transactionWithDelegate = await writeDelegate(metamaskCTX.contractToken, address)
        const resMetamask = await transactionWithDelegate.wait()
        if (resMetamask.status === transaction.success) {
          setIsLoading(false)
        }
        return resMetamask
      } catch (error) {
        console.log(error)
        setIsLoading(false)
      }
  }

  useEffect(() => {
    const getVotes = async () => {
      if (metamaskCTX.contractToken) {
        try {
          const resVote = await readGetVotes(metamaskCTX.contractToken, metamaskCTX.wallet.accounts[0])
          setVotingPower(resVote)
        } catch (error) {
          console.log(error)
        }
      }
    }
    getVotes()
  }, [metamaskCTX.contractToken, metamaskCTX.wallet.accounts])

  return {
    metamaskCTX,
    proposalData,
    createProposal,
    updateProposalMutation,
    proposalMutation,
    votingPower,
    delegate,
    isLoading
  }
}
