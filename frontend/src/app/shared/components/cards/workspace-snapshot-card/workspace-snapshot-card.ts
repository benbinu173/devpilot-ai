import {
  Component,
  input
} from '@angular/core';
import { WorkspaceSnapshot } from '../../../../features/dashboard/pages/dashboard/interfaces/workspace-snapshot.interface';



@Component({
  selector: 'app-workspace-snapshot-card',
  standalone: true,
  templateUrl: './workspace-snapshot-card.html',
  styleUrl: './workspace-snapshot-card.css'
})
export class WorkspaceSnapshotCard {

  snapshot = input.required<WorkspaceSnapshot>();

}