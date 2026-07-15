import { CodeSnippet } from "./code-snippet.interface";
import { SnippetPagination } from "./snippet-pagination.interface";

export interface SnippetResponse {

    success: boolean;

    snippets: CodeSnippet[];

    pagination?: SnippetPagination;

}