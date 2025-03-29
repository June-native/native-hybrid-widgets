import { AMMV3PositionsView, Widget } from '@native-ammv3/widgets';

export default {
  title: 'Widgets/AMMV3PositionsViewClaim',
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

  return (
    <Widget {...other} apikey={apiKey}>
      <AMMV3PositionsView
        token0Address="0x163D876AF3949f45D934870a1783A040Cf717Bc5"
        token1Address="0x444d30Eeb001Dc8B7B96cEF088381418B82f9441"
        feeAmount={500}
        viewType="claim"
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
  onlyChainId: 421614,
  // onlyChainId: 8453,
};
