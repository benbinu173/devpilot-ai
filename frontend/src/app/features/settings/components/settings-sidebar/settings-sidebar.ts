import {
    Component,
    signal,
    input,
    output
} from '@angular/core';

import { SettingsNavItem } from '../../interfaces/settings-nav-item.interface';
import { SettingsSection } from '../../interfaces/settings-section.type';

@Component({
    selector: 'app-settings-sidebar',
    standalone: true,
    imports: [],
    templateUrl: './settings-sidebar.html',
    styleUrl: './settings-sidebar.css'
})
export class SettingsSidebar {

    selected = input.required<SettingsSection>();
    sectionChange = output<SettingsSection>();

    readonly items = signal<SettingsNavItem[]>([
        { id: 'account', label: 'Account', icon: '👤' },
        { id: 'security', label: 'Security', icon: '🔒' },
        { id: 'appearance', label: 'Appearance', icon: '🎨' },
        { id: 'ai', label: 'AI Preferences', icon: '🤖' },
        { id: 'notifications', label: 'Notifications', icon: '🔔' },
        { id: 'language', label: 'Language & Region', icon: '🌐' },
        { id: 'privacy', label: 'Privacy', icon: '🛡' },
        { id: 'danger', label: 'Danger Zone', icon: '⚠' }
    ]);

    select(section: SettingsSection): void {
        this.sectionChange.emit(section);
    }

}