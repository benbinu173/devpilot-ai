import { Component, inject, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  private authService = inject(AuthService);

  private router = inject(Router);

  readonly name = signal('');

  readonly email = signal('');

  readonly password = signal('');

  readonly confirmPassword = signal('');

  readonly loading = signal(false);

  readonly error = signal('');

  readonly showPassword = signal(false);

readonly showConfirmPassword = signal(false);

readonly showNameSuccess = computed(() =>

  this.name().trim().length > 0 &&

  this.nameValid()

);

readonly showEmailSuccess = computed(() =>

  this.email().length > 0 &&

  this.emailValid()

);

readonly showPasswordSuccess = computed(() =>

  this.password().length > 0 &&

  this.passwordValid()

);

readonly showConfirmSuccess = computed(() =>

  this.confirmPassword().length > 0 &&

  this.passwordsMatch()

);

  readonly passwordStrength = computed(() => {

  const password = this.password();

  let score = 0;

  if (password.length >= 8) {

    score++;

  }

  if (/[A-Z]/.test(password)) {

    score++;

  }

  if (/[a-z]/.test(password)) {

    score++;

  }

  if (/[0-9]/.test(password)) {

    score++;

  }

  if (/[^A-Za-z0-9]/.test(password)) {

    score++;

  }

  return score;

});

readonly passwordStrengthLabel = computed(() => {

  switch (this.passwordStrength()) {

    case 0:
    case 1:
      return 'Very Weak';

    case 2:
      return 'Weak';

    case 3:
      return 'Medium';

    case 4:
      return 'Strong';

    case 5:
      return 'Very Strong';

    default:
      return '';
  }

});

readonly passwordStrengthPercentage = computed(() =>

  (this.passwordStrength() / 5) * 100

);

readonly passwordStrengthClass = computed(() => {

  switch (this.passwordStrength()) {

    case 0:
    case 1:
      return 'strength-weak';

    case 2:
      return 'strength-low';

    case 3:
      return 'strength-medium';

    case 4:
      return 'strength-strong';

    case 5:
      return 'strength-very-strong';

    default:
      return '';

  }

});

  readonly nameValid = computed(() =>

  this.name().trim().length >= 3

);

readonly emailValid = computed(() =>

  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(

    this.email()

  )

);

readonly passwordValid = computed(() =>

  this.password().length >= 8

);

readonly passwordsMatch = computed(() =>

  this.password() === this.confirmPassword() &&

  this.confirmPassword().length > 0

);

readonly formValid = computed(() =>

  this.nameValid() &&

  this.emailValid() &&

  this.passwordValid() &&

  this.passwordsMatch()

);

  register(): void {

    this.error.set('');

    if (!this.name().trim()) {

      this.error.set('Full name is required.');

      return;

    }

    if (!this.email().trim()) {

      this.error.set('Email is required.');

      return;

    }

    if (!this.password()) {

      this.error.set('Password is required.');

      return;

    }

    if (this.password() !== this.confirmPassword()) {

      this.error.set('Passwords do not match.');

      return;

    }

    this.loading.set(true);

    this.authService.register({

      name: this.name(),

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

      error: err => {

        this.loading.set(false);

        this.error.set(

          err.error?.message ??

          'Registration failed.'

        );

      }

    });

  }

  togglePasswordVisibility(): void {

    this.showPassword.update(value => !value);

}

toggleConfirmPasswordVisibility(): void {

    this.showConfirmPassword.update(value => !value);

}

}