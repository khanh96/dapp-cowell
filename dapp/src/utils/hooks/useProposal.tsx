import React from 'react'
import useMetamask from './useMetamask'
import { useMutation, useQuery } from '@tanstack/react-query'
import { CreateProposalBody, proposalApi } from 'src/apis/proposal.api'
import { toast } from 'react-toastify'

export const useProposal = () => {
  const { wallet } = useMetamask()
  const { data: proposalData, refetch: proposalRefetch } = useQuery({
    queryKey: ['proposals'],
    queryFn: () => proposalApi.getProposals()
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
    }
  })

  const createProposal = (body: CreateProposalBody) => {
    proposalMutation.mutate(body)
  }

  return {
    proposalData,
    createProposal,
    proposalMutation
  }
}
