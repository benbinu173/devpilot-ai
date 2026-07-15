import {
  Injectable,
  inject,
  signal
} from '@angular/core';

import { DependencyGraphApiService } from './dependency-graph-api.service';
import { DependencyGraph } from '../models/dependency-graph/dependency-graph.interface';

@Injectable({
  providedIn: 'root'
})
export class DependencyGraphService {

  private api = inject(
    DependencyGraphApiService
  );

 readonly graph = signal<DependencyGraph | null>(null);

  readonly loading = signal(false);

  load(): void {

    this.loading.set(true);

    this.api.getGraph().subscribe({

      next: response => {

        this.graph.set(
          response.graph
        );

        this.loading.set(false);

      },

      error: error => {

        console.error(
          error
        );

        this.loading.set(false);

      }

    });

  }


 

}