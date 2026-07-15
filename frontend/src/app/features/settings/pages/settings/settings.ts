import { Component, inject, signal } from '@angular/core';
import { SettingsSidebar } from '../../components/settings-sidebar/settings-sidebar';
import { SettingsSection } from '../../interfaces/settings-section.type';
import { AccountSettings } from '../../components/account-settings/account-settings';
import { ProfileService } from '../../../profile/services/profile.service';
import { SecuritySettings } from '../../components/security-settings/security-settings';
import { AppearanceSettings } from '../../components/appearance-settings/appearance-settings';

@Component({
    selector: 'app-settings',
    standalone: true,
    imports: [
        SettingsSidebar,
        AccountSettings,
        SecuritySettings,
        AppearanceSettings
    ],
    templateUrl: './settings.html',
    styleUrl: './settings.css'
})
export class Settings {

    readonly selectedSection = signal<SettingsSection>('account');

    private profileService = inject(ProfileService);

    readonly profile = this.profileService.profile;
    readonly loading = this.profileService.loading;

    constructor() {
        this.profileService.loadProfile().subscribe();
    }

    changeSection(section: SettingsSection): void {
        this.selectedSection.set(section);
    }
}