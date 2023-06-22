import Button from 'src/components/Button'

export default function ProposalCreate() {
  return (
    <main className='container max-w-[960px]'>
      <section>
        <div className='mt-10'>
          {/* {' '}
          rgb(156, 81, 255) 0%, rgb(85, 161, 255) 50%, rgb(156, 81, 255) */}
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
                <form>
                  <div className='mb-6'>
                    <label htmlFor='title' className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'>
                      Title
                    </label>
                    <input
                      type='text'
                      id='title'
                      className='block w-full rounded-lg border border-gray-600 bg-gray-900 p-2.5  text-sm text-white placeholder-gray-400 focus:border-[#9c51ff] focus:outline-none  focus:ring-1 '
                      placeholder='Enter the title your proposal'
                      required
                    />
                  </div>
                  <div className='mb-6'>
                    <label htmlFor='desc' className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'>
                      Description
                    </label>
                    <textarea
                      id='desc'
                      rows={4}
                      className='block w-full rounded-lg border border-gray-600 bg-gray-900 p-2.5  text-sm text-white placeholder-gray-400 focus:border-[#9c51ff] focus:outline-none  focus:ring-1 '
                      placeholder='Enter the description of your proposal as markdown text...'
                      defaultValue={''}
                    />
                  </div>

                  <Button
                    kindButton='active'
                    type='submit'
                    className='mb-2 mr-2 w-full rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-blue-300'
                  >
                    Submit
                  </Button>
                </form>
              </div>
            </div>
          </div>
          <div className=''></div>
        </div>
      </section>
    </main>
  )
}
