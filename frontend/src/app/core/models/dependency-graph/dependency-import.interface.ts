import { DependencySymbol } from './dependency-symbol.interface';

export interface DependencyImport {

  module: string;

  symbols: string[];

  defaultImport: string | null;

  namespaceImport: string | null;

  isRelative: boolean;

  resolvedSymbols: DependencySymbol[];

}