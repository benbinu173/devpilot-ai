import {
  Component,
  computed,
  inject
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { CodeSnippetService } from '../../services/code-snippet.service';
import { CodeSnippet } from '../../../../core/models/snippets/code-snippet.interface';


@Component({
  selector: 'app-snippet-list',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './snippet-list.html',
  styleUrl: './snippet-list.css'
})
export class SnippetList {

  private snippetService = inject(CodeSnippetService);

  readonly snippets = this.snippetService.snippets;

  readonly loading = this.snippetService.loading;

  readonly selectedSnippet = this.snippetService.selectedSnippet;

  readonly total = this.snippetService.total;

  readonly isEmpty = computed(() =>

    !this.loading() &&

    this.snippets().length === 0

  );

  readonly hasSearch = computed(() =>

    !!this.snippetService.filter().search

);

readonly hasFilters = computed(() => {

    const filter = this.snippetService.filter();

    return Boolean(

        filter.language ||

        filter.category ||

        filter.favorite ||

        filter.tags?.length

    );

});

  select(snippet: CodeSnippet): void {

    this.snippetService.select(

      snippet

    );

  }

  isSelected(snippet: CodeSnippet): boolean {

    return this.selectedSnippet()?.id === snippet.id;

  }

}