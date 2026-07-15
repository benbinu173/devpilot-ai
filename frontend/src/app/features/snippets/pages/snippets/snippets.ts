import { Component, signal } from '@angular/core';
import { SnippetSearch } from '../../components/snippet-search/snippet-search';
import { SnippetSidebar } from '../../components/snippet-sidebar/snippet-sidebar';
import { SnippetPreview } from '../../components/snippet-preview/snippet-preview';
import { SnippetList } from '../../components/snippet-list/snippet-list';
import { SnippetFilter } from '../../components/snippet-filter/snippet-filter';

type SnippetsPanel = 'sidebar' | 'list' | 'preview';

@Component({
  selector: 'app-snippets-page',
  standalone: true,
  imports: [
    SnippetSidebar,
    SnippetSearch,
    SnippetList,
    SnippetPreview,
    SnippetFilter
  ],
  templateUrl: './snippets.html',
  styleUrl: './snippets.css'
})
export class SnippetsPage {

  activePanel = signal<SnippetsPanel>('list');

  setPanel(panel: SnippetsPanel): void {
    this.activePanel.set(panel);
  }

}