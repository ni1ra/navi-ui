import { describe, expect, it } from 'vitest';
import { createThemeStyle, themeBlueprints, themeTokenKeys, type ThemeName } from './tokens';

const names: ThemeName[] = ['black', 'silver', 'blood'];

describe('theme blueprints', () => {
  it('keeps every theme on the same complete semantic schema', () => {
    const keys = names.map(name => Object.keys(createThemeStyle(name)).sort());
    expect(keys[1]).toEqual(keys[0]);
    expect(keys[2]).toEqual(keys[0]);
    expect(keys[0]).toHaveLength(themeTokenKeys.length);
    expect(themeTokenKeys.length).toBeGreaterThan(25);
  });

  it('defines distinct canvas, surface, text and accent decisions', () => {
    for (const key of ['canvas', 'surface', 'text', 'accent'] as const) {
      expect(new Set(names.map(name => themeBlueprints[name].color[key])).size).toBe(3);
    }
  });

  it('maps camel-case paths to stable CSS custom properties', () => {
    const style = createThemeStyle('black');
    expect(style['--navi-color-surface-elevated']).toBe(themeBlueprints.black.color.surfaceElevated);
    expect(style['--navi-motion-standard']).toBe(themeBlueprints.black.motion.standard);
  });
});
