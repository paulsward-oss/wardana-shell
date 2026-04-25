// themes.js — two visual modes for the Wardana shell.
// "soft"  = Apple-style calm, light, generous rounding
// "dense" = Bloomberg-style dark terminal, monospace, info-rich

export const themes = {
  soft: {
    id: 'soft',
    label: 'Soft',
    fonts: {
      ui: '"Inter", -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif',
      mono: '"JetBrains Mono", "SF Mono", Menlo, Consolas, monospace',
    },
    radius: { sm: 8, md: 12, lg: 16, pill: 999 },
    spacing: { card: 24, gap: 16 },
    colors: {
      pageBg: '#f5f5f7',

      sidebarBg: '#ffffff',
      sidebarBorder: '#e8e8ed',
      sidebarText: '#1d1d1f',
      sidebarTextMuted: '#86868b',
      sidebarBrandMark: '#0071e3',
      sidebarBrandMarkText: '#ffffff',
      navHover: '#f5f5f7',
      navActiveBg: '#eef2f6',
      navActiveText: '#0071e3',

      heroBg: '#ffffff',
      heroText: '#1d1d1f',
      heroLabel: '#86868b',
      heroAccent: '#0071e3',

      cardBg: '#ffffff',
      cardBorder: 'transparent',
      cardShadow: '0 1px 0 rgba(0,0,0,0.04), 0 6px 20px rgba(0,0,0,0.04)',
      cardText: '#1d1d1f',
      cardLabel: '#86868b',
      cardEofyBg: '#f5f5f7',
      cardEofyText: '#1d1d1f',

      ctaBg: '#0071e3',
      ctaText: '#ffffff',
      ctaDisabledBg: '#f5f5f7',
      ctaDisabledText: '#86868b',

      flagHigh: '#ff3b30',
      flagMedium: '#ff9500',
      flagLow: '#86868b',

      badgeActiveBg: '#e8f7ec',
      badgeActiveText: '#1b5e20',
      badgePlannedBg: '#fff3e0',
      badgePlannedText: '#bf6a00',

      footerText: '#86868b',
      divider: '#e8e8ed',
    },
  },

  dense: {
    id: 'dense',
    label: 'Dense',
    fonts: {
      ui: '"JetBrains Mono", "SF Mono", Menlo, Consolas, monospace',
      mono: '"JetBrains Mono", "SF Mono", Menlo, Consolas, monospace',
    },
    radius: { sm: 3, md: 4, lg: 6, pill: 3 },
    spacing: { card: 18, gap: 12 },
    colors: {
      pageBg: '#0d1117',

      sidebarBg: '#010409',
      sidebarBorder: '#30363d',
      sidebarText: '#c9d1d9',
      sidebarTextMuted: '#8b949e',
      sidebarBrandMark: '#f2a900',
      sidebarBrandMarkText: '#0d1117',
      navHover: '#161b22',
      navActiveBg: '#21262d',
      navActiveText: '#f2a900',

      heroBg: '#161b22',
      heroText: '#c9d1d9',
      heroLabel: '#8b949e',
      heroAccent: '#f2a900',

      cardBg: '#161b22',
      cardBorder: '#30363d',
      cardShadow: 'none',
      cardText: '#c9d1d9',
      cardLabel: '#8b949e',
      cardEofyBg: '#0d1117',
      cardEofyText: '#c9d1d9',

      ctaBg: '#f2a900',
      ctaText: '#0d1117',
      ctaDisabledBg: '#21262d',
      ctaDisabledText: '#8b949e',

      flagHigh: '#f85149',
      flagMedium: '#d29922',
      flagLow: '#8b949e',

      badgeActiveBg: 'rgba(63, 185, 80, 0.15)',
      badgeActiveText: '#3fb950',
      badgePlannedBg: 'rgba(210, 153, 34, 0.15)',
      badgePlannedText: '#d29922',

      footerText: '#8b949e',
      divider: '#30363d',
    },
  },
};

export const defaultThemeId = 'soft';
