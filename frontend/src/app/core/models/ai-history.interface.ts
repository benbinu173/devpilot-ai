import { AiPatch } from "./ai-patch.interface";

export interface AiHistory {

    id: string;

    createdAt: string;

    fileId: string;

    fileName: string;

    patch: AiPatch;

    previousCode: string;

}