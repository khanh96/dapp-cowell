import React from 'react'
import useMetamask from './useMetamask'
import { useMutation, useQuery } from '@tanstack/react-query'
import { CreateProposalBody, proposalApi } from 'src/apis/proposal.api'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { path } from 'src/constants/path'

export const useProposal = () => {
  const { wallet } = useMetamask()
  const navigate = useNavigate()
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
      navigate({ pathname: path.dao })
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
