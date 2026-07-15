export interface DependencySymbol {

  id: string;

  fileName: string;

  export: {

    type: string;

    name: string;

    isDefault: boolean;

    line: number;

  };

}