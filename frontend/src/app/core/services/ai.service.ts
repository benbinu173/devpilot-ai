import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

import { AiResponse } from '../models/ai-response.interface';
import { ChatApiMessage } from '../models/chat-message.interface';
import { ChatRequest } from '../models/chat-request.interface';

import { AIAction } from '../models/ai/ai-action.type';

import { AIContextBuilderService } from './ai-context-builder.service';
import { AIPromptGeneratorService } from './ai-prompt-generator.service';

@Injectable({
  providedIn: 'root'
})
export class AiService {

  private http = inject(HttpClient);

  private contextBuilder = inject(
    AIContextBuilderService
  );

  private promptGenerator = inject(
    AIPromptGeneratorService
  );

  private api = `${environment.apiUrl}/ai/chat`;

  // =====================================================
  // Existing Chat API
  // =====================================================

  sendMessage(

    messages: ChatApiMessage[],

    mode: string = 'general'

  ): Observable<AiResponse> {

    const request: ChatRequest = {

      messages,

      mode

    };

    return this.http.post<AiResponse>(

      this.api,

      request

    );

  }

  // =====================================================
  // Workspace AI Pipeline
  // =====================================================

  executeAction(

    action: AIAction,

    userPrompt: string

  ): Observable<AiResponse> {

    const payload = this.contextBuilder.buildContext(

      action,

      userPrompt

    );

    const prompt = this.promptGenerator.buildPrompt(

      payload

    );

    const request: ChatRequest = {

      mode: action,

      messages: [

        {

          role: 'user',

          content: prompt

        }

      ]

    };

    return this.http.post<AiResponse>(

      this.api,

      request

    );

  }

}