import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

import { WorkspaceFile } from '../../features/developer-workspace/interfaces/workspace-file.interface';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceFileService {

  private http = inject(HttpClient);
  

  private api = `${environment.apiUrl}/workspace/files`;

  // ============================================
  // Upload
  // ============================================

  upload(file: File): Observable<{ success: boolean; file: WorkspaceFile }> {

    const formData = new FormData();

    formData.append('file', file);

    return this.http.post<{ success: boolean; file: WorkspaceFile }>(
      this.api,
      formData
    );

  }

  // ============================================
  // Get Workspace Files
  // ============================================

  getFiles(): Observable<{ success: boolean; files: WorkspaceFile[] }> {

    return this.http.get<{ success: boolean; files: WorkspaceFile[] }>(
      this.api
    );

  }

  // ============================================
  // Get Single File
  // ============================================

  getFile(id: string): Observable<{ success: boolean; file: WorkspaceFile }> {

    return this.http.get<{ success: boolean; file: WorkspaceFile }>(
      `${this.api}/${id}`
    );

  }

  // ============================================
  // Save File
  // ============================================

  updateFile(
    id: string,
    content: string
  ): Observable<{ success: boolean; file: WorkspaceFile }> {

    return this.http.put<{ success: boolean; file: WorkspaceFile }>(

      `${this.api}/${id}`,

      {
        content
      }

    );

  }

  // ============================================
  // Delete File
  // ============================================

  deleteFile(id: string): Observable<any> {

    return this.http.delete(

      `${this.api}/${id}`

    );

  }

}