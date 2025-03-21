import { ChainId } from '../sdk-core';

/**
 * Taiko UniswapV3Factory
 * @see https://taikoscan.io/address/0x78172691DD3B8ADa7aEbd9bFfB487FB11D735DB2?tab=contract#code
 */
export const FACTORY_ADDRESS = '0x3d2A7Bac4E8439ABe86B58324695e921a5FC0987';

export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000';

// @deprecated please use poolInitCodeHash(chainId: ChainId)
export const POOL_INIT_CODE_HASH =
  '0x4509fa1e2d1989ac1632a56fe87c53e8d1e9d05847694e00f62b23e28cec98c4';

/**
 * Taiko  POOL_INIT_CODE_HASH
 * @see PoolAddress.sol
 * @see https://taikoscan.io/address/0x202bEE65B164aEcBb6A2318438bf46bEF14E1072?tab=contract#code#F12#L6
 */
export function poolInitCodeHash(chainId?: ChainId): string {
  switch (chainId) {
    case ChainId.SEPOLIA:
      return '0x4509fa1e2d1989ac1632a56fe87c53e8d1e9d05847694e00f62b23e28cec98c4';
    case ChainId.MAINNET:
      return '0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54';
    default:
      return POOL_INIT_CODE_HASH;
  }
}

/**
 * The default factory enabled fee amounts, denominated in hundredths of bips.
 */
export enum FeeAmount {
  LOWEST = 100,
  LOW_200 = 200,
  LOW_300 = 300,
  LOW_400 = 400,
  LOW = 500,
  MEDIUM = 3000,
  HIGH = 10000,
}

/**
 * The default factory tick spacings by fee amount.
 */
export const TICK_SPACINGS: { [amount in FeeAmount]: number } = {
  [FeeAmount.LOWEST]: 1,
  [FeeAmount.LOW_200]: 4,
  [FeeAmount.LOW_300]: 6,
  [FeeAmount.LOW_400]: 8,
  [FeeAmount.LOW]: 10,
  [FeeAmount.MEDIUM]: 60,
  [FeeAmount.HIGH]: 200,
};
