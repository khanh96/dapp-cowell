import { Link, Outlet } from 'react-router-dom'
import Button from 'src/components/Button'
import ModalDelegate from 'src/components/ModalDelegate'
import { path } from 'src/constants/path'
import useModal from 'src/utils/hooks/useModal'
import { StateProposal, useProposal } from 'src/utils/hooks/useProposal'
import { calculatePercent, formatDotAccount } from 'src/utils/utils'
export default function Proposals() {
  const { proposalData, metamaskCTX, votingPower } = useProposal()
  const { isModalOpen, openModal, closeModal } = useModal()

  const onClickDelegate = () => {
    console.log('onClickDelegate')
    // Call smart contract delegate
    openModal()
  }

  return (
    <main className='container max-w-[960px]'>
      <section>
        <div className='flex justify-between rounded-xl border border-[#1e2740] px-4 py-3 '>
          <div className='flex items-center text-left font-medium text-white'>
            <div className='mr-3 h-12 w-12'>
              <img
                src='https://images.unsplash.com/photo-1687314100832-d99ea1fe1c2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80'
                alt='avatar'
                className='h-full w-full rounded-full object-cover'
              />
            </div>
            <span className='mr-3 text-sm text-white'>
              {metamaskCTX.wallet.accounts[0] ? formatDotAccount(metamaskCTX.wallet.accounts[0]) : '0x0000'}
            </span>
          </div>
          <div className='flex items-center justify-end text-right font-medium text-white'>
            <div className='mr-5 flex items-center'>
              <span className='mr-2 text-sm text-[#677395]'>Voting power:</span>
              <span className='text-xl'>{votingPower}</span>
            </div>
            <div>
              <Button kindButton='active' className='btn-primary w-fit text-sm' onClick={onClickDelegate}>
                Delegate
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className='mt-10'>
          <div className=''>
            <div className='flex justify-between rounded-t-xl border border-b-0 border-[#1e2740] px-4 py-3 '>
              <div className='flex items-center text-left font-medium text-white'>Proposals</div>
              <div className='flex items-center justify-end text-right font-medium text-white'>
                <div className='mr-3'>
                  <span className='text-sm'>0</span>
                  <span className='ml-2 text-sm text-[#25C9A1]'>Passed</span>
                </div>
                <div className='mr-5'>
                  <span className='text-sm'>2</span>
                  <span className='ml-2 text-sm text-[#f44061]'>Failed</span>
                </div>
                <Link to={path.proposal_create} className='btn-primary text-sm'>
                  Create new proposal
                </Link>
              </div>
            </div>
            <table className='hidden w-full table-auto px-4 py-3 text-white md:inline-table'>
              <thead className='text-left'>
                <tr className='border border-[#1e2740]'>
                  <th className='px-4 py-3 text-xs text-[#677395]'>Proposal</th>
                  <th className='px-4 py-3 text-xs text-[#677395]'>Governor</th>
                  <th className='px-4 py-3 text-xs text-[#677395]'>Votes for</th>
                  <th className='px-4 py-3 text-xs text-[#677395]'>Votes against</th>
                  <th className='min-w-[161px] px-4 py-3 text-right text-xs text-[#677395]'>Total votes</th>
                </tr>
              </thead>
              <tbody>
                {proposalData &&
                  proposalData?.data.length > 0 &&
                  proposalData?.data.map((proposal) => {
                    const totalVote = proposal.voteFor + proposal.voteAgainst + proposal.voteAbstain
                    const widthFor =
                      proposal.voteFor !== 0 && proposal.voteAgainst !== 0
                        ? calculatePercent(proposal.voteFor, totalVote)
                        : 0
                    const widthAgainst =
                      proposal.voteFor !== 0 && proposal.voteAgainst !== 0
                        ? calculatePercent(proposal.voteAgainst, totalVote)
                        : 0
                    const renderStateProposal = () => {
                      switch (proposal.state) {
                        case StateProposal.Active:
                          return (
                            <span className='mb-4 bg-[#ebe5ff] p-1 text-xs font-bold uppercase text-[#7d33fa]'>
                              Active
                            </span>
                          )
                        case StateProposal.Canceled:
                          return (
                            <span className='mb-4 bg-[#ebe5ff] p-1 text-xs font-bold uppercase text-[#7d33fa]'>
                              Canceled
                            </span>
                          )
                        case StateProposal.Defeated:
                          return (
                            <span className='mb-4 bg-[#ffe6e7] p-1 text-xs font-bold uppercase text-[#F44061]'>
                              Defeated
                            </span>
                          )
                        case StateProposal.Executed:
                          return (
                            <span className='mb-4 bg-[#D9FFFB] p-1 text-xs font-bold uppercase text-[#00BFAF]'>
                              Executed
                            </span>
                          )
                        case StateProposal.Expired:
                          return (
                            <span className='mb-4 bg-[#ebe5ff] p-1 text-xs font-bold uppercase text-[#7d33fa]'>
                              Expired
                            </span>
                          )
                        case StateProposal.Pending:
                          return (
                            <span className='bg-[#D9FFFB] p-1 text-xs font-bold uppercase text-[#00BFAF]'>Pending</span>
                          )
                        case StateProposal.Queued:
                          return (
                            <span className='mb-4 bg-[#ebe5ff] p-1 text-xs font-bold uppercase text-[#7d33fa]'>
                              Queued
                            </span>
                          )
                        case StateProposal.Succeeded:
                          return (
                            <span className='mb-4 bg-[#ebe5ff] p-1 text-xs font-bold uppercase text-[#7d33fa]'>
                              Succeeded
                            </span>
                          )
                        default:
                          break
                      }
                      return ''
                    }
                    return (
                      <tr className='border border-[#1e2740]' key={proposal._id}>
                        <td className='px-4 py-4'>
                          <div className='flex items-center justify-start'>
                            <img
                              className='h-8 w-8'
                              src='https://www.tally.xyz/_next/image?url=https%3A%2F%2Fstatic.tally.xyz%2F51cc280c-b992-4f5c-8190-d5aabd1f82c9_original.png&w=128&q=75'
                              alt='logo'
                            />
                            <div className='ml-3'>
                              <Link
                                to={`${path.proposal_detail.replace(':proposalId', proposal._id)}`}
                                className='mb-1 text-base font-normal line-clamp-1'
                              >
                                {proposal.name}
                              </Link>
                              <div className='flex items-center'>
                                {renderStateProposal()}
                                <p className='ml-2 text-sm text-[#667085]'> Proposed on: {proposal.create_at}</p>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className='break-words px-4 py-3 text-sm'>Aribitrum Treasury</td>
                        <td className='px-4 py-4'>
                          <div className='flex flex-col items-start justify-start'>
                            <p className='text-sm text-[#25C9A1]'>{proposal.voteFor}M</p>
                            <div className='relative mt-2 h-1 w-[100px] rounded-sm bg-[#fcfcfd]'>
                              <div
                                className='absolute left-0 top-0 h-1 rounded-sm bg-[#25C9A1]'
                                style={{ width: `${widthFor}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className='px-4 py-4'>
                          <div className='flex flex-col items-start justify-start'>
                            <p className='text-sm text-[#f44061]'>{proposal.voteAgainst}K</p>
                            <div className='relative mt-2 h-1 w-[100px] rounded-sm bg-[#fcfcfd]'>
                              <div
                                className='absolute left-0 top-0 h-1  rounded-sm bg-[#f44061]'
                                style={{ width: `${widthAgainst}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className='px-4 py-4'>
                          <div className='flex flex-col items-end'>
                            <p className='text-sm font-bold text-[#677395]'>{totalVote}M</p>
                            <p className='text-right text-sm text-[#667085]'>39297 addresses</p>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                {/* <tr className='border border-[#1e2740]'>
                  <td className='px-4 py-4'>
                    <div className='flex items-center justify-start'>
                      <img
                        className='h-8 w-8'
                        src='https://www.tally.xyz/_next/image?url=https%3A%2F%2Fstatic.tally.xyz%2F51cc280c-b992-4f5c-8190-d5aabd1f82c9_original.png&w=128&q=75'
                        alt='logo'
                      />
                      <div className='ml-3'>
                        <Link to={path.home} className='mb-1 text-base font-normal line-clamp-1'>
                          [UPDATED] AIP-1.1 - Lockup, Budget, Transparency
                        </Link>
                        <div className='flex items-center'>
                          <span className='bg-[#ffe6e7] p-1 text-xs font-bold uppercase text-[#F44061]'>Defeated</span>
                          <p className='ml-2 text-sm text-[#667085]'> Proposed on: Jun 8th, 2023</p>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className='break-words px-4 py-3 text-sm'>Aribitrum Treasury</td>
                  <td className='px-4 py-4'>
                    <div className='flex flex-col items-start justify-start'>
                      <p className='text-sm text-[#25C9A1]'>135.01M</p>
                      <div className='relative mt-2 h-1 w-[100px] rounded-sm bg-[#fcfcfd]'>
                        <div className='absolute left-0 top-0 h-1 w-[50%] rounded-sm bg-[#25C9A1]'></div>
                      </div>
                    </div>
                  </td>
                  <td className='px-4 py-4'>
                    <div className='flex flex-col items-start justify-start'>
                      <p className='text-sm text-[#f44061]'>657.07K</p>
                      <div className='relative mt-2 h-1 w-[100px] rounded-sm bg-[#fcfcfd]'>
                        <div className='absolute left-0 top-0 h-1 w-[80%] rounded-sm bg-[#f44061]'></div>
                      </div>
                    </div>
                  </td>
                  <td className='px-4 py-4'>
                    <div className='flex flex-col items-end'>
                      <p className='text-sm font-bold text-[#677395]'>135.73M</p>
                      <p className='text-right text-sm text-[#667085]'>39297 addresses</p>
                    </div>
                  </td>
                </tr> */}
              </tbody>
            </table>
            {/* Mobile */}
            <table className='w-full table-auto px-4 py-3 text-white md:hidden'>
              <thead>
                <tr className='border border-[#1e2740]'>
                  <th className='px-4 py-3 text-left text-xs text-[#677395]'>Proposal</th>
                </tr>
              </thead>
              <tbody>
                <tr className='border border-[#1e2740]'>
                  <td className='px-4 py-4'>
                    <div className='flex items-center justify-start'>
                      <img
                        className='h-8 w-8'
                        src='https://www.tally.xyz/_next/image?url=https%3A%2F%2Fstatic.tally.xyz%2F51cc280c-b992-4f5c-8190-d5aabd1f82c9_original.png&w=128&q=75'
                        alt='logo'
                      />
                      <div className='ml-3'>
                        <Link to={path.home} className='mb-1 text-base font-normal line-clamp-1'>
                          [UPDATED] AIP-1.1 - Lockup, Budget, Transparency
                        </Link>
                        <div className='flex items-center'>
                          <span className='bg-[#ebe5ff] p-1 text-xs font-bold uppercase text-[#7d33fa]'>Active</span>
                          <p className='ml-2 text-sm text-[#667085]'> Proposed on: Jun 8th, 2023</p>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr className='border border-[#1e2740]'>
                  <td className='px-4 py-4'>
                    <div className='flex items-center justify-start'>
                      <img
                        className='h-8 w-8'
                        src='https://www.tally.xyz/_next/image?url=https%3A%2F%2Fstatic.tally.xyz%2F51cc280c-b992-4f5c-8190-d5aabd1f82c9_original.png&w=128&q=75'
                        alt='logo'
                      />
                      <div className='ml-3'>
                        <Link to={path.home} className='mb-1 text-base font-normal line-clamp-1'>
                          [UPDATED] AIP-1.1 - Lockup, Budget, Transparency
                        </Link>
                        <div className='flex items-center'>
                          <span className='bg-[#ffe6e7] p-1 text-xs font-bold uppercase text-[#F44061]'>Defeated</span>
                          <p className='ml-2 text-sm text-[#667085]'> Proposed on: Jun 8th, 2023</p>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      {isModalOpen && <ModalDelegate closeModal={closeModal} />}
    </main>
  )
}
