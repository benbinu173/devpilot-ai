import {
    Component,
    computed,
    inject,
    signal
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { ProfileService } from '../../../profile/services/profile.service';
import { NotificationService } from '../../../../shared/services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({

    selector: 'app-security-settings',

    standalone: true,

    imports: [

        FormsModule

    ],

    templateUrl: './security-settings.html',

    styleUrl: './security-settings.css'

})
export class SecuritySettings {


    private profileService = inject(ProfileService);

private notification = inject(NotificationService);

    // =====================================================
    // Form Fields
    // =====================================================

    readonly currentPassword = signal('');

    readonly newPassword = signal('');

    readonly confirmPassword = signal('');

    // =====================================================
    // UI State
    // =====================================================

    readonly showCurrentPassword = signal(false);

    readonly showNewPassword = signal(false);

    readonly showConfirmPassword = signal(false);

    readonly saving = signal(false);

    // =====================================================
// Backend Errors
// =====================================================

readonly currentPasswordError = signal('');

readonly newPasswordError = signal('');

readonly confirmPasswordError = signal('');

    // =====================================================
    // Validation
    // =====================================================

    readonly passwordsMatch = computed(() =>

        this.confirmPassword().length > 0 &&

        this.newPassword() === this.confirmPassword()

    );

    readonly currentPasswordValid = computed(() =>

        this.currentPassword().trim().length > 0

    );

   readonly newPasswordValid = computed(() =>

    this.hasMinLength()

    && this.hasUppercase()

    && this.hasLowercase()

    && this.hasNumber()

    && this.hasSpecialCharacter()

);

readonly showCurrentPasswordSuccess = computed(() =>

    this.currentPasswordValid()

);

readonly showNewPasswordSuccess = computed(() =>

    this.newPasswordValid()

);

readonly showConfirmPasswordSuccess = computed(() =>

    this.confirmPassword().length > 0

    && this.passwordsMatch()

);

    readonly confirmPasswordValid = computed(() =>

        this.passwordsMatch()

    );

    readonly formValid = computed(() =>

        this.currentPasswordValid() &&

        this.newPasswordValid() &&

        this.confirmPasswordValid()

    );


    

    readonly passwordStrengthPercentage = computed(() => {

    return this.passwordStrengthScore() * 20;

});

readonly request = computed(() => ({

    currentPassword:

        this.currentPassword(),

    newPassword:

        this.newPassword(),

    confirmPassword:

        this.confirmPassword()

}));


    // =====================================================
// Password Strength Score
// =====================================================

readonly passwordStrengthScore = computed(() => {

    let score = 0;

    if (this.hasMinLength()) {

        score++;

    }

    if (this.hasUppercase()) {

        score++;

    }

    if (this.hasLowercase()) {

        score++;

    }

    if (this.hasNumber()) {

        score++;

    }

    if (this.hasSpecialCharacter()) {

        score++;

    }

    return score;

});


readonly passwordStrengthLabel = computed(() => {

    switch (this.passwordStrengthScore()) {

        case 0:

        case 1:

            return 'Weak';

        case 2:

            return 'Fair';

        case 3:

            return 'Good';

        case 4:

            return 'Very Strong';

        case 5:

            return 'Excellent';

        default:

            return 'Weak';

    }

});


readonly passwordStrengthClass = computed(() => {

    switch (this.passwordStrengthScore()) {

        case 0:

        case 1:

            return 'strength-weak';

        case 2:

            return 'strength-fair';

        case 3:

            return 'strength-good';

        case 4:

            return 'strength-strong';

        case 5:

            return 'strength-excellent';

        default:

            return 'strength-weak';

    }

});
    

    // =====================================================
// Password Rules
// =====================================================

readonly hasMinLength = computed(() =>

    this.newPassword().length >= 8

);

readonly hasUppercase = computed(() =>

    /[A-Z]/.test(

        this.newPassword()

    )

);

readonly hasLowercase = computed(() =>

    /[a-z]/.test(

        this.newPassword()

    )

);

readonly hasNumber = computed(() =>

    /\d/.test(

        this.newPassword()

    )

);

readonly hasSpecialCharacter = computed(() =>

    /[!@#$%^&*(),.?":{}|<>]/.test(

        this.newPassword()

    )

);


    // =====================================================
    // Dirty State
    // =====================================================

    readonly hasChanges = computed(() =>

        this.currentPassword().length > 0 ||

        this.newPassword().length > 0 ||

        this.confirmPassword().length > 0

    );

    // =====================================================
    // Toggle Password Visibility
    // =====================================================

    toggleCurrentPassword(): void {

        this.showCurrentPassword.update(value => !value);

    }

    toggleNewPassword(): void {

        this.showNewPassword.update(value => !value);

    }

    toggleConfirmPassword(): void {

        this.showConfirmPassword.update(value => !value);

    }

    // =====================================================
    // Reset Form
    // =====================================================

    resetForm(): void {

        this.currentPassword.set('');

        this.newPassword.set('');

        this.confirmPassword.set('');

    }


    save(): void {

    if (

        !this.formValid()

    ) {

        return;

    }

        this.clearErrors();
    this.saving.set(true);

    this.profileService

        .changePassword(

            this.request()

        )

        .subscribe({

            next: response => {

                this.saving.set(false);

                this.resetForm();

                this.notification.success(

                    'Password Updated',

                    response.message

                );

            },

         error: (error: HttpErrorResponse) => {

    this.saving.set(false);

    const message =

        error.error?.message ??

        'Unable to update password.';

    if (

        message.includes('Current password')

    ) {

        this.currentPasswordError.set(

            message

        );

    }

    else if (

        message.includes('match')

    ) {

        this.confirmPasswordError.set(

            message

        );

    }

    else {

        this.newPasswordError.set(

            message

        );

    }

    this.notification.error(

        'Update Failed',

        message

    );

}

        });

}


private clearErrors(): void {

    this.currentPasswordError.set('');

    this.newPasswordError.set('');

    this.confirmPasswordError.set('');

}

}