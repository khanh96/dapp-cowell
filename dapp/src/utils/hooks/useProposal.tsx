import React, { useCallback, useEffect, useState } from 'react'
import useMetamask from './useMetamask'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { CreateProposalBody, UpdateProposalBody, proposalApi } from 'src/apis/proposal.api'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { path } from 'src/constants/path'
import { readGetVotes, writeDelegate, writePropose, writeQueue } from 'src/abi/common.abi'
import { transaction } from 'src/constants/transaction'
import { keccak256, toUtf8Bytes } from '../utils'

export const useProposal = () => {
  const queryClient = useQueryClient()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [votingPower, setVotingPower] = useState<string>('')
  const [formDataProposal, setFormDataProposal] = useState<CreateProposalBody>({
    proposal_id: '',
    name: '',
    description: ''
  })
  const metamaskCTX = useMetamask()
  const navigate = useNavigate()

  const { data: proposalData, refetch: proposalRefetch } = useQuery({
    queryKey: ['proposals'],
    queryFn: () => proposalApi.getProposals(),
    staleTime: 2 * 60 * 1000
  })
  console.log('useProposal')

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

  const queue = useCallback(
    async (descriptionHash: string) => {
      const { contractToken, contractDao, wallet } = metamaskCTX
      console.log(
        'data-queue',
        [contractToken?.address],
        [0],
        ['0x42966c68000000000000000000000000000000000000000000000000000000000000000a'],
        descriptionHash
      )
      if (contractToken && contractDao) {
        const transactionQueue = await writeQueue(
          contractDao,
          [contractToken.address],
          [0],
          ['0x42966c68000000000000000000000000000000000000000000000000000000000000000a'],
          descriptionHash
        )
        transactionQueue.wait().then((res) => {
          console.log('success=>', res.status)
        })
      }
    },
    [metamaskCTX]
  )

  const createProposal = async (body: CreateProposalBody) => {
    console.log('votingPower', votingPower)
    const { contractToken, contractDao, wallet } = metamaskCTX

    const params = {
      target: [contractToken?.address],
      value: [0],
      calldatas: ['0x42966c68000000000000000000000000000000000000000000000000000000000000000a'],
      desc: body.description
    }

    if (Number(votingPower) > 0 && contractDao && contractToken) {
      const transactionPropose = await writePropose(
        contractDao,
        [contractToken.address],
        [0],
        ['0x42966c68000000000000000000000000000000000000000000000000000000000000000a'],
        body.description
      )
      console.log('transactionPropose=>', transactionPropose)
      const res = await transactionPropose.wait()
      if (res && res.status === transaction.success) {
        // success transaction proposal
        setFormDataProposal(body)
      }
    }
  }

  useEffect(() => {
    metamaskCTX.contractDao?.on(
      'ProposalCreated',
      (proposalId, proposer, targets, values, signatures, calldatas, voteStart, voteEnd, description) => {
        const desc = keccak256(toUtf8Bytes(description))
        const proposal_id = BigInt(proposalId._hex).toString()
        if (proposalId) {
          console.log(formDataProposal)
          const body = {
            ...formDataProposal,
            proposal_id: proposal_id
          }
          console.log('body', body)
          proposalMutation.mutate(body, {
            // Call ABI queue
            onSuccess: () => {
              queue(desc)
            }
          })
        }
        // console.log('proposalId=>', proposalId)
        // console.log('proposer=>', proposer)
        // console.log('targets=>', targets)
        // console.log('values=>', values)
        // console.log('calldatas=>', calldatas)
        // console.log('voteStart=>', voteStart)
        // console.log('voteEnd=>', voteEnd)
        // console.log('description=>', description)
      }
    )

    return () => {
      metamaskCTX.contractDao?.removeAllListeners('ProposalCreated')
    }
  }, [metamaskCTX.contractDao, formDataProposal, proposalMutation, queue])

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
