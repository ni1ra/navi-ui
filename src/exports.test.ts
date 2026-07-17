import { describe, expect, it } from 'vitest';
import * as Navi from './index';

const publicExports = [
  'NaviProvider', 'useNaviTheme', 'ThemeSwitcher', 'Button', 'IconButton', 'TextField', 'SelectField',
  'AppShell', 'TopNav', 'CommandDock', 'Surface', 'SegmentedControl', 'Tabs', 'Modal',
  'themeBlueprints', 'themeTokenKeys', 'createThemeStyle',
] as const;

describe('public package exports', () => {
  it.each(publicExports)('exports %s', name => { expect(Navi[name]).toBeDefined(); });
  it('does not accidentally expose implementation helpers', () => {
    expect(Object.keys(Navi).sort()).toEqual([...publicExports].sort());
  });
});
