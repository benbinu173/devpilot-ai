import { Injectable, inject } from '@angular/core';

import { DependencyGraphService } from './dependency-graph.service';

@Injectable({
  providedIn: 'root'
})
export class GraphQueryService {

  private dependencyGraph = inject(
    DependencyGraphService
  );

  // ============================================
  // Get Related Files
  // ============================================

  getRelatedFiles(fileName: string): string[] {

    const graph = this.dependencyGraph.graph();

    if (!graph) {

      return [];

    }

    const node = graph[fileName];

    if (!node) {

      return [];

    }

    const related = new Set<string>();

    for (const imported of node.imports) {

      for (const symbol of imported.resolvedSymbols) {

        related.add(

          symbol.fileName

        );

      }

    }

    for (const reference of node.importedBy) {

      related.add(

        reference.file

      );

    }

    return [...related];

  }

}