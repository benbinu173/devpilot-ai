import {
    Injectable,
    inject,
    signal
} from '@angular/core';

import { finalize } from 'rxjs/operators';

import { CodeSnippetApiService } from '../../snippets/services/code-snippet-api.service';
import { ConversationService } from '../../../core/services/conversation.service';
import { WorkspaceService } from '../../developer-workspace/services/workspace.service';

import { DashboardStats } from '../pages/dashboard/interfaces/dashboard-stats.interface';
import { WorkspaceSnapshot } from '../pages/dashboard/interfaces/workspace-snapshot.interface';

import { CodeSnippet } from '../../../core/models/snippets/code-snippet.interface';
import { ConversationSummary } from '../../../core/models/conversation-summary.interface';


@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    // ==========================================================
    // Services
    // ==========================================================

    private snippetsApi = inject(CodeSnippetApiService);

    private conversationService = inject(ConversationService);

    private workspace = inject(WorkspaceService);

    // ==========================================================
    // Signals
    // ==========================================================

    readonly loading = signal(false);

    readonly stats = signal<DashboardStats>({
        conversations: 0,
        workspaceFiles: 0,
        snippets: 0,
        favoriteSnippets: 0
    });

    readonly recentSnippets = signal<CodeSnippet[]>([]);

    readonly recentConversations = signal<ConversationSummary[]>([]);

    readonly workspaceSnapshot = signal<WorkspaceSnapshot>({
        currentFile: 'No file selected',
        language: '-',
        filesLoaded: 0,
        totalLines: 0,
        totalSize: '0 KB',
        aiStatus: 'Ready'
    });

    // ==========================================================
    // Public API
    // ==========================================================

    load(): void {

        this.loading.set(true);

        this.loadSnippetStatistics();

        this.loadFavoriteStatistics();

        this.loadRecentSnippets();

        this.loadRecentConversations();

        this.loadWorkspaceSnapshot();

    }

    // ==========================================================
    // Snippet Statistics
    // ==========================================================

    private loadSnippetStatistics(): void {

        this.snippetsApi

            .getSnippets()

            .pipe(

                finalize(() => {

                    this.loading.set(false);

                })

            )

            .subscribe({

                next: response => {

                    this.stats.update(stats => ({

                        ...stats,

                        snippets: response.snippets.length

                    }));

                },

                error: error => {

                    console.error(

                        'Unable to load snippets.',

                        error

                    );

                }

            });

    }

    // ==========================================================
    // Favorite Statistics
    // ==========================================================

    private loadFavoriteStatistics(): void {

        this.snippetsApi

            .getFavoriteSnippets()

            .subscribe({

                next: response => {

                    this.stats.update(stats => ({

                        ...stats,

                        favoriteSnippets:

                            response.snippets.length

                    }));

                },

                error: error => {

                    console.error(

                        'Unable to load favorite snippets.',

                        error

                    );

                }

            });

    }

    // ==========================================================
    // Recent Snippets
    // ==========================================================

    private loadRecentSnippets(): void {

        this.snippetsApi

            .getSnippets({

                limit: 5

            })

            .subscribe({

                next: response => {

                    this.recentSnippets.set(

                        response.snippets

                    );

                },

                error: error => {

                    console.error(

                        'Unable to load recent snippets.',

                        error

                    );

                }

            });

    }

    // ==========================================================
    // Recent Conversations
    // ==========================================================

    private loadRecentConversations(): void {

        this.conversationService

            .getConversations()

            .subscribe({

                next: response => {

                    this.recentConversations.set(

                        response.conversations.slice(0, 5)

                    );

                    this.stats.update(stats => ({

                        ...stats,

                        conversations:

                            response.conversations.length

                    }));

                },

                error: error => {

                    console.error(

                        'Unable to load conversations.',

                        error

                    );

                }

            });

    }

    // ==========================================================
    // Workspace Snapshot
    // ==========================================================

    loadWorkspaceSnapshot(): void {

        const activeFile = this.workspace.activeFile();

        const files = this.workspace.files();

        const totalLines = files.reduce(

            (total, file) =>

                total + file.content.split('\n').length,

            0

        );

        const totalBytes = files.reduce(

            (total, file) =>

                total + file.size,

            0

        );

        this.workspaceSnapshot.set({

            currentFile:

                activeFile?.name ?? 'No file selected',

            language:

                activeFile?.language ?? '-',

            filesLoaded: files.length,

            totalLines,

            totalSize:

                `${(totalBytes / 1024).toFixed(1)} KB`,

            aiStatus: 'Ready'

        });

        this.stats.update(stats => ({

            ...stats,

            workspaceFiles: files.length

        }));

    }

}