import { ChainId } from '@native-ammv3/api';
import { Button } from '@native-ammv3/components';
import { t } from '@lingui/macro';
import NeedConnectButton from '../../../../components/ConnectWallet/NeedConnectButton';

export interface ButtonsProps {
  chainId: ChainId;
  disabled: boolean;
  removed: boolean | undefined;
  isLoading: boolean;
  error: React.ReactNode;
  onConfirm: () => void;
}

export const RemoveButton = ({
  chainId,
  disabled,
  removed,
  isLoading,
  error,
  onConfirm,
}: ButtonsProps) => {
  return (
    <NeedConnectButton includeButton fullWidth chainId={chainId}>
      <Button
        fullWidth
        size={Button.Size.middle}
        onClick={onConfirm}
        disabled={disabled}
        isLoading={isLoading}
      >
        {removed ? t`Closed` : (error ?? t`Remove`)}
      </Button>
    </NeedConnectButton>
  );
};
