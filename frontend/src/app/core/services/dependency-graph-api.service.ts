import {
  Injectable,
  inject
} from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';

import { environment } from '../../environments/environment';

import { DependencyGraph } from '../models/dependency-graph/dependency-graph.interface';

@Injectable({
  providedIn: 'root'
})
export class DependencyGraphApiService {

  private http = inject(HttpClient);

  private api =
    `${environment.apiUrl}/workspace/dependency-graph`;

  getGraph(): Observable<{

    success: boolean;

    graph: DependencyGraph;

}> {

    return this.http.get<{

      success: boolean;

      graph: any;

    }>(this.api);

  }

}