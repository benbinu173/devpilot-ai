import { Injectable } from '@angular/core';

import { WorkspaceFile } from '../../features/developer-workspace/interfaces/workspace-file.interface';
import { SuggestedQuestion } from '../../features/developer-workspace/models/suggested-questions.interface';



@Injectable({
  providedIn:'root'
})
export class SuggestionEngineService{

  generate(file: WorkspaceFile | null): SuggestedQuestion[] {

    if (!file) {

        return [];

    }

    const language = file.language.toLowerCase();

    const name = file.name.toLowerCase();

    const content = file.content.toLowerCase();

    const suggestions: SuggestedQuestion[] = [];

    return suggestions;

}

}