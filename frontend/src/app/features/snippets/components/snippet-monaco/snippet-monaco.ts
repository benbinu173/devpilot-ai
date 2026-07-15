import {
  AfterViewInit,
  Component,
  ElementRef,
  computed,
  effect,
  inject,
  viewChild
} from '@angular/core';

import * as monaco from 'monaco-editor';

import { CodeSnippetService } from '../../services/code-snippet.service';

@Component({
  selector: 'app-snippet-monaco',
  standalone: true,
  imports: [],
  templateUrl: './snippet-monaco.html',
  styleUrl: './snippet-monaco.css'
})
export class SnippetMonaco implements AfterViewInit {

  private snippetService = inject(CodeSnippetService);

  editorContainer = viewChild<ElementRef>('editor');

  private editor!: monaco.editor.IStandaloneCodeEditor;

  private savedPosition:
    monaco.Position | null = null;

private savedSelection:
    monaco.Selection | null = null;

private savedScrollTop = 0;

private savedScrollLeft = 0;

  readonly snippet = computed(() =>

    this.snippetService.selectedSnippet()

  );

  readonly editing = this.snippetService.isEditing;

 constructor() {

    effect(() => {

        this.snippet();

        this.saveEditorState();

        this.loadSnippet();

        queueMicrotask(() => {

    this.restoreEditorState();

});

         this.editing();

        this.updateReadOnlyState();

        if (this.snippetService.isEditing()) {

    queueMicrotask(() => {

        this.focusEditor();

    });

}
    });

}

  ngAfterViewInit(): void {

    this.createEditor();

  }

  private createEditor(): void {

    const element = this.editorContainer()?.nativeElement;

    if (!element) {

      return;

    }

    

  this.editor = monaco.editor.create(element, {

    value: '',

    language: 'typescript',

    theme: 'vs-dark',

    readOnly: !this.editing(),

    automaticLayout: true,

    minimap: {

        enabled: false

    },

    scrollBeyondLastLine: false,

    wordWrap: 'on',

    lineNumbers: 'on',

    folding: true,

    renderWhitespace: 'selection',

    fontSize: 14,

    tabSize: 2

});




this.editor.onDidChangeModelContent(() => {

    if (!this.editing()) {

        return;

    }

    this.snippetService.updateEditingCode(

        this.editor.getValue()

    );

});

this.registerShortcuts();

this.loadSnippet();

    this.loadSnippet();

  }

  private getLanguage(language: string): string {

  switch (language.toLowerCase()) {

    case 'typescript':
      return 'typescript';

    case 'javascript':
      return 'javascript';

    case 'html':
      return 'html';

    case 'css':
      return 'css';

    case 'scss':
      return 'scss';

    case 'json':
      return 'json';

    case 'markdown':
      return 'markdown';

    case 'java':
      return 'java';

    case 'python':
      return 'python';

    case 'xml':
      return 'xml';

    case 'sql':
      return 'sql';

    case 'yaml':
      return 'yaml';

    case 'shell':
      return 'shell';

    case 'kotlin':
      return 'kotlin';

    case 'cpp':
      return 'cpp';

    default:
      return 'plaintext';

  }

}

  private loadSnippet(): void {

    if (!this.editor) {

      return;

    }

    const snippet =

    this.editing()

        ? this.snippetService.editingSnippet()

        : this.snippet();

    const model = this.editor.getModel();

    if (!model) {

      return;

    }

    if (!snippet) {

   model.setValue('');

this.editor.updateOptions({

    readOnly: true

});

return;

    }

    if (model.getValue() !== snippet.code) {

      model.setValue(

        snippet.code

      );

    }

    const language = this.getLanguage(
    snippet.language
);

if (model.getLanguageId() !== language) {

    monaco.editor.setModelLanguage(
        model,
        language
    );

}

  }

  private updateReadOnlyState(): void {

    if (!this.editor) {

        return;

    }

    this.editor.updateOptions({

        readOnly: !this.editing()

    });

}


private registerShortcuts(): void {

    if (!this.editor) {

        return;

    }

    // Ctrl + S
    this.editor.addCommand(

        monaco.KeyMod.CtrlCmd |
        monaco.KeyCode.KeyS,

        () => {

            if (!this.snippetService.isEditing()) {

                return;

            }

            this.snippetService.saveEditing();

        }

    );

    // Escape
    this.editor.addCommand(

        monaco.KeyCode.Escape,

        () => {

            if (!this.snippetService.isEditing()) {

                return;

            }

            this.snippetService.cancelEditing();

        }

    );

}

private focusEditor(): void {

    if (!this.editor) {

        return;

    }

    this.editor.focus();

    const model = this.editor.getModel();

    if (!model) {

        return;

    }

    const lastLine = model.getLineCount();

    const lastColumn = model.getLineMaxColumn(lastLine);

    this.editor.setPosition({

        lineNumber: lastLine,

        column: lastColumn

    });

    this.editor.revealPositionInCenter({

        lineNumber: lastLine,

        column: lastColumn

    });

}

private saveEditorState(): void {

    if (!this.editor) {

        return;

    }

    this.savedPosition =

        this.editor.getPosition();

    this.savedSelection =

        this.editor.getSelection();

    this.savedScrollTop =

        this.editor.getScrollTop();

    this.savedScrollLeft =

        this.editor.getScrollLeft();

}


private restoreEditorState(): void {

    if (!this.editor) {

        return;

    }

    if (this.savedPosition) {

        this.editor.setPosition(

            this.savedPosition

        );

    }

    if (this.savedSelection) {

        this.editor.setSelection(

            this.savedSelection

        );

    }

    this.editor.setScrollTop(

        this.savedScrollTop

    );

    this.editor.setScrollLeft(

        this.savedScrollLeft

    );

}
}