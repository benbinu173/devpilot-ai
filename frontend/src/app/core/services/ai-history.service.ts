import {
  Injectable,
  inject,
  signal
} from '@angular/core';

import { AiHistory } from '../models/ai-history.interface';
import { AiHistoryApiService } from './ai-history-api.service';

@Injectable({
  providedIn: 'root'
})
export class AiHistoryService {

  private api = inject(AiHistoryApiService);

  readonly history = signal<AiHistory[]>([]);

  // ==========================================
  // Load History
  // ==========================================

  loadHistory(): void {

    this.api.getHistory().subscribe({

      next: (response) => {

        this.history.set(response.history);

      },

      error: (error) => {

        console.error(

          'Unable to load AI history.',

          error

        );

      }

    });

  }

  // ==========================================
  // Add History
  // ==========================================

  add(item: AiHistory): void {

    // Update UI immediately

    this.history.update(items => [

      item,

      ...items

    ]);

    // Persist to MongoDB

    this.api.saveHistory(item).subscribe({

      next: () => {

        // Successfully saved

      },

      error: (error) => {

        console.error(

          'Unable to save AI history.',

          error

        );

      }

    });

  }

  // ==========================================
  // Clear History
  // ==========================================

  clear(): void {

    this.history.set([]);

  }

  // ==========================================
  // Get History Item
  // ==========================================

  getById(id: string): AiHistory | undefined {

    return this.history().find(

      item => item.id === id

    );

  }

  // ==========================================
  // Undo Last AI Edit
  // ==========================================

  undoLast(): AiHistory | null {

    const items = this.history();

    if (!items.length) {

      return null;

    }

    const [last, ...remaining] = items;

    this.history.set(remaining);

    return last;

  }

}