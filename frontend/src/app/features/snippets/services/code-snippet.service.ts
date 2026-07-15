import {
  Injectable,
  computed,
  inject,
  signal
} from '@angular/core';

import { finalize } from 'rxjs/operators';

import { CodeSnippetApiService } from './code-snippet-api.service';
import { CodeSnippet } from '../../../core/models/snippets/code-snippet.interface';
import { SnippetFilter } from '../../../core/models/snippets/snippet-filter.interface';
import { UpdateCodeSnippet } from '../../../core/models/snippets/update-code-snippet.interface';
import { CreateCodeSnippet } from '../../../core/models/snippets/create-code-snippet.interface';



@Injectable({
  providedIn: 'root'
})
export class CodeSnippetService {

  private api = inject(CodeSnippetApiService);

  // ============================================================
  // State
  // ============================================================

  readonly snippets = signal<CodeSnippet[]>([]);

  readonly selectedSnippet = signal<CodeSnippet | null>(null);

  readonly editingSnippet = signal<CodeSnippet | null>(null);

  readonly loading = signal(false);

  readonly editing = signal(false);

  readonly filter = signal<SnippetFilter>({});

readonly hasUnsavedChanges = computed(() => {

    const selected = this.selectedSnippet();

    const editing = this.editingSnippet();

    if (!selected || !editing) {

        return false;

    }

    return (

        selected.title !== editing.title ||

        selected.description !== editing.description ||

        selected.language !== editing.language ||

        selected.category !== editing.category ||

        selected.source !== editing.source ||

        selected.code !== editing.code ||

        JSON.stringify(selected.tags) !==

        JSON.stringify(editing.tags)

    );

});

  readonly hasActiveFilters = computed(() => {

    const filter = this.filter();

    return Boolean(

        filter.search ||

        filter.language ||

        filter.category ||

        filter.favorite ||

        filter.sort ||

        filter.tags?.length

    );

});

  // ============================================================
  // Computed
  // ============================================================

  readonly total = computed(() =>

    this.snippets().length

  );

  readonly isEditing = computed(() =>

    this.editing()

);

  readonly favoriteCount = computed(() =>

    this.snippets().filter(

      snippet => snippet.isFavorite

    ).length

  );

  readonly hasSelection = computed(() =>

    this.selectedSnippet() !== null

  );

  constructor() {

    this.load();

  }

  // ============================================================
  // Load
  // ============================================================

  load(): void {

    this.loading.set(true);

    this.api
      .getSnippets(this.filter())
      .pipe(
        finalize(() => this.loading.set(false))
      )
      .subscribe({

        next: response => {

          this.snippets.set(

            response.snippets

          );

        },

        error: error => {

          console.error(

            'Unable to load snippets.',

            error

          );

        }

      });

  }

  refresh(): void {

    this.load();

  }

  // ============================================================
  // Selection
  // ============================================================

select(snippet: CodeSnippet): void {

    this.selectedSnippet.set(snippet);

    this.editingSnippet.set(

        structuredClone(snippet)

    );

}
  clearSelection(): void {

    this.selectedSnippet.set(null);

    this.editingSnippet.set(null);

  }

  // ============================================================
  // Filters
  // ============================================================

  setFilter(

    partial: Partial<SnippetFilter>

  ): void {

    this.filter.update(current => ({

      ...current,

      ...partial

    }));

    this.refresh();

  }

  clearFilter(): void {

    this.filter.set({});

    this.refresh();

  }

  // ============================================================
  // Create
  // ============================================================

  create(

    snippet: CreateCodeSnippet

  ): void {

    this.loading.set(true);

    this.api
      .createSnippet(snippet)
      .pipe(
        finalize(() => this.loading.set(false))
      )
      .subscribe({

        next: () => {

          this.refresh();

        },

        error: error => {

          console.error(

            'Unable to create snippet.',

            error

          );

        }

      });

  }

  // ============================================================
  // Update
  // ============================================================

  update(

    id: string,

    updates: UpdateCodeSnippet

  ): void {

    this.loading.set(true);

    this.api
      .updateSnippet(

        id,

        updates

      )
      .pipe(
        finalize(() => this.loading.set(false))
      )
      .subscribe({

        next: response => {

          this.selectedSnippet.set(

            response.snippet

          );

          this.editingSnippet.set(

            structuredClone(

              response.snippet

            )

          );

          this.refresh();

        },

        error: error => {

          console.error(

            'Unable to update snippet.',

            error

          );

        }

      });

  }

  // ============================================================
  // Delete
  // ============================================================

  delete(

    id: string

  ): void {

    this.loading.set(true);

    this.api
      .deleteSnippet(id)
      .pipe(
        finalize(() => this.loading.set(false))
      )
      .subscribe({

        next: () => {

          this.clearSelection();

          this.refresh();

        },

        error: error => {

          console.error(

            'Unable to delete snippet.',

            error

          );

        }

      });

  }

  // ============================================================
  // Favorite
  // ============================================================

  toggleFavorite(

    id: string

  ): void {

    this.api
      .toggleFavorite(id)
      .subscribe({

        next: response => {

          if (

            this.selectedSnippet()?.id === id

          ) {

            this.selectedSnippet.set(

              response.snippet

            );

            this.editingSnippet.set(

              structuredClone(

                response.snippet

              )

            );

          }

          this.refresh();

        },

        error: error => {

          console.error(

            'Unable to update favorite.',

            error

          );

        }

      });

  }

  // ============================================================
  // Usage
  // ============================================================

  incrementUsage(

    id: string

  ): void {

    this.api
      .incrementUsage(id)
      .subscribe({

        next: () => {

          this.refresh();

        },

        error: error => {

          console.error(

            'Unable to update usage.',

            error

          );

        }

      });

  }

  startEditing(): void {

    this.editing.set(true);

}

stopEditing(): void {

    this.editing.set(false);

}

updateEditingCode(code: string): void {

    this.editingSnippet.update(snippet => {

        if (!snippet) {

            return null;

        }

        return {

            ...snippet,

            code

        };

    });

}

saveEditing(): void {

  const snippet = this.editingSnippet();

  if (!snippet) {

    return;

  }

  this.loading.set(true);

  this.api.updateSnippet(

      snippet.id,

      {

          title: snippet.title,

          description: snippet.description,

          language: snippet.language,

          category: snippet.category,

          source: snippet.source,   

          tags: snippet.tags,

          code: snippet.code

      }

  )
  .pipe(

      finalize(() => {

          this.loading.set(false);

      })

  )
  .subscribe({

      next: response => {

          this.selectedSnippet.set(

              response.snippet

          );

          this.editingSnippet.set(

              structuredClone(

                  response.snippet

              )

          );

          this.stopEditing();

          this.refresh();

      },

      error: error => {

          console.error(

              'Unable to save snippet.',

              error

          );

      }

  });

}

cancelEditing(): void {

    const snippet = this.selectedSnippet();

    if (!snippet) {

        return;

    }

    this.editingSnippet.set(

        structuredClone(snippet)

    );

    this.stopEditing();

}

}