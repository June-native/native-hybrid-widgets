/**
 * Taiko UniswapV3Factory
 * @see https://taikoscan.io/address/0x78172691DD3B8ADa7aEbd9bFfB487FB11D735DB2?tab=contract#code
 * @deprecated
 */
export const FACTORY_ADDRESS = '0x3d2A7Bac4E8439ABe86B58324695e921a5FC0987';

export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000';

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
