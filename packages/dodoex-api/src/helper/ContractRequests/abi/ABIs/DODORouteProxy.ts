import type { ContractInterface } from '@ethersproject/contracts';

const abi: ContractInterface = [
  {
    inputs: [
      {
        internalType: 'address payable',
        name: 'weth',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'dodoApproveProxy',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'fromToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'toToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'fromAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'returnAmount',
        type: 'uint256',
      },
    ],
    name: 'OrderHistory',
    type: 'event',
  },
  {
    stateMutability: 'payable',
    type: 'fallback',
  },
  {
    inputs: [],
    name: '_DODO_APPROVE_PROXY_',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: '_WETH_',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'fromToken',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'toToken',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'fromTokenAmount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'minReturnAmount',
        type: 'uint256',
      },
      {
        internalType: 'address[]',
        name: 'mixAdapters',
        type: 'address[]',
      },
      {
        internalType: 'address[]',
        name: 'mixPairs',
        type: 'address[]',
      },
      {
        internalType: 'address[]',
        name: 'assetTo',
        type: 'address[]',
      },
      {
        internalType: 'uint256',
        name: 'directions',
        type: 'uint256',
      },
      {
        internalType: 'bytes[]',
        name: 'moreInfos',
        type: 'bytes[]',
      },
      {
        internalType: 'uint256',
        name: 'deadLine',
        type: 'uint256',
      },
    ],
    name: 'mixSwap',
    outputs: [
      {
        internalType: 'uint256',
        name: 'returnAmount',
        type: 'uint256',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'fromTokenAmount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'minReturnAmount',
        type: 'uint256',
      },
      {
        internalType: 'uint256[]',
        name: 'totalWeight',
        type: 'uint256[]',
      },
      {
        internalType: 'uint256[]',
        name: 'splitNumber',
        type: 'uint256[]',
      },
      {
        internalType: 'address[]',
        name: 'midToken',
        type: 'address[]',
      },
      {
        internalType: 'address[]',
        name: 'assetFrom',
        type: 'address[]',
      },
      {
        internalType: 'bytes[]',
        name: 'sequence',
        type: 'bytes[]',
      },
      {
        internalType: 'uint256',
        name: 'deadLine',
        type: 'uint256',
      },
    ],
    name: 'dodoMutliSwap',
    outputs: [
      {
        internalType: 'uint256',
        name: 'returnAmount',
        type: 'uint256',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
];

export default abi;
