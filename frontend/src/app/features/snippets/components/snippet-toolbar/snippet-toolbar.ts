import {
  Component,
  computed,
  inject
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { CodeSnippetService } from '../../services/code-snippet.service';
import { ClipboardService } from '../../../../core/services/clipboard.service';
import { WorkspaceService } from '../../../developer-workspace/services/workspace.service';

@Component({
  selector: 'app-snippet-toolbar',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './snippet-toolbar.html',
  styleUrl: './snippet-toolbar.css'
})
export class SnippetToolbar {

  private snippetService = inject(CodeSnippetService);

  private clipboard = inject(
  ClipboardService
);

private workspace = inject(
    WorkspaceService
);

  readonly snippet = this.snippetService.selectedSnippet;

  readonly hasUnsavedChanges =
    this.snippetService.hasUnsavedChanges;

  readonly hasSelection = computed(() =>

    this.snippet() !== null

  );

  readonly editing = this.snippetService.isEditing;

async copy(): Promise<void> {

  const snippet = this.snippet();

  if (!snippet) {

    return;

  }

  const copied = await this.clipboard.copy(

    snippet.code

  );

  if (!copied) {

    console.error(

      'Unable to copy snippet.'

    );

  }

}

save(): void {

    this.snippetService.saveEditing();

}

cancel(): void {

    this.snippetService.cancelEditing();

}

insertIntoWorkspace(): void {

    const snippet = this.snippet();

    if (!snippet) {

        return;

    }

    this.workspace.insertSnippet(

        snippet.code

    );

}

edit(): void {

  const snippet = this.snippet();

  if (!snippet) {

    return;

  }

  this.snippetService.startEditing();

}

  favorite(): void {

    const snippet = this.snippet();

    if (!snippet) {

      return;

    }

    this.snippetService.toggleFavorite(

      snippet.id

    );

  }

  delete(): void {

    const snippet = this.snippet();

    if (!snippet) {

      return;

    }

    const confirmed = window.confirm(

      `Delete "${snippet.title}"?`

    );

    if (!confirmed) {

      return;

    }

    this.snippetService.delete(

      snippet.id

    );

  }

}