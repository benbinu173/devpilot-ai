import { Component, input } from '@angular/core';

@Component({
  selector: 'app-action-card',
  standalone: true,
  imports: [],
  templateUrl: './action-card.html',
  styleUrl: './action-card.css'
})
export class ActionCard {

  title = input('');

  description = input('');

  icon = input('');

}