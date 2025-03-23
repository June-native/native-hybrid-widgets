import { Box, useTheme } from '@native-ammv3/components';
import JSBI from 'jsbi';
import { ReactNode } from 'react';
import TokenLogo from '../../../../components/TokenLogo';
import { TokenLogoPair } from '../../../../components/TokenLogoPair';
import {
  formatPercentageNumber,
  formatTokenAmountNumber,
} from '../../../../utils';
import { BIPS_BASE } from '../constants/misc';
import { Currency } from '../sdks/sdk-core';
import { Position } from '../sdks/v3-sdk';
import RangeBadge from './Badge/RangeBadge';
import { PositionSelectedRangePreview } from './PositionSelectedRangePreview';

export const PositionPreview = ({
  position,
  title,
  inRange,
  baseCurrencyDefault,
  ticksAtLimit,
}: {
  position: Position;
  title?: ReactNode;
  inRange: boolean;
  baseCurrencyDefault?: Currency;
  ticksAtLimit: { [bound: string]: boolean | undefined };
}) => {
  const theme = useTheme();

  const currency0 = position.pool.token0;
  const currency1 = position.pool.token1;

  const removed =
    position?.liquidity && JSBI.equal(position?.liquidity, JSBI.BigInt(0));

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'stretch',
        flexDirection: 'column',
        gap: 28,
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
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <TokenLogoPair
            tokens={[
              { address: currency0?.address },
              { address: currency1?.address },
            ]}
            mr={0}
            gap={-8}
          />
          <Box
            sx={{
              typography: 'h5',
              fontWeight: 600,
            }}
          >
            {currency0?.symbol}/{currency1?.symbol}
          </Box>
          <RangeBadge removed={false} inRange={true} />
        </Box>

        <Box
          sx={{
            py: 6,
            px: 8,
            borderRadius: 8,
            background: 'linear-gradient(90deg, #42D392 0%, #647EFF 100%)',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
          >
            <path
              d="M1.99998 13.5852V15.8722H4.28701C4.28701 14.6107 3.26154 13.5852 1.99998 13.5852Z"
              fill="white"
            />
            <path
              d="M13.173 11.5186C12.8327 10.6771 12.3996 9.88196 11.8868 9.14762C13.6452 7.38491 16.0742 6.29282 18.7552 6.29282V4C15.5093 4 12.5604 5.29632 10.3979 7.3965C8.23688 5.29632 5.28793 4 2.04206 4V6.29427C4.72161 6.29427 7.15202 7.38636 8.91038 9.14906C8.39765 9.8834 7.96458 10.6786 7.6242 11.5201C6.33078 9.82547 4.29143 8.73048 2.00006 8.73048V11.0247C4.51883 11.0247 6.58859 12.983 6.7682 15.4569C6.75951 15.6365 6.75516 15.8175 6.75516 16H9.04943C9.04943 15.9348 9.04943 15.8711 9.05232 15.8074H9.07695C9.07695 15.6814 9.07405 15.5568 9.06681 15.4337C9.15806 13.8477 9.63313 12.3631 10.3993 11.0696C11.1655 12.3631 11.6392 13.8477 11.7319 15.4337C11.7261 15.5582 11.7217 15.6828 11.7217 15.8074H11.7464C11.7464 15.8711 11.7492 15.9363 11.7492 16H14.0435C14.0435 15.8175 14.0392 15.6379 14.0305 15.4569C14.2101 12.983 16.2798 11.0247 18.7986 11.0247V8.73048C16.5072 8.73048 14.4679 9.82547 13.1745 11.5186H13.173Z"
              fill="white"
            />
            <path
              d="M16.5101 15.8722H18.7971V13.5852C17.5356 13.5852 16.5101 14.6107 16.5101 15.8722Z"
              fill="white"
            />
          </svg>
          <Box
            sx={{
              typography: 'body1',
              fontWeight: 600,
              color: '#FFFFFF',
            }}
          >
            Native AMM
          </Box>
        </Box>
      </Box>

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
            typography: 'body1',
            fontWeight: 600,
            color: theme.palette.text.primary,
          }}
        >
          Deposit Assets
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
              {currency0?.symbol}
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <TokenLogo
                address={currency0?.address ?? ''}
                chainId={currency0?.chainId}
                noShowChain
                width={20}
                height={20}
                marginRight={0}
              />
              <Box
                sx={{
                  typography: 'body1',
                  color: theme.palette.text.primary,
                  fontWeight: 500,
                }}
              >
                {formatTokenAmountNumber({
                  input: position.amount0.toSignificant(),
                  decimals: currency0?.decimals,
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
              {currency1?.symbol}
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <TokenLogo
                address={currency1?.address ?? ''}
                chainId={currency1?.chainId}
                noShowChain
                width={20}
                height={20}
                marginRight={0}
              />
              <Box
                sx={{
                  typography: 'body1',
                  color: theme.palette.text.primary,
                  fontWeight: 500,
                }}
              >
                {formatTokenAmountNumber({
                  input: position.amount1.toSignificant(),
                  decimals: currency1?.decimals,
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
              Fee tier
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
                {formatPercentageNumber({
                  input: position?.pool?.fee / (BIPS_BASE * 100),
                })}
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            width: '100%',
            height: '1px',
            backgroundColor: '#E8E9E8',
          }}
        />

        <PositionSelectedRangePreview
          position={position}
          title={title}
          baseCurrencyDefault={baseCurrencyDefault}
          ticksAtLimit={ticksAtLimit}
        />
      </Box>
    </Box>
  );
};
