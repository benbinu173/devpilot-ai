import { Component, signal } from '@angular/core';
import { ConversationList } from '../../components/conversation-list/conversation-list';
import { ChatWindow } from '../../components/chat-window/chat-window';
import { AiModeSelector } from '../../components/ai-mode-selector/ai-mode-selector';

@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [ConversationList, ChatWindow, AiModeSelector],
  templateUrl: './workspace.html',
  styleUrl: './workspace.css',
})
export class Workspace {
  sidebarOpen = signal(false);

  toggleSidebar(): void {
    this.sidebarOpen.update(v => !v);
  }

  closeSidebar(): void {
    this.sidebarOpen.set(false);
  }
}