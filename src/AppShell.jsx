import { useEffect, useState } from 'react';
import { themes, defaultThemeId } from './themes.js';
import { pillars } from './pillars.js';
import { ThemeContext } from './theme-context.js';
import Sidebar from './components/Sidebar.jsx';
import ComingSoon from './ComingSoon.jsx';

const STORAGE_KEY = 'wardana.theme';
const MOBILE_BREAKPOINT = 768;

export default function AppShell({ currentPillar = 'home', children }) {
  const [themeId, setThemeId] = useState(() => {
    if (typeof window === 'undefined') return defaultThemeId;
    const saved = window.localStorage?.getItem(STORAGE_KEY);
    return saved && themes[saved] ? saved : defaultThemeId;
  });

  // Which pillar's content is currently in the main pane.
  // Defaults to currentPillar (i.e. show children). Switches to another pillar
  // only when the user clicks a planned (no-URL) pillar — then we render ComingSoon.
  const [activeView, setActiveView] = useState(currentPillar);

  // Responsive state: mobile = sidebar becomes a slide-in drawer behind a hamburger.
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < MOBILE_BREAKPOINT;
  });
  const [drawerOpen, setDrawerOpen] = useState(false);

  const t = themes[themeId];

  // Persist theme + paint document background + colors.
  useEffect(() => {
    try {
      window.localStorage?.setItem(STORAGE_KEY, themeId);
    } catch (_) {
      // Private mode, storage disabled, etc. — non-fatal.
    }
    document.documentElement.style.background = t.colors.pageBg;
    document.body.style.background = t.colors.pageBg;
    document.body.style.color = t.colors.cardText;
    document.body.style.fontFamily = t.fonts.ui;
  }, [themeId, t]);

  // Track viewport size for responsive sidebar.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => {
      const mobile = window.innerWidth < MOBILE_BREAKPOINT;
      setIsMobile(mobile);
      // If we resized from mobile to desktop while drawer was open, close it.
      if (!mobile) setDrawerOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Lock body scroll when mobile drawer is open.
  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (isMobile && drawerOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = original; };
    }
  }, [isMobile, drawerOpen]);

  const handleNavClick = (pillarId) => {
    const pillar = pillars[pillarId];
    if (!pillar) return;

    // Always close the mobile drawer after a click — better UX.
    if (isMobile) setDrawerOpen(false);

    // Clicking the pillar we're currently on — reset to its main view.
    if (pillarId === currentPillar) {
      setActiveView(currentPillar);
      return;
    }

    // External pillar with a deployed URL — same-tab navigate, gives single-app feel.
    if (pillar.url) {
      window.location.href = pillar.url;
      return;
    }

    // Planned pillar with no URL yet — render ComingSoon inline.
    setActiveView(pillarId);
  };

  const renderMain = () => {
    if (activeView === currentPillar) return children;
    return <ComingSoon pillar={pillars[activeView]} />;
  };

  const s = styles(t, { isMobile, drawerOpen });

  return (
    <ThemeContext.Provider value={t}>
      <div data-theme={themeId} style={s.app}>
        {isMobile && (
          <header style={s.topBar}>
            <button
              aria-label="Open menu"
              onClick={() => setDrawerOpen(true)}
              style={s.hamburger}
            >
              <span style={s.hamburgerLine}></span>
              <span style={s.hamburgerLine}></span>
              <span style={s.hamburgerLine}></span>
            </button>
            <div style={s.topBarBrand}>
              <div style={s.topBarMark}>W</div>
              <span style={s.topBarName}>Wardana</span>
            </div>
            <div style={{ width: 36 }} />
          </header>
        )}

        {isMobile && drawerOpen && (
          <div
            onClick={() => setDrawerOpen(false)}
            style={s.backdrop}
            aria-hidden="true"
          />
        )}

        <Sidebar
          activeView={activeView}
          themeId={themeId}
          setThemeId={setThemeId}
          onNavClick={handleNavClick}
          isMobile={isMobile}
          drawerOpen={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        />

        <main style={s.main}>{renderMain()}</main>
      </div>
    </ThemeContext.Provider>
  );
}

function styles(t, { isMobile, drawerOpen }) {
  return {
    app: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      minHeight: '100vh',
      background: t.colors.pageBg,
      color: t.colors.cardText,
      fontFamily: t.fonts.ui,
    },

    topBar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '10px 16px',
      background: t.colors.sidebarBg,
      color: t.colors.sidebarText,
      borderBottom: `1px solid ${t.colors.sidebarBorder}`,
      position: 'sticky',
      top: 0,
      zIndex: 50,
      height: 56,
    },
    hamburger: {
      width: 36,
      height: 36,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 4,
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      padding: 0,
    },
    hamburgerLine: {
      width: 20,
      height: 2,
      background: t.colors.sidebarText,
      borderRadius: 1,
    },
    topBarBrand: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
    },
    topBarMark: {
      width: 28,
      height: 28,
      borderRadius: t.radius.md,
      background: t.colors.sidebarBrandMark,
      color: t.colors.sidebarBrandMarkText,
      fontWeight: 700,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 14,
      fontFamily: t.fonts.ui,
    },
    topBarName: {
      fontSize: 15,
      fontWeight: 600,
    },

    backdrop: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.45)',
      zIndex: 90,
      cursor: 'pointer',
    },

    main: {
      flex: 1,
      padding: isMobile ? '20px 16px' : '32px 40px',
      maxWidth: isMobile ? '100%' : 1100,
      width: '100%',
      minWidth: 0,
    },
  };
}
