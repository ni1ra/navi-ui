import { createContext, useCallback, useContext, useEffect, useMemo, useState, type CSSProperties, type ReactNode } from 'react';
import { createThemeStyle, type ThemeName } from './tokens';

export interface NaviProviderProps {
  children: ReactNode;
  theme?: ThemeName;
  defaultTheme?: ThemeName;
  onThemeChange?: (theme: ThemeName) => void;
  storageKey?: string | false;
  className?: string;
}

export interface NaviThemeContextValue {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
}

const NaviThemeContext = createContext<NaviThemeContextValue | null>(null);

export function NaviProvider({ children, theme: controlledTheme, defaultTheme = 'black', onThemeChange, storageKey = 'navi-theme', className }: NaviProviderProps) {
  const [internalTheme, setInternalTheme] = useState<ThemeName>(() => {
    if (!storageKey || typeof window === 'undefined') return defaultTheme;
    const saved = window.localStorage.getItem(storageKey);
    return saved === 'black' || saved === 'silver' || saved === 'blood' ? saved : defaultTheme;
  });
  const theme = controlledTheme ?? internalTheme;
  const setTheme = useCallback((nextTheme: ThemeName) => {
    if (controlledTheme === undefined) setInternalTheme(nextTheme);
    if (storageKey && typeof window !== 'undefined') window.localStorage.setItem(storageKey, nextTheme);
    onThemeChange?.(nextTheme);
  }, [controlledTheme, onThemeChange, storageKey]);
  const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);
  useEffect(() => { document.documentElement.style.colorScheme = theme === 'silver' ? 'light' : 'dark'; }, [theme]);

  return (
    <NaviThemeContext.Provider value={value}>
      <div className={['navi-root', className].filter(Boolean).join(' ')} data-navi-theme={theme} style={createThemeStyle(theme) as CSSProperties}>
        {children}
      </div>
    </NaviThemeContext.Provider>
  );
}

export function useNaviTheme(): NaviThemeContextValue {
  const context = useContext(NaviThemeContext);
  if (!context) throw new Error('useNaviTheme must be used within NaviProvider.');
  return context;
}

export function ThemeSwitcher({ className, label = 'Theme' }: { className?: string; label?: string }) {
  const { theme, setTheme } = useNaviTheme();
  return (
    <div className={['navi-theme-switcher', className].filter(Boolean).join(' ')} aria-label={label} role="group">
      {(['black', 'silver', 'blood'] as const).map(name => (
        <button key={name} type="button" className="navi-theme-switcher__option" aria-pressed={theme === name} onClick={() => setTheme(name)}>
          <span className={`navi-theme-switcher__swatch navi-theme-switcher__swatch--${name}`} aria-hidden="true" />
          {name}
        </button>
      ))}
    </div>
  );
}
