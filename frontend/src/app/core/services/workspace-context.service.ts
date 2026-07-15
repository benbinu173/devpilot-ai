import {
  Injectable,
  computed,
  effect,
  inject,
  signal
} from '@angular/core';

import { WorkspaceContextApiService } from './workspace-context-api.service';
import { WorkspaceContext } from '../models/workspace-context.interface';
import { WorkspaceService } from '../../features/developer-workspace/services/workspace.service';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceContextService {

  private api = inject(WorkspaceContextApiService);

  private workspace = inject(WorkspaceService);

  // ==========================================================
  // Backend Workspace Context
  // ==========================================================

  readonly context = signal<WorkspaceContext | null>(null);

  readonly loading = signal(false);

  // ==========================================================
  // Local AI Workspace Context
  // ==========================================================

  readonly aiContext = computed(() => {

    const activeFile = this.workspace.activeFile();

    return {

      activeFile,

      openedFiles: this.workspace.openedFiles(),

      selectedCode: this.workspace.selectedCode(),

      cursorLine: this.workspace.cursorLine(),

      cursorColumn: this.workspace.cursorColumn(),

      selectionStartLine:
        this.workspace.selectionStartLine(),

      selectionStartColumn:
        this.workspace.selectionStartColumn(),

      selectionEndLine:
        this.workspace.selectionEndLine(),

      selectionEndColumn:
        this.workspace.selectionEndColumn(),

      language: activeFile
        ? this.getLanguage(activeFile.name)
        : 'plaintext',

      workspaceVersion:
        this.workspace.version()

    };

  });

  constructor() {

    this.load();

    let previousVersion = this.workspace.version();

    effect(() => {

      const version = this.workspace.version();

      if (version === previousVersion) {

        return;

      }

      previousVersion = version;

      this.load();

    });

  }

  // ==========================================================
  // Backend Context
  // ==========================================================

  load(): void {

    this.loading.set(true);

    this.api.getContext().subscribe({

      next: response => {

        this.context.set(

          response.context

        );

        this.loading.set(false);

      },

      error: error => {

        console.error(

          'Unable to load workspace context.',

          error

        );

        this.loading.set(false);

      }

    });

  }

  refresh(): void {

    this.load();

  }

  // ==========================================================
  // AI Context
  // ==========================================================

  getAiContext() {

    return this.aiContext();

  }

  // ==========================================================
  // Helpers
  // ==========================================================

  private getLanguage(

    filename: string

  ): string {

    const extension = filename

      .split('.')

      .pop()

      ?.toLowerCase();

    switch (extension) {

      case 'ts':
        return 'typescript';

      case 'tsx':
        return 'typescript';

      case 'js':
        return 'javascript';

      case 'jsx':
        return 'javascript';

      case 'html':
        return 'html';

      case 'css':
        return 'css';

      case 'scss':
        return 'scss';

      case 'json':
        return 'json';

      case 'java':
        return 'java';

      case 'py':
        return 'python';

      case 'xml':
        return 'xml';

      case 'sql':
        return 'sql';

      case 'md':
        return 'markdown';

      case 'yml':
      case 'yaml':
        return 'yaml';

      case 'sh':
        return 'shell';

      default:
        return 'plaintext';

    }

  }

}