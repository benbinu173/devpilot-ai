import { DependencyNode } from './dependency-node.interface';

export interface DependencyGraph {

  [fileName: string]: DependencyNode;

}