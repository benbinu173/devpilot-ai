import { Component, input } from '@angular/core';
import { MarkdownRenderer } from '../../../../shared/components/markdown-renderer/markdown-renderer';
import { ResponseActions } from '../response-actions/response-actions';

@Component({
  selector: 'app-chat-message',
  standalone: true,
  imports: [MarkdownRenderer , ResponseActions],
  templateUrl: './chat-message.html',
  styleUrl: './chat-message.css'
})
export class ChatMessage {

  sender = input<'user' | 'assistant'>('assistant');

  content = input('');

  code = input('');

  timestamp = input('');

  async copyMessage(): Promise<void> {

  try {

    await navigator.clipboard.writeText(

      this.content()

    );

  }

  catch (error) {

    console.error(

      'Unable to copy response.',

      error

    );

  }

}

saveSnippet(): void {

  console.log('Save');

}

regenerate(): void {

  console.log('Regenerate');

}

likeResponse(): void {

  console.log('Helpful');

}

dislikeResponse(): void {

  console.log('Not Helpful');

}

}