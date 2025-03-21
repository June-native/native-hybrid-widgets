import { t, Trans } from '@lingui/macro';
import { alpha, Box, useTheme } from '@native-ammv3/components';
import JSBI from 'jsbi';
import TokenLogo from '../../../../components/TokenLogo';
import {
  formatPercentageNumber,
  formatTokenAmountNumber,
} from '../../../../utils';
import { BIPS_BASE } from '../constants/misc';
import { CurrencyAmount, Token } from '../sdks/sdk-core';
import { Position } from '../sdks/v3-sdk';
import RangeBadge from './Badge/RangeBadge';

const BalanceItem = ({
  token,
  amount,
}: {
  token: Token;
  amount: CurrencyAmount<Token>;
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 4,
      }}
    >
      <TokenLogo
        address={token?.address ?? ''}
        chainId={token?.chainId}
        noShowChain
        width={24}
        height={24}
        marginRight={0}
      />
      <Box
        sx={{
          typography: 'h5',
          color: '#1C241C',
        }}
      >
        {formatTokenAmountNumber({
          input: amount.toSignificant(),
          decimals: token?.decimals,
        })}
        &nbsp;{token?.symbol}
      </Box>
    </Box>
  );
};

export interface PositionAmountPreviewProps {
  position: Position;
  inRange: boolean;
}

export const PositionAmountPreview = ({
  position,
  inRange,
}: PositionAmountPreviewProps) => {
  const theme = useTheme();

  const currency0 = position.pool.token0;
  const currency1 = position.pool.token1;

  const removed =
    position?.liquidity && JSBI.equal(position?.liquidity, JSBI.BigInt(0));

  return (
    <Box
      sx={{
        border: 'solid 1px',
        borderColor: 'border.main',
        borderRadius: 8,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: theme.spacing(16, 20),
          borderBottomStyle: 'solid',
          borderBottomColor: 'border.main',
          borderBottomWidth: 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <Box
            sx={{
              typography: 'body1',
              color: '#1C241C',
            }}
          >
            {t`Position on`}&nbsp;{currency0?.symbol}/{currency1?.symbol}
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <RangeBadge removed={removed} inRange={inRange} />
            <Box
              sx={{
                py: 2,
                px: 2,
                color: '#647EFF',
                borderRadius: 4,
                backgroundColor: alpha('#647EFF', 0.1),
                typography: 'h6',
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
          p: theme.spacing(16, 20),
        }}
      >
        <Box
          sx={{
            typography: 'body2',
            color: '#939393',
          }}
        >
          <Trans>My Liquidity</Trans>
        </Box>
        <Box
          sx={{
            mt: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <BalanceItem token={currency0} amount={position.amount0} />
          <BalanceItem token={currency1} amount={position.amount1} />
        </Box>
      </Box>
    </Box>
  );
};
