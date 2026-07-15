import {
  Component,
  inject,
  signal,
  ElementRef,
  ViewChild,
  AfterViewChecked
} from '@angular/core';

import hljs from 'highlight.js';

import { WorkspaceService } from '../../services/workspace.service';
import { EditorTabs } from '../editor-tabs/editor-tabs';

@Component({
  selector: 'app-code-preview',
  standalone: true,
  imports: [EditorTabs],
  templateUrl: './code-preview.html',
  styleUrl: './code-preview.css'
})
export class CodePreview implements AfterViewChecked {

  workspace = inject(WorkspaceService);

  copied = signal(false);

  @ViewChild('codeBlock')
  private codeBlock?: ElementRef<HTMLElement>;

  ngAfterViewChecked(): void {

    if (!this.codeBlock) {
      return;
    }

    hljs.highlightElement(
      this.codeBlock.nativeElement
    );

  }

  async copy(content: string): Promise<void> {

    try {

      await navigator.clipboard.writeText(content);

      this.copied.set(true);

      setTimeout(() => {
        this.copied.set(false);
      }, 2000);

    } catch (error) {

      console.error('Unable to copy file contents.', error);

    }

  }

}