import { useTheme } from '../theme-context.js';

export default function ThemeToggle({ themeId, setThemeId }) {
  const t = useTheme();
  const s = styles(t, themeId);

  return (
    <div style={s.wrap}>
      <button
        style={themeId === 'soft' ? s.activeBtn : s.baseBtn}
        onClick={() => setThemeId('soft')}
      >
        Soft
      </button>
      <button
        style={themeId === 'dense' ? s.activeBtn : s.baseBtn}
        onClick={() => setThemeId('dense')}
      >
        Dense
      </button>
    </div>
  );
}

function styles(t, themeId) {
  const baseBtn = {
    flex: 1,
    padding: '6px 8px',
    border: 'none',
    background: 'transparent',
    color: t.colors.sidebarTextMuted,
    fontSize: 12,
    fontWeight: 500,
    fontFamily: 'inherit',
    cursor: 'pointer',
    borderRadius: t.radius.pill,
  };
  return {
    wrap: {
      display: 'flex',
      gap: 4,
      padding: 3,
      background: t.colors.navHover,
      borderRadius: t.radius.pill,
      marginBottom: 12,
    },
    baseBtn,
    activeBtn: {
      ...baseBtn,
      background: themeId === 'soft' ? '#ffffff' : '#0d1117',
      color: t.colors.sidebarText,
      boxShadow:
        themeId === 'soft'
          ? '0 1px 2px rgba(0,0,0,0.06)'
          : '0 0 0 1px #30363d',
    },
  };
}
