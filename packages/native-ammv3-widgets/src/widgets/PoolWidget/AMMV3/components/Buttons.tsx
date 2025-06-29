import { ChainId } from '@native-ammv3/api';
import { Box, Button } from '@native-ammv3/components';
import { t, Trans } from '@lingui/macro';
import NeedConnectButton from '../../../../components/ConnectWallet/NeedConnectButton';
import { useTokenStatus } from '../../../../hooks/Token/useTokenStatus';
import { Currency, CurrencyAmount } from '../sdks/sdk-core';
import { Field } from '../types';
import { AutoColumn } from './widgets';

export interface ButtonsProps {
  chainId: ChainId;
  approvalA: ReturnType<typeof useTokenStatus>;
  approvalB: ReturnType<typeof useTokenStatus>;
  parsedAmounts: {
    CURRENCY_A?: CurrencyAmount<Currency> | undefined;
    CURRENCY_B?: CurrencyAmount<Currency> | undefined;
  };
  isValid: boolean;
  depositADisabled: boolean;
  depositBDisabled: boolean;
  errorMessage: React.ReactNode;
  setShowConfirm: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Buttons = ({
  chainId,
  approvalA,
  approvalB,
  parsedAmounts,
  isValid,
  depositADisabled,
  depositBDisabled,
  errorMessage,
  setShowConfirm,
}: ButtonsProps) => {
  // we need an existence check on parsed amounts for single-asset deposits
  const showApprovalA =
    (approvalA.needApprove && !!parsedAmounts[Field.CURRENCY_A]) ||
    approvalA.needReset ||
    approvalA.isApproving;
  const showApprovalB =
    (approvalB.needApprove && !!parsedAmounts[Field.CURRENCY_B]) ||
    approvalB.needReset ||
    approvalB.isApproving;

  return (
    <NeedConnectButton includeButton fullWidth chainId={chainId}>
      <AutoColumn
        gap="md"
        style={{
          width: '100%',
        }}
      >
        {(showApprovalA || showApprovalB) && isValid && (
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              padding: 0,
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 8,
            }}
          >
            {showApprovalA && (
              <Button
                size={Button.Size.middle}
                isLoading={approvalA.isApproving}
                onClick={approvalA.submitApprove}
                disabled={approvalA.insufficientBalance}
                width={showApprovalB ? '50%' : '100%'}
              >
                {approvalA.isApproving ? (
                  <Trans>Approving {approvalA.token?.symbol}...</Trans>
                ) : (
                  approvalA.approveTitle
                )}
              </Button>
            )}

            {showApprovalB && (
              <Button
                size={Button.Size.middle}
                isLoading={approvalB.isApproving}
                onClick={approvalB.submitApprove}
                disabled={approvalB.insufficientBalance}
                width={showApprovalA ? '50%' : '100%'}
              >
                {approvalB.isApproving ? (
                  <Trans>Approving {approvalB.token?.symbol}...</Trans>
                ) : (
                  approvalB.approveTitle
                )}
              </Button>
            )}
          </Box>
        )}

        <Button
          fullWidth
          size={Button.Size.middle}
          onClick={() => {
            setShowConfirm(true);
          }}
          disabled={
            !isValid ||
            (approvalA.needApprove && !depositADisabled) ||
            (approvalB.needApprove && !depositBDisabled) ||
            approvalA.needReset ||
            approvalB.needReset
          }
          danger={
            !isValid &&
            !!parsedAmounts[Field.CURRENCY_A] &&
            !!parsedAmounts[Field.CURRENCY_B]
          }
        >
          {errorMessage ? errorMessage : t`Preview`}
        </Button>
      </AutoColumn>
    </NeedConnectButton>
  );
};
