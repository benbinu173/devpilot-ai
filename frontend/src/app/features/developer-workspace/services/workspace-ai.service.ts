import {
  Injectable,
  inject,
  signal,
  computed
} from '@angular/core';

import { finalize } from 'rxjs/operators';

import { AiService } from '../../../core/services/ai.service';

import { AIAction } from '../../../core/models/ai/ai-action.type';
import { AIRequestStatus } from '../../../core/models/ai/ai-request-status.type';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceAIService {

  private aiService = inject(AiService);

  // ==========================================================
  // State
  // ==========================================================

 readonly status = signal<AIRequestStatus>('idle');

readonly loading = computed(() =>
  this.status() === 'loading'
);

readonly completed = computed(() =>
  this.status() === 'success'
);

readonly hasError = computed(() =>
  this.status() === 'error'
);

  readonly response = signal<string>('');

  readonly error = signal<string | null>(null);

  readonly activeAction = signal<AIAction | null>(null);


  // ==========================================================
// Retry State
// ==========================================================

private lastAction: AIAction | null = null;

private lastPrompt: string | null = null;

  // ==========================================================
  // Execute AI Action
  // ==========================================================

  execute(

    action: AIAction,

    prompt: string

  ): void {

   this.status.set('loading');

    this.error.set(null);

    this.activeAction.set(action);

    this.lastAction = action;

this.lastPrompt = prompt;

    this.aiService

      .executeAction(

        action,

        prompt

      )

      .pipe(

       finalize(() => {

    if (this.status() === 'loading') {

        this.status.set('idle');

    }

})

      )

    .subscribe({

next: response => {

    this.response.set(

        response.response

    );

    this.error.set(null);

    this.status.set('success');

},

 error: error => {

    console.error(error);

    this.error.set(

        'Unable to complete AI request.'

    );

    this.status.set('error');

}

});

  }

  // ==========================================================
  // Convenience Methods
  // ==========================================================

  explain(): void {

    this.execute(

      'explain',

      'Explain the selected code.'

    );

  }

  refactor(): void {

    this.execute(

      'refactor',

      'Refactor the selected code while preserving functionality.'

    );

  }

  fix(): void {

    this.execute(

      'fix',

      'Identify and fix any bugs in the selected code.'

    );

  }

  optimize(): void {

    this.execute(

      'optimize',

      'Optimize the selected code for readability and performance.'

    );

  }

  generateTests(): void {

    this.execute(

      'test',

      'Generate comprehensive unit tests.'

    );

  }

  document(): void {

    this.execute(

      'document',

      'Generate professional documentation for the selected code.'

    );

  }

  chat(

    prompt: string

  ): void {

    this.execute(

      'chat',

      prompt

    );

  }


  // ==========================================================
// Retry
// ==========================================================

retry(): void {

    if (this.loading()) {

        return;

    }

    if (

        !this.lastAction ||

        !this.lastPrompt

    ) {

        return;

    }

    this.execute(

        this.lastAction,

        this.lastPrompt

    );

}
  // ==========================================================
  // Helpers
  // ==========================================================

clearResponse(): void {

    this.response.set('');

    if (this.status() === 'success') {

        this.status.set('idle');

    }

}

 clearError(): void {

    this.error.set(null);

    this.status.set('idle');

}

}