import { Link, Outlet } from 'react-router-dom'
import logoCoin from 'src/assets/images/logo-cw.png'
import Button from 'src/components/Button'
import { path } from 'src/constants/path'
export default function Proposals() {
  return (
    <main className='container max-w-[960px]'>
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
                        <div className='absolute left-0 top-0 h-1 w-[20%] rounded-sm bg-[#f44061]'></div>
                      </div>
                    </div>
                  </td>
                  <td className='px-4 py-4'>
                    <div className='flex flex-col items-end'>
                      <p className='text-sm font-bold text-[#677395]'>135.73M</p>
                      <p className='text-right text-sm text-[#667085]'>39297 addresses</p>
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
                </tr>
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
    </main>
  )
}
