import { ChainId } from '@native-ammv3/api';
import { CHAIN_TO_ADDRESSES_MAP } from '../sdks/sdk-core/addresses';

export function useV3NFTPositionManagerContract(chainId: ChainId | undefined) {
  const contract = chainId
    ? CHAIN_TO_ADDRESSES_MAP[chainId].nonfungiblePositionManagerAddress
    : undefined;

  return contract;
}
