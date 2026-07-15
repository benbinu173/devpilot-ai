export interface Message {

    id: number;

    sender: 'user' | 'assistant';

    content: string;

    timestamp: string;

    isStreaming?: boolean;

}