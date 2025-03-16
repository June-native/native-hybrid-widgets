import { t } from '@lingui/macro';
import { CONTRACT_QUERY_KEY } from '@native-ammv3/api';
import { Box, useTheme } from '@native-ammv3/components';
import { Error } from '@native-ammv3/icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useReducer, useState } from 'react';
import { useUserOptions } from '../../../components/UserOptionsProvider';
import { useWalletInfo } from '../../../hooks/ConnectWallet/useWalletInfo';
import { useSubmission } from '../../../hooks/Submission';
import { OpCode } from '../../../hooks/Submission/spec';
import { ExecutionResult, MetadataFlag } from '../../../hooks/Submission/types';
import { formatTokenAmountNumber } from '../../../utils';
import { SliderPercentageCard } from '../PoolOperate/components/SliderPercentageCard';
import SlippageSetting, {
  useSlipper,
} from '../PoolOperate/components/SlippageSetting';
import { initSliderPercentage } from '../PoolOperate/hooks/usePercentageRemove';
import { PositionAmountPreview } from './components/PositionAmountPreview';
import { RemoveButton } from './components/RemoveButton';
import { useDerivedPositionInfo } from './hooks/useDerivedPositionInfo';
import { useDerivedV3BurnInfo } from './hooks/useDerivedV3BurnInfo';
import { useV3DerivedMintInfo } from './hooks/useV3DerivedMintInfo';
import { useV3PositionFromTokenId } from './hooks/useV3Positions';
import { reducer } from './reducer';
import {
  ChainId,
  CurrencyAmount,
  NONFUNGIBLE_POSITION_MANAGER_ADDRESSES,
  Token,
} from './sdks/sdk-core';
import { NativeCurrency } from './sdks/sdk-core/entities/nativeCurrency';
import { FeeAmount, NonfungiblePositionManager } from './sdks/v3-sdk';
import { Field } from './types';
import { toSlippagePercent } from './utils/slippage';

export interface AMMV3PositionManageProps {
  chainId: ChainId;
  currencyA: Token | NativeCurrency | undefined;
  currencyB: Token | NativeCurrency | undefined;
  feeAmount: FeeAmount;
  tokenId: string;
  onClose: (() => void) | undefined;
}

export const AMMV3PositionRemove = ({
  chainId,
  currencyA,
  currencyB,
  feeAmount,
  tokenId,
  onClose,
}: AMMV3PositionManageProps) => {
  const theme = useTheme();
  const submission = useSubmission();
  const queryClient = useQueryClient();

  const { account } = useWalletInfo();

  const { position: existingPositionDetails, loading: positionLoading } =
    useV3PositionFromTokenId(tokenId, chainId);
  const hasExistingPosition = !!existingPositionDetails && !positionLoading;
  const { position: existingPosition } = useDerivedPositionInfo(
    existingPositionDetails,
    currencyA,
    currencyB,
  );

  const [sliderPercentage, setSliderPercentage] =
    useState(initSliderPercentage);

  const [state, dispatch] = useReducer<typeof reducer>(reducer, {
    baseToken: currencyA,
    quoteToken: currencyB,
    feeAmount,
    independentField: Field.CURRENCY_A,
    typedValue: '',
    startPriceTypedValue: '',
    leftRangeTypedValue: '',
    rightRangeTypedValue: '',
  });

  const {
    pool,
    ticks,
    dependentField,
    price,
    pricesAtTicks,
    pricesAtLimit,
    parsedAmounts,
    currencyBalances,
    position,
    noLiquidity,
    currencies,
    errorMessage,
    invalidPool,
    invalidRange,
    outOfRange,
    depositADisabled,
    depositBDisabled,
    invertPrice,
    ticksAtLimit,
    isTaxed,
  } = useV3DerivedMintInfo({ state, existingPosition });

  const {
    position: positionSDK,
    liquidityPercentage,
    liquidityValue0,
    liquidityValue1,
    feeValue0: feeValue0Remove,
    feeValue1: feeValue1Remove,
    error,
  } = useDerivedV3BurnInfo({
    position: existingPositionDetails,
    asWETH: undefined,
    percent: sliderPercentage,
    baseToken: state.baseToken,
    quoteToken: state.quoteToken,
  });
  const removed = existingPositionDetails?.liquidity === '0';

  const { slipper, setSlipper, slipperValue, resetSlipper } = useSlipper({
    address: undefined,
    type: 'AMMV3',
  });

  const { deadLine: ddl } = useUserOptions();

  const onRemoveMutation = useMutation({
    mutationFn: async () => {
      if (
        !account ||
        !chainId ||
        !positionSDK ||
        !liquidityPercentage ||
        !liquidityValue0 ||
        !liquidityValue1
      ) {
        return;
      }

      const deadline = Math.ceil(Date.now() / 1000) + (ddl ?? 10 * 60);

      try {
        const { calldata, value } =
          NonfungiblePositionManager.removeCallParameters(positionSDK, {
            tokenId: tokenId.toString(),
            liquidityPercentage,
            slippageTolerance: toSlippagePercent(slipperValue * 100),
            deadline: deadline.toString(),
            collectOptions: {
              expectedCurrencyOwed0:
                feeValue0Remove ??
                CurrencyAmount.fromRawAmount(liquidityValue0.currency, 0),
              expectedCurrencyOwed1:
                feeValue1Remove ??
                CurrencyAmount.fromRawAmount(liquidityValue1.currency, 0),
              recipient: account,
            },
          });
        let txn: { to: string; data: string; value: string } = {
          to: NONFUNGIBLE_POSITION_MANAGER_ADDRESSES[chainId],
          data: calldata,
          value,
        };

        const succ = await submission.execute(
          t`Remove Liquidity`,
          {
            opcode: OpCode.TX,
            ...txn,
          },
          {
            early: false,
            metadata: {
              [MetadataFlag.removeAMMV3Pool]: '1',
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
        console.error('onRemoveMutation', error);
      }
    },
  });

  return (
    <Box
      sx={{
        borderRadius: 16,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 20,
          py: 24,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Box
          sx={{
            typography: 'body1',
            fontWeight: 600,
            color: theme.palette.text.primary,
          }}
        >
          {t`Remove Liquidity`}
        </Box>

        {onClose ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: 24,
              height: 24,
              borderRadius: '50%',
              borderWidth: 1,
              color: 'text.secondary',
              cursor: 'pointer',
            }}
          >
            <Box
              component={Error}
              sx={{
                width: 16,
                height: 16,
              }}
              onClick={() => {
                onClose();
              }}
            />
          </Box>
        ) : undefined}
      </Box>

      {hasExistingPosition && existingPosition && (
        <Box sx={{ mx: 20, mb: 16 }}>
          <PositionAmountPreview
            position={existingPosition}
            inRange={!outOfRange}
          />
        </Box>
      )}

      <Box
        sx={{
          mt: 16,
          mx: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          gap: 12,
        }}
      >
        <SliderPercentageCard
          disabled={false}
          value={sliderPercentage}
          onChange={(v) => setSliderPercentage(v)}
        />
        <SlippageSetting
          value={slipper}
          onChange={setSlipper}
          disabled={false}
          type="AMMV3"
        />
      </Box>
      <Box
        sx={{
          mt: 16,
          mx: 20,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            typography: 'body2',
            color: theme.palette.text.secondary,
          }}
        >
          Receive
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: 4,
          }}
        >
          <Box
            sx={{
              typography: 'body1',
              fontWeight: 600,
              color: theme.palette.text.primary,
            }}
          >
            <Box
              component="span"
              sx={{
                color: theme.palette.primary.main,
              }}
            >
              {liquidityValue0
                ? formatTokenAmountNumber({
                    input: liquidityValue0.toExact(),
                    decimals: liquidityValue0.currency.decimals,
                  })
                : '-'}
            </Box>
            &nbsp;{liquidityValue0?.currency?.symbol}
          </Box>
          <Box
            sx={{
              typography: 'body1',
              fontWeight: 600,
              color: theme.palette.text.primary,
            }}
          >
            <Box
              component="span"
              sx={{
                color: theme.palette.primary.main,
              }}
            >
              {liquidityValue1
                ? formatTokenAmountNumber({
                    input: liquidityValue1.toExact(),
                    decimals: liquidityValue1.currency.decimals,
                  })
                : '-'}
            </Box>
            &nbsp;{liquidityValue1?.currency?.symbol}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          mt: 20,
          display: 'flex',
          alignItems: 'center',
          px: 20,
          py: 16,
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <RemoveButton
          chainId={chainId}
          disabled={removed || sliderPercentage === 0 || !liquidityValue0}
          removed={removed}
          error={error}
          onConfirm={onRemoveMutation.mutate}
          isLoading={onRemoveMutation.isPending}
        />
      </Box>
    </Box>
  );
};
