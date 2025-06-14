import { ChainId } from './chain';

export const platformIdMap: {
  [key in ChainId]: string;
} = {
  [ChainId.MAINNET]: 'ethereum',
  [ChainId.BSC]: 'bsc',
  [ChainId.ARBITRUM_ONE]: 'arbitrum',
  [ChainId.ARBITRUM_SEPOLIA]: 'arb-sep',
  [ChainId.SEPOLIA]: 'sepolia',
  [ChainId.BASE]: 'base',
  [ChainId.BERACHAIN]: 'berachain',
};
