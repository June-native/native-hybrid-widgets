import { ChainId } from '@native-ammv3/api';
import { NONFUNGIBLE_POSITION_MANAGER_ADDRESSES } from '../sdks/sdk-core/addresses';

export function useV3NFTPositionManagerContract(chainId: ChainId | undefined) {
  const contract = chainId
    ? NONFUNGIBLE_POSITION_MANAGER_ADDRESSES[chainId]
    : undefined;

  return contract;
}
