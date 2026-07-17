import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { NaviProvider, ThemeSwitcher, useNaviTheme } from './provider';

function Readout() { const { theme } = useNaviTheme(); return <output>{theme}</output>; }

describe('NaviProvider', () => {
  it('switches an uncontrolled theme and persists it', () => {
    localStorage.clear();
    render(<NaviProvider defaultTheme="black"><ThemeSwitcher/><Readout/></NaviProvider>);
    fireEvent.click(screen.getByRole('button', { name: /silver/i }));
    expect(screen.getByText('silver', { selector: 'output' })).toBeInTheDocument();
    expect(localStorage.getItem('navi-theme')).toBe('silver');
    expect(screen.getByRole('button', { name: /silver/i })).toHaveAttribute('aria-pressed', 'true');
  });

  it('reports controlled changes without mutating the rendered theme', () => {
    const onThemeChange = vi.fn();
    render(<NaviProvider theme="blood" onThemeChange={onThemeChange} storageKey={false}><ThemeSwitcher/><Readout/></NaviProvider>);
    fireEvent.click(screen.getByRole('button', { name: /black/i }));
    expect(onThemeChange).toHaveBeenCalledWith('black');
    expect(screen.getByText('blood', { selector: 'output' })).toBeInTheDocument();
  });

  it('fails clearly outside its provider', () => {
    expect(() => render(<Readout/>)).toThrow('useNaviTheme must be used within NaviProvider.');
  });
});
