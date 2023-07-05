import Modal from '../Modal'
import Button from '../Button'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { validVotingSchema } from 'src/utils/rules'
import { useProposal } from 'src/utils/hooks/useProposal'
import { Proposal } from 'src/types/proposal.type'
import { UpdateProposalBody } from 'src/apis/proposal.api'

interface ModalVotingProps {
  setIsModalVoting: (isOpen: boolean) => void
  proposal?: Proposal
}
enum VoteType {
  Against,
  For,
  Abstain
}
const votes = {
  against: 'against',
  abstain: 'abstain',
  for: 'for-vote'
}

type FormData = {
  comment: string
  vote: 'for-vote' | 'against' | 'abstain'
}

function typeOfVoting(proposal: Proposal, voting: number, typeVoting: 'for-vote' | 'against' | 'abstain'): number {
  let total = 0
  switch (typeVoting) {
    case votes.for:
      total = proposal.voteFor + voting
      break
    case votes.against:
      total = proposal.voteAgainst + voting
      break
    case votes.abstain:
      total = proposal.voteAbstain + voting
      break
  }
  return total
}

export default function ModalVoting(props: ModalVotingProps) {
  const { setIsModalVoting, proposal } = props
  const { metamaskCTX, votingPower, updateProposalMutation, castVote } = useProposal()
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      comment: '',
      vote: 'for-vote'
    },
    resolver: yupResolver(validVotingSchema)
  })
  const onSubmitVoting = handleSubmit((data) => {
    let support: VoteType = VoteType.Abstain
    // setIsModalVoting(false)
    // Call Api
    // Call api get vote + voting power
    if (proposal) {
      const total = typeOfVoting(proposal, Number(votingPower), data.vote)
      const params: UpdateProposalBody = {
        comment: data.comment
      }
      switch (data.vote) {
        case votes.for:
          params['voteFor'] = total
          support = VoteType.For
          break
        case votes.against:
          params['voteAgainst'] = total
          support = VoteType.Against
          break
        case votes.abstain:
          params['voteAbstain'] = total
          support = VoteType.Abstain
          break
      }
      castVote(proposal.proposal_id, support, proposal.description)

      //Call api update
      // updateProposalMutation.mutate(
      //   { id: proposal._id, body: params },
      //   {
      //     onSuccess: () => {
      //       setIsModalVoting(false)
      //     }
      //   }
      // )
    }
  })
  console.log('render Modal voting')

  return (
    <>
      <Modal onClose={() => setIsModalVoting(false)}>
        <div className='relative mx-auto mt-2 w-[500px] rounded-2xl border-transparent bg-gradient-to-tl from-[#ffe96f] to-[#00e4ce] p-[2px]'>
          <form onSubmit={onSubmitVoting}>
            <div className='h-full w-full rounded-2xl bg-darkBlue p-4'>
              <div className='flex justify-end'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='#4c556f'
                  viewBox='0 0 24 24'
                  strokeWidth={2.0}
                  stroke='#4c556f'
                  className='h-6 w-6 cursor-pointer'
                  onClick={() => null}
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                </svg>
              </div>
              <h2 className='text-center font-[ExtraBold] text-xl font-normal text-[#17f3dd]'>Voting</h2>
              <div className='mt-4 flex w-full flex-col rounded-2xl border-2 border-[#f67712] bg-[#1e2740] py-4'>
                <div className='rounded-xl border border-[#1e2740] px-3'>
                  <p className='mb-2 text-[#667085]'>Address</p>
                  <p className='mb-2 text-lg text-white'>{metamaskCTX.wallet.accounts[0]}</p>
                </div>
                <div className='rounded-xl border border-[#1e2740] px-3'>
                  <p className='mb-2 text-[#667085]'>Voting power</p>
                  <p className='mb-2 text-3xl text-white'>{votingPower}</p>
                </div>
                <div className='m-0 h-[1px] w-full bg-[#f67712] p-0'></div>
                <div className='mt-2 px-3'>
                  <p className='mb-2 text-[#667085]'>Vote</p>
                  <div>
                    <div className='mb-3 flex items-center justify-between rounded border border-gray-700 px-5 hover:border-[#25C9A1]'>
                      <svg viewBox='0 0 512 512' focusable='false' className='h-4 w-4 text-gray-300'>
                        <path
                          d='M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z'
                          fill='currentColor'
                        />
                      </svg>

                      <label htmlFor={votes.for} className='ml-2 w-full py-4 text-sm font-medium text-gray-300'>
                        For
                      </label>
                      <input id={votes.for} type='radio' value={votes.for} className='h-4 w-4' {...register('vote')} />
                    </div>
                    <div className='mb-3 flex items-center justify-between rounded border border-gray-700 px-5 hover:border-[#f44061]'>
                      <svg
                        viewBox='0 0 320 512'
                        focusable='false'
                        className='h-4 w-4 rounded-full border border-gray-300 text-gray-300'
                      >
                        <path
                          d='M315.3 411.3c-6.253 6.253-16.37 6.253-22.63 0L160 278.6 27.3 411.3c-6.253 6.253-16.37 6.253-22.63 0-6.253-6.253-6.253-16.37 0-22.63L137.4 256 4.69 123.3c-6.253-6.253-6.253-16.37 0-22.63 6.253-6.253 16.37-6.253 22.63 0L160 233.4l132.7-132.7c6.253-6.253 16.37-6.253 22.63 0 6.253 6.253 6.253 16.37 0 22.63L182.6 256l132.7 132.7c6.3 6.2 6.3 16.4 0 22.6z'
                          fill='currentColor'
                        />
                      </svg>
                      <label htmlFor={votes.against} className='ml-2 w-full py-4 text-sm font-medium text-gray-300'>
                        Against
                      </label>
                      <input
                        id={votes.against}
                        type='radio'
                        value={votes.against}
                        className='h-4 w-4'
                        {...register('vote')}
                      />
                    </div>
                    <div className='mb-3 flex items-center justify-between rounded border border-gray-700 px-5 hover:border-[#667085]'>
                      <svg viewBox='0 0 512 512' focusable='false' className='h-4 w-4  text-gray-300'>
                        <path
                          d='M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 464c-114.7 0-208-93.31-208-208S141.3 48 256 48s208 93.31 208 208S370.7 464 256 464zM296 336h-16V248C280 234.8 269.3 224 256 224H224C210.8 224 200 234.8 200 248S210.8 272 224 272h8v64h-16C202.8 336 192 346.8 192 360S202.8 384 216 384h80c13.25 0 24-10.75 24-24S309.3 336 296 336zM256 192c17.67 0 32-14.33 32-32c0-17.67-14.33-32-32-32S224 142.3 224 160C224 177.7 238.3 192 256 192z'
                          fill='currentColor'
                        />
                      </svg>
                      <label htmlFor={votes.abstain} className='ml-2 w-full py-4 text-sm font-medium text-gray-300'>
                        Abstain
                      </label>
                      <input
                        id={votes.abstain}
                        type='radio'
                        value={votes.abstain}
                        className='h-4 w-4'
                        {...register('vote')}
                      />
                    </div>
                  </div>
                </div>

                <div className='px-3'>
                  <p className='mb-2 text-[#667085]'>Comment</p>
                  <textarea
                    id='comment'
                    rows={4}
                    className='block w-full rounded-lg border border-gray-700 bg-gray-900 p-2.5  text-sm text-white placeholder-gray-400 focus:border-[#f67712] focus:outline-none  focus:ring-1 '
                    placeholder='Enter the comment reason voting...'
                    {...register('comment')}
                  />
                  <div className='my-1 min-h-[1.25rem] text-left text-sm font-normal text-[#ff0000]'>
                    {errors.comment?.message}
                  </div>
                </div>
                <div className='px-3 py-3'>
                  <Button
                    kindButton='active'
                    type='submit'
                    className='btn-outline flex justify-center'
                    isLoading={updateProposalMutation.isLoading}
                    disabled={updateProposalMutation.isLoading}
                    iconLoading={
                      <svg
                        viewBox='0 0 24 24'
                        fill='#060818'
                        width='20px'
                        xmlns='http://www.w3.org/2000/svg'
                        className='ml-1 h-5 w-5 animate-spin'
                      >
                        <path d='M12 6V7.79C12 8.24 12.54 8.46 12.85 8.14L15.64 5.35C15.84 5.15 15.84 4.84 15.64 4.64L12.85 1.85C12.54 1.54 12 1.76 12 2.21V4C7.58 4 4 7.58 4 12C4 13.04 4.2 14.04 4.57 14.95C4.84 15.62 5.7 15.8 6.21 15.29C6.48 15.02 6.59 14.61 6.44 14.25C6.15 13.56 6 12.79 6 12C6 8.69 8.69 6 12 6ZM17.79 8.71C17.52 8.98 17.41 9.4 17.56 9.75C17.84 10.45 18 11.21 18 12C18 15.31 15.31 18 12 18V16.21C12 15.76 11.46 15.54 11.15 15.86L8.36 18.65C8.16 18.85 8.16 19.16 8.36 19.36L11.15 22.15C11.46 22.46 12 22.24 12 21.8V20C16.42 20 20 16.42 20 12C20 10.96 19.8 9.96 19.43 9.05C19.16 8.38 18.3 8.2 17.79 8.71Z' />
                      </svg>
                    }
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </>
  )
}
