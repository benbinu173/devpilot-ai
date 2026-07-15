export interface CodeSnippet {

    id: string;

    title: string;

    description: string;

    language: string;

    category: string;

    tags: string[];

    code: string;

    isFavorite: boolean;

    usageCount: number;

    lastUsedAt: string | null;

    source: "manual" | "workspace" | "ai";

    createdAt: string;

    updatedAt: string;

}