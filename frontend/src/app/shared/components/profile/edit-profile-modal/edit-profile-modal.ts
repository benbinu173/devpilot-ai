import {
    Component,
    input,
    output,
    signal,
    effect,
    HostListener
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Profile } from '../../../../features/profile/pages/profile/interfaces/profile.interface';
import { UpdateProfile } from '../../../../features/profile/pages/profile/interfaces/update-profile.interface';

@Component({
    selector: 'app-edit-profile-modal',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './edit-profile-modal.html',
    styleUrl: './edit-profile-modal.css'
})
export class EditProfileModal {

    profile = input.required<Profile>();
    visible = input(false);
    saving = input(false);

    save = output<UpdateProfile>();
    close = output<void>();

    readonly name = signal('');
    readonly role = signal('');
    readonly company = signal('');
    readonly location = signal('');
    readonly website = signal('');
    readonly github = signal('');
    readonly linkedin = signal('');
    readonly bio = signal('');

    constructor() {
        effect(() => {
            const profile = this.profile();
            this.name.set(profile.name);
            this.role.set(profile.role);
            this.company.set(profile.company);
            this.location.set(profile.location);
            this.website.set(profile.website);
            this.github.set(profile.github);
            this.linkedin.set(profile.linkedin);
            this.bio.set(profile.bio);
        });
    }

    @HostListener('document:keydown.escape')
    onEscape(): void {
        if (this.visible() && !this.saving()) {
            this.onClose();
        }
    }

    onSave(): void {
        this.save.emit({
            name: this.name(),
            role: this.role(),
            company: this.company(),
            location: this.location(),
            website: this.website(),
            github: this.github(),
            linkedin: this.linkedin(),
            bio: this.bio(),
            avatar: this.profile().avatar
        });
    }

    onClose(): void {
        this.close.emit();
    }

}