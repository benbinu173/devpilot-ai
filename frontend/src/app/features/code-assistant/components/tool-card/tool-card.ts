import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-tool-card',
  standalone: true,
  imports: [],
  templateUrl: './tool-card.html',
  styleUrl: './tool-card.css'
})
export class ToolCard {

  icon = input('');

  title = input('');

  description = input('');

  action = output<void>();

  toolId = input('');

select = output<string>();

}