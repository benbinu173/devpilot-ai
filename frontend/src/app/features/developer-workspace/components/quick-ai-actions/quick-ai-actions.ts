import { Component, inject, signal } from '@angular/core';

import { ChatService } from '../../../ai/services/chat.service';
import { AiEngineService } from '../../../../core/services/ai-engine.service';

import { QUICK_AI_ACTIONS } from '../../data/quick-ai-actions';

@Component({
  selector: 'app-quick-ai-actions',
  standalone: true,
  imports: [],
  templateUrl: './quick-ai-actions.html',
  styleUrl: './quick-ai-actions.css'
})
export class QuickAiActions {

  private chatService = inject(ChatService);

  private aiEngine = inject(AiEngineService);

  actions = QUICK_AI_ACTIONS;

  expanded = signal(true);

  toggle(): void {
    this.expanded.update(value => !value);
  }

  async run(action: typeof QUICK_AI_ACTIONS[number]) {

    this.aiEngine.selectTool(action.mode);

    await this.chatService.addUserMessageStream(action.prompt);

  }

}