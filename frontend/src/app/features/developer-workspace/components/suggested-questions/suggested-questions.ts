import { Component, effect, inject, signal } from '@angular/core';

import { ChatService } from '../../../ai/services/chat.service';
import { AiSuggestion } from '../../../../core/models/ai-suggestion.interface';
import { WorkspaceService } from '../../services/workspace.service';
import { SuggestionService } from '../../../../core/services/suggestion.service';

@Component({
  selector: 'app-suggested-questions',
  standalone: true,
  imports: [],
  templateUrl: './suggested-questions.html',
  styleUrl: './suggested-questions.css'
})
export class SuggestedQuestions {

  private chat = inject(ChatService);
  private suggestionService = inject(SuggestionService);
  private workspace = inject(WorkspaceService);

  questions = signal<AiSuggestion[]>([]);
  loading = signal(false);

  expanded = signal(true);

  toggle(): void {
    this.expanded.update(value => !value);
  }

  async ask(prompt: string) {
    await this.chat.addUserMessageStream(prompt);
  }

  constructor() {

    effect(() => {

      const file = this.workspace.activeFile();

      if (!file) {
        this.questions.set([]);
        this.loading.set(false);
        return;
      }

      this.loading.set(true);

      this.suggestionService.generate(file).subscribe({

        next: response => {
          this.questions.set(response.analysis.suggestions);
          this.loading.set(false);
        },

        error: error => {
          console.error('Unable to generate suggestions.', error);
          this.questions.set([]);
          this.loading.set(false);
        }

      });

    });

  }

}