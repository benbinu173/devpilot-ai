import { inject, Injectable, signal } from '@angular/core';
import { WorkspaceFile } from '../interfaces/workspace-file.interface';
import { WorkspaceFileService } from '../../../core/services/workspace-file.service';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {


  private workspaceFileService = inject(WorkspaceFileService);

  // -----------------------------
  // Files
  // -----------------------------

  files = signal<WorkspaceFile[]>([]);

  openedFiles = signal<WorkspaceFile[]>([]);

  selectedFiles = signal<WorkspaceFile[]>([]);

  selectedFile = signal<WorkspaceFile | null>(null);

  activeFile = signal<WorkspaceFile | null>(null);

  selectionStartColumn = signal(0);

selectionEndColumn = signal(0);

private workspaceVersion = signal(0);

readonly version = this.workspaceVersion.asReadonly();

  // -----------------------------
  // Editor State
  // -----------------------------

  selectedCode = signal('');

  selectionStartLine = signal(0);

  selectionEndLine = signal(0);

  cursorLine = signal(0);

  cursorColumn = signal(0);

  // -----------------------------
  // Floating Toolbar
  // -----------------------------

  toolbarX = signal(0);

  toolbarY = signal(0);

  showFloatingToolbar = signal(false);

  aiBusy = signal(false);

  startAiOperation(): void {

    this.aiBusy.set(true);

}

finishAiOperation(): void {

    this.aiBusy.set(false);

}

private bumpWorkspaceVersion(): void {

  this.workspaceVersion.update(version => version + 1);

}

  // -----------------------------
// Save Status
// -----------------------------

saveStatus = signal<
  'idle' |
  'dirty' |
  'saving' |
  'saved' |
  'error'
>('idle');

saveAllFiles(): void {

    this.files()

        .filter(file => file.isDirty)

        .forEach(file => {

            this.saveFile(file.id);

        });

}

  // ======================================================
  // File Management
  // ======================================================

addFile(file: WorkspaceFile): void {

  const exists = this.files().some(

    current => current.id === file.id

  );

  if (exists) {

    return;

  }

  const workspaceFile: WorkspaceFile = {

    ...file,

    lastSavedContent:

      file.lastSavedContent ?? file.content,

    isDirty:

      file.isDirty ?? false,

    isActive: false,

    isSelected: false,

    aiModified:

      file.aiModified ?? false

  };

  this.files.update(files => [

    workspaceFile,

    ...files

  ]);

  this.bumpWorkspaceVersion();

}

  selectFile(file: WorkspaceFile): void {

    this.selectedFile.set(file);

  }

  openFile(file: WorkspaceFile): void {

    const exists = this.openedFiles().some(

      current => current.id === file.id

    );

    if (!exists) {

      this.openedFiles.update(files => [

        ...files,

        file

      ]);

    }

    const current = this.files().find(

  current => current.id === file.id

);

if (current) {

  this.activeFile.set(current);

}

  }

 closeFile(id: string): void {

  const file = this.openedFiles().find(

    current => current.id === id

  );

  if (!file) {

    return;

  }

  if (file.isDirty) {

    const discard = confirm(

      `"${file.name}" has unsaved changes.\n\nDiscard them?`

    );

    if (!discard) {

      return;

    }

  }

  const currentTabs = this.openedFiles();

  const closingIndex = currentTabs.findIndex(

    tab => tab.id === id

  );

  const remainingTabs = currentTabs.filter(

    tab => tab.id !== id

  );

  this.openedFiles.set(remainingTabs);

  if (this.activeFile()?.id === id) {

    if (remainingTabs.length === 0) {

      this.activeFile.set(null);

      return;

    }

    const nextIndex = Math.min(

      closingIndex,

      remainingTabs.length - 1

    );

    this.activeFile.set(

      remainingTabs[nextIndex]

    );

  }

}

  // ======================================================
  // Editor Selection
  // ======================================================

  setSelectedCode(code: string): void {

    this.selectedCode.set(code);

  }

 setSelection(
  startLine: number,
  startColumn: number,
  endLine: number,
  endColumn: number
): void {

  this.selectionStartLine.set(startLine);

  this.selectionStartColumn.set(startColumn);

  this.selectionEndLine.set(endLine);

  this.selectionEndColumn.set(endColumn);

}

  setCursor(

    line: number,

    column: number

  ): void {

    this.cursorLine.set(line);

    this.cursorColumn.set(column);

  }

  // ======================================================
  // Floating Toolbar
  // ======================================================

  setToolbarPosition(

    x: number,

    y: number

  ): void {

    this.toolbarX.set(x);

    this.toolbarY.set(y);

  }

  showToolbar(): void {

    this.showFloatingToolbar.set(true);

  }

  hideToolbar(): void {

    this.showFloatingToolbar.set(false);

  }

  // ======================================================
  // File Editing
  // ======================================================

 updateFileContent(

  id: string,

  content: string

): void {

  this.files.update(files =>

    files.map(file => {

      if (file.id !== id) {

        return file;

      }

      if (content !== file.lastSavedContent) {

    this.saveStatus.set('dirty');

}

      return {

        ...file,

        content,

        isDirty:

          content !== file.lastSavedContent

      };

    })

  );

  this.openedFiles.update(files =>

    files.map(file => {

      if (file.id !== id) {

        return file;

      }

      return {

        ...file,

        content,

        isDirty:

          content !== file.lastSavedContent

      };

    })

  );

  const active = this.activeFile();

  if (

    active &&

    active.id === id

  ) {

    this.activeFile.set({

      ...active,

      content,

      isDirty:

        content !== active.lastSavedContent

    });

  }

}

insertSnippet(snippet: string): void {

  const file = this.activeFile();

  if (!file) {

    return;

  }

  const lines = file.content.split('\n');

  const lineIndex = this.cursorLine() - 1;

  const columnIndex = this.cursorColumn() - 1;

  if (

    lineIndex < 0 ||

    lineIndex >= lines.length

  ) {

    return;

  }

  const currentLine = lines[lineIndex];

  const updatedLine =

    currentLine.slice(0, columnIndex) +

    snippet +

    currentLine.slice(columnIndex);

  lines[lineIndex] = updatedLine;

  const updatedContent = lines.join('\n');

  this.updateFileContent(

    file.id,

    updatedContent

  );

}

saveFile(id: string): void {

  const file = this.files().find(

    current => current.id === id

  );

  if (!file) {

    return;

  }

  this.saveStatus.set('saving');

  this.workspaceFileService.updateFile(

    id,

    file.content

  ).subscribe({

    next: (response) => {

      const savedFile = response.file;

      this.files.update(files =>

        files.map(file =>

          file.id === id

            ? {

                ...file,

                content: savedFile.content,

                lastSavedContent: savedFile.lastSavedContent,

                isDirty: false

              }

            : file

        )

      );

      this.openedFiles.update(files =>

        files.map(file =>

          file.id === id

            ? {

                ...file,

                content: savedFile.content,

                lastSavedContent: savedFile.lastSavedContent,

                isDirty: false

              }

            : file

        )

      );

      if (this.activeFile()?.id === id) {

        this.activeFile.set({

          ...this.activeFile()!,

          content: savedFile.content,

          lastSavedContent: savedFile.lastSavedContent,

          isDirty: false

        });

      }

      this.saveStatus.set('saved');

      setTimeout(() => {

        this.saveStatus.set('idle');

      }, 1500);

    },

    error: error => {

      console.error(error);

      this.saveStatus.set('error');

setTimeout(() => {

    const file = this.files().find(

        current => current.id === id

    );

    if (!file || !file.isDirty) {

        return;

    }

    this.saveFile(id);

}, 5000);

    }

  });

}

hasUnsavedChanges(): boolean {

  return this.files().some(

    file => file.isDirty

  );

}
}