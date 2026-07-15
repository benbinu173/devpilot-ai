import {
    Component,
    computed,
    effect,
    inject,
    input,
    signal
} from '@angular/core';

import { FormsModule } from '@angular/forms';

import { Profile } from '../../../profile/pages/profile/interfaces/profile.interface';
import { ProfileService } from '../../../profile/services/profile.service';
import { NotificationService } from '../../../../shared/services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({

    selector: 'app-account-settings',

    standalone: true,

    imports: [

        FormsModule

    ],

    templateUrl: './account-settings.html',

    styleUrl: './account-settings.css'

})
export class AccountSettings {

    // =====================================================
    // Input
    // =====================================================

    profile = input.required<Profile>();

    private profileService = inject(ProfileService);

private notification = inject(NotificationService);

    // =====================================================
    // Avatar
    // =====================================================

    readonly avatar = computed(() =>

        this.profile().avatar || ''

    );

    // =====================================================
    // Editable Form Signals
    // =====================================================


    readonly saving = signal(false);

    readonly name = signal('');

    readonly role = signal('');

    readonly company = signal('');

    readonly location = signal('');

    readonly website = signal('');

    readonly github = signal('');

    readonly linkedin = signal('');

    readonly bio = signal('');

    readonly avatarFile = signal<File | null>(null);

readonly avatarPreview = signal('');


    readonly nameValid = computed(() =>

    this.name().trim().length >= 3

);




readonly websiteValid = computed(() => {

    if (!this.website()) {

        return true;

    }

    return /^https?:\/\/.+/.test(

        this.website()

    );

});


readonly githubValid = computed(() => {

    if (!this.github()) {

        return true;

    }

    return this.github().includes(

        'github.com'

    );

});


readonly linkedinValid = computed(() => {

    if (!this.linkedin()) {

        return true;

    }

    return this.linkedin().includes(

        'linkedin.com'

    );

});


readonly hasChanges = computed(() => {

    const profile = this.profile();

    return (
        this.avatarFile() !== null ||

        this.name() !== profile.name ||

        this.role() !== (profile.role ?? '') ||

        this.company() !== (profile.company ?? '') ||

        this.location() !== (profile.location ?? '') ||

        this.website() !== (profile.website ?? '') ||

        this.github() !== (profile.github ?? '') ||

        this.linkedin() !== (profile.linkedin ?? '') ||

        this.bio() !== (profile.bio ?? '')

    );

});


readonly formValid = computed(() => {

    return (

        this.nameValid()

        && this.websiteValid()

        && this.githubValid()

        && this.linkedinValid()

    );

});


readonly updateRequest = computed(() => ({

    name: this.name().trim(),

    role: this.role().trim(),

    company: this.company().trim(),

    location: this.location().trim(),

    website: this.website().trim(),

    github: this.github().trim(),

    linkedin: this.linkedin().trim(),

    bio: this.bio().trim()

}));


resetForm(): void {

    const profile = this.profile();

    this.name.set(profile.name);

    this.role.set(profile.role ?? '');

    this.company.set(profile.company ?? '');

    this.location.set(profile.location ?? '');

    this.website.set(profile.website ?? '');

    this.github.set(profile.github ?? '');

    this.linkedin.set(profile.linkedin ?? '');

    this.bio.set(profile.bio ?? '');
    
    this.avatarFile.set(null);

this.avatarPreview.set('');

}

    // =====================================================
    // Populate Form
    // =====================================================

    constructor() {

        effect(() => {

            const profile = this.profile();

            this.name.set(profile.name);

            this.role.set(profile.role ?? '');

            this.company.set(profile.company ?? '');

            this.location.set(profile.location ?? '');

            this.website.set(profile.website ?? '');

            this.github.set(profile.github ?? '');

            this.linkedin.set(profile.linkedin ?? '');

            this.bio.set(profile.bio ?? '');

        });

    }

save(): void {

    if (!this.formValid() || !this.hasChanges()) {

        return;

    }

    this.saving.set(true);

    this.profileService
        .updateProfile(this.updateRequest())
        .subscribe({

            next: response => {

                this.saving.set(false);

                this.notification.success(

                    'Profile Updated',

                    'Your account settings have been saved successfully.'

                );

            },

            error: (error: HttpErrorResponse) => {

                this.saving.set(false);

                console.error(error);

                this.notification.error(

                    'Update Failed',

                    error.error?.message ??

                    'Unable to update your profile.'

                );

            }

        });

}
    

selectAvatar(event: Event): void {

    const input = event.target as HTMLInputElement;

    const file = input.files?.[0];

    if (!file) {

        return;

    }

    // =====================================================
    // Validate File Type
    // =====================================================

    const allowedTypes = [

        'image/jpeg',

        'image/png',

        'image/webp'

    ];

    if (!allowedTypes.includes(file.type)) {

        this.notification.error(

            'Invalid Image',

            'Only JPG, PNG and WEBP images are supported.'

        );

        return;

    }

    // =====================================================
    // Validate File Size
    // =====================================================

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {

        this.notification.error(

            'Image Too Large',

            'Maximum image size is 5 MB.'

        );

        return;

    }

    this.avatarFile.set(file);

    // =====================================================
    // Preview
    // =====================================================

    const reader = new FileReader();

    reader.onload = () => {

        this.avatarPreview.set(

            reader.result as string

        );

    };

    reader.readAsDataURL(file);

}


private uploadAvatar(): void {

    const file = this.avatarFile();

    if (!file) {

        this.finishSaving();

        return;

    }

    this.profileService

        .uploadAvatar(file)

        .subscribe({

            next: () => {

                this.avatarFile.set(null);

                this.avatarPreview.set('');

                this.finishSaving();

            },

            error: () => {

                this.saving.set(false);

                this.notification.error(

                    'Avatar Upload Failed',

                    'Unable to upload your profile picture.'

                );

            }

        });

}

    private finishSaving(): void {

    this.saving.set(false);

    this.notification.success(

        'Profile Updated',

        'Your account settings have been saved.'

    );

}

}