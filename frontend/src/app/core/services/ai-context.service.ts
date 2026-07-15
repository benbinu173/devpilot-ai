import { Injectable, inject } from '@angular/core';

import { WorkspaceService } from '../../features/developer-workspace/services/workspace.service';
import { WorkspaceContextService } from './workspace-context.service';
import { AiEngineService } from './ai-engine.service';
import { GraphQueryService } from './graph-query.service';

@Injectable({
  providedIn: 'root'
})
export class AiContextService {

  private workspace = inject(WorkspaceService);

  private workspaceContext = inject(WorkspaceContextService);

  private aiEngine = inject(AiEngineService);

  private graphQuery = inject(
    GraphQueryService
);

  build(prompt: string) {

    const activeFile = this.workspace.activeFile();

    const relatedFiles = activeFile
  ? this.graphQuery.getRelatedFiles(activeFile.name)
  : [];

    return {

      prompt,

      mode: this.aiEngine.getCurrentTool().id,

      context: {

        activeFile,

        selection: {

          text: this.workspace.selectedCode(),

          startLine: this.workspace.selectionStartLine(),

          startColumn: this.workspace.selectionStartColumn(),

          endLine: this.workspace.selectionEndLine(),

          endColumn: this.workspace.selectionEndColumn()

        },

        workspace: this.workspaceContext.context(),

        relatedFiles

       

      }

    };

  }

}