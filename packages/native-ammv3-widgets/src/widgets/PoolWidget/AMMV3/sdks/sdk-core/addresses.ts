import { ChainId, SUPPORTED_CHAINS, SupportedChainsType } from './chains';

type AddressMap = { [chainId: number]: string };

type ChainAddresses = {
  /**
   * UniswapV3Factory
   * @see https://taikoscan.io/address/0x78172691DD3B8ADa7aEbd9bFfB487FB11D735DB2?tab=contract#code
   */
  v3CoreFactoryAddress: string;
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
  ...DEFAULT_ADDRESSES,
};

const BSC_ADDRESSES: ChainAddresses = {
  ...DEFAULT_ADDRESSES,
};

const OKCHAIN_ADDRESSES: ChainAddresses = {
  ...DEFAULT_ADDRESSES,
};

const BASE_ADDRESSES: ChainAddresses = {
  v3CoreFactoryAddress: '0x3c6154B5a9Bf28807520999F40d8647d4942D395',
  nonfungiblePositionManagerAddress:
    '0xe3D41d19564922C9952f692C5Dd0563030f5f2EF',
  theGraphUrl:
    'https://gateway.thegraph.com/api/8537b0b51ae5a8474073019fedc65481/subgraphs/id/3NUY93m3pDzhT4numRAoxVaKWUhrQPBu6KZ5feeB5igy',
  poolInitCodeHash:
    '0x110f971109df8022508055738d0597e74de19b0a45f6fb436e01284112b66daf',
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
};

/* V3 Contract Addresses */
export const V3_CORE_FACTORY_ADDRESSES: AddressMap = {
  ...SUPPORTED_CHAINS.reduce<AddressMap>((memo, chainId) => {
    memo[chainId] = CHAIN_TO_ADDRESSES_MAP[chainId].v3CoreFactoryAddress;
    return memo;
  }, {}),
};

export const NONFUNGIBLE_POSITION_MANAGER_ADDRESSES: AddressMap = {
  ...SUPPORTED_CHAINS.reduce<AddressMap>((memo, chainId) => {
    const nonfungiblePositionManagerAddress =
      CHAIN_TO_ADDRESSES_MAP[chainId].nonfungiblePositionManagerAddress;
    if (nonfungiblePositionManagerAddress) {
      memo[chainId] = nonfungiblePositionManagerAddress;
    }
    return memo;
  }, {}),
};
