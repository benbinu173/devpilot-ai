import {
  Component,
  computed,
  inject
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { CodeSnippetService } from '../../services/code-snippet.service';

@Component({
  selector: 'app-snippet-sidebar',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './snippet-sidebar.html',
  styleUrl: './snippet-sidebar.css'
})
export class SnippetSidebar {

  private snippetService = inject(CodeSnippetService);

  readonly snippets = this.snippetService.snippets;
  readonly filter = this.snippetService.filter;
  readonly total = this.snippetService.total;
  readonly favoriteCount = this.snippetService.favoriteCount;

  readonly languages = computed(() => {
    const languages = this.snippets()
      .map(snippet => snippet.language)
      .filter(Boolean);
    return [...new Set(languages)].sort();
  });

  readonly categories = computed(() => {
    const categories = this.snippets()
      .map(snippet => snippet.category)
      .filter(Boolean);
    return [...new Set(categories)].sort();
  });

  showAll(): void {
    this.snippetService.clearFilter();
  }

  showFavorites(): void {
    this.snippetService.setFilter({ favorite: true });
  }

  showRecent(): void {
    this.snippetService.setFilter({ sort: 'recent' });
  }

  selectLanguage(language: string): void {
    this.snippetService.setFilter({ language });
  }

  selectCategory(category: string): void {
    this.snippetService.setFilter({ category });
  }

  isLanguageSelected(language: string): boolean {
    return this.filter().language === language;
  }

  isCategorySelected(category: string): boolean {
    return this.filter().category === category;
  }

  isFavoritesSelected(): boolean {
    return this.filter().favorite === true;
  }

  isRecentSelected(): boolean {
    return this.filter().sort === 'recent';
  }

  isAllSelected(): boolean {
    const filter = this.filter();
    return !filter.favorite &&
      !filter.language &&
      !filter.category &&
      !filter.sort &&
      !filter.search;
  }

}