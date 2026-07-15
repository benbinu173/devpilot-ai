import { Component } from '@angular/core';
import { ConversationItem } from '../conversation-item/conversation-item';
import { inject } from '@angular/core';
import { ChatService } from '../../services/chat.service';
@Component({
  selector: 'app-conversation-list',
  standalone: true,
  imports: [ConversationItem],
  templateUrl: './conversation-list.html',
  styleUrl: './conversation-list.css'
})
export class ConversationList {

 chatService = inject(ChatService);

 deleteChat(id: string): void {

  const confirmed = confirm(

    'Delete this conversation?'

  );

  if (!confirmed) {

    return;

  }

  this.chatService.deleteConversation(id);

}

}