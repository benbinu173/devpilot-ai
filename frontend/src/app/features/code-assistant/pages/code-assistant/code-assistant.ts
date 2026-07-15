import { Component,inject  } from '@angular/core';
import { Router } from '@angular/router';
import { ToolCard } from '../../components/tool-card/tool-card';

import { AI_TOOLS } from '../../services/ai-tools';
import { AiEngineService } from '../../../../core/services/ai-engine.service';

@Component({
  selector: 'app-code-assistant',
  standalone: true,
  imports: [ToolCard],
  templateUrl: './code-assistant.html',
  styleUrl: './code-assistant.css'
})
export class CodeAssistant {

  tools = AI_TOOLS;

  private router = inject(Router);
private aiEngine = inject(AiEngineService);

openTool(id: string): void {

  this.aiEngine.selectTool(id);

  this.router.navigate([

    '/code-assistant/workspace'

  ]);

}

}