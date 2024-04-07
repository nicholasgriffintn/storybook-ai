import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  core: {
    disableTelemetry: true,
  },
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    './local-preset.js',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  env: (config) => ({
    ...config,
  }),
  docs: {
    autodocs: 'tag',
  },
};

export default config;
