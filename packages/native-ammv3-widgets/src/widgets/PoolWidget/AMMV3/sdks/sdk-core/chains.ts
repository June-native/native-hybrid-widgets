import { ChainId } from '@native-ammv3/api';
export { ChainId } from '@native-ammv3/api';

export const SUPPORTED_CHAINS = [
  ChainId.MAINNET,
  ChainId.ARBITRUM_ONE,
  ChainId.BSC,
  ChainId.SEPOLIA,
  ChainId.ARBITRUM_SEPOLIA,
  ChainId.OKCHAIN,
  ChainId.BASE,
] as const;
export type SupportedChainsType = (typeof SUPPORTED_CHAINS)[number];
