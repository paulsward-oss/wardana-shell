import { useTheme } from './theme-context.js';

export default function ComingSoon({ pillar }) {
  const t = useTheme();
  const s = styles(t);

  if (!pillar) return null;

  const statusLabel =
    pillar.status === 'planned'
      ? t.id === 'dense'
        ? 'queued'
        : 'Coming soon'
      : t.id === 'dense'
        ? 'active · no dashboard'
        : 'Active — dashboard not yet built';

  const titleText =
    t.id === 'dense' ? pillar.name.toLowerCase() : pillar.name;

  const advisory =
    pillar.advisory ||
    (pillar.status === 'planned'
      ? `${pillar.name} is planned but not yet built. The Wardana shell will route here once it's deployed.`
      : `${pillar.name} is active but doesn't have a dashboard yet.`);

  return (
    <div style={s.wrap}>
      <div style={s.card}>
        {t.id === 'soft' && <div style={s.icon}>{pillar.icon}</div>}
        <h1 style={s.title}>{titleText}</h1>
        <div style={s.status}>{statusLabel}</div>
        <p style={s.advisory}>{advisory}</p>
      </div>
    </div>
  );
}

function styles(t) {
  return {
    wrap: { display: 'flex', justifyContent: 'center', paddingTop: 40 },
    card: {
      maxWidth: 520,
      width: '100%',
      background: t.colors.cardBg,
      borderRadius: t.radius.lg,
      padding: 40,
      border: `1px solid ${t.colors.cardBorder}`,
      boxShadow: t.colors.cardShadow,
      textAlign: 'center',
      color: t.colors.cardText,
    },
    icon: { fontSize: 48, marginBottom: 12 },
    title: {
      margin: '0 0 6px 0',
      fontSize: 28,
      fontWeight: t.id === 'dense' ? 500 : 700,
      color: t.colors.cardText,
      fontFamily: t.fonts.ui,
    },
    status: {
      fontSize: 12,
      textTransform: t.id === 'dense' ? 'lowercase' : 'uppercase',
      letterSpacing: 1.2,
      color: t.colors.heroAccent,
      marginBottom: 20,
      fontWeight: 500,
      fontFamily: t.fonts.mono,
    },
    advisory: {
      fontSize: 15,
      color: t.colors.cardText,
      lineHeight: 1.6,
      marginBottom: 0,
    },
  };
}
