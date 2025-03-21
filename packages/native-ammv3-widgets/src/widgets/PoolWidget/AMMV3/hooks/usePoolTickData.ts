import { ChainId } from '@native-ammv3/api';
import { useQuery } from '@tanstack/react-query';
import JSBI from 'jsbi';
import { useEffect, useMemo, useState } from 'react';
import { useWalletInfo } from '../../../../hooks/ConnectWallet/useWalletInfo';
import {
  CHAIN_TO_ADDRESSES_MAP,
  Currency,
  Price,
  Token,
  V3_CORE_FACTORY_ADDRESSES,
} from '../sdks/sdk-core';
import {
  computePoolAddress,
  FeeAmount,
  TICK_SPACINGS,
  tickToPrice,
} from '../sdks/v3-sdk';
import computeSurroundingTicks from '../utils/computeSurroundingTicks';
import { PoolState, usePool } from './usePools';

const PRICE_FIXED_DIGITS = 8;
const tick = {
  id: '0x5777d92f208679db4b9778590fa3cab3ac9e2168#1',
  liquidityNet: '-10000499987500624950939',
  poolAddress: '0x5777d92f208679db4b9778590fa3cab3ac9e2168',
  price0: '1.0001',
  price1: '0.99990000999900009999000099990001',
  tickIdx: '1',
};
const ticksResponse = {
  ticks: [tick],
};

// Tick with fields parsed to JSBIs, and active liquidity computed.
export interface TickProcessed {
  tick: number;
  liquidityActive: JSBI;
  liquidityNet: JSBI;
  price0: string;
  sdkPrice: Price<Token, Token>;
}

const getActiveTick = (
  tickCurrent: number | undefined,
  feeAmount: FeeAmount | undefined,
) =>
  tickCurrent && feeAmount
    ? Math.floor(tickCurrent / TICK_SPACINGS[feeAmount]) *
      TICK_SPACINGS[feeAmount]
    : undefined;

const MAX_TICK_FETCH_VALUE = 1000;
function usePaginatedTickQuery(
  currencyA: Currency | undefined,
  currencyB: Currency | undefined,
  feeAmount: FeeAmount | undefined,
  skip = 0,
  chainId: ChainId,
) {
  const poolAddress =
    currencyA && currencyB && feeAmount
      ? computePoolAddress({
          tokenA: currencyA?.wrapped,
          tokenB: currencyB?.wrapped,
          fee: feeAmount,
          chainId,
          factoryAddress: V3_CORE_FACTORY_ADDRESSES[chainId],
        })
      : undefined;

  const result = useQuery({
    queryKey: ['ticks', chainId, poolAddress, skip],
    queryFn: async () => {
      const theGraphUrl = CHAIN_TO_ADDRESSES_MAP[chainId]?.theGraphUrl;
      if (!theGraphUrl) {
        return null;
      }

      const response = await fetch(theGraphUrl, {
        body: `{"query":"query Ticks($skip: Int, $first: Int, $where: Tick_filter) {\\n  ticks(skip: $skip, first: $first, where: $where) {\\n    id\\n    poolAddress\\n    tickIdx\\n    liquidityNet\\n    price0\\n    price1\\n  }\\n}","variables":{"skip":${skip},"first":${MAX_TICK_FETCH_VALUE},"where":{"poolAddress":"${
          poolAddress?.toLowerCase() ?? ''
        }","liquidityNet_not":0},"orderBy":"tickIdx"},"operationName":"Ticks"}`,
        method: 'POST',
      });
      const data = await response.json();
      return data.data as typeof ticksResponse;
    },
    enabled: !!poolAddress,
  });
  return result;
}

// Fetches all ticks for a given pool
function useAllV3Ticks(
  currencyA: Currency | undefined,
  currencyB: Currency | undefined,
  feeAmount: FeeAmount | undefined,
  chainId: ChainId,
) {
  const [skipNumber, setSkipNumber] = useState(0);
  const [tickData, setTickData] = useState<(typeof ticksResponse)['ticks']>([]);
  const { data, error, isLoading } = usePaginatedTickQuery(
    currencyA,
    currencyB,
    feeAmount,
    skipNumber,
    chainId,
  );
  const ticks = data?.ticks;

  useEffect(() => {
    if (ticks?.length) {
      setTickData((tickData) => [...tickData, ...ticks]);
      if (ticks?.length === MAX_TICK_FETCH_VALUE) {
        setSkipNumber((skipNumber) => skipNumber + MAX_TICK_FETCH_VALUE);
      }
    }
  }, [ticks]);

  return {
    isLoading: isLoading || ticks?.length === MAX_TICK_FETCH_VALUE,
    error,
    ticks: tickData,
  };
}

export function usePoolActiveLiquidity(
  currencyA: Currency | undefined,
  currencyB: Currency | undefined,
  feeAmount: FeeAmount | undefined,
  chainId?: ChainId,
): {
  isLoading: boolean;
  error: any;
  currentTick?: number;
  activeTick?: number;
  liquidity?: JSBI;
  sqrtPriceX96?: JSBI;
  data?: TickProcessed[];
} {
  const { chainId: defaultChainId } = useWalletInfo();
  const pool = usePool(currencyA, currencyB, feeAmount);
  const liquidity = pool[1]?.liquidity;
  const sqrtPriceX96 = pool[1]?.sqrtRatioX96;

  const currentTick = pool[1]?.tickCurrent;
  // Find nearest valid tick for pool in case tick is not initialized.
  const activeTick = useMemo(
    () => getActiveTick(currentTick, feeAmount),
    [currentTick, feeAmount],
  );

  const { isLoading, error, ticks } = useAllV3Ticks(
    currencyA,
    currencyB,
    feeAmount,
    chainId ?? defaultChainId,
  );

  return useMemo(() => {
    if (
      !currencyA ||
      !currencyB ||
      activeTick === undefined ||
      pool[0] !== PoolState.EXISTS ||
      !ticks ||
      ticks.length === 0 ||
      isLoading
    ) {
      return {
        isLoading: isLoading || pool[0] === PoolState.LOADING,
        error,
        activeTick,
        data: undefined,
      };
    }

    const token0 = currencyA?.wrapped;
    const token1 = currencyB?.wrapped;

    // find where the active tick would be to partition the array
    // if the active tick is initialized, the pivot will be an element
    // if not, take the previous tick as pivot
    console.log('v2 ticks', ticks);
    console.log('v2 activeTick', activeTick);
    const pivot =
      ticks.findIndex(
        (tickData) =>
          tickData?.tickIdx && Number(tickData.tickIdx) > activeTick,
      ) - 1;

    // if (pivot < 0) {
    //   // consider setting a local error
    //   console.log(
    //     'usePoolTickData',
    //     'usePoolActiveLiquidity',
    //     'TickData pivot not found',
    //     {
    //       token0: token0.address,
    //       token1: token1.address,
    //       chainId: token0.chainId,
    //     },
    //   );
    //   return {
    //     isLoading,
    //     error,
    //     activeTick,
    //     data: undefined,
    //   };
    // }

    const sdkPrice = tickToPrice(token0, token1, activeTick);
    const activeTickProcessed: TickProcessed = {
      liquidityActive: JSBI.BigInt(pool[1]?.liquidity ?? 0),
      tick: activeTick,
      liquidityNet:
        Number(ticks[pivot]?.tickIdx) === activeTick
          ? JSBI.BigInt(ticks[pivot]?.liquidityNet ?? 0)
          : JSBI.BigInt(0),
      price0: sdkPrice.toFixed(PRICE_FIXED_DIGITS),
      sdkPrice,
    };

    const subsequentTicks = computeSurroundingTicks(
      token0,
      token1,
      activeTickProcessed,
      ticks,
      pivot,
      true,
    );

    const previousTicks = computeSurroundingTicks(
      token0,
      token1,
      activeTickProcessed,
      ticks,
      pivot,
      false,
    );

    const ticksProcessed = previousTicks
      .concat(activeTickProcessed)
      .concat(subsequentTicks);

    return {
      isLoading,
      error,
      currentTick,
      activeTick,
      liquidity,
      sqrtPriceX96,
      data: ticksProcessed,
    };
  }, [
    currencyA,
    currencyB,
    activeTick,
    pool,
    ticks,
    isLoading,
    error,
    currentTick,
    liquidity,
    sqrtPriceX96,
  ]);
}
