import {
    Component,
    inject
} from '@angular/core';

import { AppearanceService } from '../../services/appearance.service';

@Component({
    selector: 'app-appearance-settings',
    standalone: true,
    imports: [],
    templateUrl: './appearance-settings.html',
    styleUrl: './appearance-settings.css'
})
export class AppearanceSettings {

    private appearanceService = inject(AppearanceService);

    readonly settings = this.appearanceService.settings;
    readonly theme = this.appearanceService.theme;
    readonly accentColor = this.appearanceService.accentColor;
    readonly fontSize = this.appearanceService.fontSize;
    readonly density = this.appearanceService.density;

    selectTheme(theme: 'system' | 'light' | 'dark'): void {
        this.appearanceService.setTheme(theme);
    }

    selectAccentColor(color: 'blue' | 'purple' | 'green' | 'orange' | 'red'): void {
        this.appearanceService.setAccentColor(color);
    }

    onFontSizeChange(event: Event): void {
        const value = Number((event.target as HTMLInputElement).value);
        this.appearanceService.setFontSize(value);
    }

    selectDensity(density: 'comfortable' | 'compact'): void {
        this.appearanceService.setDensity(density);
    }

    save(): void {
        this.appearanceService.save();
    }

    reset(): void {
        this.appearanceService.reset();
    }

}