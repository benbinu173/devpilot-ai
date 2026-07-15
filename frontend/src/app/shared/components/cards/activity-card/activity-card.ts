import { Component, input } from '@angular/core';

@Component({
  selector: 'app-activity-card',
  standalone: true,
  imports: [],
  templateUrl: './activity-card.html',
  styleUrl: './activity-card.css'
})
export class ActivityCard {

  action = input('');

  type = input('');

  time = input('');

  icon = input<string>();

}