import { Proposal } from 'src/types/proposal.type'
import http from 'src/utils/http'

export type CreateProposalBody = {
  proposal_id: string
  name: string
  description: string
}

export type UpdateProposalBody = {
  comment?: string
  voteFor?: number
  voteAgainst?: number
  voteAbstain?: number
  state: number
}

export type SuccessResponseProposal = {
  id: string
  params: CreateProposalBody
  _created: string
  _changed: string
  _createdby: string
  _changedby: string
  _keywords: string[]
  _tags: string
  _version: number
}

export const proposalApi = {
  getProposals: () => {
    return http.get<Proposal[]>('proposal')
  },
  getProposal: (id: string) => {
    return http.get<Proposal>(`proposal/${id}`)
  },
  createProposal: (body: CreateProposalBody) => {
    return http.post<SuccessResponseProposal>(`proposal`, body)
  },
  updateProposal: (id: string, body: UpdateProposalBody) => {
    return http.put<SuccessResponseProposal>(`proposal/${id}`, body)
  }
}
