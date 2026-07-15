import {
  Component,
  computed,
  inject,
  signal
} from '@angular/core';

import { AiHistoryService } from '../../../../core/services/ai-history.service';
import { AiPatchService } from '../../../../core/services/ai-patch.service';

@Component({
  selector: 'app-ai-history',
  standalone: true,
  imports: [],
  templateUrl: './ai-history.html',
  styleUrl: './ai-history.css'
})
export class AiHistory {

  private historyService = inject(AiHistoryService);
  private patchService = inject(AiPatchService);
  

  history = computed(() =>

    this.historyService.history()

  );

  expanded = signal(true);

  toggle(): void {

    this.expanded.update(

      value => !value

    );

  }

  restore(id: string): void {

    const item = this.historyService.getById(id);

    if (!item) {

        return;

    }

    this.patchService.restore(

        item.patch

    );

}

currentPatch = computed(() =>

    this.patchService.currentPatch()

);



}