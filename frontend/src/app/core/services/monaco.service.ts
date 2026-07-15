import { Injectable, inject } from '@angular/core';

import * as monaco from 'monaco-editor';

import { WorkspaceService } from '../../features/developer-workspace/services/workspace.service';
import { CodeSnippetService } from '../../features/snippets/services/code-snippet.service';

@Injectable({
  providedIn: 'root'
})
export class MonacoService {

  private workspace = inject(WorkspaceService);

  private snippetService = inject(
    CodeSnippetService
);

  private editor: monaco.editor.IStandaloneCodeEditor | null = null;

  setEditor(editor: monaco.editor.IStandaloneCodeEditor): void {

    this.editor = editor;

    this.registerEvents();

  }

  getEditor() {

    return this.editor;

  }

  private registerEvents(): void {

    if (!this.editor) {

      return;

    }

    this.editor.onDidChangeCursorPosition(event => {

      this.workspace.setCursor(

        event.position.lineNumber,

        event.position.column

      );

    });

    this.editor.onDidChangeCursorSelection(() => {

      const selection = this.editor!.getSelection();

      const model = this.editor!.getModel();

      if (!selection || !model) {

        return;

      }

      this.workspace.setSelectedCode(

        model.getValueInRange(selection)

      );

     this.workspace.setSelection(

    selection.startLineNumber,

    selection.startColumn,

    selection.endLineNumber,

    selection.endColumn

);


      const position = this.editor?.getScrolledVisiblePosition(

    selection.getEndPosition()

);

const editorDom = this.editor?.getDomNode();

if (!editorDom || !position) {

    this.workspace.hideToolbar();

    return;

}

const editorRect = editorDom.getBoundingClientRect();

const left =
    editorRect.left +
    window.scrollX +
    position.left;

const top =
    editorRect.top +
    window.scrollY +
    position.top -
    position.height -
    12;

this.workspace.setToolbarPosition(
    left,
    top
);

const selectedText = model.getValueInRange(selection);

this.workspace.setSelectedCode(selectedText);

this.workspace.setSelection(

    selection.startLineNumber,

    selection.startColumn,

    selection.endLineNumber,

    selection.endColumn

);

if (selectedText.trim()) {

    this.workspace.showToolbar();

}
else {

    this.workspace.hideToolbar();

}

if (

    model.getValueInRange(selection).trim()

) {

    this.workspace.showToolbar();

}
else {

    this.workspace.hideToolbar();

}


    });
    
    

    

  }

}