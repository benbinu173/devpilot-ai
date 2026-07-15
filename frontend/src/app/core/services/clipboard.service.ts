import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClipboardService {

  async copy(text: string): Promise<boolean> {

    try {

      await navigator.clipboard.writeText(text);

      return true;

    }

    catch (error) {

      console.error(

        'Failed to copy text.',

        error

      );

      return false;

    }

  }

}