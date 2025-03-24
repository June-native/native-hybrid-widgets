import { t } from '@lingui/macro';
import {
  Box,
  ButtonBase,
  EmptyDataIcon,
  useTheme,
} from '@native-ammv3/components';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { LoadingRotation } from '../../../components/LoadingRotation';
import { tokenApi } from '../../../constants/api';
import { useWalletInfo } from '../../../hooks/ConnectWallet/useWalletInfo';
import { AMMV3PositionAdd } from './AMMV3PositionAdd';
import { AMMV3PositionRemove } from './AMMV3PositionRemove';
import { PositionClaimCard } from './components/PositionClaimCard';
import { PositionViewCard } from './components/PositionViewCard';
import { useV3Positions } from './hooks/useV3Positions';
import { FeeAmount } from './sdks/v3-sdk';
import { PositionDetails } from './types/position';
import { areAddressesEqual, buildCurrency } from './utils';

export interface AMMV3PositionsViewProps {
  token0Address: string;
  token1Address: string;
  feeAmount: FeeAmount;
  viewType: 'add-remove' | 'claim';
  onClose: (() => void) | undefined;
  handleGoToAddLiquidityV3: (params: {
    from?: string;
    to?: string;
    fee?: string;
  }) => void;
}

export const AMMV3PositionsView = ({
  token0Address,
  token1Address,
  feeAmount,
  viewType,
  onClose,
  handleGoToAddLiquidityV3,
}: AMMV3PositionsViewProps) => {
  const theme = useTheme();

  const { account, chainId } = useWalletInfo();

  const { positions, loading } = useV3Positions(account, chainId);

  const defaultToken0Query = useQuery({
    ...tokenApi.getFetchTokenQuery(chainId, token0Address, account),
  });
  const defaultToken1Query = useQuery({
    ...tokenApi.getFetchTokenQuery(chainId, token1Address, account),
  });

  const [manageItem, setManageItem] = useState<{
    item: PositionDetails;
    type: 'add' | 'remove';
  } | null>(null);

  const currencyA = useMemo(
    () =>
      defaultToken0Query.data
        ? buildCurrency(defaultToken0Query.data)
        : undefined,
    [defaultToken0Query],
  );
  const currencyB = useMemo(
    () =>
      defaultToken1Query.data
        ? buildCurrency(defaultToken1Query.data)
        : undefined,
    [defaultToken1Query],
  );

  const [tokenA, tokenB] = useMemo(
    () => [currencyA?.wrapped, currencyB?.wrapped],
    [currencyA, currencyB],
  );

  const [token0, token1] = useMemo(
    () =>
      tokenA && tokenB
        ? tokenA.sortsBefore(tokenB)
          ? [tokenA, tokenB]
          : [tokenB, tokenA]
        : [undefined, undefined],
    [tokenA, tokenB],
  );

  const currentPairPositions = useMemo<PositionDetails[] | undefined>(() => {
    if (positions === undefined) {
      return undefined;
    }
    return positions.filter((p) => {
      return (
        areAddressesEqual(token0?.address, p.token0) &&
        areAddressesEqual(token1?.address, p.token1) &&
        p.fee === feeAmount &&
        p.liquidity !== '0'
      );
    });
  }, [feeAmount, positions, token0?.address, token1?.address]);

  if (manageItem !== null) {
    if (manageItem.type === 'add') {
      return (
        <AMMV3PositionAdd
          currencyA={currencyA}
          currencyB={currencyB}
          feeAmount={feeAmount}
          tokenId={manageItem.item.tokenId}
          chainId={chainId}
          onClose={() => {
            setManageItem(null);
          }}
        />
      );
    }

    if (manageItem.type === 'remove') {
      return (
        <AMMV3PositionRemove
          currencyA={currencyA}
          currencyB={currencyB}
          feeAmount={feeAmount}
          tokenId={manageItem.item.tokenId}
          chainId={chainId}
          onClose={() => {
            setManageItem(null);
          }}
        />
      );
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        minHeight: 480,
      }}
    >
      <Box
        sx={{
          pb: 16,
          borderBottomColor: theme.palette.border.main,
          borderBottomStyle: 'solid',
          borderBottomWidth: 1,
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
          {currencyA?.symbol}-{currencyB?.symbol}&nbsp;Positions&nbsp;(
          {currentPairPositions?.length ?? 0})
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

      {loading ? (
        <Box
          sx={{
            mt: 100,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <LoadingRotation />
        </Box>
      ) : currentPairPositions && currentPairPositions.length > 0 ? (
        currentPairPositions?.map((p) => {
          if (viewType === 'claim') {
            return (
              <PositionClaimCard
                key={p.tokenId}
                chainId={chainId}
                p={p}
                currencyA={currencyA}
                currencyB={currencyB}
                onClose={() => {
                  //
                }}
              />
            );
          }
          return (
            <PositionViewCard
              key={p.tokenId}
              chainId={chainId}
              p={p}
              currencyA={currencyA}
              currencyB={currencyB}
              onClickManage={(type) => {
                setManageItem({
                  item: p,
                  type,
                });
              }}
            />
          );
        })
      ) : (
        <Box
          sx={{
            mt: 100,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <EmptyDataIcon
            sx={{
              width: 60,
              height: 60,
              borderRadius: (24 / 105) * 60,
            }}
          />
          <Box
            sx={{
              typography: 'body1',
              color: theme.palette.text.secondary,
            }}
          >{t`Your position is empty`}</Box>
        </Box>
      )}
    </Box>
  );
};
