import { WorkspaceContext } from './workspace-context.interface';
import { AIRequestMetadata } from './ai-request-metadata.interface';
import { AIAction } from './ai-action.type';

export interface AIPromptPayload {

    action: AIAction;

    prompt: string;

    workspace: WorkspaceContext;

    metadata: AIRequestMetadata;

}