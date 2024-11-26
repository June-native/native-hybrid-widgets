export {
  ChainId,
  basicTokenMap,
  contractConfig,
  etherTokenAddress,
  platformIdMap,
} from './chainConfig';
export { setContractRequests } from '@dodoex/dodo-contract-request';

export {
  ABIName,
  CONTRACT_QUERY_KEY,
  default as ContractRequests,
} from './helper/ContractRequests';
export type { ContractRequestsConfig, Query } from './helper/ContractRequests';
export { default as GraphQLRequests } from './helper/GraphQLRequests';
export { default as RestApiRequests } from './helper/RestApiRequests';

export { AMMV3Api } from './services/ammv3';
export type { TickData, Ticks, UniswapGraphqlChainId } from './services/ammv3';
export {
  PMMHelper,
  PMMModel,
  PMMState,
  PoolApi,
  getPmmModel,
  solveQuadraticFunctionForTarget,
} from './services/pool';
export type { PmmModelParams, PoolType } from './services/pool';
export { SwapWidgetApi } from './services/SwapWidgetApi';

export { MiningApi, MiningStatusE } from './services/mining';
export type { MiningMiningInfo } from './services/mining';

export { TokenApi } from './services/TokenApi';

export { SwapApi } from './services/swap/SwapApi';
export { SystemApi } from './services/system/SystemApi';

export { UniPoolV2Api } from './services/UniPoolV2Api';

export type ExcludeNone<T> = NonNullable<T>;
