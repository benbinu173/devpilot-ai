import { Component, inject, signal  } from '@angular/core';

import { ProfileHeader } from './components/profile-header/profile-header';
import { ProfileStatCard } from './components/profile-stat-card/profile-stat-card';


import { ProfileService } from '../../services/profile.service';
import { DashboardService } from '../../../dashboard/services/dashboard.service';
import { ProfileInfoCard } from './components/profile-info-card/profile-info-card';
import { EditProfileModal } from '../../../../shared/components/profile/edit-profile-modal/edit-profile-modal';
import { UpdateProfile } from './interfaces/update-profile.interface';
import { NotificationService } from '../../../../shared/services/notification.service';



@Component({

    selector: 'app-profile',

    standalone: true,

    imports: [

        ProfileHeader,

        ProfileStatCard,

        ProfileInfoCard,

        EditProfileModal

    ],

    templateUrl: './profile.html',

    styleUrl: './profile.css'

})
export class Profile {

    private profileService = inject(ProfileService);

    private dashboardService = inject(DashboardService);

    private notification = inject(

    NotificationService

);

    readonly editModalOpen = signal(false);

    readonly profile =

        this.profileService.profile;

    readonly loading =

        this.profileService.loading;

    readonly stats =

        this.dashboardService.stats;
        

    constructor() {

        this.profileService

            .loadProfile()

            .subscribe();

    }

    openEditModal(): void {

    this.editModalOpen.set(true);

}

closeEditModal(): void {

    this.editModalOpen.set(false);

}


saveProfile(profile: UpdateProfile): void {

    this.profileService

        .updateProfile(profile)

        .subscribe({

            next: () => {

                this.notification.success(

                    'Profile Updated',

                    'Your profile has been updated successfully.'

                );

                this.closeEditModal();

            },

            error: error => {

                console.error(error);

                this.notification.error(

                    'Update Failed',

                    'Unable to update your profile.'

                );

            }

        });

}
}