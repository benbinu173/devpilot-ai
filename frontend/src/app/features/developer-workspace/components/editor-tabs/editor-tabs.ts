import { Component, inject } from '@angular/core';

import { WorkspaceService } from '../../services/workspace.service';

@Component({

  selector: 'app-editor-tabs',

  standalone: true,

  imports: [],

  templateUrl: './editor-tabs.html',

  styleUrl: './editor-tabs.css'

})
export class EditorTabs {

  workspace = inject(WorkspaceService);

}