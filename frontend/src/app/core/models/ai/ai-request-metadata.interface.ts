export interface AIRequestMetadata {

    timestamp: string;

    workspaceVersion: number;

    activeFile: string;

    language: string;

    hasSelection: boolean;

    openFiles: number;

}