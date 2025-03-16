import { BigNumber } from 'bignumber.js';

export { UnstyleWidget, Widget } from './components/Widget';

export type { WidgetProps } from './components/Widget';

export { default as AddLiquidityV3 } from './widgets/PoolWidget/AMMV3/AddLiquidityV3';
export { AMMV3PositionsView } from './widgets/PoolWidget/AMMV3/AMMV3PositionsView';

export { NonfungiblePositionManagerABI } from '@native-ammv3/api';
export { useV3NFTPositionManagerContract } from './widgets/PoolWidget/AMMV3/hooks/useContract';
export { FeeAmount } from './widgets/PoolWidget/AMMV3/sdks/v3-sdk/constants';
export type { PositionDetails } from './widgets/PoolWidget/AMMV3/types/position';

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
});
