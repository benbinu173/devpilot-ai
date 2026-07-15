import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-prompt-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './prompt-input.html',
  styleUrl: './prompt-input.css'
})
export class PromptInput {

 

  prompt = signal('');
   chatService = inject(ChatService);

  sendMessage(){

    const message = this.prompt().trim();

    if(!message){

      return;

    }

    this.chatService.addUserMessageStream(message);

    this.prompt.set('');

  }

  handleKeyDown(event: KeyboardEvent): void {

  if (event.key === 'Enter' && !event.shiftKey) {

    event.preventDefault();

    this.sendMessage();

  }

}

}