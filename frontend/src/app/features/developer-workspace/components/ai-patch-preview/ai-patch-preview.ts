import {
  Component,
  computed,
  inject
} from '@angular/core';

import { AiPatchService } from '../../../../core/services/ai-patch.service';

@Component({
  selector: 'app-ai-patch-preview',
  standalone: true,
  imports: [],
  templateUrl: './ai-patch-preview.html',
  styleUrl: './ai-patch-preview.css'
})
export class AiPatchPreview {

  private patchService = inject(AiPatchService);

  patch = computed(() =>

    this.patchService.currentPatch()

  );

}