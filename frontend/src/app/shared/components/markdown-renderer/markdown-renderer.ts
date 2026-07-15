import {
  Component,
  computed,
  inject,
  input
} from '@angular/core';

import {
  DomSanitizer,
  SafeHtml
} from '@angular/platform-browser';

import { marked } from 'marked';
import { gfmHeadingId } from 'marked-gfm-heading-id';

marked.use(gfmHeadingId());

import DOMPurify from 'dompurify';

@Component({
  selector: 'app-markdown-renderer',
  standalone: true,
  imports: [],
  templateUrl: './markdown-renderer.html',
  styleUrl: './markdown-renderer.css'
})
export class MarkdownRenderer {

  markdown = input('');

  private sanitizer = inject(DomSanitizer);

  html = computed<SafeHtml>(() => {

    const rawHtml = marked.parse(
      this.markdown()
    ) as string;

    const cleanHtml = DOMPurify.sanitize(rawHtml);

    return this.sanitizer.bypassSecurityTrustHtml(cleanHtml);

  });

}