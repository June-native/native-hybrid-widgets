import { Box, QuestionTooltip, useTheme } from '@native-ammv3/components';
import { ReactNode, useCallback, useState } from 'react';
import { formatTokenAmountNumber } from '../../../../utils';
import { Currency } from '../sdks/sdk-core';
import { Position } from '../sdks/v3-sdk';
import { Bound } from '../types';
import { formatTickPrice } from '../utils/formatTickPrice';
import { RateToggle } from './RateToggle';

export const PositionSelectedRangePreview = ({
  position,
  title,
  baseCurrencyDefault,
  ticksAtLimit,
}: {
  position: Position;
  title?: ReactNode;
  baseCurrencyDefault?: Currency;
  ticksAtLimit: { [bound: string]: boolean | undefined };
}) => {
  const currency0 = position.pool.token0;
  const currency1 = position.pool.token1;

  const theme = useTheme();

  // track which currency should be base
  const [baseCurrency, setBaseCurrency] = useState(
    baseCurrencyDefault
      ? baseCurrencyDefault === currency0
        ? currency0
        : baseCurrencyDefault === currency1
          ? currency1
          : currency0
      : currency0,
  );

  const sorted = baseCurrency === currency0;
  const quoteCurrency = sorted ? currency1 : currency0;

  const price = sorted
    ? position.pool.priceOf(position.pool.token0)
    : position.pool.priceOf(position.pool.token1);

  const priceLower = sorted
    ? position.token0PriceLower
    : position.token0PriceUpper.invert();
  const priceUpper = sorted
    ? position.token0PriceUpper
    : position.token0PriceLower.invert();

  const handleRateChange = useCallback(() => {
    setBaseCurrency(quoteCurrency);
  }, [quoteCurrency]);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'stretch',
        flexDirection: 'column',
        gap: 16,
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
            typography: 'body1',
            fontWeight: 600,
            color: theme.palette.text.primary,
          }}
        >
          Price Range
        </Box>
        <RateToggle
          baseToken={sorted ? currency0 : currency1}
          quoteToken={sorted ? currency1 : currency0}
          handleRateToggle={handleRateChange}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'stretch',
          flexDirection: 'column',
          gap: 12,
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
              typography: 'body2',
              color: theme.palette.text.secondary,
              fontWeight: 500,
            }}
          >
            Min Price
            <QuestionTooltip
              ml={3}
              title={
                <>
                  Your position will be 100% composed of {baseCurrency?.symbol}{' '}
                  at this price
                </>
              }
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Box
              sx={{
                typography: 'body1',
                color: theme.palette.text.primary,
                fontWeight: 500,
              }}
            >
              {formatTickPrice({
                price: priceLower,
                atLimit: ticksAtLimit,
                direction: Bound.LOWER,
              })}
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              typography: 'body2',
              color: theme.palette.text.secondary,
              fontWeight: 500,
            }}
          >
            Max Price
            <QuestionTooltip
              ml={3}
              title={
                <>
                  Your position will be 100% composed of {quoteCurrency?.symbol}{' '}
                  at this price
                </>
              }
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Box
              sx={{
                typography: 'body1',
                color: theme.palette.text.primary,
                fontWeight: 500,
              }}
            >
              {formatTickPrice({
                price: priceUpper,
                atLimit: ticksAtLimit,
                direction: Bound.UPPER,
              })}
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              typography: 'body2',
              color: theme.palette.text.secondary,
              fontWeight: 500,
            }}
          >
            Current price
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Box
              sx={{
                typography: 'body1',
                color: theme.palette.text.primary,
                fontWeight: 500,
              }}
            >
              {`${formatTokenAmountNumber({
                input: price.toSignificant(),
              })} `}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
