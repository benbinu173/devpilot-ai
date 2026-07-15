import { Injectable, computed, signal ,inject  } from '@angular/core';

import { ChatSession } from '../interfaces/chat-session.interface';
import { Message } from '../interfaces/message.interface';

import { ConversationService } from '../../../core/services/conversation.service';
import { Conversation } from '../../../core/models/conversation.interface';
import { AiEngineService } from '../../../core/services/ai-engine.service';
import { AiContextService } from '../../../core/services/ai-context.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private aiEngine = inject(AiEngineService);
  private aiContext = inject(AiContextService);

  // -----------------------------
  // Active Chat
  // -----------------------------

  activeSessionId = signal<string | null>(null);


  private conversationService = inject(ConversationService);

  isTyping = signal(false);

  // -----------------------------
// Streaming State
// -----------------------------

streamingMessage = signal<Message | null>(null);

isStreaming = signal(false);

  

  // -----------------------------
  // Chat Sessions
  // -----------------------------

  chatSessions = signal<ChatSession[]>([ ]);

  // -----------------------------
  // Current Messages
  // -----------------------------

  constructor() {

  this.loadConversations();

}

  currentMessages = computed(() => {

    const session = this.chatSessions().find(
      chat => chat.id === this.activeSessionId()
    );

    return session?.messages ?? [];

  });

  displayMessages = computed(() => {

  const messages = [...this.currentMessages()];

  const streaming = this.streamingMessage();

  if (streaming) {

    messages.push(streaming);

  }

  return messages;

});

private buildSelectionPrompt(

  action: string,

  code: string

): string {

  return `

${action}

Focus only on the selected code.

Use the surrounding file only as reference.

Selected Code:

${code}

`;

}


private async runSelectionAction(

  action: string,

  selectedCode: string

): Promise<void> {

  await this.addUserMessageStream(

    this.buildSelectionPrompt(

      action,

      selectedCode

    )

  );

}

  // -----------------------------
  // Create Chat
  // -----------------------------

  createNewChat(): void {

  this.conversationService.createConversation().subscribe({

    next: (response) => {

      const session = this.mapConversation(

        response.conversation

      );

      this.chatSessions.update(chats => [

        session,

        ...chats

      ]);

      this.activeSessionId.set(session.id);

    },

    error: (error) => {

      console.error(

        'Unable to create conversation.',

        error

      );

    }

  });

}

  // -----------------------------
  // Select Chat
  // -----------------------------

selectChat(id: string): void {

  this.conversationService.getConversation(id).subscribe({

    next: (response) => {

      const updatedSession = this.mapConversation(

        response.conversation

      );

      this.chatSessions.update(chats =>

        chats.map(chat =>

          chat.id === id

            ? updatedSession

            : chat

        )

      );

      this.activeSessionId.set(id);

    },

    error: (error) => {

      console.error(

        'Unable to load conversation.',

        error

      );

    }

  });

}

  // -----------------------------
  // User Message
  // -----------------------------

async addUserMessageStream(content: string): Promise<void> {

  const conversationId = this.activeSessionId();

  if (!conversationId) {
    return;
  }

  // Show the user's message immediately
  this.chatSessions.update(chats =>
    chats.map(chat => {

      if (chat.id !== conversationId) {
        return chat;
      }

      return {
        ...chat,
        messages: [
          ...chat.messages,
          {
            id: Date.now(),
            sender: 'user',
            content,
            timestamp: this.getCurrentTime()
          }
        ]
      };

    })
  );

  // Create temporary assistant bubble
  this.startStreaming();

  try {

   const request = this.aiContext.build(content);

await this.conversationService.streamMessage(

  conversationId,

  request.prompt,

  request.mode,

  request.context,

  token => {

    this.appendToken(token);

  }

);

    // Stream finished successfully
    this.finishStreaming();

    // Reload conversation from MongoDB
    this.selectChat(conversationId);

  }
  catch (error) {

    console.error(error);

    this.finishStreaming();

  }

}

async explainSelection(
  selectedCode: string
): Promise<void> {

  await this.runSelectionAction(

    'Explain the selected code.',

    selectedCode

  );

}

async debugSelection(
  selectedCode: string
): Promise<void> {

  await this.runSelectionAction(

    'Debug the selected code.',

    selectedCode

  );

}

async refactorSelection(
  selectedCode: string
): Promise<void> {

  await this.runSelectionAction(

    'Refactor the selected code.',

    selectedCode

  );

}

async generateTests(
  selectedCode: string
): Promise<void> {

  await this.runSelectionAction(

    'Generate unit tests for the selected code.',

    selectedCode

  );

}

async generateDocumentation(
  selectedCode: string
): Promise<void> {

  await this.runSelectionAction(

    'Generate documentation for the selected code.',

    selectedCode

  );

}




private loadConversations(): void {

  this.conversationService.getConversations().subscribe({

    next: (response) => {

      const sessions: ChatSession[] = response.conversations.map(

        conversation => ({

          id: conversation._id,

          title: conversation.title,

          updated: new Date(

            conversation.updatedAt

          ).toLocaleString(),

          messages: []

        })

      );

      this.chatSessions.set(sessions);

      if (sessions.length > 0) {

        this.selectChat(

          sessions[0].id

        );

      }

    },

  error: (error) => {

  console.error(

    'Unable to load conversations.',

    error

  );

}

});

}
private mapConversation(
  conversation: Conversation
): ChatSession {

  return {

    id: conversation._id,

    title: conversation.title,

    updated: new Date(
      conversation.updatedAt
    ).toLocaleString(),

    messages: conversation.messages.map(message => ({

      id: Date.now() + Math.random(),

      sender: message.role === 'user'
        ? 'user'
        : 'assistant',

      content: message.content,

      timestamp: new Date(
        message.createdAt
      ).toLocaleTimeString([], {

        hour: '2-digit',

        minute: '2-digit'

      })

    }))

  };

}

  // -----------------------------
  // Helpers
  // -----------------------------

  private getCurrentTime(): string {

    return new Date().toLocaleTimeString([], {

      hour: '2-digit',

      minute: '2-digit'

    });

  }

  private startStreaming(): void {

  this.isStreaming.set(true);

  this.streamingMessage.set({

    id: Date.now(),

    sender: 'assistant',

    content: '',

    timestamp: this.getCurrentTime(),

    isStreaming: true

  });

}

private appendToken(token: string): void {

  this.streamingMessage.update(message => {

    if (!message) {

      return null;

    }

    return {

      ...message,

      content: message.content + token

    };

  });

}

private finishStreaming(): void {

  this.streamingMessage.set(null);

  this.isStreaming.set(false);

}


  deleteConversation(id: string): void {

  this.conversationService.deleteConversation(id).subscribe({

    next: () => {

      const remainingChats = this.chatSessions().filter(

        chat => chat.id !== id

      );

      this.chatSessions.set(remainingChats);

      if (this.activeSessionId() === id) {

        if (remainingChats.length > 0) {

          this.selectChat(

            remainingChats[0].id

          );

        }

        else {

          this.createNewChat();

        }

      }

    },

    error: (error) => {

      console.error(

        'Unable to delete conversation.',

        error

      );

    }

  });

}

}