import { WorkspaceFile } from '../../../features/developer-workspace/interfaces/workspace-file.interface';

export interface WorkspaceContext {

    activeFile: WorkspaceFile | null;

    openedFiles: WorkspaceFile[];

    selectedCode: string;

    cursorLine: number;

    cursorColumn: number;

    selectionStartLine: number;

    selectionStartColumn: number;

    selectionEndLine: number;

    selectionEndColumn: number;

    language: string;

    workspaceVersion: number;

}