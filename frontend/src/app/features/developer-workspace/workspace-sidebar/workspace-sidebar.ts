import { Component, inject, signal } from '@angular/core';

import { WorkspaceService } from '../services/workspace.service';
import { WorkspaceFileService } from '../../../core/services/workspace-file.service';

@Component({
  selector: 'app-workspace-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './workspace-sidebar.html',
  styleUrl: './workspace-sidebar.css'
})
export class WorkspaceSidebar {

  workspace = inject(WorkspaceService);

  private workspaceFileService = inject(WorkspaceFileService);

  loading = signal(true);
  uploading = signal(false);

  constructor() {
    this.loadWorkspace();
  }

  // ==========================================
  // Load Workspace
  // ==========================================

  private loadWorkspace(): void {

    this.workspaceFileService.getFiles().subscribe({

      next: (response) => {
        response.files.forEach(file => {
          this.workspace.addFile(file);
        });
        this.loading.set(false);
      },

      error: (error) => {
        console.error('Unable to load workspace files.', error);
        this.loading.set(false);
      }

    });

  }

  // ==========================================
  // Upload File
  // ==========================================

  uploadFile(event: Event): void {

    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    this.uploading.set(true);

    this.workspaceFileService.upload(file).subscribe({

      next: (response) => {
        this.workspace.addFile(response.file);
        input.value = '';
        this.uploading.set(false);
      },

      error: (error) => {
        console.error('Unable to upload file.', error);
        this.uploading.set(false);
        input.value = '';
      }

    });

  }

}