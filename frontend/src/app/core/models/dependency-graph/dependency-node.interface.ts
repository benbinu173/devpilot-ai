import { DependencyImport } from './dependency-import.interface';
import { DependencyReference } from './dependency-reference.interface';
export interface DependencyNode {

  imports: DependencyImport[];

 importedBy: DependencyReference[];

  rawExports: string[];

  parsedExports: {

    type: string;

    name: string;

    isDefault: boolean;

    line: number;

  }[];

  classes: string[];

  interfaces: string[];

  functions: string[];

}