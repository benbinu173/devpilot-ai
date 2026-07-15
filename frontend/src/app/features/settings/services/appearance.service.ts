import {
    Injectable,
    computed,
    signal
} from '@angular/core';

import {
    AccentColor,
    AppearanceSettings,
    LayoutDensity,
    ThemeMode
} from '../interfaces/appearance-settings.interface';

const STORAGE_KEY = 'devpilot-appearance-settings';

@Injectable({
    providedIn: 'root'
})
export class AppearanceService {

    private readonly defaultSettings: AppearanceSettings = {
        theme: 'system',
        accentColor: 'blue',
        fontSize: 16,
        density: 'comfortable'
    };

    private readonly settingsSignal = signal<AppearanceSettings>(
        this.loadFromStorage() ?? this.defaultSettings
    );

    readonly settings = computed(() => this.settingsSignal());
    readonly theme = computed(() => this.settingsSignal().theme);
    readonly accentColor = computed(() => this.settingsSignal().accentColor);
    readonly fontSize = computed(() => this.settingsSignal().fontSize);
    readonly density = computed(() => this.settingsSignal().density);

    setTheme(theme: ThemeMode): void {
        this.settingsSignal.update(settings => ({ ...settings, theme }));
    }

    setAccentColor(color: AccentColor): void {
        this.settingsSignal.update(settings => ({ ...settings, accentColor: color }));
    }

    setFontSize(fontSize: number): void {
        this.settingsSignal.update(settings => ({ ...settings, fontSize }));
    }

    setDensity(density: LayoutDensity): void {
        this.settingsSignal.update(settings => ({ ...settings, density }));
    }

    /**
     * Persists the current live settings so they survive reload.
     * NOTE: only writes to localStorage for now — swap the body
     * of this method for an API call once a backend endpoint exists.
     */
    save(): void {
        try {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(this.settingsSignal())
            );
        } catch (error) {
            console.error('Unable to save appearance settings.', error);
        }
    }

    reset(): void {
        this.settingsSignal.set(this.defaultSettings);
    }

    private loadFromStorage(): AppearanceSettings | null {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) as AppearanceSettings : null;
        } catch {
            return null;
        }
    }

}