import { Button } from '@native-ammv3/components';
import { ChainId } from '@native-ammv3/api';
import { connectWalletBtn } from '../../../../constants/testId';
import NeedConnectButton from '../../../ConnectWallet/NeedConnectButton';

export interface ConnectWalletProps {
  needSwitchChain?: ChainId;
}

export default function ConnectWallet({ needSwitchChain }: ConnectWalletProps) {
  return (
    <>
      <NeedConnectButton
        size={Button.Size.middle}
        fullWidth
        data-testid={connectWalletBtn}
        chainId={needSwitchChain}
      />
    </>
  );
}
