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

// Networks that share most of the same addresses i.e. Mainnet, Goerli, Optimism, Arbitrum, Polygon
const DEFAULT_ADDRESSES: ChainAddresses = {
  v3CoreFactoryAddress: '0x3d2A7Bac4E8439ABe86B58324695e921a5FC0987',
  nonfungiblePositionManagerAddress:
    '0x483E5c0f309577f79b0a19cE65E332DD388aD7A8',
  poolInitCodeHash:
    '0x4509fa1e2d1989ac1632a56fe87c53e8d1e9d05847694e00f62b23e28cec98c4',
};
const MAINNET_ADDRESSES: ChainAddresses = {
  v3CoreFactoryAddress: '0x1F98431c8aD98523631AE4a59f267346ea31F984',
  nonfungiblePositionManagerAddress:
    '0xC36442b4a4522E871399CD717aBDD847Ab11FE88',
  theGraphUrl:
    'https://gateway.thegraph.com/api/8537b0b51ae5a8474073019fedc65481/subgraphs/id/5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV',
  poolInitCodeHash:
    '0x4509fa1e2d1989ac1632a56fe87c53e8d1e9d05847694e00f62b23e28cec98c4',
};

const ARBITRUM_ONE_ADDRESSES: ChainAddresses = {
  ...DEFAULT_ADDRESSES,
  theGraphUrl:
    'https://gateway.thegraph.com/api/8537b0b51ae5a8474073019fedc65481/subgraphs/id/FbCGRftH4a3yZugY7TnbYgPJVEv2LvMT6oF1fxPe9aJM',
};

// sepolia v3 addresses
const SEPOLIA_ADDRESSES: ChainAddresses = {
  v3CoreFactoryAddress: '0x3d2A7Bac4E8439ABe86B58324695e921a5FC0987',
  nonfungiblePositionManagerAddress:
    '0x483E5c0f309577f79b0a19cE65E332DD388aD7A8',
  poolInitCodeHash:
    '0x4509fa1e2d1989ac1632a56fe87c53e8d1e9d05847694e00f62b23e28cec98c4',
};

const ARBITRUM_SEPOLIA_ADDRESSES: ChainAddresses = {
  v3CoreFactoryAddress: '0x241Fb4e9F9518F9324fb8Bf042EaB5E564e881FB',
  NativeV3PoolDeployer: '0xca99D5E976d45Aa7bB142F405a5afc050dDaA948',
  nonfungiblePositionManagerAddress:
    '0xF582f3D26103f91D9828613453d98065aea4C49a',
  poolInitCodeHash:
    '0x6f4fcfea116711b167b87469b22333669e4ceb8f39b24bef28be93f45af8b70c',
};

const BSC_ADDRESSES: ChainAddresses = {
  ...DEFAULT_ADDRESSES,
};

const OKCHAIN_ADDRESSES: ChainAddresses = {
  ...DEFAULT_ADDRESSES,
};

const BASE_ADDRESSES: ChainAddresses = {
  v3CoreFactoryAddress: '0xC7000871C318b1f038564afd94FdcEEC4F2C8d2e',
  NativeV3PoolDeployer: '0xA7B0d47004C4db88827B5263df8253aAc810995E',
  nonfungiblePositionManagerAddress:
    '0x24400D2Ec38Db5881d03e16aEd463B1B48F7304A',
  theGraphUrl:
    'https://subgraph.satsuma-prod.com/6af7a179712f/native--338080/native-amm-v3-base/version/v0.0.5/api',
  poolInitCodeHash:
    '0xdde0fb4ad9d3f7969c77618f019f5f8abf6ccade9fd3ee64ab6bf14968757a85',
};

const BERACHAIN_ADDRESSES: ChainAddresses = {
  v3CoreFactoryAddress: '0xB4cCd44D3bABe05DfC70b39944796d281AE905EE',
  NativeV3PoolDeployer: '0x93c69485C572aca0467A395aF6f5c7FE49FCA83F',
  nonfungiblePositionManagerAddress:
    '0x1112f006B25FFA661Bf2B0DcEcd4e4F5d0c794A3',
  theGraphUrl:
    'https://api.studio.thegraph.com/query/106537/native-hybrid-berachain-mainnet/version/latest',
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
  [ChainId.OKCHAIN]: OKCHAIN_ADDRESSES,
  [ChainId.BASE]: BASE_ADDRESSES,
  [ChainId.BERACHAIN]: BERACHAIN_ADDRESSES,
};
