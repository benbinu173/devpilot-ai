import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';


import { Conversation } from '../models/conversation.interface';
import { CreateConversationResponse } from '../models/create-conversation-response.interface';
import { GetConversationsResponse } from '../models/get-conversations-response.interface';
import { environment } from '../../environments/environment';
import { AiContext } from '../models/ai-context.interface';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  private http = inject(HttpClient);

  private api = `${environment.apiUrl}/conversations`;

  createConversation(): Observable<CreateConversationResponse> {

    return this.http.post<CreateConversationResponse>(
      this.api,
      {}
    );

  }

  getConversations(): Observable<GetConversationsResponse> {

    return this.http.get<GetConversationsResponse>(
      this.api
    );

  }

  getConversation(id: string): Observable<{

    success: boolean;

    conversation: Conversation;

  }> {

    return this.http.get<{

      success: boolean;

      conversation: Conversation;

    }>(`${this.api}/${id}`);

  }


  sendMessage(
  conversationId: string,
  content: string,
  mode: string = 'general',
  context:AiContext
) {

 return this.http.post<{

  success: boolean;

  conversation: Conversation;

}>(

  `${this.api}/${conversationId}/messages`,

  {

    content,

    mode,

    context

  }

);

}

async streamMessage(

  conversationId: string,

  prompt: string,

  mode: string = 'general',

  context: any,

  onToken: (token: string) => void

): Promise<void> {

  const token = localStorage.getItem('devpilot_token');

  const response = await fetch(

    `${this.api}/${conversationId}/messages/stream`,

    {

      method: 'POST',

      headers: {

        'Content-Type': 'application/json',

        Authorization: `Bearer ${token}`

      },

      body: JSON.stringify({

  prompt,

  mode,

  context

})

    }

  );

  if (!response.body) {

    throw new Error('Streaming not supported.');

  }

  const reader = response.body.getReader();

  const decoder = new TextDecoder();

  let buffer = '';

  while (true) {

    const { done, value } = await reader.read();

    if (done) {

      break;

    }

    buffer += decoder.decode(value, {

      stream: true

    });

    const events = buffer.split('\n\n');

    buffer = events.pop() ?? '';

    for (const event of events) {

      if (!event.startsWith('data:')) {

        continue;

      }

      const json = JSON.parse(

        event.replace('data:', '').trim()

      );

      if (json.token) {

        onToken(json.token);

      }

    }

  }

}

deleteConversation(id: string) {

  return this.http.delete<{

    success: boolean;

    message: string;

  }>(

    `${this.api}/${id}`

  );

}

}