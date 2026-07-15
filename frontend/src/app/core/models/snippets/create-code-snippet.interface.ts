export interface CreateCodeSnippet {

    title: string;

    description?: string;

    language: string;

    category?: string;

    tags?: string[];

    code: string;

    source?: "manual" | "workspace" | "ai";

}