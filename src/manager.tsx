import React from 'react';
import { addons, types } from '@storybook/manager-api';

import { ADDON_ID, PANEL_ID, PARAM_KEY } from './constants';
import { Panel } from './Panel';

/**
 * Note: if you want to use JSX in this file, rename it to `manager.tsx`
 * and update the entry prop in tsup.config.ts to use "src/manager.tsx",
 */

// Register the addon
addons.register(ADDON_ID, (api) => {
  // Register the panel
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: 'Storybook AI',
    match: ({ viewMode }) => viewMode === 'story',
    paramKey: PARAM_KEY,
    render: ({ active }) => (active ? <Panel api={api} /> : null),
  });
});
