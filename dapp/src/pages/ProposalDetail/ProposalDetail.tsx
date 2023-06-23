import React, { useState } from 'react'
import Button from 'src/components/Button'
import ModalVoting from 'src/components/ModalVoting'
import Tabs from 'src/components/Tabs'

export default function ProposalDetail() {
  const [isModalVoting, setIsModalVoting] = useState(false)
  return (
    <main className='container max-w-[1024px]'>
      <section className='pb-10'>
        <div className='mt-10'>
          <div className=' rounded-xl border border-[#1e2740] '>
            <div className='p-5'>
              <span className='mb-4 bg-[#ebe5ff] p-1 text-xs font-bold uppercase text-[#7d33fa]'>Active</span>
              <div className='flex items-center justify-center'>
                <h2 className='py-4 text-left text-3xl font-medium text-white'>
                  [UPDATED] AIP-1.1 - Lockup, Budget, Transparency
                </h2>
                <div className='ml-10 flex-shrink-0'>
                  <Button kindButton='active' className='btn-primary w-fit'>
                    Vote on-chain
                  </Button>
                </div>
              </div>
            </div>
            <div className='m-0 h-[1px] w-full bg-[#1e2740] p-0'></div>
            <div className='flex items-center justify-start px-5 py-2 '>
              <div className='mr-3 h-12 w-12'>
                <img
                  src='https://images.unsplash.com/photo-1687314100832-d99ea1fe1c2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80'
                  alt='avatar'
                  className='h-full w-full rounded-full object-cover'
                />
              </div>
              <span className='mr-3 text-sm text-[#667085]'>delegate.l2beat.eth</span>
              <div className='mr-3 h-1 w-1 rounded-full bg-white'></div>
              <span className='mr-3 text-sm text-[#667085]'>ID 705456...2480</span>
              <div className='mr-3 h-1 w-1 rounded-full bg-white'></div>
              <span className='mr-3 text-sm text-[#667085]'>Proposed on: Jun 8th, 2023</span>
            </div>
          </div>
        </div>
        <div className='mt-10'>
          <div className='grid grid-cols-12 gap-6'>
            <div className='col-span-12 md:col-span-8'>
              <div className='rounded-xl border border-[#1e2740]'>
                <h3 className='px-5 py-3 text-xl font-bold text-white'>Overview</h3>
                <div className='m-0 h-[1px] w-full bg-[#1e2740] p-0'></div>
                <div className='flex items-center justify-around py-4'>
                  <div className='flex items-center justify-between gap-6'>
                    <div className='flex items-center justify-start'>
                      <span className='h-3 w-3 rounded-full bg-[#25C9A1]'></span>
                      <span className='ml-2 text-sm font-semibold text-[#25C9A1]'>For</span>
                    </div>
                    <span className='text-sm text-[#25C9A1]'>99.54%</span>
                  </div>
                  <div className='flex items-center justify-between gap-6'>
                    <div className='flex items-center justify-start'>
                      <span className='h-3 w-3 rounded-full bg-[#f44061]'></span>
                      <span className='ml-2 text-sm font-semibold text-[#f44061]'>Against</span>
                    </div>
                    <span className='text-sm text-[#f44061]'>99.54%</span>
                  </div>
                  <div className='flex items-center justify-between gap-6'>
                    <div className='flex items-center justify-start'>
                      <span className='h-3 w-3 rounded-full bg-[#718096]'></span>
                      <span className='ml-2 text-sm font-semibold text-[#667085]'>Abstain</span>
                    </div>
                    <span className='text-sm text-[#667085]'>99.54%</span>
                  </div>
                </div>
              </div>
              <div className='mt-5 rounded-xl border border-[#1e2740]'>
                <h3 className='px-5 py-3 text-xl font-bold text-white'>Detail</h3>
                <div className='m-0 h-[1px] w-full bg-[#1e2740] p-0'></div>
                <div className='px-5 py-3 text-sm text-[#667085]'>
                  ATTENTION: This is an updated version of a similar proposal that has been put up for a vote a day
                  prior to this one. We have discovered that the target vesting contract in the previous proposal had an
                  incorrect "start" date. A more detailed explanation is provided below. Please do not vote on the other
                  proposal and vote on this proposal instead. What happened? The way this proposal works is that there
                  is a special AIP smart contract (AIP1Point1Target) that references the location of the vesting vault
                  for the Foundation Administrative Budget Wallet. The on-chain action that the proposal is executing is
                  changing of the “passed” parameter on this AIP smart contract from false to true, documenting DAOs
                  approval for the Foundation to use this referenced vesting vault, after the vote the Foundation will
                  move 700M ARB tokens that are subject of AIP 1.1 to this contract and will be able to retrieve the
                  vested amount to the Foundation’s multisig. One parameter of this setup is a “start” timestamp, which
                  determines the point in time from which the vesting schedule is being calculated. According to the
                  text of AIP-1.1: “…ARB tokens in the “Administrative Budget Wallet” will be subject to a four year
                  lockup schedule, unlocking on a continuous linear time basis commencing from the date of the Snapshot
                  approval of AIP-1.1 by the DAO…”. So this timestamp should be set to 1681754400, which translates to
                  Monday, 17 April 2023 18:00:00 GMT, the date of the Snapshot approval. However, in the vesting
                  contract that was subject to the original vote, it has been wrongly set to the date of the ARB Airdrop
                  (1679590871, which translates to Thursday, 23 March 2023 17:01:11 GMT). This means that the smart
                  contract configuration did not reflect the text of the AIP and would result in the effective unlocked
                  vested amount being too large.
                </div>
              </div>
            </div>
            <div className='col-span-12 md:col-span-4'>
              <div className='rounded-xl border border-[#1e2740]'>
                <h3 className='px-5 py-3 text-xl font-bold text-white'>Votes</h3>
                <div className='m-0 h-[1px] w-full bg-[#1e2740] p-0'></div>
                <Tabs />
              </div>
              <div className='mt-5 rounded-xl border border-[#1e2740]'>
                <h3 className='px-5 py-3 text-xl font-bold text-white'>Status</h3>
                <div className='m-0 h-[1px] w-full bg-[#1e2740] p-0'></div>
                <div className='px-5 py-5'>
                  <div className='flex items-center px-5'>
                    <ol className='relative w-full border-l border-[#1e2740] text-gray-400'>
                      <li className='mb-8 ml-6'>
                        <span className='bg-tra absolute -left-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#060818] ring-1 ring-[#a0aec0]'>
                          <svg viewBox='0 0 448 512' focusable='false' className='h-4 w-4' fill='#a0aec0'>
                            <path d='M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z' />
                          </svg>
                        </span>
                        <p className='text-xs'>Thu Jun 8 04:58am</p>
                        <h3 className='text-sm font-medium leading-tight'>Draft created</h3>
                      </li>
                      <li className='mb-8 ml-6'>
                        <span className='bg-tra absolute -left-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#060818] ring-1 ring-[#a0aec0]'>
                          <svg viewBox='0 0 512 512' focusable='false' className='h-4 w-4' fill='#a0aec0'>
                            <path d='M156.6 384.9L125.7 354c-8.5-8.5-11.5-20.8-7.7-32.2c3-8.9 7-20.5 11.8-33.8L24 288c-8.6 0-16.6-4.6-20.9-12.1s-4.2-16.7 .2-24.1l52.5-88.5c13-21.9 36.5-35.3 61.9-35.3l82.3 0c2.4-4 4.8-7.7 7.2-11.3C289.1-4.1 411.1-8.1 483.9 5.3c11.6 2.1 20.6 11.2 22.8 22.8c13.4 72.9 9.3 194.8-111.4 276.7c-3.5 2.4-7.3 4.8-11.3 7.2v82.3c0 25.4-13.4 49-35.3 61.9l-88.5 52.5c-7.4 4.4-16.6 4.5-24.1 .2s-12.1-12.2-12.1-20.9V380.8c-14.1 4.9-26.4 8.9-35.7 11.9c-11.2 3.6-23.4 .5-31.8-7.8zM384 168c22.1 0 40-17.9 40-40s-17.9-40-40-40s-40 17.9-40 40s17.9 40 40 40z' />
                          </svg>
                        </span>
                        <p className='text-xs'>Thu Jun 8 04:58am</p>
                        <h3 className='text-sm font-medium leading-tight'>Published on-chain</h3>
                      </li>
                      <li className='mb-8 ml-6'>
                        <span className='absolute -left-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#7d33fa] ring-1 ring-[#7d33fa]'>
                          <svg viewBox='0 0 384 512' focusable='false' className='h-4 w-4' fill='#ffffff'>
                            <path d='M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z' />
                          </svg>
                        </span>
                        <p className='text-xs'>Thu Jun 8 04:58am</p>
                        <h3 className='text-sm font-medium leading-tight text-[#7d33fa]'>Voting period started</h3>
                      </li>
                      <li className='mb-8 ml-6'>
                        <span className='absolute -left-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#060818] ring-1 ring-[#1e2740]'>
                          <svg viewBox='0 0 384 512' focusable='false' className='h-4 w-4' fill='#1e2740'>
                            <path d='M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z' />
                          </svg>
                        </span>
                        <p className='text-xs text-[#1e2740]'>Thu Jun 8 04:58am</p>
                        <h3 className='text-sm font-medium leading-tight text-[#1e2740]'>End voting period</h3>
                      </li>
                      <li className='mb-8 ml-6'>
                        <span className='absolute -left-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#060818] ring-1 ring-[#1e2740]'>
                          <svg viewBox='0 0 384 512' focusable='false' className='h-4 w-4' fill='#1e2740'>
                            <path d='M0 32C0 14.3 14.3 0 32 0H64 320h32c17.7 0 32 14.3 32 32s-14.3 32-32 32V75c0 42.4-16.9 83.1-46.9 113.1L237.3 256l67.9 67.9c30 30 46.9 70.7 46.9 113.1v11c17.7 0 32 14.3 32 32s-14.3 32-32 32H320 64 32c-17.7 0-32-14.3-32-32s14.3-32 32-32V437c0-42.4 16.9-83.1 46.9-113.1L146.7 256 78.9 188.1C48.9 158.1 32 117.4 32 75V64C14.3 64 0 49.7 0 32zM96 64V75c0 25.5 10.1 49.9 28.1 67.9L192 210.7l67.9-67.9c18-18 28.1-42.4 28.1-67.9V64H96zm0 384H288V437c0-25.5-10.1-49.9-28.1-67.9L192 301.3l-67.9 67.9c-18 18-28.1 42.4-28.1 67.9v11z' />
                          </svg>
                        </span>
                        <p className='text-xs text-[#1e2740]'>Thu Jun 8 04:58am</p>
                        <h3 className='text-sm font-medium leading-tight text-[#1e2740]'>Queue proposal</h3>
                      </li>
                      <li className='ml-6'>
                        <span className='absolute -left-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#060818] ring-1 ring-[#1e2740]'>
                          <svg viewBox='0 0 448 512' focusable='false' className='h-4 w-4' fill='#1e2740'>
                            <path d='M349.4 44.6c5.9-13.7 1.5-29.7-10.6-38.5s-28.6-8-39.9 1.8l-256 224c-10 8.8-13.6 22.9-8.9 35.3S50.7 288 64 288H175.5L98.6 467.4c-5.9 13.7-1.5 29.7 10.6 38.5s28.6 8 39.9-1.8l256-224c10-8.8 13.6-22.9 8.9-35.3s-16.6-20.7-30-20.7H272.5L349.4 44.6z' />
                          </svg>
                        </span>
                        <p className='text-xs text-[#1e2740]'>Thu Jun 8 04:58am</p>
                        <h3 className='text-sm font-medium leading-tight text-[#1e2740]'>Execute proposal</h3>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {isModalVoting && <ModalVoting />}
    </main>
  )
}
