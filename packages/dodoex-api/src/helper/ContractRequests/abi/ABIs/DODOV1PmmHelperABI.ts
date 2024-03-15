import type { ContractInterface } from '@ethersproject/contracts';

const abi: ContractInterface = [
  {
    inputs: [{ internalType: 'address', name: 'pool', type: 'address' }],
    name: 'getPairDetail',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'i', type: 'uint256' },
          { internalType: 'uint256', name: 'K', type: 'uint256' },
          { internalType: 'uint256', name: 'B', type: 'uint256' },
          { internalType: 'uint256', name: 'Q', type: 'uint256' },
          { internalType: 'uint256', name: 'B0', type: 'uint256' },
          { internalType: 'uint256', name: 'Q0', type: 'uint256' },
          { internalType: 'uint256', name: 'R', type: 'uint256' },
          { internalType: 'uint256', name: 'lpFeeRate', type: 'uint256' },
          { internalType: 'uint256', name: 'mtFeeRate', type: 'uint256' },
          { internalType: 'address', name: 'baseToken', type: 'address' },
          {
            internalType: 'address',
            name: 'quoteToken',
            type: 'address',
          },
          { internalType: 'address', name: 'curPair', type: 'address' },
          {
            internalType: 'uint256',
            name: 'pairVersion',
            type: 'uint256',
          },
        ],
        internalType: 'struct DODOV1PmmHelper.PairDetail[]',
        name: 'res',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

export default abi;
