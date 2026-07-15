import { ChatApiMessage } from './chat-message.interface';

export interface ChatRequest {

  messages: ChatApiMessage[];

  mode?: string;

}