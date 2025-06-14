import { ChainId } from './chain';

export const etherTokenAddress = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';

const DEFAULT_BASIC_TOKEN = {
  symbol: 'ETH',
  address: etherTokenAddress,
  name: 'Ether',
  decimals: 18,
  showDecimals: 4,
  wrappedTokenSymbol: 'WETH',
};
export const basicTokenMap: {
  [key in ChainId]: typeof DEFAULT_BASIC_TOKEN & {
    wrappedTokenAddress: string;
  };
} = {
  [ChainId.MAINNET]: {
    ...DEFAULT_BASIC_TOKEN,
    wrappedTokenAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  },
  [ChainId.SEPOLIA]: {
    ...DEFAULT_BASIC_TOKEN,
    wrappedTokenAddress: '0x7B07164ecFaF0F0D85DFC062Bc205a4674c75Aa0',
  },
  [ChainId.BSC]: {
    ...DEFAULT_BASIC_TOKEN,
    symbol: 'BNB',
    name: 'BNB',
    wrappedTokenSymbol: 'WBNB',
    wrappedTokenAddress: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
  },
  [ChainId.ARBITRUM_ONE]: {
    ...DEFAULT_BASIC_TOKEN,
    name: 'Ethereum',
    showDecimals: 6,
    wrappedTokenAddress: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
  },
  [ChainId.ARBITRUM_SEPOLIA]: {
    ...DEFAULT_BASIC_TOKEN,
    name: 'Ethereum',
    showDecimals: 6,
    wrappedTokenAddress: '0xfd6fFee92D25158b29315C71b0Bb4dE727530FaF',
  },
  [ChainId.BASE]: {
    ...DEFAULT_BASIC_TOKEN,
    symbol: 'ETH',
    name: 'Ethereum',
    wrappedTokenSymbol: 'WETH',
    wrappedTokenAddress: '0x4200000000000000000000000000000000000006',
  },
  [ChainId.BERACHAIN]: {
    ...DEFAULT_BASIC_TOKEN,
    symbol: 'BERA',
    name: 'BERA',
    wrappedTokenSymbol: 'WBERA',
    wrappedTokenAddress: '0x6969696969696969696969696969696969696969',
  },
};
