import React from 'react';
import { type API, useArgs, useParameter } from '@storybook/manager-api';

import { PanelContent } from './components/PanelContent';
import { PARAM_KEY } from './constants';

interface PanelProps {
  api: API;
}

export const Panel: React.FC<PanelProps> = ({ api }) => {
  const [args] = useArgs();
  const parameters = useParameter(PARAM_KEY, {
    provider: 'openai',
    apiKey: '',
  });

  const { provider, apiKey } = parameters;

  return (
    <PanelContent api={api} args={args} provider={provider} apiKey={apiKey} />
  );
};
