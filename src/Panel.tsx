import React from 'react';
import { AddonPanel } from '@storybook/components';
import { useArgs } from '@storybook/manager-api';
import { useGlobals } from '@storybook/manager-api';

import { PanelContent } from './components/PanelContent';
import { PROVIDER_NAME, PROVIDER_KEY } from './constants';

interface PanelProps {
  active: boolean;
}

export function Panel(props: PanelProps) {
  const [args] = useArgs();
  const [globals] = useGlobals();

  // TODO: Figure out how we get config from storybook, not too sure,..

  return (
    <AddonPanel {...props}>
      <PanelContent
        args={args}
        provider={globals[PROVIDER_NAME]}
        apiKey={globals[PROVIDER_KEY]}
      />
    </AddonPanel>
  );
}
