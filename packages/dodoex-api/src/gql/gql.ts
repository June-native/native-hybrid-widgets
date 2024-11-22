/* eslint-disable */
import * as types from './graphql';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  '\n    query FetchErc20SwapCrossChainList($where: Erc20listV2Filter) {\n      erc20_swapCrossChainList(where: $where) {\n        name\n        address\n        symbol\n        decimals\n        slippage\n        chainId\n        logoImg\n        tokenlists {\n          name\n          status\n        }\n        domains {\n          name\n        }\n        funcLabels {\n          key\n        }\n        attributeLabels {\n          key\n        }\n      }\n    }\n  ':
    types.FetchErc20SwapCrossChainListDocument,
  '\n    query FetchErc20ForecastSlippage($where: Erc20_extenderc20ExtendV2Filter) {\n      erc20_extend_erc20ExtendV2(where: $where) {\n        forecastSlippageList {\n          forecastSlippage\n          forecastValue\n          confidenceRatio\n          confidenceIntervalUpper\n          confidenceIntervalLower\n        }\n      }\n    }\n  ':
    types.FetchErc20ForecastSlippageDocument,
  '\n    query FetchMiningList($where: Miningmining_list_filter) {\n      mining_list(where: $where) {\n        list {\n          chainId\n          type\n          version\n          address\n          baseApy\n          baseLpToken {\n            decimals\n            address: id\n            symbol\n          }\n          baseToken {\n            decimals\n            address: id\n            price\n            symbol\n            logoImg\n          }\n          endBlock\n          miningContractAddress\n          miningTotalDollar\n          baseLpTokenMining\n          quoteLpTokenMining\n          quoteApy\n          quoteLpToken {\n            decimals\n            address: id\n            symbol\n          }\n          quoteToken {\n            decimals\n            address: id\n            price\n            symbol\n            logoImg\n          }\n          rewardTokenInfos {\n            apy\n            decimals\n            address: id\n            price\n            logoImg\n            rewardNumIndex\n            rewardPerBlock\n            startBlock\n            endBlock\n            startTime\n            endTime\n            symbol\n          }\n          rewardQuoteTokenInfos {\n            apy\n            decimals\n            address: id\n            price\n            logoImg\n            rewardNumIndex\n            rewardPerBlock\n            startBlock\n            endBlock\n            startTime\n            endTime\n            symbol\n          }\n          startBlock\n          title\n          platform\n          startTime\n          endTime\n        }\n        totalCount\n        chains\n      }\n    }\n  ':
    types.FetchMiningListDocument,
  '\n    query MiningList($where: Miningmining_list_filter) {\n      mining_list(where: $where) {\n        list {\n          chainId\n          type\n          version\n          address\n          isGSP\n          isNewERCMineV3\n          baseApy\n          baseLpToken {\n            decimals\n            id\n            symbol\n          }\n          baseToken {\n            decimals\n            id\n            price\n            symbol\n            logoImg\n          }\n          endBlock\n          miningContractAddress\n          miningTotalDollar\n          baseLpTokenMining\n          quoteLpTokenMining\n          quoteApy\n          quoteLpToken {\n            decimals\n            id\n            symbol\n          }\n          quoteToken {\n            decimals\n            id\n            price\n            symbol\n            logoImg\n          }\n          rewardTokenInfos {\n            apy\n            decimals\n            id\n            price\n            logoImg\n            rewardNumIndex\n            rewardPerBlock\n            startBlock\n            endBlock\n            startTime\n            endTime\n            symbol\n          }\n          rewardQuoteTokenInfos {\n            apy\n            decimals\n            id\n            price\n            logoImg\n            rewardNumIndex\n            rewardPerBlock\n            startBlock\n            endBlock\n            startTime\n            endTime\n            symbol\n          }\n          startBlock\n          title\n          platform\n          blockNumber\n          startTime\n          endTime\n        }\n        totalCount\n        chains\n      }\n    }\n  ':
    types.MiningListDocument,
  '\n    query MyCreatedMiningList($where: Miningmining_list_filter) {\n      mining_list(where: $where) {\n        list {\n          chainId\n          type\n          version\n          address\n          isGSP\n          isNewERCMineV3\n          baseApy\n          baseLpToken {\n            decimals\n            id\n            symbol\n          }\n          baseToken {\n            decimals\n            id\n            price\n            symbol\n            logoImg\n          }\n          endBlock\n          miningContractAddress\n          baseLpTokenMining\n          quoteLpTokenMining\n          quoteApy\n          quoteLpToken {\n            decimals\n            id\n            symbol\n          }\n          quoteToken {\n            decimals\n            id\n            price\n            symbol\n            logoImg\n          }\n          rewardTokenInfos {\n            apy\n            decimals\n            id\n            price\n            logoImg\n            rewardNumIndex\n            rewardPerBlock\n            startBlock\n            endBlock\n            startTime\n            endTime\n            symbol\n          }\n          rewardQuoteTokenInfos {\n            apy\n            decimals\n            id\n            price\n            logoImg\n            rewardNumIndex\n            rewardPerBlock\n            startBlock\n            endBlock\n            startTime\n            endTime\n            symbol\n          }\n          startBlock\n          title\n          platform\n          blockNumber\n          participantsNum\n          startTime\n          endTime\n        }\n        totalCount\n        chains\n      }\n    }\n  ':
    types.MyCreatedMiningListDocument,
  '\n    query FetchPoolList(\n      $first: Int\n      $where: Pair_filter\n      $orderBy: Pair_orderBy\n    ) {\n      pairs(\n        first: $first\n        where: $where\n        orderBy: $orderBy\n        orderDirection: desc\n      ) {\n        id\n        type\n        creator\n        owner\n        lpFeeRate\n        i\n        k\n        baseReserve\n        quoteReserve\n        lastTradePrice\n        feeBase\n        feeQuote\n        baseToken {\n          id\n          symbol\n          name\n          decimals\n        }\n        quoteToken {\n          id\n          symbol\n          name\n          decimals\n        }\n        baseLpToken {\n          id\n        }\n        quoteLpToken {\n          id\n        }\n      }\n    }\n  ':
    types.FetchPoolListDocument,
  '\n    query FetchLiquidityList($where: Liquiditylist_filter) {\n      liquidity_list(where: $where) {\n        currentPage\n        pageSize\n        totalCount\n        lqList {\n          id\n          pair {\n            id\n            chainId\n            type\n            lpFeeRate\n            mtFeeRate\n            creator\n            baseLpToken {\n              id\n            }\n            quoteLpToken {\n              id\n            }\n            baseToken {\n              id\n              symbol\n              name\n              decimals\n              logoImg\n            }\n            quoteToken {\n              id\n              symbol\n              name\n              decimals\n              logoImg\n            }\n            tvl\n            apy {\n              miningBaseApy\n              miningQuoteApy\n              transactionBaseApy\n              transactionQuoteApy\n            }\n            miningAddress\n            volume24H\n          }\n        }\n      }\n    }\n  ':
    types.FetchLiquidityListDocument,
  '\n    query FetchMyLiquidityList($where: Liquiditylist_filter) {\n      liquidity_list(where: $where) {\n        lqList {\n          id\n          liquidityPositions {\n            id\n            liquidityTokenBalance\n            poolShare\n          }\n          pair {\n            id\n            chainId\n            type\n            lpFeeRate\n            mtFeeRate\n            creator\n            baseLpToken {\n              id\n            }\n            quoteLpToken {\n              id\n            }\n            baseToken {\n              id\n              symbol\n              name\n              decimals\n              logoImg\n            }\n            quoteToken {\n              id\n              symbol\n              name\n              decimals\n              logoImg\n            }\n            tvl\n            apy {\n              miningBaseApy\n              miningQuoteApy\n              transactionBaseApy\n              transactionQuoteApy\n            }\n            miningAddress\n            volume24H\n          }\n        }\n      }\n    }\n  ':
    types.FetchMyLiquidityListDocument,
  '\n    query FetchDashboardPairList($where: Dashboardtype_list_filter) {\n      dashboard_pairs_list(where: $where) {\n        list {\n          chainId\n          pairAddress\n          poolType\n          baseReserve\n          quoteReserve\n          totalFee\n          baseAddress\n          quoteAddress\n          baseSymbol\n          quoteSymbol\n          tvl\n          baseTvl\n          quoteTvl\n          baseTvlRate\n          quoteTvlRate\n        }\n      }\n    }\n  ':
    types.FetchDashboardPairListDocument,
  '\n    query FetchPool(\n      $id: ID!\n      $where: Pair_filter\n      $liquidityWhere: Liquiditylist_filter\n    ) {\n      pair(id: $id, where: $where) {\n        id\n        type\n        creator\n        owner\n        traderCount\n        volumeBaseToken\n        volumeQuoteToken\n        volumeUSD\n        feeBase\n        feeQuote\n        mtFeeRate\n        lpFeeRate\n        i\n        k\n        baseReserve\n        quoteReserve\n        createdAtTimestamp\n        lastTradePrice\n        baseToken {\n          id\n          symbol\n          name\n          decimals\n        }\n        quoteToken {\n          id\n          symbol\n          name\n          decimals\n          usdPrice\n        }\n        baseLpToken {\n          id\n          symbol\n          name\n        }\n        quoteLpToken {\n          id\n          symbol\n          name\n        }\n      }\n      liquidity_list(where: $liquidityWhere) {\n        lqList {\n          pair {\n            apy {\n              miningBaseApy\n              miningQuoteApy\n              transactionBaseApy\n              transactionQuoteApy\n            }\n            miningAddress\n          }\n        }\n      }\n    }\n  ':
    types.FetchPoolDocument,
  '\n    query FetchPoolDayData($where: Dashboardday_filter) {\n      dashboard_pairs_day_data(where: $where) {\n        timestamp\n        date\n        volumeUsd\n        feeUsd\n        mtFeeUsd\n        tvlUsd\n        addresses\n      }\n    }\n  ':
    types.FetchPoolDayDataDocument,
  '\n    query FetchPoolDashboard($where: Dashboardpair_detail_filter) {\n      dashboard_pairs_detail(where: $where) {\n        fee\n        volume\n        totalFee\n        totalMtFee\n        totalVolume\n        tvl\n        turnover\n        liquidity\n        baseReserve\n        quoteReserve\n        baseVolume\n        quoteVolume\n        basePrice\n        quotePrice\n        price\n        baseFee\n        quoteFee\n        baseMtFee\n        quoteMtFee\n        pair\n        poolType\n        baseVolumeCumulative\n        quoteVolumeCumulative\n        baseAddress\n        baseSymbol\n        quoteAddress\n        quoteSymbol\n        network\n        pairAddress\n        txes\n        txesNear24h\n        txUsers\n        txUserNear24h\n        mtFeeNear24h\n        feeNear24h\n      }\n    }\n  ':
    types.FetchPoolDashboardDocument,
  '\n    query FetchPoolSwapList(\n      $first: Int\n      $skip: Int\n      $where: Swap_filter\n      $orderBy: Swap_orderBy\n      $orderDirection: OrderDirection\n    ) {\n      swaps(\n        first: $first\n        skip: $skip\n        where: $where\n        orderBy: $orderBy\n        orderDirection: $orderDirection\n      ) {\n        id\n        timestamp\n        from\n        baseVolume\n        quoteVolume\n        feeBase\n        feeQuote\n        fromToken {\n          id\n          symbol\n          name\n          decimals\n        }\n        toToken {\n          id\n          symbol\n          name\n          decimals\n        }\n        amountIn\n        amountOut\n      }\n    }\n  ':
    types.FetchPoolSwapListDocument,
  '\n    query FetchLiquidityPositions(\n      $id: ID!\n      $first: Int\n      $skip: Int\n      $where: LiquidityPosition_filter\n      $miningWhere: LiquidityPosition_filter\n      $orderBy: LiquidityPosition_orderBy\n      $orderDirection: OrderDirection\n    ) {\n      balance: liquidityPositions(\n        first: $first\n        skip: $skip\n        where: $where\n        orderBy: $orderBy\n        orderDirection: $orderDirection\n      ) {\n        id\n        liquidityTokenBalance\n      }\n      mining: liquidityPositions(\n        first: $first\n        skip: $skip\n        where: $miningWhere\n        orderBy: $orderBy\n        orderDirection: $orderDirection\n      ) {\n        id\n        liquidityTokenInMining\n      }\n      pair(id: $id) {\n        lastTradePrice\n        baseLpToken {\n          id\n          decimals\n        }\n        quoteLpToken {\n          id\n          decimals\n        }\n        baseToken {\n          id\n          symbol\n          name\n          decimals\n        }\n        quoteToken {\n          id\n          symbol\n          name\n          decimals\n        }\n      }\n    }\n  ':
    types.FetchLiquidityPositionsDocument,
  '\n    query FetchPoolPairList(\n      $first: Int\n      $baseWhere: Pair_filter\n      $quoteWhere: Pair_filter\n      $orderBy: Pair_orderBy\n      $orderDirection: OrderDirection\n    ) {\n      basePairs: pairs(\n        first: $first\n        where: $baseWhere\n        orderBy: $orderBy\n        orderDirection: $orderDirection\n      ) {\n        id\n        type\n        creator\n        lpFeeRate\n        i\n        k\n        baseReserve\n        quoteReserve\n        createdAtTimestamp\n        lastTradePrice\n        volumeUSD\n        baseToken {\n          id\n          symbol\n          name\n          decimals\n          usdPrice\n        }\n        quoteToken {\n          id\n          symbol\n          name\n          decimals\n          usdPrice\n        }\n      }\n      quotePairs: pairs(\n        first: $first\n        where: $quoteWhere\n        orderBy: $orderBy\n        orderDirection: $orderDirection\n      ) {\n        id\n        type\n        creator\n        lpFeeRate\n        i\n        k\n        baseReserve\n        quoteReserve\n        createdAtTimestamp\n        lastTradePrice\n        volumeUSD\n        baseToken {\n          id\n          symbol\n          name\n          decimals\n          usdPrice\n        }\n        quoteToken {\n          id\n          symbol\n          name\n          decimals\n          usdPrice\n        }\n      }\n    }\n  ':
    types.FetchPoolPairListDocument,
  '\n    query FetchUserSwapOrderHistories($where: User_swapswapFilter) {\n      user_swap_orderHistories(where: $where) {\n        count\n        page\n        list {\n          chainId\n          createdAt\n          fromAmount\n          fromTokenDecimals\n          fromTokenPrice\n          fromTokenSymbol\n          fromTokenAddress\n          fromTokenLogoImg\n          hash\n          status\n          toAmount\n          toTokenDecimals\n          toTokenPrice\n          toTokenSymbol\n          toTokenAddress\n          toTokenLogoImg\n          minAmount\n          nonce\n          extra\n          user\n        }\n      }\n    }\n  ':
    types.FetchUserSwapOrderHistoriesDocument,
  '\n    query FetchNoticeCenterTransactionList(\n      $where: Notice_centertransactionListFilter\n    ) {\n      notice_center_transactionList(where: $where) {\n        list {\n          chainId\n          createTime\n          extend\n          from\n          id\n          key\n          type\n        }\n        count\n        limit\n        page\n      }\n    }\n  ':
    types.FetchNoticeCenterTransactionListDocument,
  '\n    query FetchLiquidityLpPartnerRewards(\n      $where: LiquidityLpPartnerRewardsInput\n    ) {\n      liquidity_getLpPartnerRewards(where: $where) {\n        partnerInfos {\n          partner\n          logo\n          introduction\n          link\n          theme\n          sort\n          platform\n          extra\n        }\n        partnerRewards {\n          chainId\n          pool\n          partner\n          reward\n          type\n        }\n      }\n    }\n  ':
    types.FetchLiquidityLpPartnerRewardsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    query FetchErc20SwapCrossChainList($where: Erc20listV2Filter) {\n      erc20_swapCrossChainList(where: $where) {\n        name\n        address\n        symbol\n        decimals\n        slippage\n        chainId\n        logoImg\n        tokenlists {\n          name\n          status\n        }\n        domains {\n          name\n        }\n        funcLabels {\n          key\n        }\n        attributeLabels {\n          key\n        }\n      }\n    }\n  ',
): typeof import('./graphql').FetchErc20SwapCrossChainListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    query FetchErc20ForecastSlippage($where: Erc20_extenderc20ExtendV2Filter) {\n      erc20_extend_erc20ExtendV2(where: $where) {\n        forecastSlippageList {\n          forecastSlippage\n          forecastValue\n          confidenceRatio\n          confidenceIntervalUpper\n          confidenceIntervalLower\n        }\n      }\n    }\n  ',
): typeof import('./graphql').FetchErc20ForecastSlippageDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    query FetchMiningList($where: Miningmining_list_filter) {\n      mining_list(where: $where) {\n        list {\n          chainId\n          type\n          version\n          address\n          baseApy\n          baseLpToken {\n            decimals\n            address: id\n            symbol\n          }\n          baseToken {\n            decimals\n            address: id\n            price\n            symbol\n            logoImg\n          }\n          endBlock\n          miningContractAddress\n          miningTotalDollar\n          baseLpTokenMining\n          quoteLpTokenMining\n          quoteApy\n          quoteLpToken {\n            decimals\n            address: id\n            symbol\n          }\n          quoteToken {\n            decimals\n            address: id\n            price\n            symbol\n            logoImg\n          }\n          rewardTokenInfos {\n            apy\n            decimals\n            address: id\n            price\n            logoImg\n            rewardNumIndex\n            rewardPerBlock\n            startBlock\n            endBlock\n            startTime\n            endTime\n            symbol\n          }\n          rewardQuoteTokenInfos {\n            apy\n            decimals\n            address: id\n            price\n            logoImg\n            rewardNumIndex\n            rewardPerBlock\n            startBlock\n            endBlock\n            startTime\n            endTime\n            symbol\n          }\n          startBlock\n          title\n          platform\n          startTime\n          endTime\n        }\n        totalCount\n        chains\n      }\n    }\n  ',
): typeof import('./graphql').FetchMiningListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    query MiningList($where: Miningmining_list_filter) {\n      mining_list(where: $where) {\n        list {\n          chainId\n          type\n          version\n          address\n          isGSP\n          isNewERCMineV3\n          baseApy\n          baseLpToken {\n            decimals\n            id\n            symbol\n          }\n          baseToken {\n            decimals\n            id\n            price\n            symbol\n            logoImg\n          }\n          endBlock\n          miningContractAddress\n          miningTotalDollar\n          baseLpTokenMining\n          quoteLpTokenMining\n          quoteApy\n          quoteLpToken {\n            decimals\n            id\n            symbol\n          }\n          quoteToken {\n            decimals\n            id\n            price\n            symbol\n            logoImg\n          }\n          rewardTokenInfos {\n            apy\n            decimals\n            id\n            price\n            logoImg\n            rewardNumIndex\n            rewardPerBlock\n            startBlock\n            endBlock\n            startTime\n            endTime\n            symbol\n          }\n          rewardQuoteTokenInfos {\n            apy\n            decimals\n            id\n            price\n            logoImg\n            rewardNumIndex\n            rewardPerBlock\n            startBlock\n            endBlock\n            startTime\n            endTime\n            symbol\n          }\n          startBlock\n          title\n          platform\n          blockNumber\n          startTime\n          endTime\n        }\n        totalCount\n        chains\n      }\n    }\n  ',
): typeof import('./graphql').MiningListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    query MyCreatedMiningList($where: Miningmining_list_filter) {\n      mining_list(where: $where) {\n        list {\n          chainId\n          type\n          version\n          address\n          isGSP\n          isNewERCMineV3\n          baseApy\n          baseLpToken {\n            decimals\n            id\n            symbol\n          }\n          baseToken {\n            decimals\n            id\n            price\n            symbol\n            logoImg\n          }\n          endBlock\n          miningContractAddress\n          baseLpTokenMining\n          quoteLpTokenMining\n          quoteApy\n          quoteLpToken {\n            decimals\n            id\n            symbol\n          }\n          quoteToken {\n            decimals\n            id\n            price\n            symbol\n            logoImg\n          }\n          rewardTokenInfos {\n            apy\n            decimals\n            id\n            price\n            logoImg\n            rewardNumIndex\n            rewardPerBlock\n            startBlock\n            endBlock\n            startTime\n            endTime\n            symbol\n          }\n          rewardQuoteTokenInfos {\n            apy\n            decimals\n            id\n            price\n            logoImg\n            rewardNumIndex\n            rewardPerBlock\n            startBlock\n            endBlock\n            startTime\n            endTime\n            symbol\n          }\n          startBlock\n          title\n          platform\n          blockNumber\n          participantsNum\n          startTime\n          endTime\n        }\n        totalCount\n        chains\n      }\n    }\n  ',
): typeof import('./graphql').MyCreatedMiningListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    query FetchPoolList(\n      $first: Int\n      $where: Pair_filter\n      $orderBy: Pair_orderBy\n    ) {\n      pairs(\n        first: $first\n        where: $where\n        orderBy: $orderBy\n        orderDirection: desc\n      ) {\n        id\n        type\n        creator\n        owner\n        lpFeeRate\n        i\n        k\n        baseReserve\n        quoteReserve\n        lastTradePrice\n        feeBase\n        feeQuote\n        baseToken {\n          id\n          symbol\n          name\n          decimals\n        }\n        quoteToken {\n          id\n          symbol\n          name\n          decimals\n        }\n        baseLpToken {\n          id\n        }\n        quoteLpToken {\n          id\n        }\n      }\n    }\n  ',
): typeof import('./graphql').FetchPoolListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    query FetchLiquidityList($where: Liquiditylist_filter) {\n      liquidity_list(where: $where) {\n        currentPage\n        pageSize\n        totalCount\n        lqList {\n          id\n          pair {\n            id\n            chainId\n            type\n            lpFeeRate\n            mtFeeRate\n            creator\n            baseLpToken {\n              id\n            }\n            quoteLpToken {\n              id\n            }\n            baseToken {\n              id\n              symbol\n              name\n              decimals\n              logoImg\n            }\n            quoteToken {\n              id\n              symbol\n              name\n              decimals\n              logoImg\n            }\n            tvl\n            apy {\n              miningBaseApy\n              miningQuoteApy\n              transactionBaseApy\n              transactionQuoteApy\n            }\n            miningAddress\n            volume24H\n          }\n        }\n      }\n    }\n  ',
): typeof import('./graphql').FetchLiquidityListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    query FetchMyLiquidityList($where: Liquiditylist_filter) {\n      liquidity_list(where: $where) {\n        lqList {\n          id\n          liquidityPositions {\n            id\n            liquidityTokenBalance\n            poolShare\n          }\n          pair {\n            id\n            chainId\n            type\n            lpFeeRate\n            mtFeeRate\n            creator\n            baseLpToken {\n              id\n            }\n            quoteLpToken {\n              id\n            }\n            baseToken {\n              id\n              symbol\n              name\n              decimals\n              logoImg\n            }\n            quoteToken {\n              id\n              symbol\n              name\n              decimals\n              logoImg\n            }\n            tvl\n            apy {\n              miningBaseApy\n              miningQuoteApy\n              transactionBaseApy\n              transactionQuoteApy\n            }\n            miningAddress\n            volume24H\n          }\n        }\n      }\n    }\n  ',
): typeof import('./graphql').FetchMyLiquidityListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    query FetchDashboardPairList($where: Dashboardtype_list_filter) {\n      dashboard_pairs_list(where: $where) {\n        list {\n          chainId\n          pairAddress\n          poolType\n          baseReserve\n          quoteReserve\n          totalFee\n          baseAddress\n          quoteAddress\n          baseSymbol\n          quoteSymbol\n          tvl\n          baseTvl\n          quoteTvl\n          baseTvlRate\n          quoteTvlRate\n        }\n      }\n    }\n  ',
): typeof import('./graphql').FetchDashboardPairListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    query FetchPool(\n      $id: ID!\n      $where: Pair_filter\n      $liquidityWhere: Liquiditylist_filter\n    ) {\n      pair(id: $id, where: $where) {\n        id\n        type\n        creator\n        owner\n        traderCount\n        volumeBaseToken\n        volumeQuoteToken\n        volumeUSD\n        feeBase\n        feeQuote\n        mtFeeRate\n        lpFeeRate\n        i\n        k\n        baseReserve\n        quoteReserve\n        createdAtTimestamp\n        lastTradePrice\n        baseToken {\n          id\n          symbol\n          name\n          decimals\n        }\n        quoteToken {\n          id\n          symbol\n          name\n          decimals\n          usdPrice\n        }\n        baseLpToken {\n          id\n          symbol\n          name\n        }\n        quoteLpToken {\n          id\n          symbol\n          name\n        }\n      }\n      liquidity_list(where: $liquidityWhere) {\n        lqList {\n          pair {\n            apy {\n              miningBaseApy\n              miningQuoteApy\n              transactionBaseApy\n              transactionQuoteApy\n            }\n            miningAddress\n          }\n        }\n      }\n    }\n  ',
): typeof import('./graphql').FetchPoolDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    query FetchPoolDayData($where: Dashboardday_filter) {\n      dashboard_pairs_day_data(where: $where) {\n        timestamp\n        date\n        volumeUsd\n        feeUsd\n        mtFeeUsd\n        tvlUsd\n        addresses\n      }\n    }\n  ',
): typeof import('./graphql').FetchPoolDayDataDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    query FetchPoolDashboard($where: Dashboardpair_detail_filter) {\n      dashboard_pairs_detail(where: $where) {\n        fee\n        volume\n        totalFee\n        totalMtFee\n        totalVolume\n        tvl\n        turnover\n        liquidity\n        baseReserve\n        quoteReserve\n        baseVolume\n        quoteVolume\n        basePrice\n        quotePrice\n        price\n        baseFee\n        quoteFee\n        baseMtFee\n        quoteMtFee\n        pair\n        poolType\n        baseVolumeCumulative\n        quoteVolumeCumulative\n        baseAddress\n        baseSymbol\n        quoteAddress\n        quoteSymbol\n        network\n        pairAddress\n        txes\n        txesNear24h\n        txUsers\n        txUserNear24h\n        mtFeeNear24h\n        feeNear24h\n      }\n    }\n  ',
): typeof import('./graphql').FetchPoolDashboardDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    query FetchPoolSwapList(\n      $first: Int\n      $skip: Int\n      $where: Swap_filter\n      $orderBy: Swap_orderBy\n      $orderDirection: OrderDirection\n    ) {\n      swaps(\n        first: $first\n        skip: $skip\n        where: $where\n        orderBy: $orderBy\n        orderDirection: $orderDirection\n      ) {\n        id\n        timestamp\n        from\n        baseVolume\n        quoteVolume\n        feeBase\n        feeQuote\n        fromToken {\n          id\n          symbol\n          name\n          decimals\n        }\n        toToken {\n          id\n          symbol\n          name\n          decimals\n        }\n        amountIn\n        amountOut\n      }\n    }\n  ',
): typeof import('./graphql').FetchPoolSwapListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    query FetchLiquidityPositions(\n      $id: ID!\n      $first: Int\n      $skip: Int\n      $where: LiquidityPosition_filter\n      $miningWhere: LiquidityPosition_filter\n      $orderBy: LiquidityPosition_orderBy\n      $orderDirection: OrderDirection\n    ) {\n      balance: liquidityPositions(\n        first: $first\n        skip: $skip\n        where: $where\n        orderBy: $orderBy\n        orderDirection: $orderDirection\n      ) {\n        id\n        liquidityTokenBalance\n      }\n      mining: liquidityPositions(\n        first: $first\n        skip: $skip\n        where: $miningWhere\n        orderBy: $orderBy\n        orderDirection: $orderDirection\n      ) {\n        id\n        liquidityTokenInMining\n      }\n      pair(id: $id) {\n        lastTradePrice\n        baseLpToken {\n          id\n          decimals\n        }\n        quoteLpToken {\n          id\n          decimals\n        }\n        baseToken {\n          id\n          symbol\n          name\n          decimals\n        }\n        quoteToken {\n          id\n          symbol\n          name\n          decimals\n        }\n      }\n    }\n  ',
): typeof import('./graphql').FetchLiquidityPositionsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    query FetchPoolPairList(\n      $first: Int\n      $baseWhere: Pair_filter\n      $quoteWhere: Pair_filter\n      $orderBy: Pair_orderBy\n      $orderDirection: OrderDirection\n    ) {\n      basePairs: pairs(\n        first: $first\n        where: $baseWhere\n        orderBy: $orderBy\n        orderDirection: $orderDirection\n      ) {\n        id\n        type\n        creator\n        lpFeeRate\n        i\n        k\n        baseReserve\n        quoteReserve\n        createdAtTimestamp\n        lastTradePrice\n        volumeUSD\n        baseToken {\n          id\n          symbol\n          name\n          decimals\n          usdPrice\n        }\n        quoteToken {\n          id\n          symbol\n          name\n          decimals\n          usdPrice\n        }\n      }\n      quotePairs: pairs(\n        first: $first\n        where: $quoteWhere\n        orderBy: $orderBy\n        orderDirection: $orderDirection\n      ) {\n        id\n        type\n        creator\n        lpFeeRate\n        i\n        k\n        baseReserve\n        quoteReserve\n        createdAtTimestamp\n        lastTradePrice\n        volumeUSD\n        baseToken {\n          id\n          symbol\n          name\n          decimals\n          usdPrice\n        }\n        quoteToken {\n          id\n          symbol\n          name\n          decimals\n          usdPrice\n        }\n      }\n    }\n  ',
): typeof import('./graphql').FetchPoolPairListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    query FetchUserSwapOrderHistories($where: User_swapswapFilter) {\n      user_swap_orderHistories(where: $where) {\n        count\n        page\n        list {\n          chainId\n          createdAt\n          fromAmount\n          fromTokenDecimals\n          fromTokenPrice\n          fromTokenSymbol\n          fromTokenAddress\n          fromTokenLogoImg\n          hash\n          status\n          toAmount\n          toTokenDecimals\n          toTokenPrice\n          toTokenSymbol\n          toTokenAddress\n          toTokenLogoImg\n          minAmount\n          nonce\n          extra\n          user\n        }\n      }\n    }\n  ',
): typeof import('./graphql').FetchUserSwapOrderHistoriesDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    query FetchNoticeCenterTransactionList(\n      $where: Notice_centertransactionListFilter\n    ) {\n      notice_center_transactionList(where: $where) {\n        list {\n          chainId\n          createTime\n          extend\n          from\n          id\n          key\n          type\n        }\n        count\n        limit\n        page\n      }\n    }\n  ',
): typeof import('./graphql').FetchNoticeCenterTransactionListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    query FetchLiquidityLpPartnerRewards(\n      $where: LiquidityLpPartnerRewardsInput\n    ) {\n      liquidity_getLpPartnerRewards(where: $where) {\n        partnerInfos {\n          partner\n          logo\n          introduction\n          link\n          theme\n          sort\n          platform\n          extra\n        }\n        partnerRewards {\n          chainId\n          pool\n          partner\n          reward\n          type\n        }\n      }\n    }\n  ',
): typeof import('./graphql').FetchLiquidityLpPartnerRewardsDocument;

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
