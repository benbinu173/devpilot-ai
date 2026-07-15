import {
  Component,
  input,
  output
} from '@angular/core';

@Component({
  selector: 'app-code-editor',
  standalone: true,
  imports: [],
  templateUrl: './code-editor.html',
  styleUrl: './code-editor.css'
})
export class CodeEditor {

  code = input('');

  codeChange = output<string>();

}