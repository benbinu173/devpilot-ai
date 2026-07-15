import { Conversation } from './conversation.interface';

export interface CreateConversationResponse {

  success: boolean;

  conversation: Conversation;

}