import {
  Component,
  input,
  output
} from '@angular/core';

@Component({
  selector: 'app-floating-ai-toolbar',
  standalone: true,
  imports: [],
  templateUrl: './floating-ai-toolbar.html',
  styleUrl: './floating-ai-toolbar.css'
})
export class FloatingAiToolbar {

  visible = input(false);

  loading = input(false);

  left = input(0);

top = input(0);

  explain = output<void>();

  debug = output<void>();

  refactor = output<void>();

  tests = output<void>();

  docs = output<void>();

}