import { Component, HostListener, inject, signal } from '@angular/core';

import { WorkspaceSidebar } from '../../workspace-sidebar/workspace-sidebar';
import { WorkspaceAi } from '../../workspace-ai/workspace-ai';
import { MonacoEditor } from '../../components/monaco-editor/monaco-editor';
import { EditorTabs } from '../../components/editor-tabs/editor-tabs';
import { SaveStatus } from '../../components/save-status/save-status';
import { AutoSaveService } from '../../../../core/services/autosave.service';
import { WorkspaceService } from '../../services/workspace.service';
import { AiDiffViewer } from '../../components/ai-diff-viewer/ai-diff-viewer';

type WorkspacePanel = 'files' | 'editor' | 'ai';

@Component({
  selector: 'app-developer-workspace',
  standalone: true,
  imports: [
    WorkspaceSidebar,
    WorkspaceAi,
    MonacoEditor,
    EditorTabs,
    SaveStatus,
    AiDiffViewer
  ],
  templateUrl: './developer.workspace.page.html',
  styleUrl: './developer.workspace.css'
})
export class DeveloperWorkspace {

  private workspace = inject(WorkspaceService);
  private autoSave = inject(AutoSaveService);

  activePanel = signal<WorkspacePanel>('editor');

  setPanel(panel: WorkspacePanel): void {
    this.activePanel.set(panel);
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnload(event: BeforeUnloadEvent): void {
    if (!this.workspace.hasUnsavedChanges()) {
      return;
    }
    event.preventDefault();
    event.returnValue = '';
  }
}