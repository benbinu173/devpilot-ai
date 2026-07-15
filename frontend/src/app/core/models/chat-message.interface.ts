export interface ChatApiMessage {

  role: 'system' | 'user' | 'assistant';

  content: string;

}