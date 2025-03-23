import { t } from '@lingui/macro';
import { CONTRACT_QUERY_KEY } from '@native-ammv3/api';
import { alpha, Box, useTheme } from '@native-ammv3/components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TokenLogoPair } from '../../../../components/TokenLogoPair';
import { useWalletInfo } from '../../../../hooks/ConnectWallet/useWalletInfo';
import { useSubmission } from '../../../../hooks/Submission';
import { OpCode } from '../../../../hooks/Submission/spec';
import {
  ExecutionResult,
  MetadataFlag,
} from '../../../../hooks/Submission/types';
import { formatTokenAmountNumber } from '../../../../utils';
import { usePool } from '../hooks/usePools';
import { useV3PositionFees } from '../hooks/useV3PositionFees';
import {
  CHAIN_TO_ADDRESSES_MAP,
  ChainId,
  Currency,
  CurrencyAmount,
} from '../sdks/sdk-core';
import { NonfungiblePositionManager } from '../sdks/v3-sdk';
import { PositionDetails } from '../types/position';
import RangeBadge from './Badge/RangeBadge';
import { ClaimButton } from './ClaimButton';
import { FEE_AMOUNT_DETAIL } from './shared';

export interface PositionClaimCardProps {
  chainId: ChainId;
  p: PositionDetails;
  currencyA: Currency | undefined;
  currencyB: Currency | undefined;
  onClose: (() => void) | undefined;
}

export const PositionClaimCard = ({
  chainId,
  p,
  currencyA,
  currencyB,
  onClose,
}: PositionClaimCardProps) => {
  const theme = useTheme();
  const submission = useSubmission();
  const queryClient = useQueryClient();

  const { account } = useWalletInfo();

  // construct Position from details returned
  const [, pool] = usePool(
    currencyA ?? undefined,
    currencyB ?? undefined,
    p.fee,
  );

  // fees
  const [feeValue0, feeValue1] = useV3PositionFees({
    pool: pool ?? undefined,
    tokenId: p.tokenId,
    asWETH: false,
    chainId,
  });
  const inverted = false;
  const feeValueUpper = inverted ? feeValue0 : feeValue1;
  const feeValueLower = inverted ? feeValue1 : feeValue0;

  // check if price is within range
  const outOfRange: boolean = pool
    ? pool.tickCurrent < p.tickLower || pool.tickCurrent >= p.tickUpper
    : false;

  const onClaimMutation = useMutation({
    mutationFn: async () => {
      if (!account || !chainId || !pool) {
        return;
      }

      try {
        const { calldata, value } =
          NonfungiblePositionManager.collectCallParameters({
            tokenId: p.tokenId.toString(),
            expectedCurrencyOwed0:
              feeValue0 ?? CurrencyAmount.fromRawAmount(pool.token0, 0),
            expectedCurrencyOwed1:
              feeValue1 ?? CurrencyAmount.fromRawAmount(pool.token1, 0),
            recipient: account,
          });
        const { nonfungiblePositionManagerAddress } =
          CHAIN_TO_ADDRESSES_MAP[chainId];
        if (!nonfungiblePositionManagerAddress) {
          return;
        }
        let txn: { to: string; data: string; value: string } = {
          to: nonfungiblePositionManagerAddress,
          data: calldata,
          value,
        };

        const succ = await submission.execute(
          t`Claim Rewards`,
          {
            opcode: OpCode.TX,
            ...txn,
          },
          {
            early: false,
            metadata: {
              [MetadataFlag.claimAMMV3Pool]: '1',
            },
          },
        );
        if (succ === ExecutionResult.Success) {
          setTimeout(() => {
            onClose?.();
          }, 100);
        }
        queryClient.invalidateQueries({
          queryKey: [CONTRACT_QUERY_KEY, 'ammv3'],
          refetchType: 'all',
        });
      } catch (error) {
        console.error('onClaimMutation', error);
      }
    },
  });

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
          gap: 12,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 4 }}>
          <TokenLogoPair
            tokens={[
              { address: currencyA?.address },
              { address: currencyB?.address },
            ]}
            mr={0}
            gap={-8}
            width={18}
            height={18}
          />

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: 5,
            }}
          >
            <Box
              sx={{
                typography: 'body2',
                lineHeight: '18px',
                color: '#1C241C',
              }}
            >
              $-
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: alpha('#1C241C', 0.5),
                typography: 'h6',
                fontWeight: 500,
              }}
            >
              {formatTokenAmountNumber({
                input: feeValueUpper?.toSignificant(),
                decimals: feeValueUpper?.currency?.decimals,
              })}
              &nbsp;{feeValueUpper?.currency?.symbol}&nbsp;+&nbsp;
              {formatTokenAmountNumber({
                input: feeValueLower?.toSignificant(),
                decimals: feeValueLower?.currency?.decimals,
              })}
              &nbsp;{feeValueLower?.currency?.symbol}
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
      </Box>

      <ClaimButton
        chainId={chainId}
        disabled={onClaimMutation.isPending}
        onConfirm={onClaimMutation.mutate}
        isLoading={onClaimMutation.isPending}
      />
    </Box>
  );
};
