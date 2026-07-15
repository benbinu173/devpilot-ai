import {
  Component,
  input,
  output
} from '@angular/core';

@Component({
  selector: 'app-ai-error',
  standalone: true,
  templateUrl: './ai-error.html',
  styleUrl: './ai-error.css'
})
export class AiError {

  message = input('');

  loading = input(false);

  retry = output<void>();

  dismiss = output<void>();

}