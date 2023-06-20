export const transaction = {
  success: 1
}

const responseContract = {
  hash: '0x60c11d37ae929354823dbe8ed549bc8ddcb99e2792d1e45ab5be2f22265f638b',
  type: 2,
  accessList: null,
  blockHash: null,
  blockNumber: null,
  transactionIndex: null,
  confirmations: 0,
  from: '0xF89568201Ac27FCF56f3350B6e00E524c8a6045B',
  gasPrice: {
    type: 'BigNumber',
    hex: '0x5969a721'
  },
  maxPriorityFeePerGas: {
    type: 'BigNumber',
    hex: '0x59682f00'
  },
  maxFeePerGas: {
    type: 'BigNumber',
    hex: '0x5969a721'
  },
  gasLimit: {
    type: 'BigNumber',
    hex: '0xb751'
  },
  to: '0xece5b96dB2bdcd49582242a7200c33d2a90e1dCB',
  value: {
    type: 'BigNumber',
    hex: '0x00'
  },
  nonce: 109,
  data: '0x095ea7b300000000000000000000000039ff3df5d9f340a983f01539f88950eda0503edf0000000000000000000000000000000000000000000000056bc75e2d63100000',
  r: '0xa1788a3d11f9e31c98609dbc0e43959c807bb6cbf6a16953169318797ca2d696',
  s: '0x323ec3ce07a4a92dbf2ffdbf0a417d3b23f734a2ca71d4eb11809f7ac80b9145',
  v: 1,
  creates: null,
  chainId: 0
}

const responseDataMetamask = {
  to: '0xece5b96dB2bdcd49582242a7200c33d2a90e1dCB',
  from: '0xF89568201Ac27FCF56f3350B6e00E524c8a6045B',
  contractAddress: null,
  transactionIndex: 12,
  gasUsed: {
    type: 'BigNumber',
    hex: '0x6995'
  },
  logsBloom:
    '0x00100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000020000000040000000000000000200000000000000000000000000000000000000000000000000000000000000000000020000000000400000020000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000010800000000000000000000000000000000000000000000000000000000000',
  blockHash: '0x0045b82b2564685c7f8eb8716a72fa3d9e59163048a66bd13860a78f6f61ef15',
  transactionHash: '0x24634cc40191f69836c5df0c615d83be8a631cfcb5e0e2e3aa9f320d921e9a77',
  logs: [
    {
      transactionIndex: 12,
      blockNumber: 3728786,
      transactionHash: '0x24634cc40191f69836c5df0c615d83be8a631cfcb5e0e2e3aa9f320d921e9a77',
      address: '0xece5b96dB2bdcd49582242a7200c33d2a90e1dCB',
      topics: [
        '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925',
        '0x000000000000000000000000f89568201ac27fcf56f3350b6e00e524c8a6045b',
        '0x00000000000000000000000039ff3df5d9f340a983f01539f88950eda0503edf'
      ],
      data: '0x0000000000000000000000000000000000000000000000056bc75e2d63100000',
      logIndex: 18,
      blockHash: '0x0045b82b2564685c7f8eb8716a72fa3d9e59163048a66bd13860a78f6f61ef15'
    }
  ],
  blockNumber: 3728786,
  confirmations: 1,
  cumulativeGasUsed: {
    type: 'BigNumber',
    hex: '0xaf9adf'
  },
  effectiveGasPrice: {
    type: 'BigNumber',
    hex: '0x59696ff0'
  },
  status: 1,
  type: 2,
  byzantium: true,
  events: [
    {
      transactionIndex: 12,
      blockNumber: 3728786,
      transactionHash: '0x24634cc40191f69836c5df0c615d83be8a631cfcb5e0e2e3aa9f320d921e9a77',
      address: '0xece5b96dB2bdcd49582242a7200c33d2a90e1dCB',
      topics: [
        '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925',
        '0x000000000000000000000000f89568201ac27fcf56f3350b6e00e524c8a6045b',
        '0x00000000000000000000000039ff3df5d9f340a983f01539f88950eda0503edf'
      ],
      data: '0x0000000000000000000000000000000000000000000000056bc75e2d63100000',
      logIndex: 18,
      blockHash: '0x0045b82b2564685c7f8eb8716a72fa3d9e59163048a66bd13860a78f6f61ef15',
      args: [
        '0xF89568201Ac27FCF56f3350B6e00E524c8a6045B',
        '0x39FF3df5d9F340a983F01539f88950eda0503eDf',
        {
          type: 'BigNumber',
          hex: '0x056bc75e2d63100000'
        }
      ],
      event: 'Approval',
      eventSignature: 'Approval(address,address,uint256)'
    }
  ]
}
