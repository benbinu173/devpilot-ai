import {
  Component,
  input
} from '@angular/core';

import { MarkdownRenderer } from '../../../../shared/components/markdown-renderer/markdown-renderer';

@Component({
  selector:'app-output-panel',
  standalone:true,
  imports:[MarkdownRenderer],
  templateUrl:'./output-panel.html',
  styleUrl:'./output-panel.css'
})
export class OutputPanel{

  content=input('');

}