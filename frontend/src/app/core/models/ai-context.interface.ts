import { WorkspaceFile } from '../../features/developer-workspace/interfaces/workspace-file.interface';

export interface AiContext {

    prompt: string;

    mode: string;

    activeFile: WorkspaceFile | null;

     selection?: {

    text: string;

    startLine: number;

    endLine: number;

  };

}