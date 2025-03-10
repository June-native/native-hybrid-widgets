import { ChainId, platformIdMap } from '@native-ammv3/api';

export const getPlatformId = (chainId: ChainId) =>
  platformIdMap[chainId] || platformIdMap[ChainId.MAINNET];
