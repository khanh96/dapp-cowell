export interface Proposal {
  _id: string
  description: string
  name: string
  voteFor: number
  voteAgainst: number
  voteAbstain: number
  create_at: string
  state: number
  proposal_id: string
}
