import { ChainId } from '@native-ammv3/api';
import { Button } from '@native-ammv3/components';
import { t } from '@lingui/macro';
import NeedConnectButton from '../../../../components/ConnectWallet/NeedConnectButton';

export interface ClaimButtonProps {
  chainId: ChainId;
  disabled: boolean;
  isLoading: boolean;
  onConfirm: () => void;
}

export const ClaimButton = ({
  chainId,
  disabled,
  isLoading,
  onConfirm,
}: ClaimButtonProps) => {
  return (
    <NeedConnectButton includeButton fullWidth chainId={chainId}>
      <Button
        fullWidth
        size={Button.Size.big}
        onClick={onConfirm}
        disabled={disabled}
        isLoading={isLoading}
      >
        {t`Collect fees`}
      </Button>
    </NeedConnectButton>
  );
};
