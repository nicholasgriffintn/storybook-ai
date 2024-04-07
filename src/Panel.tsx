import React from 'react';
import { AddonPanel } from '@storybook/components';
import { useArgs, useParameter } from '@storybook/manager-api';

import { PanelContent } from './components/PanelContent';
import { PROVIDER_NAME, PROVIDER_KEY } from './constants';

interface PanelProps {
  active: boolean;
}

export function Panel(props: PanelProps) {
  const [args] = useArgs();
  const providerName = useParameter(PROVIDER_NAME, 'openai');
  const providerKey = useParameter(PROVIDER_KEY, '');

  return (
    <AddonPanel {...props}>
      <PanelContent args={args} provider={providerName} apiKey={providerKey} />
    </AddonPanel>
  );
}
