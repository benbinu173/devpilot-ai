import {
  Component,
  inject,
  computed,
  signal,
  effect
} from '@angular/core';

import { FormsModule } from '@angular/forms';

import { CodeSnippetService } from '../../services/code-snippet.service';

@Component({
  selector: 'app-snippet-filter',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './snippet-filter.html',
  styleUrl: './snippet-filter.css'
})
export class SnippetFilter {

  private snippetService = inject(
    CodeSnippetService
  );

  readonly language = signal('');

  readonly category = signal('');

  readonly favorite = signal(false);

  readonly activeFilterCount = computed(() => {

    let count = 0;

    if (this.language()) {

        count++;

    }

    if (this.category()) {

        count++;

    }

    if (this.favorite()) {

        count++;

    }

    return count;

});

readonly hasActiveFilters = computed(() =>

    this.activeFilterCount() > 0

);

  constructor() {

    effect(() => {

        this.snippetService.setFilter({

            language: this.language() || undefined,

            category: this.category() || undefined,

            favorite: this.favorite()
                ? true
                : undefined

        });

    });

}

clearFilters(): void {

    this.language.set('');

    this.category.set('');

    this.favorite.set(false);

    this.snippetService.clearFilter();

}

}