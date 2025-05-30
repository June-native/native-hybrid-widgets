import { FeeAmount } from '../sdks/v3-sdk/constants';

/**
- 0.01% → 0.1%, 0.5%, 1%
- 0.05% → 5%, 10%, 20%
- 0.3% → 10%, 20%, 50%
- 1% → 10%, 20%, 50%
@see https://notion.native.org/Native-AMM-FE-QA-Issues-1ba6a18f0905807881cbcd05a1b41b42
 */
export const FEE_AMOUNT_DETAIL: Record<
  FeeAmount,
  {
    label: string;
    partPriceRangeList: Array<{
      label: string;
      value: number;
    }>;
  }
> = {
  [FeeAmount.LOWEST]: {
    label: '0.01%',
    partPriceRangeList: [
      {
        label: '0.1%',
        value: 0.001,
      },
      {
        label: '0.5%',
        value: 0.005,
      },
      {
        label: '1%',
        value: 0.01,
      },
    ],
  },
  [FeeAmount.LOW_200]: {
    label: '0.02%',
    partPriceRangeList: [
      {
        label: '0.1%',
        value: 0.001,
      },
      {
        label: '0.5%',
        value: 0.005,
      },
      {
        label: '1%',
        value: 0.01,
      },
    ],
  },
  [FeeAmount.LOW_300]: {
    label: '0.03%',
    partPriceRangeList: [
      {
        label: '0.1%',
        value: 0.001,
      },
      {
        label: '0.5%',
        value: 0.005,
      },
      {
        label: '1%',
        value: 0.01,
      },
    ],
  },
  [FeeAmount.LOW_400]: {
    label: '0.04%',
    partPriceRangeList: [
      {
        label: '0.1%',
        value: 0.001,
      },
      {
        label: '0.5%',
        value: 0.005,
      },
      {
        label: '1%',
        value: 0.01,
      },
    ],
  },
  [FeeAmount.LOW]: {
    label: '0.05%',
    partPriceRangeList: [
      {
        label: '5%',
        value: 0.05,
      },
      {
        label: '10%',
        value: 0.1,
      },
      {
        label: '20%',
        value: 0.2,
      },
    ],
  },
  [FeeAmount.MEDIUM]: {
    label: '0.30%',
    partPriceRangeList: [
      {
        label: '10%',
        value: 0.1,
      },
      {
        label: '20%',
        value: 0.2,
      },
      {
        label: '50%',
        value: 0.5,
      },
    ],
  },
  [FeeAmount.HIGH]: {
    label: '1.00%',
    partPriceRangeList: [
      {
        label: '10%',
        value: 0.1,
      },
      {
        label: '20%',
        value: 0.2,
      },
      {
        label: '50%',
        value: 0.5,
      },
    ],
  },
};
