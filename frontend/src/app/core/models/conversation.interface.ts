export interface Conversation {

  _id: string;

  user: string;

  title: string;

  messages: {

    role: 'user' | 'assistant';

    content: string;

    createdAt: string;

    updatedAt: string;

  }[];

  createdAt: string;

  updatedAt: string;

}