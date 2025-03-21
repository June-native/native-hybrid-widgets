import { defaultAbiCoder } from '@ethersproject/abi';
import { getCreate2Address } from '@ethersproject/address';
import { keccak256 } from '@ethersproject/solidity';
import { CHAIN_TO_ADDRESSES_MAP, ChainId } from '../../sdk-core';
import { Token } from '../../sdk-core/entities/token';
import { FeeAmount } from '../constants';

/**
 * Computes a pool address
 * @param factoryAddress The Uniswap V3 factory address
 * @param tokenA The first token of the pair, irrespective of sort order
 * @param tokenB The second token of the pair, irrespective of sort order
 * @param fee The fee tier of the pool
 * @param initCodeHashManualOverride Override the init code hash used to compute the pool address if necessary
 * @param chainId
 * @returns The pool address
 */
export function computePoolAddress({
  factoryAddress,
  tokenA,
  tokenB,
  fee,
  initCodeHashManualOverride,
  chainId,
}: {
  factoryAddress: string;
  tokenA: Token;
  tokenB: Token;
  fee: FeeAmount;
  initCodeHashManualOverride?: string;
  chainId: ChainId;
}): string {
  const [token0, token1] = tokenA.sortsBefore(tokenB)
    ? [tokenA, tokenB]
    : [tokenB, tokenA]; // does safety checks
  const salt = keccak256(
    ['bytes'],
    [
      defaultAbiCoder.encode(
        ['address', 'address', 'uint24'],
        [token0.address, token1.address, fee],
      ),
    ],
  );
  const initCodeHash =
    initCodeHashManualOverride ??
    CHAIN_TO_ADDRESSES_MAP[chainId].poolInitCodeHash;

  return getCreate2Address(factoryAddress, salt, initCodeHash);
}
