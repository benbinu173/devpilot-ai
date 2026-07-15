export interface Conversation {

  _id: string;

  user: string;

  title: string;

  messages: ConversationMessage[];

  createdAt: string;

  updatedAt: string;

}

export interface ConversationMessage {

  role: 'user' | 'assistant';

  content: string;

  createdAt: string;

  updatedAt: string;

}