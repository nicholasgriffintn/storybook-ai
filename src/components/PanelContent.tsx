import React from 'react';
import { themes, convert } from '@storybook/theming';
import { Placeholder } from '@storybook/components';
import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';

import { helpPrompt } from '../ai/prompt';

/**
 * Checkout https://github.com/storybookjs/storybook/blob/next/code/addons/jest/src/components/Panel.tsx
 * for a real world example
 */
export function PanelContent({
  args,
  provider,
  apiKey,
}: {
  args: Record<string, any>;
  provider: string;
  apiKey: string;
}) {
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

  // TODO: Need to work out how to give the AI better context from Storybook
  // Need some sort of JSON output from Storybook to give to the AI
  // Example:
  /*
   * const stringifiedEvents = events
  .map(
    (event) => `"${event.name}": {
      ${event.properties.map((property) => `properties."${property.name}": ${property.type}`).join(', ')}
    }`
  )
  .join(', ')
  .replace('$sent_at', 'timestamp');
  */
  const argsKeys = args ? Object.keys(args) : [];
  const components = argsKeys.join(', ');

  const helpPromptGenerated = helpPrompt(components);

  const prompt = ChatPromptTemplate.fromMessages([
    ['system', helpPromptGenerated],
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
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              type="button"
              onClick={async () => {
                const result = await chain.invoke({
                  input: message,
                });
                setResponse(result);
                setMessage('');
              }}
            >
              Send
            </button>
          </div>
        </section>
      </Placeholder>
    </div>
  );
}
