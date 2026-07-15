import {
  Component,
  computed,
  inject
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { CodeSnippetService } from '../../services/code-snippet.service';
import { SnippetToolbar } from '../snippet-toolbar/snippet-toolbar';
import { SnippetMonaco } from '../snippet-monaco/snippet-monaco';

@Component({
  selector: 'app-snippet-preview',
  standalone: true,
  imports: [
    CommonModule,
    SnippetToolbar,
    SnippetMonaco
  ],
  templateUrl: './snippet-preview.html',
  styleUrl: './snippet-preview.css'
})
export class SnippetPreview {

  private snippetService = inject(CodeSnippetService);

  readonly snippet = this.snippetService.selectedSnippet;
  readonly loading = this.snippetService.loading;

  readonly hasSelection = computed(() => this.snippet() !== null);

  readonly tags = computed(() => this.snippet()?.tags ?? []);

  readonly hasTags = computed(() => this.tags().length > 0);

}