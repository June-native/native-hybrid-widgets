import { Box, Button, useTheme } from '@native-ammv3/components';
import { t } from '@lingui/macro';
import { useMemo } from 'react';
import { formatTokenAmountNumber } from '../../../../utils';
import useIsTickAtLimit from '../hooks/useIsTickAtLimit';
import { usePool } from '../hooks/usePools';
import { Currency, Price, Token } from '../sdks/sdk-core';
import { FeeAmount, Position as V3Position } from '../sdks/v3-sdk';
import { Bound } from '../types';
import { PositionDetails } from '../types/position';
import { formatTickPrice } from '../utils/formatTickPrice';
import { InRangeDot } from './InRangeDot';
import RangeBadge from './Badge/RangeBadge';
import { FEE_AMOUNT_DETAIL } from './shared';

export interface PriceOrdering {
  priceLower?: Price<Currency, Currency>;
  priceUpper?: Price<Currency, Currency>;
  quote?: Currency;
  base?: Currency;
}

export function getPriceOrderingFromPositionForUI(
  position?: V3Position,
): PriceOrdering {
  if (!position) {
    return {};
  }

  const token0 = position.amount0.currency;
  const token1 = position.amount1.currency;

  // if token0 is a dollar-stable asset, set it as the quote token
  const stables: Token[] = [];
  if (stables.some((stable) => stable.equals(token0))) {
    return {
      priceLower: position.token0PriceUpper.invert(),
      priceUpper: position.token0PriceLower.invert(),
      quote: token0,
      base: token1,
    };
  }

  // if token1 is an ETH-/BTC-stable asset, set it as the base token
  const bases: Token[] = [];
  if (bases.some((base) => base && base.equals(token1))) {
    return {
      priceLower: position.token0PriceUpper.invert(),
      priceUpper: position.token0PriceLower.invert(),
      quote: token0,
      base: token1,
    };
  }

  // if both prices are below 1, invert
  if (position.token0PriceUpper.lessThan(1)) {
    return {
      priceLower: position.token0PriceUpper.invert(),
      priceUpper: position.token0PriceLower.invert(),
      quote: token0,
      base: token1,
    };
  }

  // otherwise, just return the default
  return {
    priceLower: position.token0PriceLower,
    priceUpper: position.token0PriceUpper,
    quote: token1,
    base: token0,
  };
}

export interface PositionViewCardProps {
  p: PositionDetails;
  currencyA: Currency | undefined;
  currencyB: Currency | undefined;
  onClickManage: (type: 'add' | 'remove') => void;
}

export const PositionViewCard = ({
  p,
  currencyA,
  currencyB,
  onClickManage,
}: PositionViewCardProps) => {
  const theme = useTheme();

  // construct Position from details returned
  const [, pool] = usePool(
    currencyA ?? undefined,
    currencyB ?? undefined,
    p.fee,
  );

  const position = useMemo(() => {
    if (pool) {
      return new V3Position({
        pool,
        liquidity: p.liquidity.toString(),
        tickLower: p.tickLower,
        tickUpper: p.tickUpper,
      });
    }
    return undefined;
  }, [p.liquidity, p.tickLower, p.tickUpper, pool]);

  const tickAtLimit = useIsTickAtLimit(p.fee, p.tickLower, p.tickUpper);

  // prices
  // const { priceLower, priceUpper, quote, base } =
  //   getPriceOrderingFromPositionForUI(position);
  const priceLower = position?.token0PriceLower;
  const priceUpper = position?.token0PriceUpper;
  const quote = position?.amount1.currency;
  const base = position?.amount0.currency;

  const currencyQuote = quote;
  const currencyBase = base;

  // check if price is within range
  const outOfRange: boolean = pool
    ? pool.tickCurrent < p.tickLower || pool.tickCurrent >= p.tickUpper
    : false;

  const sorted = currencyA === currencyA;
  const price = sorted
    ? position?.pool.priceOf(position?.pool.token0)
    : position?.pool.priceOf(position?.pool.token1);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        gap: 24,
        px: 20,
        py: 20,
        pb: 12,
        borderRadius: 12,
        backgroundColor: 'rgba(28, 36, 28, 0.04)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          gap: 10,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            typography: 'h5',
            color: theme.palette.text.primary,
          }}
        >
          <Box>
            <>
              <span>
                {formatTickPrice({
                  price: priceLower,
                  atLimit: tickAtLimit,
                  direction: Bound.LOWER,
                })}
                &nbsp;
              </span>
              {currencyQuote?.symbol}
            </>
          </Box>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="19"
            viewBox="0 0 18 19"
            fill="none"
          >
            <path
              d="M15.75 9.50293L12.75 12.5029L11.7 11.4529L12.8813 10.2529L5.11875 10.2529L6.3 11.4529L5.25 12.5029L2.25 9.50293L5.25 6.50293L6.31875 7.55293L5.11875 8.75293L12.8813 8.75293L11.7 7.55293L12.75 6.50293L15.75 9.50293Z"
              fill="currentColor"
              fillOpacity="0.5"
            />
          </svg>
          <Box>
            <>
              <span>
                {formatTickPrice({
                  price: priceUpper,
                  atLimit: tickAtLimit,
                  direction: Bound.UPPER,
                })}
                &nbsp;
              </span>
              {currencyQuote?.symbol}
            </>
          </Box>
          {/* <Box
            component="svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 18 19"
            fill="none"
            sx={{
              ml: 4,
              width: 18,
              height: 19,
            }}
          >
            <circle
              cx="9"
              cy="9.5"
              r="9"
              fill="currentColor"
              fillOpacity="0.1"
            />
            <path
              d="M9.5 7H4.5V8.5H13.5L9.5 4.75V7ZM8.25 14.25V12H13.5V10.5H4.5L8.25 14.25Z"
              fill="currentColor"
              fillOpacity="0.5"
            />
          </Box> */}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <RangeBadge inRange={!outOfRange} />
          <Box
            sx={{
              typography: 'h6',
              lineHeight: '15px',
              color: '#647EFF',
              borderRadius: 4,
              backgroundColor: '#647EFF1A',
              px: 2,
              py: 2,
            }}
          >
            {p.fee ? FEE_AMOUNT_DETAIL[p.fee].label : '-'}
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Box
            sx={{
              typography: 'body2',
              color: '#939393',
            }}
          >
            {t`Current price`}:&nbsp;
            {`${formatTokenAmountNumber({
              input: price?.toSignificant(),
            })}`}
            &nbsp;{currencyQuote?.symbol}&nbsp;per&nbsp;
            {currencyBase?.symbol}
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <Button
          variant={Button.Variant.contained}
          size={Button.Size.small}
          fullWidth
          onClick={() => onClickManage('add')}
          backgroundColor="#1C241C"
          sx={{
            backgroundColor: '#1C241C',
            '&:not([disabled]):hover, &:focus-visible': {
              background: `linear-gradient(0deg, rgba(26, 26, 27, 0.1), rgba(26, 26, 27, 0.1)), "#1C241C",`,
            },
            color: '#FFF',
            '&[disabled]': {
              backgroundColor: '#1C241C',
              color: '#FFF',
            },
          }}
        >
          Add Liquidity
        </Button>
        <Button
          variant={Button.Variant.outlined}
          size={Button.Size.small}
          fullWidth
          onClick={() => onClickManage('remove')}
        >
          Remove Liquidity
        </Button>
      </Box>
    </Box>
  );
};
