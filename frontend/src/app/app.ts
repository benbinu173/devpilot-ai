import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AuthService } from './core/services/auth.service';
import { Toast } from './shared/components/toast/toast';

@Component({
  selector: 'app-root',
  standalone: true,
 imports: [

        RouterOutlet,

        Toast

    ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  private authService = inject(AuthService);

  constructor() {

    if (this.authService.isLoggedIn()) {

      this.authService.getCurrentUser().subscribe({

        next: () => {

          console.log('✅ Session restored');

        },

        error: () => {

          this.authService.logout();

        }

      });

    }

  }

}