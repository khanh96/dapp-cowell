import React, { useCallback, useEffect, useState } from 'react'
import useMetamask from './useMetamask'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { CreateProposalBody, UpdateProposalBody, proposalApi } from 'src/apis/proposal.api'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { path } from 'src/constants/path'
import {
  AbiContractDao,
  AbiContractToken,
  readGetVotes,
  readState,
  writeCastVote,
  writeDelegate,
  writePropose,
  writeQueue
} from 'src/abi/common.abi'
import { transaction } from 'src/constants/transaction'
import { keccak256, toUtf8Bytes } from '../utils'
import type { Contract } from 'ethers'
import { Proposal } from 'src/types/proposal.type'

const VALUE = [0]
const CALLDATAS = [
  '0xa9059cbb000000000000000000000000755915f49ee6b7108f1a9c0f968bcae242b0c68200000000000000000000000000000000000000000000003635c9adc5dea00000'
]

export enum StateProposal {
  Pending,
  Active,
  Canceled,
  Defeated,
  Succeeded,
  Queued,
  Expired,
  Executed
}

export const useProposal = () => {
  const metamaskCTX = useMetamask()
  const queryClient = useQueryClient()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [votingPower, setVotingPower] = useState<string>('')
  const [formDataProposal, setFormDataProposal] = useState<CreateProposalBody>({
    proposal_id: '',
    name: '',
    description: ''
  })
  const [targets, setTargets] = useState<string[]>([import.meta.env.VITE_CONTRACT_PROPOSAL])
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
      // toast.success('Voting Success', {
      //   autoClose: 1000
      // })
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

  const queue = async (description: string) => {
    const { contractToken, contractDao, wallet } = metamaskCTX
    const descriptionHash = keccak256(toUtf8Bytes(description))
    console.log('data-queue', targets, VALUE, CALLDATAS, descriptionHash)
    if (contractToken && contractDao) {
      const transactionQueue = await writeQueue(contractDao, targets, VALUE, CALLDATAS, descriptionHash)
      console.log('transactionQueue', transactionQueue)
      transactionQueue.wait().then((res) => {
        console.log('success=>', res.status)
      })
    }
  }

  const createProposal = async (body: CreateProposalBody) => {
    console.log('votingPower', votingPower)
    const { contractToken, contractDao, wallet } = metamaskCTX
    const params = {
      target: targets,
      value: VALUE,
      calldatas: CALLDATAS,
      desc: body.description
    }
    console.log(params)

    if (Number(votingPower) > 0 && contractDao) {
      const transactionPropose = await writePropose(contractDao, targets, VALUE, CALLDATAS, body.description)
      const res = await transactionPropose.wait()
      if (res && res.status === transaction.success) {
        // success transaction proposal
        setFormDataProposal(body)
        proposalMutation.mutate(body)
      }
    } else {
      toast.error('voting power is not enough', {
        autoClose: 1000
      })
    }
  }

  const castVote = async (proposalId: string, support: number, description: string) => {
    console.log('aaa', metamaskCTX.contractDao, proposalId, support)
    if (metamaskCTX.contractDao) {
      const transactionCastVote = await writeCastVote(metamaskCTX.contractDao, proposalId, support)
      const castVoteRes = await transactionCastVote.wait()
      if (castVoteRes.status === transaction.success) {
        const descriptionHash = keccak256(toUtf8Bytes(description))
        console.log('CAST VOTE SUCCESS ------')
      }
    }
  }

  const handleState = async (proposal: Proposal, proposalId: string) => {
    try {
      const stateResult = await readState(metamaskCTX.contractDao as Contract & AbiContractDao, proposalId)

      if (proposal.state !== stateResult) {
        console.log('UPDATE DB----------')
        handleUpdateStateDB(proposal, stateResult)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleUpdateStateDB = (proposal: Proposal, state: number) => {
    updateProposalMutation.mutate(
      { id: proposal._id, body: { state: state } },
      {
        onSuccess: () => {
          console.log('update State success')
        }
      }
    )
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
    const { contractDao } = metamaskCTX
    metamaskCTX.contractDao?.on(
      'ProposalCreated',
      async (proposalId, proposer, targets, values, signatures, calldatas, voteStart, voteEnd, description) => {
        const proposal_id = BigInt(proposalId._hex).toString()
        const state = await readState(contractDao as Contract & AbiContractDao, proposal_id)
        console.log(state)
        if (proposalId) {
          console.log(formDataProposal)
          const body = {
            ...formDataProposal,
            proposal_id: proposal_id,
            state: state
          }
          console.log('CREATE PROPOSAL SUCCESS ------')
          console.log('body', body)
          console.log('descriptionHash', keccak256(toUtf8Bytes(description)))
          proposalMutation.mutate(body)
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
  }, [metamaskCTX.contractDao, formDataProposal, proposalMutation, metamaskCTX])

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
    isLoading,
    castVote,
    queue,
    handleState
  }
}
