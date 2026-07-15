import {
  Component,
  input,
  output
} from '@angular/core';
import { AI_TOOLS } from '../../services/ai-tools';

@Component({
  selector: 'app-prompt-toolbar',
  standalone: true,
  imports: [],
  templateUrl: './prompt-toolbar.html',
  styleUrl: './prompt-toolbar.css'
})
export class PromptToolbar {

  selected = input('Explain Code');

  toolSelected = output<string>();

 tools = AI_TOOLS;
}