import { SwapWidgetApi } from '@native-ammv3/api';
import { SwapWidget, SwapWidgetProps } from '@native-ammv3/widgets';
import React from 'react';

export default {
  title: 'Widgets/Config',
  component: 'div',
};

export const Primary = ({
  projectId,
  apiKey,
  onlyChainId,
}: {
  projectId: string;
  apiKey: string;
  onlyChainId?: number;
}) => {
  const [config, setConfig] = React.useState<SwapWidgetProps>({
    tokenList: [],
  });
  React.useEffect(() => {
    if (projectId && apiKey) {
      const dodoService = new SwapWidgetApi();
      dodoService
        .getConfigSwapWidgetProps(projectId, apiKey)
        .then(({ swapWidgetProps }) => {
          setConfig(swapWidgetProps);
        });
    }
  }, [projectId, apiKey]);

  return <SwapWidget {...config} onlyChainId={onlyChainId} apikey={apiKey} />;
};

Primary.args = {
  projectId: 'NativeHybrid',
  apiKey: '48e1f12302a853755e',
  onlyChainId: 1,
};
