# Storybook AI

Storybook AI is an addon that can be used with Storybook to provide a way to generate stories from your React components and ask questions about them, right from Storybook.

At the moment, this is enitrely for investigational purposes and is not intended to be used in production, please do not use this without the expectation of issues.

Alongside that, this is a personal project and is only shared for the purpose of code sharing and learning, please don't expect any support or updates.

## Installation

Install the package:

```sh
pnpm add -D storybook-ai
```

Then, register it as an addon in `.storybook/main.js`.

```js
// .storybook/main.ts

// Replace your-framework with the framework you are using (e.g., react-webpack5, vue3-vite)
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  // ...rest of config
  addons: [
    '@storybook/addon-essentials'
    'storybook-ai', // 👈 register the addon here
  ],
};

export default config;
```

Then in your `.storybook/preview.js` file, add the following:

```js
const parameters = {
  ... // other parameters
  ai: {
    provider: 'openai',
    apiKey: 'your-openai-api-key',
  },
};
```
