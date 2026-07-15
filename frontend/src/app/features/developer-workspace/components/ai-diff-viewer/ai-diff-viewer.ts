import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  computed,
  effect,
  inject,
  viewChild
} from '@angular/core';

import * as monaco from 'monaco-editor';

import { AiPatchService } from '../../../../core/services/ai-patch.service';
import { MonacoDiffService } from '../../../../core/services/monaco-diff.service';
import { MonacoService } from '../../../../core/services/monaco.service';
import { AiHistoryService } from '../../../../core/services/ai-history.service';
import { WorkspaceService } from '../../services/workspace.service';

@Component({
  selector: 'app-ai-diff-viewer',
  standalone: true,
  imports: [],
  templateUrl: './ai-diff-viewer.html',
  styleUrl: './ai-diff-viewer.css'
})
export class AiDiffViewer implements AfterViewInit, OnDestroy {

  private patchService = inject(AiPatchService);

  private diffService = inject(MonacoDiffService);

  private monacoService = inject(MonacoService);
  

  private history = inject(AiHistoryService);

 workspace = inject(WorkspaceService);

  diffContainer = viewChild<ElementRef>('diffContainer');

  patch = computed(() => this.patchService.currentPatch());

  constructor() {

    effect(() => {

      const patch = this.patch();

      const container = this.diffContainer()?.nativeElement;

      if (!patch || !container) {

        return;

      }

      this.diffService.create(

        container,

        patch.language,

        patch.originalCode,

        patch.updatedCode

      );

    });

  }

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {

    this.diffService.dispose();

  }

  reject(): void {

    this.patchService.clear();

  }

 accept(): void {

    const patch = this.patch();

    const editor = this.monacoService.getEditor();

    if (!patch || !editor) {

        return;

    }

    const file = this.workspace.activeFile();
    const previousCode = patch.originalCode;

    if (file) {

       this.history.add({

    id: crypto.randomUUID(),

    createdAt: new Date().toISOString(),

    fileId: file.id,

    fileName: file.name,

    patch,

    previousCode

});

    }

    const range = new monaco.Range(

        patch.startLine,

        patch.startColumn,

        patch.endLine,

        patch.endColumn

    );

    editor.executeEdits(

        'ai-patch',

        [

            {

                range,

                text: patch.updatedCode

            }

        ]

    );

    editor.setPosition({

        lineNumber: patch.startLine,

        column: patch.startColumn

    });

    editor.focus();

    this.patchService.clear();

}

    undoLast(): void {

    const last = this.history.undoLast();

    if (!last) {

        return;

    }

    const editor = this.monacoService.getEditor();

    if (!editor) {

        return;

    }

    const range = new monaco.Range(

        last.patch.startLine,

        last.patch.startColumn,

        last.patch.endLine,

        last.patch.endColumn

    );

    editor.executeEdits(

        'undo-ai',

        [

            {

                range,

                text: last.previousCode

            }

        ]

    );

}

}