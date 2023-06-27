import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import Button from 'src/components/Button'
import { useProposal } from 'src/utils/hooks/useProposal'
import { ValidProposalSchemaType, validProposalSchema } from 'src/utils/rules'
import moment from 'moment'

type FormData = ValidProposalSchemaType

export default function ProposalCreate() {
  const {
    handleSubmit,
    formState: { errors },
    register
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      description: ''
    },
    resolver: yupResolver(validProposalSchema)
  })
  const { createProposal, proposalMutation } = useProposal()

  const onSubmitCreateProposal = handleSubmit((data) => {
    const params = {
      ...data,
      voteFor: 80,
      voteAgainst: 40,
      voteAbstain: 0,
      create_at: moment().format('MMM Do, YYYY')
    }
    createProposal(params)
  })

  return (
    <main className='container max-w-[960px]'>
      <section>
        <div className='mt-10'>
          <h2 className='bg-gradient-to-r from-[#9C51FF] from-35% via-[#55A1FF] via-50% to-[#9C51FF] to-65% bg-clip-text text-center text-3xl font-semibold text-transparent'>
            Create a new proposal
          </h2>
          <div className='mt-10 rounded-2xl border-transparent bg-gradient-to-br from-[#9c51ff] via-[#55a1ff] to-[#9c51ff] p-[2px]'>
            <div className='h-full w-full rounded-2xl bg-darkBlue text-white '>
              <div className='flex gap-24 p-5'>
                <div className='w-full'>
                  <p className='mb-3 text-lg font-semibold text-[#7d33fa]'>Parameters</p>
                  <div className='mb-2 flex justify-between'>
                    <p className='text-sm font-normal'>Proposal threshold:</p>
                    <p className='text-sm font-normal'>0</p>
                  </div>
                  <div className='mb-2 flex justify-between'>
                    <p className='text-sm font-normal'>Quorum needed:</p>
                    <p className='text-sm font-normal'>86.06M</p>
                  </div>
                  <div className='mb-2 flex justify-between'>
                    <p className='text-sm font-normal'>Proposal delay</p>
                    <p className='text-sm font-normal'>3 days</p>
                  </div>
                  <div className='mb-2 flex justify-between'>
                    <p className='text-sm font-normal'>Voting period:</p>
                    <p className='text-sm font-normal'>14 days</p>
                  </div>
                </div>
                <div className='w-full'>
                  <p className='mb-3 text-lg font-semibold text-[#7d33fa]'>Contract addresses</p>
                  <div className='mb-2 flex justify-between'>
                    <p className='text-sm font-normal'>Governor:</p>
                    <p className='text-sm font-normal'>0x0x0x0x00xx0xxx00x0000</p>
                  </div>
                  <div className='mb-2 flex justify-between'>
                    <p className='text-sm font-normal'>Token:</p>
                    <p className='text-sm font-normal'>0x0x0x0x00xx0xxx00x0000</p>
                  </div>
                  <div className='mb-2 flex justify-between'>
                    <p className='text-sm font-normal'>Treasury:</p>
                    <p className='text-sm font-normal'>0x0x0x0x00xx0xxx00x0000</p>
                  </div>
                </div>
              </div>
              <div className='m-0 h-[2px] w-full bg-gradient-to-br from-[#9c51ff] via-[#55a1ff] to-[#9c51ff] p-0'></div>
              <div className='p-5'>
                <form onSubmit={onSubmitCreateProposal}>
                  <div className=''>
                    <label htmlFor='name' className='mb-2 block text-sm font-medium text-white'>
                      Title
                    </label>
                    <input
                      type='text'
                      id='name'
                      className='block w-full rounded-lg border border-gray-600 bg-gray-900 p-2.5  text-sm text-white placeholder-gray-400 focus:border-[#9c51ff] focus:outline-none  focus:ring-1 '
                      placeholder='Enter the title your proposal'
                      {...register('name')}
                    />
                    <div className='my-1 min-h-[1.25rem] text-left text-sm font-normal text-[#ff0000]'>
                      {errors.name?.message}
                    </div>
                  </div>
                  <div className=''>
                    <label htmlFor='desc' className='mb-2 block text-sm font-medium  text-white'>
                      Description
                    </label>
                    <textarea
                      id='desc'
                      rows={4}
                      className='block w-full rounded-lg border border-gray-600 bg-gray-900 p-2.5  text-sm text-white placeholder-gray-400 focus:border-[#9c51ff] focus:outline-none  focus:ring-1 '
                      placeholder='Enter the description of your proposal ...'
                      {...register('description')}
                    />
                    <div className='my-1 min-h-[1.25rem] text-left text-sm font-normal text-[#ff0000]'>
                      {errors.description?.message}
                    </div>
                  </div>
                  <Button
                    kindButton='active'
                    isLoading={proposalMutation.isLoading}
                    iconLoading={
                      <svg
                        viewBox='0 0 24 24'
                        fill='#ffffff'
                        width='20px'
                        xmlns='http://www.w3.org/2000/svg'
                        className='ml-1 h-5 w-5 animate-spin text-center'
                      >
                        <path d='M12 6V7.79C12 8.24 12.54 8.46 12.85 8.14L15.64 5.35C15.84 5.15 15.84 4.84 15.64 4.64L12.85 1.85C12.54 1.54 12 1.76 12 2.21V4C7.58 4 4 7.58 4 12C4 13.04 4.2 14.04 4.57 14.95C4.84 15.62 5.7 15.8 6.21 15.29C6.48 15.02 6.59 14.61 6.44 14.25C6.15 13.56 6 12.79 6 12C6 8.69 8.69 6 12 6ZM17.79 8.71C17.52 8.98 17.41 9.4 17.56 9.75C17.84 10.45 18 11.21 18 12C18 15.31 15.31 18 12 18V16.21C12 15.76 11.46 15.54 11.15 15.86L8.36 18.65C8.16 18.85 8.16 19.16 8.36 19.36L11.15 22.15C11.46 22.46 12 22.24 12 21.8V20C16.42 20 20 16.42 20 12C20 10.96 19.8 9.96 19.43 9.05C19.16 8.38 18.3 8.2 17.79 8.71Z' />
                      </svg>
                    }
                    type='submit'
                    className=' mb-2 mr-2 flex w-full justify-center rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-blue-300'
                  >
                    Submit
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
