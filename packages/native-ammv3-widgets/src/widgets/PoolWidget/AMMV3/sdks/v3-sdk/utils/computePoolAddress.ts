import { defaultAbiCoder } from '@ethersproject/abi';
import { getCreate2Address } from '@ethersproject/address';
import { keccak256 } from '@ethersproject/solidity';
import { CHAIN_TO_ADDRESSES_MAP, ChainId } from '../../sdk-core';
import { Token } from '../../sdk-core/entities/token';
import { FeeAmount } from '../constants';

export function computePoolAddressBySortedToken({
  token0,
  token1,
  fee,
  chainId,
}: {
  token0: string;
  token1: string;
  fee: FeeAmount;
  chainId: ChainId;
}) {
  const salt = keccak256(
    ['bytes'],
    [
      defaultAbiCoder.encode(
        ['address', 'address', 'uint24'],
        [token0, token1, fee],
      ),
    ],
  );
  const { poolInitCodeHash, v3CoreFactoryAddress, NativeV3PoolDeployer } =
    CHAIN_TO_ADDRESSES_MAP[chainId];

  return getCreate2Address(
    NativeV3PoolDeployer ?? v3CoreFactoryAddress,
    salt,
    poolInitCodeHash,
  );
}

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
  tokenA,
  tokenB,
  fee,
  chainId,
}: {
  tokenA: Token;
  tokenB: Token;
  fee: FeeAmount;
  chainId: ChainId;
}): string {
  const [token0, token1] = tokenA.sortsBefore(tokenB)
    ? [tokenA, tokenB]
    : [tokenB, tokenA]; // does safety checks

  return computePoolAddressBySortedToken({
    token0: token0.lpTokenAddress,
    token1: token1.lpTokenAddress,
    fee,
    chainId,
  });
}
