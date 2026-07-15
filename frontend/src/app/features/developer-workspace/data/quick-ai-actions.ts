import { QuickAiAction } from "../models/quick-ai-action.interface";


export const QUICK_AI_ACTIONS: QuickAiAction[] = [

  {

    title: 'Explain File',

    icon: '📖',

    prompt: 'Explain this file in detail.',

    mode: 'explain'

  },

  {

    title: 'Find Bugs',

    icon: '🐞',

    prompt: 'Find bugs and potential issues in this file.',

    mode: 'debug'

  },

  {

    title: 'Refactor',

    icon: '✨',

    prompt: 'Refactor this file using modern best practices.',

    mode: 'refactor'

  },

  {

    title: 'Generate Tests',

    icon: '🧪',

    prompt: 'Generate comprehensive unit tests for this file.',

    mode: 'tests'

  },

  {

    title: 'Generate Docs',

    icon: '📚',

    prompt: 'Generate professional documentation for this file.',

    mode: 'docs'

  }

];