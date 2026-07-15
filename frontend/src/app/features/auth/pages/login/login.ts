import { Component, inject, signal, computed} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  private authService = inject(AuthService);

  private router = inject(Router);

  email = signal('');

  password = signal('');

  error = signal('');

  loading = signal(false);

  readonly showPassword = signal(false);

  readonly emailValid = computed(() =>

    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(

        this.email()

    )

);

readonly passwordValid = computed(() =>

    this.password().length >= 8

);

readonly formValid = computed(() =>

    this.emailValid() &&

    this.passwordValid()

);

readonly showEmailSuccess = computed(() =>

    this.email().length > 0 &&

    this.emailValid()

);

readonly showPasswordSuccess = computed(() =>

    this.password().length > 0 &&

    this.passwordValid()

);

  login(): void {

    if (!this.formValid()) {

    this.error.set(

        'Please correct the highlighted fields.'

    );

    return;

}

    this.error.set('');

    this.loading.set(true);

    this.authService.login({

      email: this.email(),

      password: this.password()

    }).subscribe({

      next: () => {

        this.authService.getCurrentUser().subscribe({

          next: () => {

            this.loading.set(false);

            this.router.navigate(['/dashboard']);

          },

          error: () => {

            this.loading.set(false);

          }

        });

      },

      error: (err) => {

        this.loading.set(false);

        this.error.set(

          err.error?.message ??

          'Login failed.'

        );

      }

    });

  }

  togglePasswordVisibility(): void {

    this.showPassword.update(value => !value);

}

}