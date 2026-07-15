import {

    Injectable,

    signal

} from '@angular/core';

import { AiPatch } from '../models/ai-patch.interface';

@Injectable({

    providedIn:'root'

})

export class AiPatchService {

    currentPatch = signal<AiPatch | null>(

        null

    );

    setPatch(

        patch: AiPatch

    ) {

        this.currentPatch.set(

            patch

        );

    }

    clear() {

        this.currentPatch.set(

            null

        );

    }

    restore(patch: AiPatch): void {

    this.currentPatch.set(

        patch

    );

}

}