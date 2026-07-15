import {
  Component,
  input
} from '@angular/core';

import { CodeSnippet } from '../../../../core/models/snippets/code-snippet.interface';

@Component({
  selector: 'app-recent-snippet-card',
  standalone: true,
  templateUrl: './recent-snippet-card.html',
  styleUrl: './recent-snippet-card.css'
})
export class RecentSnippetCard {

  snippet = input.required<CodeSnippet>();

}