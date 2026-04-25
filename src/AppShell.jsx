import { useEffect, useState } from 'react';
import { themes, defaultThemeId } from './themes.js';
import { pillars } from './pillars.js';
import { ThemeContext } from './theme-context.js';
import Sidebar from './components/Sidebar.jsx';
import ComingSoon from './ComingSoon.jsx';

const STORAGE_KEY = 'wardana.theme';

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

  const t = themes[themeId];

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

  const handleNavClick = (pillarId) => {
    const pillar = pillars[pillarId];
    if (!pillar) return;

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

  return (
    <ThemeContext.Provider value={t}>
      <div data-theme={themeId} style={styles(t).app}>
        <Sidebar
          activeView={activeView}
          themeId={themeId}
          setThemeId={setThemeId}
          onNavClick={handleNavClick}
        />
        <main style={styles(t).main}>{renderMain()}</main>
      </div>
    </ThemeContext.Provider>
  );
}

function styles(t) {
  return {
    app: {
      display: 'flex',
      minHeight: '100vh',
      background: t.colors.pageBg,
      color: t.colors.cardText,
      fontFamily: t.fonts.ui,
    },
    main: {
      flex: 1,
      padding: '32px 40px',
      maxWidth: 1100,
    },
  };
}
