import {
  Component,
  computed,
  effect,
  inject,
  viewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core';

import * as monaco from 'monaco-editor';

import { WorkspaceService } from '../../services/workspace.service';
import { MonacoService } from '../../../../core/services/monaco.service';

@Component({
  selector: 'app-monaco-editor',
  standalone: true,
  imports: [],
  templateUrl: './monaco-editor.html',
  styleUrl: './monaco-editor.css'
})
export class MonacoEditor implements AfterViewInit {

  private workspace = inject(WorkspaceService);
  private monacoService = inject(MonacoService);

  editorContainer = viewChild<ElementRef>('editor');

  private editor!: monaco.editor.IStandaloneCodeEditor;

  activeFile = computed(() => this.workspace.activeFile());

  constructor() {
    effect(() => {
      this.activeFile();
      this.loadFileIntoEditor();
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
      readOnly: false,
      automaticLayout: true,
      minimap: {
        enabled: true
      }
    });

    this.loadFileIntoEditor();

    this.editor.onDidChangeCursorPosition(event => {
      this.workspace.setCursor(
        event.position.lineNumber,
        event.position.column
      );
    });

    this.editor.onDidChangeCursorSelection(() => {

      const selection = this.editor.getSelection();
      const model = this.editor.getModel();

      if (!selection || !model) {
        return;
      }

      const selectedText = model.getValueInRange(selection);
      this.workspace.setSelectedCode(selectedText);

      this.workspace.setSelection(
        selection.startLineNumber,
        selection.startColumn,
        selection.endLineNumber,
        selection.endColumn
      );

    });

    this.editor.onDidChangeModelContent(() => {

      const file = this.workspace.activeFile();

      if (!file) {
        return;
      }

      const value = this.editor.getValue();

      if (value === file.content) {
        return;
      }

      this.workspace.updateFileContent(file.id, value);

    });

    this.editor.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS,
      () => {
        const file = this.workspace.activeFile();
        if (!file) {
          return;
        }
        this.workspace.saveFile(file.id);
        console.log('Saved:', file.name);
      }
    );

    this.monacoService.setEditor(this.editor);

  }

  private getLanguage(filename: string): string {

    const extension = filename.split('.').pop()?.toLowerCase();

    switch (extension) {
      case 'ts': return 'typescript';
      case 'js': return 'javascript';
      case 'html': return 'html';
      case 'css': return 'css';
      case 'scss': return 'scss';
      case 'json': return 'json';
      case 'md': return 'markdown';
      case 'java': return 'java';
      case 'py': return 'python';
      case 'xml': return 'xml';
      case 'sql': return 'sql';
      case 'yml':
      case 'yaml': return 'yaml';
      case 'sh': return 'shell';
      default: return 'plaintext';
    }

  }

  private loadFileIntoEditor(): void {

    if (!this.editor) {
      return;
    }

    const model = this.editor.getModel();

    if (!model) {
      return;
    }

    const file = this.workspace.activeFile();

    if (!file) {
      model.setValue('');
      return;
    }

    this.editor.updateOptions({ readOnly: false });

    if (model.getValue() !== file.content) {
      model.setValue(file.content);
    }

    const language = this.getLanguage(file.name);

    if (model.getLanguageId() !== language) {
      monaco.editor.setModelLanguage(model, language);
    }

  }

}