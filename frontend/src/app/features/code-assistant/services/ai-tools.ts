import { AiTool } from '../interfaces/ai-tool.interface';

export const AI_TOOLS: AiTool[] = [

  {
    id: 'explain',

    title: 'Explain Code',

    description: 'Understand code line by line.',

    icon: '💡',

    systemPrompt:
      'You are a senior software engineer. Explain the following code clearly using Markdown.'
  },

  {
    id: 'debug',

    title: 'Debug Code',

    description: 'Find bugs and suggest fixes.',

    icon: '🐞',

    systemPrompt:
      'You are an expert debugger. Find every bug, explain why it happens, and provide corrected code.'
  },

  {
    id: 'refactor',

    title: 'Refactor Code',

    description: 'Improve code quality.',

    icon: '🔄',

    systemPrompt:
      'Refactor this code using modern best practices while preserving behavior.'
  },

  {
    id: 'tests',

    title: 'Generate Tests',

    description: 'Create unit tests.',

    icon: '🧪',

    systemPrompt:
      'Generate comprehensive unit tests for the following code.'
  },

  {
    id: 'docs',

    title: 'Generate Documentation',

    description: 'Generate technical documentation.',

    icon: '📄',

    systemPrompt:
      'Write professional documentation for the following code.'
  }

];