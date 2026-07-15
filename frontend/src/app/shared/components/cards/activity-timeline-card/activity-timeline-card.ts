import {
  Component,
  input
} from '@angular/core';
import { DashboardActivity } from '../../../../features/dashboard/pages/dashboard/interfaces/dashboard-activity.interface';



@Component({
  selector: 'app-activity-timeline-card',
  standalone: true,
  templateUrl: './activity-timeline-card.html',
  styleUrl: './activity-timeline-card.css'
})
export class ActivityTimelineCard {

  activity = input.required<DashboardActivity>();

}