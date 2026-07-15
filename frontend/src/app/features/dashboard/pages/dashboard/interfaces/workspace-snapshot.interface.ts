export interface WorkspaceSnapshot {

    currentFile: string;

    language: string;

    filesLoaded: number;

    totalLines: number;

    totalSize: string;

    aiStatus: 'Ready' | 'Busy';

}