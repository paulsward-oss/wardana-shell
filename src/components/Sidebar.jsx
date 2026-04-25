import { pillars, navOrder } from '../pillars.js';
import { useTheme } from '../theme-context.js';
import ThemeToggle from './ThemeToggle.jsx';

export default function Sidebar({ activeView, themeId, setThemeId, onNavClick }) {
  const t = useTheme();
  const s = styles(t);

  return (
    <aside style={s.sidebar}>
      <div style={s.brand}>
        <div style={s.brandMark}>W</div>
        <div>
          <div style={s.brandName}>WARDANA</div>
          <div style={s.brandSub}>Life HQ</div>
        </div>
      </div>

      <nav style={s.nav}>
        {navOrder.map((pillarId) => {
          const pillar = pillars[pillarId];
          if (!pillar) return null;
          const isActive = pillarId === activeView;
          // Show external arrow only for nav items that would navigate away.
          const showExt = !!pillar.url && !isActive;
          return (
            <button
              key={pillarId}
              onClick={() => onNavClick(pillarId)}
              style={{
                ...s.navItem,
                ...(isActive ? s.navItemActive : {}),
              }}
            >
              <span style={s.navIcon}>{pillar.icon}</span>
              <span style={s.navLabel}>
                {t.id === 'dense' ? pillar.name.toLowerCase() : pillar.name}
              </span>
              {showExt && <span style={s.navExt}>↗</span>}
            </button>
          );
        })}
      </nav>

      <ThemeToggle themeId={themeId} setThemeId={setThemeId} />

      <div style={s.footer}>
        <div>Phase 1</div>
        <div style={{ opacity: 0.65 }}>
          v0.1 · {new Date().toLocaleDateString('en-AU')}
        </div>
      </div>
    </aside>
  );
}

function styles(t) {
  return {
    sidebar: {
      width: 240,
      background: t.colors.sidebarBg,
      color: t.colors.sidebarText,
      display: 'flex',
      flexDirection: 'column',
      padding: '24px 16px',
      position: 'sticky',
      top: 0,
      height: '100vh',
      flexShrink: 0,
      borderRight: `1px solid ${t.colors.sidebarBorder}`,
    },
    brand: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginBottom: 32,
      padding: '0 8px',
    },
    brandMark: {
      width: 36,
      height: 36,
      borderRadius: t.radius.md,
      background: t.colors.sidebarBrandMark,
      color: t.colors.sidebarBrandMarkText,
      fontWeight: 700,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 18,
      fontFamily: t.fonts.ui,
    },
    brandName: { fontWeight: 600, fontSize: 16, lineHeight: 1.1 },
    brandSub: {
      fontSize: 12,
      color: t.colors.sidebarTextMuted,
      marginTop: 2,
    },
    nav: { display: 'flex', flexDirection: 'column', gap: 4, flex: 1 },
    navItem: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '10px 12px',
      background: 'transparent',
      color: t.colors.sidebarText,
      border: 'none',
      borderRadius: t.radius.sm,
      cursor: 'pointer',
      fontSize: 14,
      fontFamily: 'inherit',
      textAlign: 'left',
      transition: 'background 0.15s',
    },
    navItemActive: {
      background: t.colors.navActiveBg,
      color: t.colors.navActiveText,
      fontWeight: 500,
    },
    navIcon: { fontSize: 16, width: 20, display: 'inline-block' },
    navLabel: { flex: 1 },
    navExt: { color: t.colors.sidebarTextMuted, fontSize: 12 },
    footer: {
      fontSize: 11,
      color: t.colors.sidebarTextMuted,
      padding: '0 8px',
      lineHeight: 1.5,
    },
  };
}
