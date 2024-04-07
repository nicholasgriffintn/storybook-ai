import React from 'react';
import { AddonPanel } from '@storybook/components';
import { useArgs, useParameter } from '@storybook/manager-api';

import { PanelContent } from './components/PanelContent';
import { PARAM_KEY } from './constants';

interface PanelProps {
  active: boolean;
}

export function Panel(props: PanelProps) {
  const [args] = useArgs();
  const parameters = useParameter(PARAM_KEY, {
    provider: 'openai',
    apiKey: '',
  });

  console.log(parameters);

  const { provider, apiKey } = parameters;

  return (
    <AddonPanel {...props}>
      <PanelContent args={args} provider={provider} apiKey={apiKey} />
    </AddonPanel>
  );
}
