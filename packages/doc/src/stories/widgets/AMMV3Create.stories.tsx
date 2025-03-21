import { AddLiquidityV3, Widget } from '@native-ammv3/widgets';

export default {
  title: 'Widgets/AddLiquidityV3',
  component: 'div',
};

export const Primary = (props: any) => {
  const { apiKey, ...other } = props;

  return (
    <Widget {...other} apikey={apiKey}>
      <AddLiquidityV3
        handleGoBack={() => window.alert('handleGoBack')}
        handleGoToPoolList={() => window.alert('handleGoToPoolList')}
        params={{
          from: '0x163D876AF3949f45D934870a1783A040Cf717Bc5',
          to: '0x444d30Eeb001Dc8B7B96cEF088381418B82f9441',
          fee: '500',
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
    {
      address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
      decimals: 18,
      symbol: 'DAI',
      name: 'Dai Stablecoin',
      chainId: 1,
    },
    {
      address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      decimals: 6,
      symbol: 'USDC',
      name: 'USD Coin',
      chainId: 1,
    },
    {
      address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
      decimals: 8,
      symbol: 'WBTC',
      name: 'Wrapped BTC',
      chainId: 1,
    },
  ],
};
