import type { ContractInterface } from '@ethersproject/contracts';

const abi: ContractInterface = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferPrepared',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    inputs: [],
    name: '_BUYOUT_FEE_',
    outputs: [{ internalType: 'int256', name: '', type: 'int256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: '_MAX_FRAG_',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: '_MIN_FRAG_',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: '_NEW_OWNER_',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: '_OWNER_',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'fragAddr', type: 'address' },
      { internalType: 'uint256', name: 'minFrag', type: 'uint256' },
      { internalType: 'uint256', name: 'maxFrag', type: 'uint256' },
      { internalType: 'address', name: 'buyoutAddr', type: 'address' },
    ],
    name: 'addFragInfo',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'claimOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'fragAddr', type: 'address' },
      { internalType: 'address', name: 'user', type: 'address' },
    ],
    name: 'getBuyoutStatus',
    outputs: [{ internalType: 'int256', name: '', type: 'int256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
    name: 'initOwner',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'fragAddr', type: 'address' },
      { internalType: 'uint256', name: 'minFrag', type: 'uint256' },
      { internalType: 'uint256', name: 'maxFrag', type: 'uint256' },
      { internalType: 'address', name: 'buyoutAddr', type: 'address' },
    ],
    name: 'setFragInfo',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'minFrag', type: 'uint256' },
      { internalType: 'uint256', name: 'maxFrag', type: 'uint256' },
      { internalType: 'uint256', name: 'buyoutFee', type: 'uint256' },
    ],
    name: 'setGlobalParam',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

export default abi;
