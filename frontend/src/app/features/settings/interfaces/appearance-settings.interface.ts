export type ThemeMode =

    'system'

    | 'light'

    | 'dark';

export type AccentColor =

    'blue'

    | 'purple'

    | 'green'

    | 'orange'

    | 'red';

export type LayoutDensity =

    'comfortable'

    | 'compact';

export interface AppearanceSettings {

    theme: ThemeMode;

    accentColor: AccentColor;

    fontSize: number;

    density: LayoutDensity;

}