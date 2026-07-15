import {
    Component,
    computed,
    input,
    output,
    ElementRef,
    ViewChild,
    AfterViewChecked
} from '@angular/core';

import hljs from 'highlight.js';



import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { marked } from 'marked';

@Component({
  selector: 'app-ai-response',
  standalone: true,
  templateUrl: './ai-response.html',
  styleUrl: './ai-response.css'
})
export class AiResponse implements AfterViewChecked {

  response = input('');

  loading = input(false);

  copy = output<void>();

  regenerate = output<void>();

  close = output<void>();

  readonly html = computed<SafeHtml>(() => {

    const markdown = this.response();

    if (!markdown) {

      return '';

    }

    marked.setOptions({

    async: false,

    breaks: true

});

const rendered = marked.parse(

    markdown

) as string;

    return this.sanitizer.bypassSecurityTrustHtml(

      rendered

    );

  });

  constructor(

    private sanitizer: DomSanitizer

  ) {}


  @ViewChild('markdown')

private markdown?: ElementRef<HTMLElement>;

ngAfterViewChecked(): void {

    if (!this.markdown) {

        return;

    }

    this.markdown

        .nativeElement

        .querySelectorAll('pre code')

        .forEach(block => {

            hljs.highlightElement(

                block as HTMLElement

            );

        });

}
}