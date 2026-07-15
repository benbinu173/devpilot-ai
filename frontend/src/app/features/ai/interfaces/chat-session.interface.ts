import { Message } from './message.interface';

export interface ChatSession {

  id: string;

  title: string;

  updated: string;

  messages: Message[];

}