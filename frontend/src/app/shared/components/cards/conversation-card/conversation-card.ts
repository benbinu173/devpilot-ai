import {
  Component,
  computed,
  input
} from '@angular/core';

import { ConversationSummary } from '../../../../core/models/conversation-summary.interface';

@Component({
  selector: 'app-conversation-card',
  standalone: true,
  imports: [],
  templateUrl: './conversation-card.html',
  styleUrl: './conversation-card.css'
})
export class ConversationCard {

  conversation = input.required<ConversationSummary>();

  title = computed(() =>
    this.conversation().title
  );

  updated = computed(() => {

    const date = new Date(
      this.conversation().updatedAt
    );

    return date.toLocaleString([], {
      dateStyle: 'medium',
      timeStyle: 'short'
    });

  });

}