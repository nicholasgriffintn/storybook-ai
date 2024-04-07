export const parameters = {
  ai: {
    provider: 'openai',
    apiKey: process.env.OPENAI_API_KEY,
  },
  backgrounds: {
    default: 'light',
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
