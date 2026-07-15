import { AiSuggestion } from './ai-suggestion.interface';

export interface AiAnalysis {

  framework: string;

  language: string;

  complexity: 'Low' | 'Medium' | 'High';

  fileType: string;

  summary: string;

  patterns: string[];

  warnings: string[];

  suggestions: AiSuggestion[];

}