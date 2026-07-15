import {
  Injectable,
  inject
} from '@angular/core';

import { WorkspaceContextService } from './workspace-context.service';
import { AIPromptPayload } from '../models/ai/ai-prompt-payload.interface';
import { AIRequestMetadata } from '../models/ai/ai-request-metadata.interface';
import { AIAction } from '../models/ai/ai-action.type';

@Injectable({
  providedIn: 'root'
})
export class AIContextBuilderService {

  private workspaceContext = inject(
    WorkspaceContextService
  );

 buildContext(
     action: AIAction,
    prompt: string
): AIPromptPayload {

    const workspace = this.workspaceContext.getAiContext();

    const metadata: AIRequestMetadata = {

        timestamp: new Date().toISOString(),

        workspaceVersion:
            workspace.workspaceVersion,

        activeFile:
            workspace.activeFile?.name ??
            'None',

        language:
            workspace.language,

        hasSelection:
            workspace.selectedCode.trim().length > 0,

        openFiles:
            workspace.openedFiles.length

    };

   return {

    action,

    prompt,

    workspace,

    metadata

};

}

}