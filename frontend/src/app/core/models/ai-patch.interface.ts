export interface AiPatch {

    summary: string;

    explanation: string;

    action: string;

    language: string;

    originalCode: string;

    updatedCode: string;

    startLine: number;

    startColumn: number;

    endLine: number;

    endColumn: number;

    createdAt: string;

    id: string;

}