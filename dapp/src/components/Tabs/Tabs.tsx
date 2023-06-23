import React, { useState } from 'react'
import TabButton, { ActiveTab } from './TabButton'
import TabContent from './TabContent'

export default function Tabs() {
  const [tab, setTab] = useState<ActiveTab>('for')
  return (
    <div>
      <div className='border-b border-[#1e2740]'>
        <ul
          className='-mb-px flex flex-wrap justify-center text-center text-sm font-medium'
          id='myTab'
          data-tabs-toggle='#myTabContent'
          role='tablist'
        >
          <li className='w-full flex-1' role='presentation'>
            <TabButton tab={tab} isActive={tab === 'for'} onClick={() => setTab('for')} id='for-tab'>
              For
            </TabButton>
          </li>
          <li className='w-full flex-1' role='presentation'>
            <TabButton tab={tab} isActive={tab === 'against'} onClick={() => setTab('against')} id='against-tab'>
              Against
            </TabButton>
          </li>
          <li className='w-full flex-1' role='presentation'>
            <TabButton tab={tab} isActive={tab === 'abstain'} onClick={() => setTab('abstain')} id='abstain-tab'>
              Abstain
            </TabButton>
          </li>
        </ul>
      </div>
      <div>
        {tab === 'for' && (
          <TabContent
            data='480 addresses'
            addresses={[
              {
                address: 'Treasure'
              }
            ]}
          />
        )}
        {tab === 'against' && (
          <TabContent
            data='500 addresses'
            addresses={[
              {
                address: 'Treasure'
              }
            ]}
          />
        )}
        {tab === 'abstain' && (
          <TabContent
            data='200 addresses'
            addresses={[
              {
                address: 'Treasure'
              }
            ]}
          />
        )}
      </div>
    </div>
  )
}
