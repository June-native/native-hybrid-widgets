import { Box, Button, ButtonBase } from '@native-ammv3/components';
import { useMemo, useState } from 'react';
import TokenLogo from '../../../../components/TokenLogo';
import { formatTokenAmountNumber } from '../../../../utils';
import { useDerivedPositionInfo } from '../hooks/useDerivedPositionInfo';
import useIsTickAtLimit from '../hooks/useIsTickAtLimit';
import { usePool } from '../hooks/usePools';
import { useV3PositionFromTokenId } from '../hooks/useV3Positions';
import { ChainId, Currency, Price, Token } from '../sdks/sdk-core';
import { Position as V3Position } from '../sdks/v3-sdk';
import { Bound } from '../types';
import { PositionDetails } from '../types/position';
import { formatTickPrice } from '../utils/formatTickPrice';
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
  chainId: ChainId;
  currencyA: Currency | undefined;
  currencyB: Currency | undefined;
  onClickManage: (type: 'add' | 'remove') => void;
}

export const PositionViewCard = ({
  p,
  chainId,
  currencyA,
  currencyB,
  onClickManage,
}: PositionViewCardProps) => {
  const [reverse, setReverse] = useState(false);

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

  const { position: existingPositionDetails } = useV3PositionFromTokenId(
    p.tokenId,
    chainId,
  );

  const { position: existingPosition } = useDerivedPositionInfo(
    existingPositionDetails,
    currencyA,
    currencyB,
  );

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
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <TokenLogo
              address={existingPosition?.pool.token0?.address ?? ''}
              chainId={existingPosition?.pool.token0?.chainId}
              noShowChain
              width={20}
              height={20}
              marginRight={0}
            />
            <Box
              sx={{
                typography: 'body1',
                fontWeight: 600,
                color: '#1C241C',
              }}
            >
              {formatTokenAmountNumber({
                input: existingPosition?.amount0.toSignificant(),
                decimals: existingPosition?.pool.token0?.decimals,
              })}
              &nbsp;{existingPosition?.pool.token0?.symbol}
            </Box>
          </Box>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="6"
            viewBox="0 0 15 6"
            fill="none"
          >
            <path
              d="M14.25 3L11.25 6L10.2 4.95L11.3813 3.75L3.61875 3.75L4.8 4.95L3.75 6L0.75 3L3.75 -1.31134e-07L4.81875 1.05L3.61875 2.25L11.3813 2.25L10.2 1.05L11.25 -4.5897e-07L14.25 3Z"
              fill="#939393"
              fillOpacity="0.5"
            />
          </svg>
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: 4,
            }}
          >
            <TokenLogo
              address={existingPosition?.pool.token1?.address ?? ''}
              chainId={existingPosition?.pool.token1?.chainId}
              noShowChain
              width={20}
              height={20}
              marginRight={0}
            />
            <Box
              sx={{
                typography: 'body1',
                fontWeight: 600,
                color: '#1C241C',
              }}
            >
              {formatTokenAmountNumber({
                input: existingPosition?.amount1.toSignificant(),
                decimals: existingPosition?.pool.token1?.decimals,
              })}
              &nbsp;{existingPosition?.pool.token1?.symbol}
            </Box>
          </Box>
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

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ typography: 'body2', color: '#939393', fontWeight: 500 }}>
            Min&nbsp;
            {formatTickPrice({
              price: reverse ? priceUpper?.invert() : priceLower,
              atLimit: tickAtLimit,
              direction: Bound.LOWER,
            })}
            &nbsp;/&nbsp;Max&nbsp;
            {formatTickPrice({
              price: reverse ? priceLower?.invert() : priceUpper,
              atLimit: tickAtLimit,
              direction: Bound.UPPER,
            })}
            &nbsp;of&nbsp;
            {reverse ? currencyBase?.symbol : currencyQuote?.symbol}
            &nbsp;per&nbsp;
            {reverse ? currencyQuote?.symbol : currencyBase?.symbol}
          </Box>
          <ButtonBase onClick={() => setReverse(!reverse)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
            >
              <circle cx="9" cy="9" r="9" fill="#1C241C" fillOpacity="0.1" />
              <path
                d="M9.5 6.5H4.5V8H13.5L9.5 4.25V6.5ZM8.25 13.75V11.5H13.5V10H4.5L8.25 13.75Z"
                fill="#1C241C"
                fillOpacity="0.5"
              />
            </svg>
          </ButtonBase>
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
