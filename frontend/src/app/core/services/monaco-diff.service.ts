import { Injectable } from '@angular/core';

import * as monaco from 'monaco-editor';

@Injectable({
  providedIn: 'root'
})
export class MonacoDiffService {

  private diffEditor: monaco.editor.IStandaloneDiffEditor | null = null;

  create(

    container: HTMLElement,

    language: string,

    original: string,

    modified: string

  ): void {

    this.dispose();

    this.diffEditor = monaco.editor.createDiffEditor(

      container,

      {

        theme: 'vs-dark',

        automaticLayout: true,

        readOnly: true,

        renderSideBySide: true,

        minimap: {

          enabled: false

        }

      }

    );

    const originalModel = monaco.editor.createModel(

      original,

      language

    );

    const modifiedModel = monaco.editor.createModel(

      modified,

      language

    );

    this.diffEditor.setModel({

      original: originalModel,

      modified: modifiedModel

    });

  }

  dispose(): void {

    if (!this.diffEditor) {

      return;

    }

    const model = this.diffEditor.getModel();

    model?.original.dispose();

    model?.modified.dispose();

    this.diffEditor.dispose();

    this.diffEditor = null;

  }

}