import { useMutation } from '@tanstack/react-query';
import { TokenInfo } from '../../../hooks/Token';
import { basicTokenMap, ChainId } from '@dodoex/api';
import { toWei } from '../../../utils';
import BigNumber from 'bignumber.js';
import { useWalletInfo } from '../../../hooks/ConnectWallet/useWalletInfo';
import { NumberToHex } from '../../../utils/bytes';
import { OpCode } from '../../../hooks/Submission/spec';
import { MetadataFlag } from '../../../hooks/Submission/types';
import { useSubmission } from '../../../hooks/Submission';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import {
  encodeUniswapV2Router02RemoveLiquidityETH,
  encodeUniswapV2Router02RemoveLiquidity,
  getUniswapV2Router02ContractAddressByChainId,
} from '@dodoex/dodo-contract-request';

export function useAMMV2RemoveLiquidity({
  baseToken,
  quoteToken,
  baseAmount,
  quoteAmount,
  liquidityAmount,
  slippage,
  fee,
  submittedBack,
}: {
  baseToken: TokenInfo | undefined;
  quoteToken: TokenInfo | undefined;
  baseAmount: string;
  quoteAmount: string;
  liquidityAmount: string;
  slippage: number;
  fee: number | undefined;
  submittedBack?: () => void;
}) {
  const submission = useSubmission();
  const { account } = useWalletInfo();
  useLingui();

  return useMutation({
    mutationFn: async () => {
      if (!baseToken || !quoteToken) {
        throw new Error('token is undefined');
      }
      if (!account) {
        throw new Error('account is undefined');
      }
      if (!fee) {
        throw new Error('fee is undefined');
      }
      const chainId = baseToken.chainId as ChainId;
      const basicToken = basicTokenMap[chainId];
      const basicTokenAddressLow = basicToken.address.toLowerCase();
      const to = getUniswapV2Router02ContractAddressByChainId(chainId);
      let data = '';
      const value = '0x0';
      const baseIsETH =
        baseToken.address.toLowerCase() === basicTokenAddressLow;
      const quoteIsETH =
        quoteToken.address.toLowerCase() === basicTokenAddressLow;
      const baseInAmountMinBg = toWei(
        new BigNumber(baseAmount).times(1 - slippage),
        baseToken.decimals,
      );
      const quoteInAmountMinBg = toWei(
        new BigNumber(quoteAmount).times(1 - slippage),
        quoteToken.decimals,
      );
      const feeWei = toWei(fee, 4).toString();
      const deadline = Math.ceil(Date.now() / 1000) + 10 * 60;
      if (baseIsETH) {
        const tokenAddress = quoteToken.address;
        const tokenInAmountMin = quoteInAmountMinBg.toString();
        const ethAmountMin = baseInAmountMinBg.toString();
        data = encodeUniswapV2Router02RemoveLiquidityETH(
          tokenAddress,
          feeWei,
          liquidityAmount,
          tokenInAmountMin,
          ethAmountMin,
          account,
          deadline,
        );
      } else if (quoteIsETH) {
        const tokenAddress = baseToken.address;
        const tokenInAmountMin = baseInAmountMinBg.toString();
        const ethAmountMin = quoteInAmountMinBg.toString();
        data = encodeUniswapV2Router02RemoveLiquidityETH(
          tokenAddress,
          feeWei,
          liquidityAmount,
          tokenInAmountMin,
          ethAmountMin,
          account,
          deadline,
        );
      } else {
        data = encodeUniswapV2Router02RemoveLiquidity(
          baseToken.address,
          quoteToken.address,
          feeWei,
          liquidityAmount,
          baseInAmountMinBg.toString(),
          quoteInAmountMinBg.toString(),
          account,
          deadline,
        );
      }

      const txResult = await submission.execute(
        t`Remove liquidity`,
        {
          opcode: OpCode.TX,
          to,
          data,
          value,
        },
        {
          metadata: {
            [MetadataFlag.removeLiqidityAMMV2Position]: true,
          },
          submittedBack,
        },
      );
      return txResult;
    },
  });
}
