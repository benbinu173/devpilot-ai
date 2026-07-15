import {
    Injectable,
    inject,
    signal
} from '@angular/core';

import { HttpClient , HttpEventType } from '@angular/common/http';

import { finalize, tap } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Profile } from '../pages/profile/interfaces/profile.interface';
import { ProfileResponse } from '../pages/profile/interfaces/profile-response.interface';
import { UpdateProfile } from '../pages/profile/interfaces/update-profile.interface';
import { ChangePasswordRequest } from '../../settings/interfaces/change-password-request.interface';
import { ChangePasswordResponse } from '../../settings/interfaces/change-password-response.interface';



@Injectable({
    providedIn: 'root'
})
export class ProfileService {

    private http = inject(HttpClient);

    private api = `${environment.apiUrl}/profile`;

    readonly profile = signal<Profile | null>(null);

    readonly loading = signal(false);

    // =====================================================
    // Load Profile
    // =====================================================

    loadProfile() {

        this.loading.set(true);

        return this.http.get<ProfileResponse>(

            this.api

        ).pipe(

            tap(response => {

                this.profile.set(

                    response.profile

                );

                this.loading.set(false);

            })

        );

    }

    // =====================================================
    // Update Profile
    // =====================================================



updateProfile(profile: UpdateProfile) {

    this.loading.set(true);

    return this.http.put<ProfileResponse>(

        this.api,

        profile

    ).pipe(

        tap(response => {

            this.profile.set(

                response.profile

            );

        }),

        finalize(() => {

            this.loading.set(false);

        })

    );

}

// =====================================================
// Change Password
// =====================================================

changePassword(

    request: ChangePasswordRequest

) {

    this.loading.set(true);

    return this.http.post<ChangePasswordResponse>(

        `${this.api}/change-password`,

        request

    ).pipe(

        finalize(() => {

            this.loading.set(false);

        })

    );

}


// =====================================================
// Upload Avatar
// =====================================================

uploadAvatar(file: File) {

    const formData = new FormData();

    formData.append(

        'avatar',

        file

    );

    this.loading.set(true);

    return this.http.post<ProfileResponse>(

        `${this.api}/avatar`,

        formData

    ).pipe(

    tap(response => {

        this.profile.set(

            response.profile

        );

    }),

    finalize(() => {

        this.loading.set(false);

    })

);

}


    // =====================================================
    // Clear Profile
    // =====================================================

    clearProfile(): void {

        this.profile.set(null);

    }

}