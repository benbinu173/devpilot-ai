import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-conversation-item',
  standalone: true,
  imports: [],
  templateUrl: './conversation-item.html',
  styleUrl: './conversation-item.css'
})
export class ConversationItem {

  title = input('');

  updated = input('');

  active = input(false);

  select = output<void>();

  delete = output<void>();

  deleteConversation(event: MouseEvent): void {

    event.stopPropagation();

    this.delete.emit();

  }

}