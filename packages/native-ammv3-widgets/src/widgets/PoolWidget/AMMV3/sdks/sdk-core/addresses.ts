import { ChainId, SupportedChainsType } from './chains';

type AddressMap = { [chainId: number]: string };

type ChainAddresses = {
  /**
   * UniswapV3Factory
   * @see https://taikoscan.io/address/0x78172691DD3B8ADa7aEbd9bFfB487FB11D735DB2?tab=contract#code
   */
  v3CoreFactoryAddress: string;
  /**
   * NativeV3PoolDeployer
   * 部分网络如 base 需要使用 NativeV3PoolDeployer 来部署池子并计算池子地址
   * @see https://basescan.org/address/0xBA8dB0CAf781cAc69b6acf6C848aC148264Cc05d#code
   */
  NativeV3PoolDeployer?: string;
  /**
   * NonfungiblePositionManager
   * @see https://taikoscan.io/address/0x2623281DdcC34A73a9e8898f2c57A32A860903f1?tab=contract#code
   */
  nonfungiblePositionManagerAddress?: string;

  /**
   * Thegraph key
   */
  theGraphUrl?: string;

  /**
   * POOL_INIT_CODE_HASH
   *
   * @see https://basescan.org/address/0xe3D41d19564922C9952f692C5Dd0563030f5f2EF#code#F8#L6
   * @see PoolAddress.sol
   */
  poolInitCodeHash: string;
};

const MAINNET_ADDRESSES: ChainAddresses = {
  v3CoreFactoryAddress: '0xB4cCd44D3bABe05DfC70b39944796d281AE905EE',
  NativeV3PoolDeployer: '0x93c69485C572aca0467A395aF6f5c7FE49FCA83F',
  nonfungiblePositionManagerAddress:
    // '0x6aab72787F7E9EE48c45fc97B0FD0F7B25F80cB9',
    '0x7f5Bd5688D1cE33b4BA3B3CA5901E69188ef994d', // patched slot0.protocolFee datatype
  theGraphUrl:
    'https://gateway.thegraph.com/api/subgraphs/id/6hXjt23gepeW56vJJTfQim1kVdm1bjEvqVZfu3tpGny6',
  poolInitCodeHash:
    '0x6f4fcfea116711b167b87469b22333669e4ceb8f39b24bef28be93f45af8b70c',
};

const ARBITRUM_ONE_ADDRESSES: ChainAddresses = {
  v3CoreFactoryAddress: '0xB4cCd44D3bABe05DfC70b39944796d281AE905EE',
  NativeV3PoolDeployer: '0x93c69485C572aca0467A395aF6f5c7FE49FCA83F',
  nonfungiblePositionManagerAddress:
    // '0x6aab72787F7E9EE48c45fc97B0FD0F7B25F80cB9',
    '0xe86e803810555dB05d2c85b6aa9Ea36Bd25FD117', // patched slot0.protocolFee datatype
  theGraphUrl:
    'https://gateway.thegraph.com/api/subgraphs/id/m7jy1LL9aihKD7arZXwgkDHRoy1xp43LoVtPDuxVcjn',
  poolInitCodeHash:
    '0x6f4fcfea116711b167b87469b22333669e4ceb8f39b24bef28be93f45af8b70c',
};

// sepolia v3 addresses
const SEPOLIA_ADDRESSES: ChainAddresses = {
  v3CoreFactoryAddress: '0x3d2A7Bac4E8439ABe86B58324695e921a5FC0987',
  nonfungiblePositionManagerAddress:
    '0x483E5c0f309577f79b0a19cE65E332DD388aD7A8', // broken if protocolFee > 0
  poolInitCodeHash:
    '0x4509fa1e2d1989ac1632a56fe87c53e8d1e9d05847694e00f62b23e28cec98c4',
};

const ARBITRUM_SEPOLIA_ADDRESSES: ChainAddresses = {
  v3CoreFactoryAddress: '0x241Fb4e9F9518F9324fb8Bf042EaB5E564e881FB',
  NativeV3PoolDeployer: '0xca99D5E976d45Aa7bB142F405a5afc050dDaA948',
  nonfungiblePositionManagerAddress:
    '0xF582f3D26103f91D9828613453d98065aea4C49a', // broken if protocolFee > 0
  poolInitCodeHash:
    '0x6f4fcfea116711b167b87469b22333669e4ceb8f39b24bef28be93f45af8b70c',
};

const BSC_ADDRESSES: ChainAddresses = {
  v3CoreFactoryAddress: '0xB4cCd44D3bABe05DfC70b39944796d281AE905EE',
  NativeV3PoolDeployer: '0x93c69485C572aca0467A395aF6f5c7FE49FCA83F',
  nonfungiblePositionManagerAddress:
    // '0x6aab72787F7E9EE48c45fc97B0FD0F7B25F80cB9',
    '0x7f5Bd5688D1cE33b4BA3B3CA5901E69188ef994d', // patched slot0.protocolFee datatype
  theGraphUrl:
    'https://gateway.thegraph.com/api/subgraphs/id/8171zkXXXz6pv98vpRwnTUueKCU2eHuu9BMxT8UR8KbB',
  poolInitCodeHash:
    '0x6f4fcfea116711b167b87469b22333669e4ceb8f39b24bef28be93f45af8b70c',
};

const BASE_ADDRESSES: ChainAddresses = {
  v3CoreFactoryAddress: '0xB4cCd44D3bABe05DfC70b39944796d281AE905EE',
  NativeV3PoolDeployer: '0x93c69485C572aca0467A395aF6f5c7FE49FCA83F',
  nonfungiblePositionManagerAddress:
    '0x27A60E47194e12F6bd2d0cBb7754b7739C12De20', // patched slot0.protocolFee datatype
  theGraphUrl:
    'https://gateway.thegraph.com/api/subgraphs/id/HXvzRFSnvUPQaNo99zZc7PzCyRyGb5u57H8tzL4bfAdW',
  poolInitCodeHash:
    '0x6f4fcfea116711b167b87469b22333669e4ceb8f39b24bef28be93f45af8b70c',
};

const BERACHAIN_ADDRESSES: ChainAddresses = {
  v3CoreFactoryAddress: '0xB4cCd44D3bABe05DfC70b39944796d281AE905EE',
  NativeV3PoolDeployer: '0x93c69485C572aca0467A395aF6f5c7FE49FCA83F',
  nonfungiblePositionManagerAddress:
    // '0x1112f006B25FFA661Bf2B0DcEcd4e4F5d0c794A3',
    '0xADbA2DeE89196A330c1c169021e9dC6Dbcab3e8b', // patched slot0.protocolFee datatype
  theGraphUrl:
    'https://gateway.thegraph.com/api/subgraphs/id/CZTvEDJA8jmCRJ9yLjeaBpKYTUVvVpz7qwSYJeoiaEM8',
  poolInitCodeHash:
    '0x6f4fcfea116711b167b87469b22333669e4ceb8f39b24bef28be93f45af8b70c',
};

export const CHAIN_TO_ADDRESSES_MAP: Record<
  SupportedChainsType,
  ChainAddresses
> = {
  [ChainId.MAINNET]: MAINNET_ADDRESSES,
  [ChainId.ARBITRUM_ONE]: ARBITRUM_ONE_ADDRESSES,
  [ChainId.SEPOLIA]: SEPOLIA_ADDRESSES,
  [ChainId.ARBITRUM_SEPOLIA]: ARBITRUM_SEPOLIA_ADDRESSES,
  [ChainId.BSC]: BSC_ADDRESSES,
  [ChainId.BASE]: BASE_ADDRESSES,
  [ChainId.BERACHAIN]: BERACHAIN_ADDRESSES,
};
