/** value needs to be consistent with the name of the json file under the ABI before it can be dynamically imported. */
export enum ABIName {
  // short ABI
  customERC20IsMintable = 'customERC20IsMintable',
  customMultiCallAggregate = 'customMultiCallAggregate',

  // lazy import
  erc20Helper = 'erc20Helper',
  erc20ABI = 'erc20ABI',
  erc20Mock = 'erc20Mock',
  dodoERC20V3Factory = 'dodoERC20V3Factory',
  dodoCustomMintableERC20 = 'dodoCustomMintableERC20',
  multicallABI = 'multicallABI',
  dppPoolABI = 'dppPoolABI',
  dvmPoolABI = 'DVM',
  classicalPoolABI = 'classicalPoolABI',
  v3MiningABI = 'v3MiningABI',
  dodoMiningABI = 'dodoMiningABI',
  dodoCP = 'dodoCP',
  dodoCPABI = 'dodoCPABI',
  dodoCPABIV2 = 'dodoCPABIV2',
  dodoCpProxyV2 = 'dodoCpProxyV2',
  dodoCpProxyV202 = 'dodoCpProxyV202',
  dodoFeeImpl = 'dodoFeeImpl',
  feeABI = 'feeABI',
  vdodo = 'vdodo',
  vdodoTokenABI = 'vdodoTokenABI',
  dodoPreminingABI = 'dodoPreminingABI',
  MerkleDistributorABI = 'MerkleDistributorABI',
  DODOCirculationHelperABI = 'DODOCirculationHelperABI',
  FundingABI = 'FundingABI',
  dodoStarterProxy = 'dodoStarterProxy',
  MarginTrading = 'MarginTrading',
  MarginTradingFactory = 'MarginTradingFactory',
  DODORouteProxy = 'DODORouteProxy',
  dodoProxyV2 = 'dodoProxyV2',
  AaveLendingPoolABI = 'AaveLendingPoolABI',
  AaveProtocolDataProviderABI = 'AaveProtocolDataProviderABI',
  AaveLendingPoolAddressesProvider = 'AaveLendingPoolAddressesProvider',
  AavePriceOracleABI = 'AavePriceOracleABI',
  spaceIdABI = 'spaceIdABI',
  spaceIdResolverABI = 'spaceIdResolverABI',

  /** classical pool */
  dodoABI = 'dodoABI',
  /** pancake pair pool */
  PancakePairABI = 'PancakePairABI',

  dodoDspProxy = 'dodoDspProxy',
  dodoDppProxy = 'dodoDppProxy',
  IdodoV2 = 'IdodoV2',
  dodoDPPAdmin = 'dodoDPPAdmin',
  dodoDSP = 'dodoDSP',
  dodoDVM = 'dodoDVM',
  dodoDSPFactory = 'dodoDSPFactory',
  dodoDVMFactory = 'dodoDVMFactory',
  D3Proxy = 'D3Proxy',
  dodoNftERC721 = 'dodoNftERC721',
  dodoNftERC1155 = 'dodoNftERC1155',
  dodoDropsProxy = 'dodoDropsProxy',
  dodoNftVault = 'dodoNftVault',
  dodoNftProxy = 'dodoNftProxy',
  dodoFragment = 'dodoFragment',
  dodoBuyoutModel = 'dodoBuyoutModel',
  dodoNftPoolProxy = 'dodoNftPoolProxy',
  nftFilterAdmin = 'nftFilterAdmin',
  baseFilterV1 = 'baseFilterV1',
  FilterERC721V1 = 'FilterERC721V1',
  FilterERC1155V1 = 'FilterERC1155V1',
  dodoV1PairProxy = 'dodoV1PairProxy',
  dodoPair = 'dodoPair',
  dodoMineV3Proxy = 'dodoMineV3Proxy',
  dodoMineV3ProxyOld = 'dodoMineV3ProxyOld',
  LockedTokenVaultABI = 'LockedTokenVaultABI',
  DODOV1PmmHelperABI = 'DODOV1PmmHelperABI',

  D3MM_READ_ABI = 'D3MM_READ_ABI',
}
