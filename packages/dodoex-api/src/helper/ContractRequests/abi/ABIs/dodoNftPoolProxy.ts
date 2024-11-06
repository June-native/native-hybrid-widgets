import type { ContractInterface } from '@ethersproject/contracts';

const abi: ContractInterface = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'cloneFactory',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'filterAdminTemplate',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'controllerModel',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'defaultMaintainer',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'dodoNftApprove',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'dodoApprove',
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
        name: 'newController',
        type: 'address',
      },
    ],
    name: 'ChangeContoller',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'newFilterAdminTemplate',
        type: 'address',
      },
    ],
    name: 'ChangeFilterAdminTemplate',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'newMaintainer',
        type: 'address',
      },
    ],
    name: 'ChangeMaintainer',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'newFilterAdmin',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'newFilterV1',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'nftCollection',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'filterTemplateKey',
        type: 'uint256',
      },
    ],
    name: 'CreateFilterV1',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'newFilterAdmin',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'filterAdminOwner',
        type: 'address',
      },
    ],
    name: 'CreateLiteNFTPool',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'newFilterAdmin',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'filterAdminOwner',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'filter',
        type: 'address',
      },
    ],
    name: 'CreateNFTPool',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'filter',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'received',
        type: 'uint256',
      },
    ],
    name: 'Erc1155In',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'filter',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'received',
        type: 'uint256',
      },
    ],
    name: 'Erc721In',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'nftContract',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'toToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'returnAmount',
        type: 'uint256',
      },
    ],
    name: 'Erc721toErc20',
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
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'idx',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'filterTemplate',
        type: 'address',
      },
    ],
    name: 'SetFilterTemplate',
    type: 'event',
  },
  {
    inputs: [],
    name: '_CLONE_FACTORY_',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: '_CONTROLLER_',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: '_DODO_APPROVE_',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: '_DODO_NFT_APPROVE_',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: '_FILTER_ADMIN_TEMPLATE_',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: '_FILTER_TEMPLATES_',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: '_MAINTAINER_',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: '_NEW_OWNER_',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: '_OWNER_',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
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
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'initOwner',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'filter',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'nftCollection',
        type: 'address',
      },
      {
        internalType: 'uint256[]',
        name: 'tokenIds',
        type: 'uint256[]',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'minMintAmount',
        type: 'uint256',
      },
    ],
    name: 'erc721In',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'filter',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'nftCollection',
        type: 'address',
      },
      {
        internalType: 'uint256[]',
        name: 'tokenIds',
        type: 'uint256[]',
      },
      {
        internalType: 'uint256[]',
        name: 'amounts',
        type: 'uint256[]',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'minMintAmount',
        type: 'uint256',
      },
    ],
    name: 'erc1155In',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'filterAdminOwner',
        type: 'address',
      },
      {
        internalType: 'string[]',
        name: 'infos',
        type: 'string[]',
      },
      {
        internalType: 'uint256[]',
        name: 'numParams',
        type: 'uint256[]',
      },
    ],
    name: 'createLiteNFTPool',
    outputs: [
      {
        internalType: 'address',
        name: 'newFilterAdmin',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'filterAdminOwner',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'nftCollection',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'filterKey',
        type: 'uint256',
      },
      {
        internalType: 'string[]',
        name: 'infos',
        type: 'string[]',
      },
      {
        internalType: 'uint256[]',
        name: 'numParams',
        type: 'uint256[]',
      },
      {
        internalType: 'bool[]',
        name: 'toggles',
        type: 'bool[]',
      },
      {
        internalType: 'uint256[]',
        name: 'filterNumParams',
        type: 'uint256[]',
      },
      {
        internalType: 'uint256[]',
        name: 'priceRules',
        type: 'uint256[]',
      },
      {
        internalType: 'uint256[]',
        name: 'spreadIds',
        type: 'uint256[]',
      },
    ],
    name: 'createNewNFTPoolV1',
    outputs: [
      {
        internalType: 'address',
        name: 'newFilterAdmin',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'key',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'filterAdmin',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'nftCollection',
        type: 'address',
      },
      {
        internalType: 'bool[]',
        name: 'toggles',
        type: 'bool[]',
      },
      {
        internalType: 'string',
        name: 'filterName',
        type: 'string',
      },
      {
        internalType: 'uint256[]',
        name: 'numParams',
        type: 'uint256[]',
      },
      {
        internalType: 'uint256[]',
        name: 'priceRules',
        type: 'uint256[]',
      },
      {
        internalType: 'uint256[]',
        name: 'spreadIds',
        type: 'uint256[]',
      },
    ],
    name: 'createFilterV1',
    outputs: [
      {
        internalType: 'address',
        name: 'newFilterV1',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'filterAdmin',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'filter',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'nftContract',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'toToken',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'dodoProxy',
        type: 'address',
      },
      {
        internalType: 'bytes',
        name: 'dodoSwapData',
        type: 'bytes',
      },
    ],
    name: 'erc721ToErc20',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newMaintainer',
        type: 'address',
      },
    ],
    name: 'changeMaintainer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newFilterAdminTemplate',
        type: 'address',
      },
    ],
    name: 'changeFilterAdminTemplate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newController',
        type: 'address',
      },
    ],
    name: 'changeController',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'idx',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'newFilterTemplate',
        type: 'address',
      },
    ],
    name: 'setFilterTemplate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

export default abi;
