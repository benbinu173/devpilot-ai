import { Component, input, output, signal } from '@angular/core';

@Component({
    selector: 'app-profile-header',
    standalone: true,
    imports: [],
    templateUrl: './profile-header.html',
    styleUrl: './profile-header.css'
})
export class ProfileHeader {

    name = input.required<string>();

    email = input.required<string>();

    role = input('Frontend Developer');

    joinedDate = input('Recently Joined');

    avatar = input('');

    edit = output<void>();

    /** Tracks whether the avatar image failed to load, so we can
     *  fall back to initials instead of showing a broken image. */
    imageError = signal(false);

    onEdit(): void {
        this.edit.emit();
    }

    onImageError(): void {
        this.imageError.set(true);
    }

    get hasAvatarImage(): boolean {
        return this.avatar().length > 0 && !this.imageError();
    }

    get initials(): string {

        return this.name()
            .split(' ')
            .filter(word => word.length > 0)
            .slice(0, 2)
            .map(word => word[0].toUpperCase())
            .join('');

    }

}