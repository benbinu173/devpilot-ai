import {
  Component,
  inject
} from '@angular/core';

import { AiEngineService } from '../../../../core/services/ai-engine.service';

@Component({
  selector: 'app-ai-mode-selector',
  standalone: true,
  imports: [],
  templateUrl: './ai-mode-selector.html',
  styleUrl: './ai-mode-selector.css'
})
export class AiModeSelector {

  aiEngine = inject(AiEngineService);

}