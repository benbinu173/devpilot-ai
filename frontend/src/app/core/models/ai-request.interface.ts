import { AiContext } from './ai-context.interface';
import { ChatApiMessage } from './chat-message.interface';

export interface AiRequest {

  messages: ChatApiMessage[];

   mode?: string;

  context?: AiContext;

}