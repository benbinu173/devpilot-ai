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
import { WorkspaceContext } from '../models/workspace-context.interface';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceContextApiService {

  private http = inject(HttpClient);

  private api = `${environment.apiUrl}/workspace/context`;

  getContext(): Observable<{

    success: boolean;

    context: WorkspaceContext;

  }> {

    return this.http.get<{

      success: boolean;

      context: WorkspaceContext;

    }>(this.api);

  }

}