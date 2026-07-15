import { Component, input } from '@angular/core';
import { Profile } from '../../interfaces/profile.interface';


@Component({
    selector: 'app-profile-info-card',
    standalone: true,
    imports: [],
    templateUrl: './profile-info-card.html',
    styleUrl: './profile-info-card.css'
})
export class ProfileInfoCard {

    profile = input.required<Profile>();

}