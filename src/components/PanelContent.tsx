import React from 'react';
import { type API } from '@storybook/manager-api';
import { themes, convert } from '@storybook/theming';
import { Placeholder } from '@storybook/components';
import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';

import { helpPrompt } from '../ai/prompt';

type PanelContentProps = {
  api: API;
  args: Record<string, any>;
  provider: string;
  apiKey: string;
};

/**
 * Checkout https://github.com/storybookjs/storybook/blob/next/code/addons/jest/src/components/Panel.tsx
 * for a real world example
 */
export function PanelContent({
  api,
  args,
  provider,
  apiKey,
}: PanelContentProps) {
  const story = api.getCurrentStoryData();

  const [message, setMessage] = React.useState('');
  const [response, setResponse] = React.useState('');

  if (provider !== 'openai') {
    return (
      <div
        id="overview"
        title="Overview"
        color={convert(themes.normal).color.positive}
      >
        <Placeholder>
          <section>
            <h2>Chat with AI</h2>
            <p>Provider not supported</p>
          </section>
        </Placeholder>
      </div>
    );
  }

  if (!apiKey) {
    return (
      <div
        id="overview"
        title="Overview"
        color={convert(themes.normal).color.positive}
      >
        <Placeholder>
          <section>
            <h2>Chat with AI</h2>
            <p>API Key not provided</p>
          </section>
        </Placeholder>
      </div>
    );
  }

  const chatModel = new ChatOpenAI({
    openAIApiKey: apiKey,
  });
  const outputParser = new StringOutputParser();

  const storyData = {
    ...story,
    args,
  };

  console.log(JSON.stringify(storyData, null, 2));

  const prompt = ChatPromptTemplate.fromMessages([
    ['system', helpPrompt],
    ['user', '{input}'],
  ]);

  const chain = prompt.pipe(chatModel).pipe(outputParser);

  return (
    <div
      id="overview"
      title="Overview"
      color={convert(themes.normal).color.positive}
    >
      <Placeholder>
        <section>
          <h2>Chat with AI</h2>
          {response && <p>{response}</p>}
          <div>
            <form
              onSubmit={async (event) => {
                event.preventDefault();

                const result = await chain.invoke({
                  input: message,
                  context: JSON.stringify(storyData, null, 2),
                });
                setResponse(result);
                setMessage('');
              }}
            >
              <label htmlFor="message">Message</label>
              <input
                type="text"
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button type="submit">Send</button>
            </form>
          </div>
        </section>
      </Placeholder>
    </div>
  );
}
