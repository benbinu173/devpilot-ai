import {
  Component,
  computed,
  inject
} from '@angular/core';

import { WorkspaceService } from '../../services/workspace.service';

@Component({
  selector: 'app-save-status',
  standalone: true,
  imports: [],
  templateUrl: './save-status.html',
  styleUrl: './save-status.css'
})
export class SaveStatus {

  private workspace = inject(WorkspaceService);

  status = computed(() =>

    this.workspace.saveStatus()

  );

}