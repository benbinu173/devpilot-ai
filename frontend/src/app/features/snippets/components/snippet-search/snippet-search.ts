import {
  Component,
  DestroyRef,
  effect,
  inject,
  signal
} from '@angular/core';

import {

    debounceTime,

    distinctUntilChanged

} from 'rxjs/operators';

import {

    Subject

} from 'rxjs';

import {

    takeUntilDestroyed

} from '@angular/core/rxjs-interop';

import { FormsModule } from '@angular/forms';

import { CodeSnippetService } from '../../services/code-snippet.service';

@Component({
  selector: 'app-snippet-search',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './snippet-search.html',
  styleUrl: './snippet-search.css'
})
export class SnippetSearch {

 

  private snippetService = inject(
    CodeSnippetService
  );

   private destroyRef = inject(

    DestroyRef

);

private searchSubject = new Subject<string>();

  readonly search = signal('');

constructor() {

    effect(() => {

        this.searchSubject.next(

            this.search()

        );

    });

    this.searchSubject

        .pipe(

            debounceTime(300),

            distinctUntilChanged(),

            takeUntilDestroyed(

                this.destroyRef

            )

        )

        .subscribe(search => {

            this.snippetService.setFilter({

                search

            });

        });

}

}