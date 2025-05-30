import { ChainId } from '@native-ammv3/api';
import { CHAIN_TO_ADDRESSES_MAP } from '../sdks/sdk-core/addresses';

export function useV3NFTPositionManagerContract(chainId: ChainId | undefined) {
  const contract = chainId
    ? CHAIN_TO_ADDRESSES_MAP[chainId].nonfungiblePositionManagerAddress
    : undefined;

  return contract;
}

export function useV3Factory(chainId: ChainId | undefined) {
  const contract = chainId
    ? CHAIN_TO_ADDRESSES_MAP[chainId].v3CoreFactoryAddress
    : undefined;

  return contract;
}

export function useV3TheGraphUrl(chainId: ChainId | undefined) {
  const url = chainId ? CHAIN_TO_ADDRESSES_MAP[chainId].theGraphUrl : undefined;

  return url;
}
