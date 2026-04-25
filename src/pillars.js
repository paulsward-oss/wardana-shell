// pillars.js — canonical pillar list. Single source of truth for sidebar nav.
// Update here when a new pillar deploys (set its url) or moves between phases.

export const pillars = {
  home: {
    id: 'home',
    name: 'Life HQ',
    icon: '☀️',
    url: 'https://wardana.pages.dev',
    status: 'active',
  },
  tax: {
    id: 'tax',
    name: 'Tax',
    icon: '💰',
    url: 'https://tax-dashboard-fy2026.pages.dev',
    status: 'active',
  },
  personal: {
    id: 'personal',
    name: 'Personal',
    icon: '🏠',
    url: null,
    status: 'active',
  },
  investments: {
    id: 'investments',
    name: 'Investments',
    icon: '📈',
    url: null,
    status: 'planned',
  },
  work: {
    id: 'work',
    name: 'Work',
    icon: '💼',
    url: null,
    status: 'planned',
  },
};

export const navOrder = ['home', 'personal', 'investments', 'work', 'tax'];
