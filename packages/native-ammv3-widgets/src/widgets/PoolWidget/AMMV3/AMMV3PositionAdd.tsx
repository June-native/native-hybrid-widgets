import { t } from '@lingui/macro';
import { CONTRACT_QUERY_KEY } from '@native-ammv3/api';
import { Box, ButtonBase, useTheme } from '@native-ammv3/components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import BigNumber from 'bignumber.js';
import { useMemo, useReducer, useState } from 'react';
import { useUserOptions } from '../../../components/UserOptionsProvider';
import { useWalletInfo } from '../../../hooks/ConnectWallet/useWalletInfo';
import { useSubmission } from '../../../hooks/Submission';
import { OpCode } from '../../../hooks/Submission/spec';
import { ExecutionResult, MetadataFlag } from '../../../hooks/Submission/types';
import { useTokenStatus } from '../../../hooks/Token/useTokenStatus';
import SlippageSetting, {
  useSlipper,
} from '../PoolOperate/components/SlippageSetting';
import { Buttons } from './components/Buttons';
import { CurrencyInputPanel } from './components/CurrencyInputPanel';
import { PositionAmountPreview } from './components/PositionAmountPreview';
import { PositionSelectedRangePreview } from './components/PositionSelectedRangePreview';
import { ReviewModal } from './components/ReviewModal';
import { useDerivedPositionInfo } from './hooks/useDerivedPositionInfo';
import { useV3DerivedMintInfo } from './hooks/useV3DerivedMintInfo';
import { useV3MintActionHandlers } from './hooks/useV3MintActionHandlers';
import { useV3PositionFromTokenId } from './hooks/useV3Positions';
import { reducer } from './reducer';
import {
  CHAIN_TO_ADDRESSES_MAP,
  ChainId,
  Currency,
  CurrencyAmount,
  Token,
} from './sdks/sdk-core';
import { NativeCurrency } from './sdks/sdk-core/entities/nativeCurrency';
import { FeeAmount, NonfungiblePositionManager } from './sdks/v3-sdk';
import { Bound, Field } from './types';
import { convertBackToTokenInfo } from './utils';
import { maxAmountSpend } from './utils/maxAmountSpend';
import { toSlippagePercent } from './utils/slippage';

export interface AMMV3PositionManageProps {
  chainId: ChainId;
  currencyA: Token | NativeCurrency | undefined;
  currencyB: Token | NativeCurrency | undefined;
  feeAmount: FeeAmount;
  tokenId: string;
  onClose: (() => void) | undefined;
}

export const AMMV3PositionAdd = ({
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

  const [showConfirm, setShowConfirm] = useState<boolean>(false);

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

  const { independentField, typedValue, startPriceTypedValue } = state;

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
    onFieldAInput,
    onFieldBInput,
    onLeftRangeInput,
    onRightRangeInput,
    onStartPriceInput,
  } = useV3MintActionHandlers({ noLiquidity, dispatch });

  const { slipper, setSlipper, slipperValue, resetSlipper } = useSlipper({
    address: undefined,
    type: 'AMMV3',
  });

  const isValid = !errorMessage && !invalidRange;

  // get formatted amounts
  const formattedAmounts = useMemo(() => {
    return {
      [independentField]: typedValue,
      [dependentField]: parsedAmounts[dependentField]?.toSignificant(6) ?? '',
    };
  }, [dependentField, independentField, parsedAmounts, typedValue]);

  // get the max amounts user can add
  const maxAmounts: { [field in Field]?: CurrencyAmount<Currency> } =
    useMemo(() => {
      return [Field.CURRENCY_A, Field.CURRENCY_B].reduce(
        (accumulator, field) => {
          return {
            ...accumulator,
            [field]: maxAmountSpend(currencyBalances[field]),
          };
        },
        {},
      );
    }, [currencyBalances]);

  const approvalA = useTokenStatus(
    convertBackToTokenInfo(parsedAmounts[Field.CURRENCY_A]?.currency),
    {
      contractAddress:
        CHAIN_TO_ADDRESSES_MAP[chainId].nonfungiblePositionManagerAddress,
      overrideBalance: currencyBalances[Field.CURRENCY_A]
        ? new BigNumber(currencyBalances[Field.CURRENCY_A].toSignificant())
        : undefined,
      amount: parsedAmounts[Field.CURRENCY_A]
        ? new BigNumber(parsedAmounts[Field.CURRENCY_A].toSignificant())
        : undefined,
    },
  );
  const approvalB = useTokenStatus(
    convertBackToTokenInfo(parsedAmounts[Field.CURRENCY_B]?.currency),
    {
      contractAddress:
        CHAIN_TO_ADDRESSES_MAP[chainId].nonfungiblePositionManagerAddress,
      overrideBalance: currencyBalances[Field.CURRENCY_B]
        ? new BigNumber(currencyBalances[Field.CURRENCY_B].toSignificant())
        : undefined,
      amount: parsedAmounts[Field.CURRENCY_B]
        ? new BigNumber(parsedAmounts[Field.CURRENCY_B].toSignificant())
        : undefined,
    },
  );

  const { [Bound.LOWER]: priceLower, [Bound.UPPER]: priceUpper } =
    pricesAtTicks;

  const { deadLine: ddl } = useUserOptions();
  const onAddMutation = useMutation({
    mutationFn: async () => {
      if (!account || !chainId || !position) {
        return;
      }

      if (!state.baseToken || !state.quoteToken) {
        return;
      }

      const deadline = Math.ceil(Date.now() / 1000) + (ddl ?? 10 * 60);

      const useNative = state.baseToken.isNative
        ? state.baseToken
        : state.quoteToken.isNative
          ? state.quoteToken
          : undefined;

      try {
        const { calldata, value } =
          NonfungiblePositionManager.addCallParameters(position, {
            tokenId,
            slippageTolerance: toSlippagePercent(slipperValue * 100),
            deadline: deadline.toString(),
            useNative,
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
          t`Add Liquidity`,
          {
            opcode: OpCode.TX,
            ...txn,
          },
          {
            early: false,
            metadata: {
              [MetadataFlag.addAMMV3Pool]: '1',
            },
          },
        );
        if (succ === ExecutionResult.Success) {
          setShowConfirm(false);
          setTimeout(() => {
            onClose?.();
          }, 100);
        }
        queryClient.invalidateQueries({
          queryKey: [CONTRACT_QUERY_KEY, 'ammv3'],
          refetchType: 'all',
        });
      } catch (error) {
        console.error('onAddMutation', error);
      }
    },
  });

  return (
    <Box>
      <Box
        sx={{
          pb: 16,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            typography: 'body1',
            fontWeight: 600,
            color: theme.palette.text.primary,
          }}
        >
          {t`Add liquidity`}
        </Box>

        {onClose ? (
          <ButtonBase
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
            onClick={(evt) => {
              evt.stopPropagation();
              onClose();
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.3345 6.54518L13.8797 12L19.3345 17.4548L17.5162 19.2731L12.0614 13.8183L6.60659 19.2731L4.78832 17.4548L10.2431 12L4.78832 6.54518L6.60659 4.7269L12.0614 10.1817L17.5162 4.7269L19.3345 6.54518Z"
                fill="#1C241C"
              />
            </svg>
          </ButtonBase>
        ) : undefined}
      </Box>

      {hasExistingPosition && existingPosition && (
        <Box sx={{ mb: 28 }}>
          <PositionAmountPreview
            position={existingPosition}
            inRange={!outOfRange}
          />
        </Box>
      )}

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
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
              textAlign: 'left',
            }}
          >
            {t`Add more liquidity`}
          </Box>
          <SlippageSetting
            value={slipper}
            onChange={setSlipper}
            disabled={false}
            type="AMMV3"
          />
        </Box>
        <CurrencyInputPanel
          value={formattedAmounts[Field.CURRENCY_A]}
          onUserInput={onFieldAInput}
          maxAmount={maxAmounts[Field.CURRENCY_A]}
          balance={currencyBalances[Field.CURRENCY_A]}
          currency={currencies[Field.CURRENCY_A] ?? null}
          locked={depositADisabled}
        />
        <CurrencyInputPanel
          value={formattedAmounts[Field.CURRENCY_B]}
          onUserInput={onFieldBInput}
          maxAmount={maxAmounts[Field.CURRENCY_B]}
          balance={currencyBalances[Field.CURRENCY_B]}
          currency={currencies[Field.CURRENCY_B] ?? null}
          locked={depositBDisabled}
        />
      </Box>

      {hasExistingPosition && existingPosition && (
        <Box sx={{ mt: 28 }}>
          <PositionSelectedRangePreview
            position={existingPosition}
            title={t`Selected Range`}
            ticksAtLimit={ticksAtLimit}
          />
        </Box>
      )}

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          pt: 28,
        }}
      >
        <Buttons
          chainId={chainId}
          approvalA={approvalA}
          approvalB={approvalB}
          parsedAmounts={parsedAmounts}
          isValid={isValid}
          depositADisabled={depositADisabled}
          depositBDisabled={depositBDisabled}
          errorMessage={errorMessage}
          setShowConfirm={setShowConfirm}
        />
      </Box>

      <ReviewModal
        parsedAmounts={parsedAmounts}
        position={position}
        existingPosition={undefined}
        priceLower={priceLower}
        priceUpper={priceUpper}
        outOfRange={outOfRange}
        ticksAtLimit={ticksAtLimit}
        on={showConfirm}
        onClose={() => {
          setShowConfirm(false);
        }}
        onConfirm={onAddMutation.mutate}
        loading={onAddMutation.isPending}
      />
    </Box>
  );
};
