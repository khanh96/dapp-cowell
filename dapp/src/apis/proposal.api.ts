import { Proposal } from 'src/types/proposal.type'
import http from 'src/utils/http'
import { SuccessResponseApi } from 'src/utils/utils.type'

export type CreateProposalBody = {
  name: string
  description: string
}

export type CreateProposalBody = {
  name: string
  description: string
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
  createProposal: (params: CreateProposalBody) => {
    return http.post<SuccessResponseProposal>(`proposal`, params)
  },
  updateProposal: (params: any) => {
    return http.post<SuccessResponseProposal>(`proposal/${params.id}`, params)
  }
}
