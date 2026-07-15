import {
  Injectable,
  effect,
  inject
} from '@angular/core';

import { WorkspaceService } from '../../features/developer-workspace/services/workspace.service';

@Injectable({
  providedIn: 'root'
})
export class AutoSaveService {

  private workspace = inject(WorkspaceService);

  private timer: ReturnType<typeof setTimeout> | null = null;

  constructor() {

    effect(() => {

      const file = this.workspace.activeFile();

      const aiBusy = this.workspace.aiBusy();

if (aiBusy) {

    return;

}

      const status = this.workspace.saveStatus();

      if (!file) {

        return;

      }

      if (status !== 'dirty') {

        return;

      }

      if (this.timer) {

        clearTimeout(this.timer);

      }

      this.timer = setTimeout(() => {

        this.workspace.saveFile(file.id);

      }, 2000);

    });

  }


  

}