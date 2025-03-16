import { Token } from '../sdks/sdk-core';
import { NativeCurrency } from '../sdks/sdk-core/entities/nativeCurrency';
import { Pool, Position as V3Position } from '../sdks/v3-sdk';
import { PositionDetails } from '../types/position';
import { usePool } from './usePools';

export function useDerivedPositionInfo(
  positionDetails: PositionDetails | undefined,
  currencyA: Token | NativeCurrency | undefined,
  currencyB: Token | NativeCurrency | undefined,
): {
  position?: V3Position;
  pool?: Pool;
} {
  // construct pool data
  const [, pool] = usePool(
    currencyA ?? undefined,
    currencyB ?? undefined,
    positionDetails?.fee,
  );

  let position = undefined;
  if (pool && positionDetails) {
    position = new V3Position({
      pool,
      liquidity: positionDetails.liquidity.toString(),
      tickLower: positionDetails.tickLower,
      tickUpper: positionDetails.tickUpper,
    });
  }

  return {
    position,
    pool: pool ?? undefined,
  };
}
