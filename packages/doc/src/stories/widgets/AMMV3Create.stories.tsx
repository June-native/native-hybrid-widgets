import { AddLiquidityV3, Widget } from '@native-ammv3/widgets';
import {
  createWeb3Modal,
  defaultConfig,
  useWeb3Modal,
  useWeb3ModalProvider,
} from '@web3modal/ethers5/react';
import React from 'react';
import { Web3Provider } from '@ethersproject/providers';

// 1. Get projectId
const projectId = '3c0b09fae76fbc7d8d8c04221441d6fd';

// 2. Set chains
const mainnet = {
  chainId: 1,
  name: 'Ethereum',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'https://cloudflare-eth.com',
};

// 3. Create modal
const metadata = {
  name: 'My Website',
  description: 'My Website description',
  url: 'https://mywebsite.com',
  icons: ['https://avatars.mywebsite.com/'],
};

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [mainnet],
  projectId,
});

export default {
  title: 'Widgets/AddLiquidityV3',
  component: 'div',
};

export const Primary = (props: any) => {
  const { apiKey, ...other } = props;

  const { open } = useWeb3Modal();
  const { walletProvider } = useWeb3ModalProvider();
  const ethersProvider = React.useMemo(() => {
    if (!walletProvider) return undefined;
    return new Web3Provider(walletProvider);
  }, [walletProvider]);

  return (
    <Widget
      {...other}
      apikey={apiKey}
      provider={ethersProvider}
      onConnectWalletClick={() => {
        open();
        return true;
      }}
    >
      <AddLiquidityV3
        handleGoBack={() => window.alert('handleGoBack')}
        handleGoToPoolList={() => window.alert('handleGoToPoolList')}
        params={{
          // from: '0x4200000000000000000000000000000000000006',
          // to: '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913',
          // fee: '500',

          // from: '0xd05553BC85FA8c004073d91097B7611CD5E478f5',
          // to: '0x444d30Eeb001Dc8B7B96cEF088381418B82f9441',
          // fee: '500',

          // 421614
          // address: '0xC1A6573F0e9A9eC7BaD6815Bd1403F12D98055c6', // mock SHELL
          // lpTokenAddress: '0xbde3d0e47627bf56282a0ab5d64eba133f0a4421', // NTLP-SHELL
          // NTLP-SHELL
          // from: '0xC1A6573F0e9A9eC7BaD6815Bd1403F12D98055c6',
          // fromLp: '0xbde3d0e47627bf56282a0ab5d64eba133f0a4421',

          // // address: '0xE11C25Ec4E6f74Ddfeb41FEccB050d63153340c2', // Mock Token PI
          // // lpTokenAddress: '0xc5bad597236208fb2b022852664c135c259cb05a', // NTLP-PI
          // // NTLP-PI
          // to: '0xE11C25Ec4E6f74Ddfeb41FEccB050d63153340c2',
          // toLp: '0xc5bad597236208fb2b022852664c135c259cb05a',

          // fee: '10000',

          from: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
          fromLp: '0x5994258Ec80Cc6853e2B6F047Ec6D213FE89B24b',
          to: '0x1D88713b483A8E45cfF0e5CD7c2e15E5Fab4534d',
          toLp: '0x66550d6453dbb70103b96fac81052f106d4fffeb',
          fee: '3000',
        }}
      />
    </Widget>
  );
};

Primary.args = {
  projectId: 'project2',
  apiKey: 'ee53d6b75b12aceed4',
  width: '100%',
  height: '100%',
  noDocumentLink: true,
  onlyChainId: 1,
  // onlyChainId: 8453,
  // onlyChainId: 11155111,
  noUI: true,
  tokenList: [
    // {
    //   address: '0x8f2a9f23d5d70226491B0c10365dE88f64cD4a01',
    //   decimals: 18,
    //   symbol: 'TK1A',
    //   name: 'TK1A',
    //   chainId: 11155111,
    // },
    // {
    //   address: '0xd05553BC85FA8c004073d91097B7611CD5E478f5',
    //   decimals: 6,
    //   symbol: 'USDT-A',
    //   name: 'usdtA',
    //   chainId: 11155111,
    // },
    // {
    //   address: '0x163D876AF3949f45D934870a1783A040Cf717Bc5',
    //   decimals: 18,
    //   symbol: 'uni_test2',
    //   name: 'uni_test2',
    //   chainId: 11155111,
    // },
    // {
    //   address: '0x444d30Eeb001Dc8B7B96cEF088381418B82f9441',
    //   decimals: 6,
    //   symbol: 'uni_test3',
    //   name: 'uni_test3',
    //   chainId: 11155111,
    // },
    // {
    //   address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    //   decimals: 18,
    //   symbol: 'DAI',
    //   name: 'Dai Stablecoin',
    //   chainId: 1,
    // },
    // {
    //   address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    //   decimals: 6,
    //   symbol: 'USDC',
    //   name: 'USD Coin',
    //   chainId: 1,
    // },
    // {
    //   address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
    //   decimals: 8,
    //   symbol: 'WBTC',
    //   name: 'Wrapped BTC',
    //   chainId: 1,
    // },
    // {
    //   address: '0x4200000000000000000000000000000000000006',
    //   decimals: 18,
    //   symbol: 'WETH',
    //   name: 'Wrapped Ether',
    //   chainId: 8453,
    // },
    // {
    //   address: '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913',
    //   decimals: 6,
    //   symbol: 'USDC',
    //   name: 'USD Coin',
    //   chainId: 8453,
    // },
  ],
};
