import {
  Component,
  output,
  input
} from '@angular/core';

@Component({
  selector: 'app-selection-toolbar',
  standalone: true,
  imports: [],
  templateUrl: './selection-toolbar.html',
  styleUrl: './selection-toolbar.css'
})
export class SelectionToolbar {

    loading = input(false);
    
  explain = output<void>();

  debug = output<void>();

  refactor = output<void>();

  tests = output<void>();

  docs = output<void>();

}