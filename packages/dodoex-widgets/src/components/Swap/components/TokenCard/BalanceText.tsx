import { formatTokenAmountNumber } from '../../../../utils/formatter';
import { Box, useTheme, ButtonBase, RotatingIcon } from '@dodoex/components';
import BigNumber from 'bignumber.js';
import { Trans } from '@lingui/macro';
import React from 'react';

export function BalanceText({
  onClick,
  balance,
  decimals,
  address,
  showMaxBtn,
  loading,
  balanceText,
}: {
  onClick?: (max: string) => void;
  balance: BigNumber | null;
  decimals?: number;
  address?: string;
  showMaxBtn?: boolean;
  loading?: boolean;
  balanceText?: React.ReactNode;
}) {
  const { palette } = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        typography: 'body2',
        alignItems: 'center',
        color: palette.text.secondary,
      }}
    >
      {balanceText ?? <Trans>Balance:</Trans>}&nbsp;
      {loading ? (
        <RotatingIcon />
      ) : (
        <>
          {address
            ? formatTokenAmountNumber({
                input: balance,
                decimals,
              })
            : '-'}
          {showMaxBtn && balance && balance.gt(0) && onClick && (
            <Box
              component={ButtonBase}
              sx={{
                ml: 6,
                color: balance?.gt(0)
                  ? palette.primary.main
                  : palette.text.disabled,
                cursor: address ? 'pointer' : 'unset',
              }}
              onClick={() =>
                onClick && onClick(balance ? balance.toString() : '')
              }
            >
              <Trans>Max</Trans>
            </Box>
          )}
        </>
      )}
    </Box>
  );
}
