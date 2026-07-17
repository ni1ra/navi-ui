export type ThemeName = 'black' | 'silver' | 'blood';

export interface ThemeBlueprint {
  color: {
    canvas: string;
    canvasGlow: string;
    surface: string;
    surfaceElevated: string;
    surfaceInset: string;
    text: string;
    textMuted: string;
    border: string;
    borderStrong: string;
    accent: string;
    accentHover: string;
    accentContrast: string;
    focus: string;
    success: string;
    warning: string;
    destructive: string;
    disabled: string;
    scrim: string;
  };
  typography: {
    sans: string;
    display: string;
    mono: string;
  };
  radius: { sm: string; md: string; lg: string; pill: string };
  shadow: { low: string; high: string; glow: string };
  motion: { fast: string; standard: string; slow: string; ease: string };
}

const fontSans = 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
const fontDisplay = '"Arial Narrow", "Roboto Condensed", Inter, ui-sans-serif, system-ui, sans-serif';
const fontMono = '"SFMono-Regular", Consolas, "Liberation Mono", monospace';
const shared = {
  typography: { sans: fontSans, display: fontDisplay, mono: fontMono },
  radius: { sm: '0.5rem', md: '0.875rem', lg: '1.375rem', pill: '999px' },
  motion: { fast: '120ms', standard: '220ms', slow: '480ms', ease: 'cubic-bezier(.2,.8,.2,1)' },
} as const;

export const themeBlueprints: Record<ThemeName, ThemeBlueprint> = {
  black: {
    ...shared,
    color: {
      canvas: '#08090b', canvasGlow: '#24201c', surface: '#111318', surfaceElevated: '#191c22', surfaceInset: '#050607',
      text: '#f7f7f4', textMuted: '#a7a9b0', border: '#2b2e35', borderStrong: '#4a4e57', accent: '#ff5a1f',
      accentHover: '#ff7442', accentContrast: '#120601', focus: '#ffb28f', success: '#50d890', warning: '#f3b73f',
      destructive: '#ff4d5f', disabled: '#676a72', scrim: 'rgba(0,0,0,.72)',
    },
    shadow: { low: '0 10px 30px rgba(0,0,0,.28)', high: '0 28px 80px rgba(0,0,0,.52)', glow: '0 0 42px rgba(255,90,31,.18)' },
  },
  silver: {
    ...shared,
    color: {
      canvas: '#eef0f3', canvasGlow: '#ffffff', surface: '#fafbfc', surfaceElevated: '#ffffff', surfaceInset: '#e4e7eb',
      text: '#111319', textMuted: '#5f6570', border: '#ccd1d8', borderStrong: '#9098a3', accent: '#d94712',
      accentHover: '#bd3606', accentContrast: '#ffffff', focus: '#9b2e08', success: '#137b47', warning: '#9a6200',
      destructive: '#bf2235', disabled: '#8e949d', scrim: 'rgba(20,24,30,.56)',
    },
    shadow: { low: '0 12px 32px rgba(34,43,55,.10)', high: '0 30px 90px rgba(34,43,55,.22)', glow: '0 0 46px rgba(217,71,18,.14)' },
  },
  blood: {
    ...shared,
    color: {
      canvas: '#130305', canvasGlow: '#4a090f', surface: '#220609', surfaceElevated: '#31090d', surfaceInset: '#0d0203',
      text: '#fff5f3', textMuted: '#d0a4a3', border: '#5c161d', borderStrong: '#91303a', accent: '#ff3048',
      accentHover: '#ff5d70', accentContrast: '#1a0003', focus: '#ffbdc5', success: '#5ddb96', warning: '#f8bd4a',
      destructive: '#ff6374', disabled: '#8b5c61', scrim: 'rgba(14,0,2,.78)',
    },
    shadow: { low: '0 12px 34px rgba(0,0,0,.34)', high: '0 30px 90px rgba(0,0,0,.62)', glow: '0 0 52px rgba(255,48,72,.22)' },
  },
};

function flatten(value: object, prefix = ''): Record<string, string> {
  return Object.entries(value).reduce<Record<string, string>>((result, [key, entry]) => {
    const path = prefix ? `${prefix}-${key}` : key;
    if (typeof entry === 'object' && entry !== null) Object.assign(result, flatten(entry, path));
    else result[path] = String(entry);
    return result;
  }, {});
}

export const themeTokenKeys = Object.freeze(Object.keys(flatten(themeBlueprints.black)));

export function createThemeStyle(theme: ThemeName): Record<`--navi-${string}`, string> {
  const flattened = flatten(themeBlueprints[theme]);
  return Object.fromEntries(Object.entries(flattened).map(([key, value]) => [`--navi-${key.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)}`, value])) as Record<`--navi-${string}`, string>;
}
