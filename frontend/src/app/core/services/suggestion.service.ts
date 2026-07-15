import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

import { AiSuggestionResponse } from '../models/ai-suggestion-response.interface';

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {

    private cache = new Map<string, AiSuggestionResponse>();

  private http = inject(HttpClient);

  private api = `${environment.apiUrl}/ai/suggestions`;

 generate(file: any): Observable<AiSuggestionResponse> {

  const cached = this.cache.get(file.id);

  if (cached) {

    return new Observable(observer => {

      observer.next(cached);

      observer.complete();

    });

  }

  return new Observable(observer => {

    this.http.post<AiSuggestionResponse>(

      this.api,

      {

        file

      }

    ).subscribe({

      next: response => {

        this.cache.set(

          file.id,

          response

        );

        observer.next(response);

        observer.complete();

      },

      error: error => observer.error(error)

    });

  });

}

}