import {
  Component,
  inject,
  ElementRef,
  ViewChild,
  effect
} from '@angular/core';

import { PromptInput } from '../prompt-input/prompt-input';
import { ChatMessage } from '../chat-message/chat-message';
import { TypingIndicator } from '../typing-indicator/typing-indicator';
import { ChatService  } from '../../services/chat.service';

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [
    PromptInput,
    ChatMessage,
    TypingIndicator
  ],
  templateUrl: './chat-window.html',
  styleUrl: './chat-window.css',
})
export class ChatWindow {

  chatService = inject(ChatService );

  @ViewChild('messagesContainer')
  messagesContainer!: ElementRef<HTMLDivElement>;

constructor() {
  effect(() => {
    this.chatService.currentMessages(); // must read the signal so the effect re-fires
    this.chatService.isTyping();

    queueMicrotask(() => {
      this.scrollToBottom();
    });
  });
}

  private scrollToBottom(): void {

    if (!this.messagesContainer) return;

    const element = this.messagesContainer.nativeElement;

    element.scrollTop = element.scrollHeight;

  }

}