import {
    Injectable
} from '@angular/core';

import { AIPromptPayload } from '../models/ai/ai-prompt-payload.interface';
import { AIAction } from '../models/ai/ai-action.type';

@Injectable({
    providedIn: 'root'
})
export class AIPromptGeneratorService {

    buildPrompt(

        payload: AIPromptPayload

    ): string {

        return [

           this.buildSystemPrompt(
    payload.action
),

            this.buildWorkspacePrompt(payload),

            this.buildUserPrompt(payload)

        ].join('\n\n');

    }

    // ======================================================
    // System Prompt
    // ======================================================

   private buildSystemPrompt(
    action: AIAction
): string {

    switch (action) {

        case 'explain':

            return `
You are DevPilot AI.

Explain the selected code clearly.

Break down the logic.

Mention any important concepts.

Avoid rewriting code unless requested.
`;

        case 'refactor':

            return `
You are DevPilot AI.

Refactor the selected code.

Improve readability.

Improve maintainability.

Do not change behaviour.
`;

        case 'fix':

            return `
You are DevPilot AI.

Identify bugs.

Fix only confirmed issues.

Do not introduce breaking changes.
`;

        case 'optimize':

            return `
You are DevPilot AI.

Optimize performance.

Reduce complexity.

Keep behaviour identical.
`;

        case 'generate':

            return `
You are DevPilot AI.

Generate production-ready code.

Follow clean architecture.

Return complete code.
`;

        case 'document':

            return `
You are DevPilot AI.

Generate documentation.

Use professional comments.

Explain parameters and return values.
`;

        case 'test':

            return `
You are DevPilot AI.

Generate unit tests.

Cover edge cases.

Follow testing best practices.
`;

        default:

            return `
You are DevPilot AI.

You are an expert software engineer.

Answer professionally.

Use workspace context whenever possible.
`;

    }

}

    // ======================================================
    // Workspace Context
    // ======================================================

    private buildWorkspacePrompt(

        payload: AIPromptPayload

    ): string {

        const workspace = payload.workspace;

        return `
Workspace Information

Current File:
${workspace.activeFile?.name ?? 'None'}

Language:
${workspace.language}

Cursor:
Line ${workspace.cursorLine},
Column ${workspace.cursorColumn}

Selected Code:

${workspace.selectedCode || 'No selection'}

Open Files:

${workspace.openedFiles
    .map(file => file.name)
    .join('\n')}
`;

    }

    // ======================================================
    // User Prompt
    // ======================================================

    private buildUserPrompt(

        payload: AIPromptPayload

    ): string {

        return `
User Request

${payload.prompt}
`;

    }

}