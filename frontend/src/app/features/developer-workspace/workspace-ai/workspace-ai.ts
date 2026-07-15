import { Component, computed, inject, signal } from '@angular/core';
import { ChatWindow } from '../../ai/components/chat-window/chat-window';
import { WorkspaceService } from '../services/workspace.service';
import { AiEngineService } from '../../../core/services/ai-engine.service';
import { QuickAiActions } from '../components/quick-ai-actions/quick-ai-actions';
import { SuggestedQuestions } from '../components/suggested-questions/suggested-questions';
import { SelectionToolbar } from '../components/selection-toolbar/selection-toolbar';
import { ChatService } from '../../ai/services/chat.service';
import { FloatingAiToolbar } from '../components/floating-ai-toolbar/floating-ai-toolbar';
import { AiPatchPreview } from '../components/ai-patch-preview/ai-patch-preview';
import { AiHistory } from '../components/ai-history/ai-history';
import { WorkspaceAIService } from '../services/workspace-ai.service';
import { TitleCasePipe } from '@angular/common';
import { AiError } from '../components/ai-error/ai-error';
import { AiResponse } from '../components/ai-response/ai-response';


@Component({
  selector: 'app-workspace-ai',
  standalone: true,
  imports: [

    ChatWindow,
    QuickAiActions,
    SuggestedQuestions,
    SelectionToolbar,
    FloatingAiToolbar,
    AiPatchPreview,
    AiHistory,
    TitleCasePipe,
    AiError,
    AiResponse

  ],
  templateUrl: './workspace-ai.html',
  styleUrl: './workspace-ai.css'
})
export class WorkspaceAi {

  private workspace = inject(WorkspaceService);

  private aiEngine = inject(AiEngineService);

   chatService = inject(ChatService);

    workspaceAI = inject(
    WorkspaceAIService
);

  contextExpanded = signal(true);

  toggleContext(): void {
    this.contextExpanded.update(value => !value);
  }

  activeFile = computed(() =>

    this.workspace.activeFile()

  );

  currentTool = computed(() =>

    this.aiEngine.getCurrentTool()

  );

  fileLanguage = computed(() =>

  this.activeFile()?.language ?? 'Unknown'

);

fileSize = computed(() => {

  const file = this.activeFile();

  if (!file) {

    return '0 KB';

  }

  return `${(file.size / 1024).toFixed(1)} KB`;

});

lineCount = computed(() => {

  const file = this.activeFile();

  if (!file?.content) {

    return 0;

  }

  return file.content.split('\n').length;

});


selectedCode = computed(() =>

    this.workspace.selectedCode()

);

selectionStart = computed(() =>

    this.workspace.selectionStartLine()

);

selectionEnd = computed(() =>

    this.workspace.selectionEndLine()

);

hasSelection = computed(() =>

    this.selectedCode().trim().length > 0

);

toolbarX = computed(() =>

  this.workspace.toolbarX()

);

toolbarY = computed(() =>

  this.workspace.toolbarY()

);

showFloatingToolbar = computed(() =>

  this.workspace.showFloatingToolbar()

);


aiLoading = computed(() =>

    this.workspaceAI.loading()

);

aiStatus = computed(() =>

    this.workspaceAI.status()

);

aiResponse = computed(() =>

    this.workspaceAI.response()

);

aiError = computed(() =>

    this.workspaceAI.error()

);

activeAction = computed(() =>

    this.workspaceAI.activeAction()

);

selectionPreview = computed(() => {

  const code = this.workspace.selectedCode();

  if (!code.trim()) {

    return '';

  }

  const lines = code.split('\n');

  const preview = lines.slice(0, 8).join('\n');

  if (lines.length > 8) {

    return preview + '\n...';

  }

  return preview;

});

selectedLineCount = computed(() => {

  if (!this.hasSelection()) {

    return 0;

  }

  return this.selectionEnd() - this.selectionStart() + 1;

});

async explainSelection(): Promise<void> {

  if (this.chatService.isStreaming()) {

    return;

  }

  const selected = this.workspace.selectedCode();

  if (!selected.trim()) {

    return;

  }

  await this.chatService.explainSelection(

    selected

  );

}



async debugSelection(): Promise<void> {

  const selected = this.workspace.selectedCode();

  if (!selected.trim()) {

    return;

  }

  await this.chatService.debugSelection(

    selected

  );

}

async refactorSelection(): Promise<void> {

  const selected = this.workspace.selectedCode();

  if (!selected.trim()) {

    return;

  }

  await this.chatService.refactorSelection(

    selected

  );

}

async generateTests(): Promise<void> {

  const selected = this.workspace.selectedCode();

  if (!selected.trim()) {

    return;

  }

  await this.chatService.generateTests(

    selected

  );

}

async generateDocs(): Promise<void> {

  const selected = this.workspace.selectedCode();

  if (!selected.trim()) {

    return;

  }

  await this.chatService.generateDocumentation(

    selected

  );

}

  clearAiError(): void {

    this.workspaceAI.clearError();

}

retryAiRequest(): void {

    this.workspaceAI.retry();

}

copyAiResponse(): void {

    const response = this.aiResponse();

    if (!response) {

        return;

    }

    navigator.clipboard.writeText(response);

}

closeAiResponse(): void {

    this.workspaceAI.clearResponse();

}

regenerateAiResponse(): void {

    this.workspaceAI.retry();

}

}