export interface SnippetFilter {

    search?: string;

    language?: string;

    category?: string;

    tags?: string[];

    favorite?: boolean;

    sort?:

        | "updated"

        | "created"

        | "recent"

        | "most-used"

        | "title";

    page?: number;

    limit?: number;

}