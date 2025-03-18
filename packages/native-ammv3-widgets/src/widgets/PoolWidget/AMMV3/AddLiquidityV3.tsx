import { t } from '@lingui/macro';
import { alpha, Box, Button, useTheme } from '@native-ammv3/components';
import { useMutation, useQuery } from '@tanstack/react-query';
import BigNumber from 'bignumber.js';
import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { CardPlusConnected } from '../../../components/Swap/components/TokenCard';
import { NumberInput } from '../../../components/Swap/components/TokenCard/NumberInput';
import { TokenLogoPair } from '../../../components/TokenLogoPair';
import { useUserOptions } from '../../../components/UserOptionsProvider';
import { tokenApi } from '../../../constants/api';
import { useWalletInfo } from '../../../hooks/ConnectWallet/useWalletInfo';
import { useWidgetDevice } from '../../../hooks/style/useWidgetDevice';
import { useSubmission } from '../../../hooks/Submission';
import { OpCode } from '../../../hooks/Submission/spec';
import { ExecutionResult, MetadataFlag } from '../../../hooks/Submission/types';
import { useTokenStatus } from '../../../hooks/Token/useTokenStatus';
import SlippageSetting, {
  useSlipper,
} from '../PoolOperate/components/SlippageSetting';
import RangeBadge from './components/Badge/RangeBadge';
import { Buttons } from './components/Buttons';
import { CurrencyInputPanel } from './components/CurrencyInputPanel';
import { FeeSelector } from './components/FeeSelector';
import LiquidityChartRangeInput from './components/LiquidityChartRangeInput';
import { RangeSelector } from './components/RangeSelector';
import { RateToggle } from './components/RateToggle';
import { ReviewModal } from './components/ReviewModal';
import { DynamicSection, YellowCard } from './components/widgets';
import { useRangeHopCallbacks } from './hooks/useRangeHopCallbacks';
import { useV3DerivedMintInfo } from './hooks/useV3DerivedMintInfo';
import { useV3MintActionHandlers } from './hooks/useV3MintActionHandlers';
import { reducer, Types } from './reducer';
import {
  Currency,
  CurrencyAmount,
  NONFUNGIBLE_POSITION_MANAGER_ADDRESSES,
} from './sdks/sdk-core';
import { NonfungiblePositionManager } from './sdks/v3-sdk';
import { Bound, Field } from './types';
import { convertBackToTokenInfo } from './utils';
import { maxAmountSpend } from './utils/maxAmountSpend';
import { toSlippagePercent } from './utils/slippage';

export default function AddLiquidityV3({
  params,
  handleGoBack,
  handleGoToPoolList,
}: {
  params?: {
    from?: string;
    to?: string;
    fee?: string;
  };
  handleGoBack: () => void;
  handleGoToPoolList: () => void;
}) {
  const { chainId, account } = useWalletInfo();
  const theme = useTheme();
  const submission = useSubmission();
  const { isMobile } = useWidgetDevice();

  const defaultBaseTokenQuery = useQuery({
    ...tokenApi.getFetchTokenQuery(chainId, params?.from, account),
  });
  const defaultQuoteTokenQuery = useQuery({
    ...tokenApi.getFetchTokenQuery(chainId, params?.to, account),
  });

  const [state, dispatch] = useReducer<typeof reducer>(reducer, {
    baseToken: null,
    quoteToken: null,
    feeAmount: params?.fee ? Number(params?.fee) : undefined,
    independentField: Field.CURRENCY_A,
    typedValue: '',
    startPriceTypedValue: '',
    leftRangeTypedValue: '',
    rightRangeTypedValue: '',
  });

  useEffect(() => {
    if (!defaultBaseTokenQuery.data) {
      return;
    }
    dispatch({
      type: Types.UpdateDefaultBaseToken,
      payload: defaultBaseTokenQuery.data,
    });
  }, [defaultBaseTokenQuery]);
  useEffect(() => {
    if (!defaultQuoteTokenQuery.data) {
      return;
    }
    dispatch({
      type: Types.UpdateDefaultQuoteToken,
      payload: defaultQuoteTokenQuery.data,
    });
  }, [defaultQuoteTokenQuery]);

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
  } = useV3DerivedMintInfo({ state });

  const formattedPrice = useMemo(() => {
    return (invertPrice ? price?.invert() : price)?.toSignificant();
  }, [invertPrice, price]);

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

  // modal and loading
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  // get formatted amounts
  const formattedAmounts = {
    [independentField]: typedValue,
    [dependentField]: parsedAmounts[dependentField]?.toSignificant(6) ?? '',
  };

  // get the max amounts user can add
  const maxAmounts: { [field in Field]?: CurrencyAmount<Currency> } = [
    Field.CURRENCY_A,
    Field.CURRENCY_B,
  ].reduce((accumulator, field) => {
    return {
      ...accumulator,
      [field]: maxAmountSpend(currencyBalances[field]),
    };
  }, {});

  const approvalA = useTokenStatus(
    convertBackToTokenInfo(parsedAmounts[Field.CURRENCY_A]?.currency),
    {
      contractAddress: NONFUNGIBLE_POSITION_MANAGER_ADDRESSES[chainId],
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
      contractAddress: NONFUNGIBLE_POSITION_MANAGER_ADDRESSES[chainId],
      overrideBalance: currencyBalances[Field.CURRENCY_B]
        ? new BigNumber(currencyBalances[Field.CURRENCY_B].toSignificant())
        : undefined,
      amount: parsedAmounts[Field.CURRENCY_B]
        ? new BigNumber(parsedAmounts[Field.CURRENCY_B].toSignificant())
        : undefined,
    },
  );

  // get value and prices at ticks
  const { [Bound.LOWER]: tickLower, [Bound.UPPER]: tickUpper } = ticks;
  const { [Bound.LOWER]: priceLower, [Bound.UPPER]: priceUpper } =
    pricesAtTicks;

  const {
    getDecrementLower,
    getIncrementLower,
    getDecrementUpper,
    getIncrementUpper,
    getSetFullRange,
  } = useRangeHopCallbacks({
    tickLower,
    tickUpper,
    pool,
    state,
    dispatch,
  });

  const handleSetFullRange = useCallback(() => {
    getSetFullRange();

    const minPrice = pricesAtLimit[Bound.LOWER];
    if (minPrice) {
      onLeftRangeInput(minPrice.toSignificant(5));
    }
    const maxPrice = pricesAtLimit[Bound.UPPER];
    if (maxPrice) {
      onRightRangeInput(maxPrice.toSignificant(5));
    }
  }, [getSetFullRange, onLeftRangeInput, onRightRangeInput, pricesAtLimit]);

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
            slippageTolerance: toSlippagePercent(slipperValue * 100),
            recipient: account,
            deadline: deadline.toString(),
            useNative,
            createPool: noLiquidity,
          });
        let txn: { to: string; data: string; value: string } = {
          to: NONFUNGIBLE_POSITION_MANAGER_ADDRESSES[chainId],
          data: calldata,
          value,
        };

        const succ = await submission.execute(
          t`Pool Creation`,
          {
            opcode: OpCode.TX,
            ...txn,
          },
          {
            early: false,
            metadata: {
              [MetadataFlag.createAMMV3Pool]: '1',
            },
          },
        );
        if (succ === ExecutionResult.Success) {
          setTimeout(() => {
            handleGoToPoolList();
          }, 100);
        }
      } catch (error) {
        console.error('onAddMutation', error);
      }
    },
  });

  return (
    <Box
      sx={{
        mx: 'auto',
        width: isMobile ? '100%' : 528,
        display: 'flex',
        flexDirection: 'column',
        gap: 28,
        alignItems: 'stretch',
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
              { address: state.baseToken?.address },
              { address: state.quoteToken?.address },
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
            {state.baseToken?.symbol}/{state.quoteToken?.symbol}
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
          flexDirection: 'column',
          alignItems: 'stretch',
          gap: 28,
        }}
      >
        <FeeSelector
          disabled={!state.baseToken || !state.quoteToken}
          feeAmount={state.feeAmount}
          dispatch={dispatch}
        />

        <DynamicSection disabled={!state.feeAmount || invalidPool}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              flexWrap: 'wrap',
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
              {t`Set price range`}
            </Box>
            {Boolean(state.baseToken && state.quoteToken) && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  width: '100%',
                  [theme.breakpoints.up('tablet')]: {
                    ml: 'auto',
                    width: 'auto',
                  },
                }}
              >
                <Button
                  size={Button.Size.small}
                  variant={Button.Variant.outlined}
                  onClick={handleSetFullRange}
                  sx={{
                    py: 4,
                    px: 12,
                    height: 26,
                    typography: 'h6',
                    fontWeight: 600,
                    ...(isMobile
                      ? {
                          flexGrow: 0,
                          flexShrink: 1,
                          flexBasis: '50%',
                        }
                      : undefined),
                  }}
                >{t`Full range`}</Button>
                <RateToggle
                  baseToken={state.baseToken}
                  quoteToken={state.quoteToken}
                  handleRateToggle={() => {
                    if (
                      !ticksAtLimit[Bound.LOWER] &&
                      !ticksAtLimit[Bound.UPPER]
                    ) {
                      onLeftRangeInput(
                        (invertPrice
                          ? priceLower
                          : priceUpper?.invert()
                        )?.toSignificant(6) ?? '',
                      );
                      onRightRangeInput(
                        (invertPrice
                          ? priceUpper
                          : priceLower?.invert()
                        )?.toSignificant(6) ?? '',
                      );
                      onFieldAInput(formattedAmounts[Field.CURRENCY_B] ?? '');
                    }
                    dispatch({
                      type: Types.ToggleRate,
                      payload: undefined,
                    });
                  }}
                  sx={
                    isMobile
                      ? {
                          flexGrow: 0,
                          flexShrink: 1,
                          flexBasis: '50%',
                        }
                      : undefined
                  }
                />
              </Box>
            )}
          </Box>
          <RangeSelector
            priceLower={priceLower}
            priceUpper={priceUpper}
            getDecrementLower={getDecrementLower}
            getIncrementLower={getIncrementLower}
            getDecrementUpper={getDecrementUpper}
            getIncrementUpper={getIncrementUpper}
            onLeftRangeInput={onLeftRangeInput}
            onRightRangeInput={onRightRangeInput}
            currencyA={state.baseToken}
            currencyB={state.quoteToken}
            feeAmount={state.feeAmount}
            ticksAtLimit={ticksAtLimit}
          />
          {outOfRange && (
            <YellowCard>
              {t`Your position will not earn fees or be used in trades until the market price moves into your range.`}
            </YellowCard>
          )}
          {invalidRange && (
            <YellowCard>
              {t`Invalid range selected. The min price must be lower than the max price.`}
            </YellowCard>
          )}
        </DynamicSection>
        {noLiquidity ? (
          <DynamicSection>
            <Box
              sx={{
                typography: 'body1',
                fontWeight: 600,
                color: theme.palette.text.primary,
                textAlign: 'left',
              }}
            >
              {t`Starting price`}
            </Box>
            <Box
              sx={{
                p: 8,
                borderRadius: 8,
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                typography: 'h6',
                color: theme.palette.primary.main,
              }}
            >
              {t`This pool must be initialized before you can add liquidity. To initialize, select a starting price for the pool. Then, enter your liquidity price range and deposit amount. Gas fees will be higher than usual due to the initialization transaction.`}
            </Box>
            <Box
              sx={{
                px: 16,
                py: 12,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: theme.palette.border.main,
                borderStyle: 'solid',
              }}
            >
              <NumberInput
                sx={{
                  backgroundColor: 'transparent',
                }}
                value={startPriceTypedValue}
                onChange={onStartPriceInput}
              />
            </Box>
          </DynamicSection>
        ) : (
          <DynamicSection disabled={!state.feeAmount || invalidPool}>
            <Box
              sx={{
                typography: 'body1',
                fontWeight: 600,
                color: theme.palette.text.primary,
                textAlign: 'left',
              }}
            >
              {t`Current price`}
              <Box>
                {formattedPrice}&nbsp;{t`per`}&nbsp;
                {state.baseToken?.symbol ?? ''}
              </Box>
            </Box>
            <LiquidityChartRangeInput
              currencyA={state.baseToken ?? undefined}
              currencyB={state.quoteToken ?? undefined}
              feeAmount={state.feeAmount}
              ticksAtLimit={ticksAtLimit}
              price={
                price
                  ? parseFloat(
                      (invertPrice ? price.invert() : price).toSignificant(8),
                    )
                  : undefined
              }
              priceLower={priceLower}
              priceUpper={priceUpper}
              onLeftRangeInput={onLeftRangeInput}
              onRightRangeInput={onRightRangeInput}
              interactive={true}
            />
          </DynamicSection>
        )}
        <DynamicSection
          disabled={
            invalidPool ||
            invalidRange ||
            (noLiquidity && !startPriceTypedValue)
          }
        >
          <Box
            sx={{
              typography: 'body1',
              fontWeight: 600,
              color: theme.palette.text.primary,
              textAlign: 'left',
            }}
          >
            {t`Deposit amounts`}
          </Box>
          <Box>
            <CurrencyInputPanel
              value={formattedAmounts[Field.CURRENCY_A]}
              onUserInput={onFieldAInput}
              maxAmount={maxAmounts[Field.CURRENCY_A]}
              balance={currencyBalances[Field.CURRENCY_A]}
              currency={currencies[Field.CURRENCY_A] ?? null}
              locked={depositADisabled}
            />
            <CardPlusConnected />
            <CurrencyInputPanel
              value={formattedAmounts[Field.CURRENCY_B]}
              onUserInput={onFieldBInput}
              maxAmount={maxAmounts[Field.CURRENCY_B]}
              balance={currencyBalances[Field.CURRENCY_B]}
              currency={currencies[Field.CURRENCY_B] ?? null}
              locked={depositBDisabled}
            />
          </Box>
          <SlippageSetting
            value={slipper}
            onChange={setSlipper}
            disabled={false}
            type="AMMV3"
          />
        </DynamicSection>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          px: 0,
          py: 16,
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
}
