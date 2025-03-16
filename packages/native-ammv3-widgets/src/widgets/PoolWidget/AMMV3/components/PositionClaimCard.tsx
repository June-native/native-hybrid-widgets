import { t } from '@lingui/macro';
import { CONTRACT_QUERY_KEY } from '@native-ammv3/api';
import { Box, useTheme } from '@native-ammv3/components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import TokenLogo from '../../../../components/TokenLogo';
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
  ChainId,
  Currency,
  CurrencyAmount,
  NONFUNGIBLE_POSITION_MANAGER_ADDRESSES,
} from '../sdks/sdk-core';
import { NonfungiblePositionManager } from '../sdks/v3-sdk';
import { PositionDetails } from '../types/position';
import { ClaimButton } from './ClaimButton';

const RewardItem = ({
  token,
  amount,
}: {
  token: Currency | undefined;
  amount: CurrencyAmount<Currency> | undefined;
}) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        py: 8,
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        typography: 'h5',
        color: theme.palette.text.primary,
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
      <Box>{token?.symbol}</Box>
      <Box
        sx={{
          ml: 'auto',
        }}
      >
        {formatTokenAmountNumber({
          input: amount?.toSignificant(),
          decimals: token?.decimals,
        })}
      </Box>
    </Box>
  );
};

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
        let txn: { to: string; data: string; value: string } = {
          to: NONFUNGIBLE_POSITION_MANAGER_ADDRESSES[chainId],
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
        alignItems: 'flex-start',
        gap: 24,
        px: 20,
        py: 20,
        pb: 12,
        borderRadius: 12,
        backgroundColor: theme.palette.background.paperContrast,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 4,
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
          abc
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Box
            sx={{
              p: 20,
            }}
          >
            <RewardItem
              token={feeValueUpper?.currency}
              amount={feeValueUpper}
            />
            <RewardItem
              token={feeValueLower?.currency}
              amount={feeValueLower}
            />
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
