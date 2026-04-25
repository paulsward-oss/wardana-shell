# wardana-shell

Shared visual shell for the Wardana Life HQ system. Provides the sidebar, theme system (Soft / Dense), and layout used by every pillar dashboard.

## Why

Each pillar (HQ, Tax, Personal, Investments, Work) lives in its own GitHub repo + Cloudflare Pages project. They share visual continuity by depending on this package.

## Usage

In any pillar's `package.json`:

```json
"dependencies": {
  "wardana-shell": "github:paulsward-oss/wardana-shell"
}
```

In any pillar's `App.jsx`:

```jsx
import { AppShell } from 'wardana-shell';
import MyContent from './pages/MyContent.jsx';

export default function App() {
  return (
    <AppShell currentPillar="tax">
      <MyContent />
    </AppShell>
  );
}
```

In any component that needs theme tokens:

```jsx
import { useTheme } from 'wardana-shell';

export default function Card() {
  const t = useTheme();
  return <div style={{ background: t.colors.cardBg }}>...</div>;
}
```

## Exports

- `AppShell` — wrapper component (sidebar + theme + main pane). Pass `currentPillar` and your content as children.
- `useTheme()` — hook returning the active theme object.
- `themes` — `{ soft, dense }` theme definitions.
- `pillars` — canonical pillar list (id, name, icon, url, status).
- `ComingSoon` — placeholder rendered for pillars without a `url` yet.

## Updating

Edit any source file → push to main → in each pillar repo run `npm update wardana-shell` → commit + push → Cloudflare rebuilds.
