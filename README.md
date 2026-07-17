# Navi UI

Blueprint-driven React primitives with three complete semantic themes: `black`, `silver`, and `blood`.

```tsx
import { Button, NaviProvider, ThemeSwitcher } from 'navi-ui';
import 'navi-ui/styles.css';

export function App() {
  return <NaviProvider defaultTheme="black">
    <ThemeSwitcher />
    <Button>Start match</Button>
  </NaviProvider>;
}
```

## Development

```bash
pnpm install
pnpm dev
pnpm check
pnpm pack --dry-run
```

The provider owns semantic CSS custom properties. Components never branch on theme names. `prefers-reduced-motion` collapses decorative animation and transitions globally within a Navi root.
