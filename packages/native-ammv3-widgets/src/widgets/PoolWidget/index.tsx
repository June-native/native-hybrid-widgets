import { useUserOptions } from '../../components/UserOptionsProvider';
import { useRouterStore } from '../../router';
import { Page, PageType } from '../../router/types';
import AMMV2Create from './AMMV2Create';
import AMMV3Create from './AMMV3/AddLiquidityV3';
import PoolCreate from './PoolCreate';
import PoolDetail from './PoolDetail';
import PoolList from './PoolList';
import PoolModify from './PoolModify';

export function Pool() {
  const { routerPage } = useUserOptions();
  const pageLocal = useRouterStore((state) => state.page);
  const page = routerPage ?? pageLocal;

  switch (page?.type) {
    case PageType.Pool:
      return <PoolList params={(page as Page<PageType.Pool>).params} />;
    case PageType.CreatePool:
      return <PoolCreate />;
    case PageType.ModifyPool:
      return <PoolModify params={(page as Page<PageType.ModifyPool>).params} />;
    case PageType.PoolDetail:
      return <PoolDetail params={(page as Page<PageType.PoolDetail>).params} />;
    case PageType.createPoolAMMV2:
      return <AMMV2Create />;
    case PageType.createPoolAMMV3:
      return (
        <AMMV3Create
          params={(page as Page<PageType.createPoolAMMV3>).params}
          handleGoBack={() => {
            useRouterStore.getState().push({
              type: PageType.Pool,
            });
          }}
          handleGoToPoolList={() => {
            useRouterStore.getState().push({
              type: PageType.Pool,
            });
          }}
        />
      );
    default:
      return <PoolList params={(page as Page<PageType.Pool>)?.params} />;
  }
}
