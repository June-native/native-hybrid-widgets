import { BigNumber } from 'bignumber.js';
import { SwapProps } from './components/Swap';
import { WidgetProps } from './components/Widget';

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
});

export type { WidgetProps } from './components/Widget';

export { default as AddLiquidityV3 } from './widgets/PoolWidget/AMMV3/AddLiquidityV3';
export { AMMV3PositionsView } from './widgets/PoolWidget/AMMV3/AMMV3PositionsView';

export { NonfungiblePositionManagerABI } from '@native-ammv3/api';
export { PageType, useRouterStore } from './router';
export type { Page } from './router';
export {
  useV3Factory,
  useV3NFTPositionManagerContract,
} from './widgets/PoolWidget/AMMV3/hooks/useContract';
export { FeeAmount } from './widgets/PoolWidget/AMMV3/sdks/v3-sdk/constants';
export type { PositionDetails } from './widgets/PoolWidget/AMMV3/types/position';

import { Swap } from './components/Swap';
import { Widget } from './components/Widget';

export { WIDGET_CLASS_NAME } from './components/Widget';

export { MetadataFlag } from './hooks/Submission/types';

export { EmptyList } from './components/List/EmptyList';
export { FailedList } from './components/List/FailedList';
export { Swap } from './components/Swap';
export { TokenCard } from './components/Swap/components/TokenCard';
export { default as TokenLogo } from './components/TokenLogo';
export { Message, UnstyleWidget, Widget } from './components/Widget';
export { WIDGET_MODULE_CLASS_NAME } from './components/WidgetContainer';
export { chainListMap } from './constants/chainList';
export { rpcServerMap, scanUrlDomainMap } from './constants/chains';
export type { TokenInfo } from './hooks/Token/type';
export { useMessageState } from './hooks/useMessageState';
export { getEtherscanPage } from './utils/address';
export {
  formatPercentageNumber,
  formatReadableNumber,
  formatShortNumber,
  formatTokenAmountNumber,
} from './utils/formatter';

export type SwapWidgetProps = WidgetProps & SwapProps;

export function SwapWidget(props: SwapWidgetProps) {
  return (
    <Widget {...props}>
      <Swap
        getAutoSlippage={props.getAutoSlippage}
        onPayTokenChange={props.onPayTokenChange}
        onReceiveTokenChange={props.onReceiveTokenChange}
      />
    </Widget>
  );
}
