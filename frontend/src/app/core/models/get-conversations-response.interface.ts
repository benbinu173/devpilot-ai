import { ConversationSummary } from './conversation-summary.interface';

export interface GetConversationsResponse {

  success: boolean;

  conversations: ConversationSummary[];

}