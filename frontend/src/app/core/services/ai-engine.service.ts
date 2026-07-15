import { Injectable, inject, signal } from '@angular/core';

import { AiService } from './ai.service';

import { AI_TOOLS } from '../../features/code-assistant/services/ai-tools';
import { AiTool } from '../../features/code-assistant/interfaces/ai-tool.interface';
import { AiPatch } from '../models/ai-patch.interface';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AiEngineService {

  private aiService = inject(AiService);
   private http = inject(HttpClient);

  readonly tools = AI_TOOLS;

  selectedTool = signal<AiTool>(AI_TOOLS[0]);

  selectTool(id: string): void {

    const tool = this.tools.find(

      t => t.id === id

    );

    if (tool) {

      this.selectedTool.set(tool);

    }

  }

  getCurrentTool(): AiTool {

    return this.selectedTool();

  }


  generatePatch(

    action: string,

    context: any

) {

    return this.http.post<{

        success: boolean;

        patch: AiPatch;

    }>(

        `${environment.apiUrl}/ai/patch`,

        {

            action,

            context

        }

    );

}

}