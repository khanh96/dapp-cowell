import React from 'react'
import Modal from '../Modal'
import useMetamask from 'src/utils/hooks/useMetamask'
import Button from '../Button'

interface ModalVotingProps {
  setIsModalVoting: (isOpen: boolean) => void
}
export default function ModalVoting(props: ModalVotingProps) {
  const { setIsModalVoting } = props
  const { wallet } = useMetamask()
  return (
    <>
      <Modal onClose={() => setIsModalVoting(false)}>
        <div className='relative mx-auto mt-2 w-[500px] rounded-2xl border-transparent bg-gradient-to-tl from-[#ffe96f] to-[#00e4ce] p-[2px]'>
          <form onSubmit={() => setIsModalVoting(false)}>
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
                  <p className='mb-2 text-[#667085]'>Voting power</p>
                  <p className='mb-2 text-3xl text-white'>0</p>
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

                      <label htmlFor='vote-1' className='ml-2 w-full py-4 text-sm font-medium text-gray-300'>
                        For
                      </label>
                      <input id='vote-1' type='radio' checked={true} name='vote' className='h-4 w-4 ' />
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
                      <label htmlFor='vote-2' className='ml-2 w-full py-4 text-sm font-medium text-gray-300'>
                        Against
                      </label>
                      <input id='vote-2' type='radio' checked={true} name='vote' className='h-4 w-4 ' />
                    </div>
                    <div className='mb-3 flex items-center justify-between rounded border border-gray-700 px-5 hover:border-[#667085]'>
                      <svg viewBox='0 0 512 512' focusable='false' className='h-4 w-4  text-gray-300'>
                        <path
                          d='M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 464c-114.7 0-208-93.31-208-208S141.3 48 256 48s208 93.31 208 208S370.7 464 256 464zM296 336h-16V248C280 234.8 269.3 224 256 224H224C210.8 224 200 234.8 200 248S210.8 272 224 272h8v64h-16C202.8 336 192 346.8 192 360S202.8 384 216 384h80c13.25 0 24-10.75 24-24S309.3 336 296 336zM256 192c17.67 0 32-14.33 32-32c0-17.67-14.33-32-32-32S224 142.3 224 160C224 177.7 238.3 192 256 192z'
                          fill='currentColor'
                        />
                      </svg>
                      <label htmlFor='vote-3' className='ml-2 w-full py-4 text-sm font-medium text-gray-300'>
                        Abstain
                      </label>
                      <input id='vote-3' type='radio' checked={true} name='vote' className='h-4 w-4 ' />
                    </div>
                  </div>
                </div>
                <div className='mt-2 px-3'>
                  <p className='mb-2 text-[#667085]'>Add comment</p>
                  <textarea
                    id='comment'
                    rows={4}
                    className='block w-full rounded-lg border border-gray-700 bg-gray-900 p-2.5  text-sm text-white placeholder-gray-400 focus:border-[#f67712] focus:outline-none  focus:ring-1 '
                    placeholder='Tell the community your thoughts...'
                  />
                </div>
                <div className='px-3 py-3'>
                  <Button kindButton='active' type='submit' className='btn-outline flex justify-center'>
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
