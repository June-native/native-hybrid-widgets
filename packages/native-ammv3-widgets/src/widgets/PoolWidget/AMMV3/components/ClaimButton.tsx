import { ChainId } from '@native-ammv3/api';
import { Button } from '@native-ammv3/components';
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
        variant={Button.Variant.contained}
        size={Button.Size.small}
        onClick={onConfirm}
        disabled={disabled}
        isLoading={isLoading}
        sx={{
          backgroundColor: '#1C241C',
          '&:not([disabled]):hover, &:focus-visible': {
            background: `linear-gradient(0deg, rgba(26, 26, 27, 0.1), rgba(26, 26, 27, 0.1)), "#1C241C",`,
          },
          color: '#FFF',
          '&[disabled]': {
            backgroundColor: '#1C241C',
            color: '#FFF',
          },
        }}
      >
        Claim
      </Button>
    </NeedConnectButton>
  );
};
