import { AMMV3PositionsView, Widget } from '@native-ammv3/widgets';
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
  title: 'Widgets/AMMV3PositionsView',
  component: 'div',
};

/**
 * 
    {
        "tokenId": "4",
        "fee": 500,
        "feeGrowthInside0LastX128": "0",
        "feeGrowthInside1LastX128": "0",
        "liquidity": "263217491269085708408",
        "nonce": "0",
        "operator": "0x0000000000000000000000000000000000000000",
        "tickLower": -16100,
        "tickUpper": -10,
        "token0": "0x163D876AF3949f45D934870a1783A040Cf717Bc5",
        "token1": "0x444d30Eeb001Dc8B7B96cEF088381418B82f9441",
        "tokensOwed0": "0",
        "tokensOwed1": "0"
    },
 */

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
      <AMMV3PositionsView
        token0Address="0x163D876AF3949f45D934870a1783A040Cf717Bc5"
        token1Address="0x444d30Eeb001Dc8B7B96cEF088381418B82f9441"
        feeAmount={500}
        viewType="add-remove"
        onClose={() => window.alert('onClose')}
        handleGoToAddLiquidityV3={() =>
          window.alert('handleGoToAddLiquidityV3')
        }
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
  noUI: true,
  // onlyChainId: 1,
};
