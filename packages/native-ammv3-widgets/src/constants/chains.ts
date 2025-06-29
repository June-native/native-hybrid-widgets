import { ChainId } from '@native-ammv3/api';
export { etherTokenAddress, basicTokenMap } from '@native-ammv3/api';

export const rpcServerMap: {
  [key in ChainId]: Array<string>;
} = {
  [ChainId.MAINNET]: [
    'https://rpc.ankr.com/eth',
    'https://eth-mainnet.public.blastapi.io',
    'https://eth-rpc.gateway.pokt.network',
    'https://main-rpc.linkpool.io',
  ],
  [ChainId.BSC]: [
    'https://bsc-dataseed1.binance.org',
    'https://bsc-dataseed2.binance.org',
    'https://bsc-dataseed3.binance.org',
  ],
  [ChainId.ARBITRUM_ONE]: [
    'https://arb1.arbitrum.io/rpc',
    'https://rpc.ankr.com/arbitrum',
  ],
  [ChainId.ARBITRUM_SEPOLIA]: ['https://sepolia-rollup.arbitrum.io/rpc'],
  [ChainId.SEPOLIA]: ['https://ethereum-sepolia-rpc.publicnode.com'],
  [ChainId.BASE]: ['https://mainnet.base.org'],
  [ChainId.BERACHAIN]: ['https://rpc.berachain.com'],
};
export const getRpcSingleUrlMap = (newRpcServerMap?: {
  [chainId: number]: string[];
}) => {
  const result = {} as {
    [key in ChainId]?: string;
  };
  Object.entries(rpcServerMap).forEach(([key, urls]) => {
    const chainId = Number(key) as ChainId;
    const urlsResult = newRpcServerMap?.[chainId] || urls;
    const [url] = urlsResult;
    if (url) {
      result[chainId] = url;
    }
  });
  return result as {
    [key in ChainId]: string;
  };
};

export const scanUrlDomainMap: {
  [key in ChainId]: string;
} = {
  [ChainId.MAINNET]: 'etherscan.io',
  [ChainId.BSC]: 'bscscan.com',
  [ChainId.BASE]: 'basescan.org',
  [ChainId.BERACHAIN]: 'berascan.com',
  [ChainId.ARBITRUM_ONE]: 'arbiscan.io',
  [ChainId.ARBITRUM_SEPOLIA]: 'sepolia.arbiscan.io',
  [ChainId.SEPOLIA]: 'sepolia.etherscan.io',
};

export const ThegraphKeyMap: {
  [key in ChainId]: string;
} = {
  [ChainId.BSC]: 'bsc',
  [ChainId.MAINNET]: 'ethereum-mainnet',
  [ChainId.ARBITRUM_ONE]: 'arbitrum',
  [ChainId.ARBITRUM_SEPOLIA]: 'arb-sep',
  [ChainId.SEPOLIA]: 'sepolia',
  [ChainId.BASE]: 'base',
  [ChainId.BERACHAIN]: 'berachain',
};
