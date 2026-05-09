// Map.jsx — territorial map visualization with planted flags
// The hero centerpiece: a stylized district map with flags

const { useState, useEffect, useRef } = React;

const TERRITORIES = [
  { id: "yeonnam", name: "연남동", x: 18, y: 28, flag: "@kim_food", visits: 47, color: "#C13A2C" },
  { id: "seongsu", name: "성수동", x: 62, y: 22, flag: "@hana.eats", visits: 38, color: "#1F3A2E" },
  { id: "ikseon", name: "익선동", x: 44, y: 44, flag: "@regular_jay", visits: 64, color: "#C13A2C" },
  { id: "mangwon", name: "망원동", x: 26, y: 58, flag: "@manghan", visits: 29, color: "#B8893A" },
  { id: "euljiro", name: "을지로", x: 56, y: 64, flag: "@old_seoul", visits: 81, color: "#C13A2C" },
  { id: "yeonhui", name: "연희동", x: 14, y: 72, flag: "@daily_y", visits: 22, color: "#1F3A2E" },
  { id: "hapjeong", name: "합정", x: 36, y: 14, flag: "—", visits: 0, color: null },
  { id: "jongno", name: "종로", x: 76, y: 40, flag: "—", visits: 0, color: null },
];

function Flag({ x, y, color, label, visits, delay = 0, planted = true }) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShown(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  if (!planted || !color) {
    return (
      <g transform={`translate(${x}, ${y})`} opacity={shown ? 0.4 : 0}
         style={{ transition: "opacity 0.6s" }}>
        <circle r="4" fill="none" stroke="#8C8378" strokeWidth="0.7" strokeDasharray="1.5 1.5"/>
      </g>
    );
  }

  return (
    <g transform={`translate(${x}, ${y})`}
       style={{
         opacity: shown ? 1 : 0,
         transform: shown ? `translate(${x}px, ${y}px)` : `translate(${x}px, ${y - 8}px)`,
         transition: "opacity 0.5s, transform 0.6s cubic-bezier(0.2, 1.4, 0.4, 1)",
       }}>
      <circle r="4.5" fill={color} opacity="0.18"/>
      <circle r="2" fill={color}/>
      <line x1="0" y1="-1" x2="0" y2="-12" stroke="#161310" strokeWidth="0.6"/>
      <path d="M 0 -12 L 9 -10 L 7 -7.5 L 9 -5 L 0 -7" fill={color}/>
      <text x="6" y="6" fontSize="2.6" fontFamily="IBM Plex Mono, monospace" fill="#4A4239" fontWeight="500">{label}</text>
      <text x="6" y="9" fontSize="2.4" fontFamily="IBM Plex Mono, monospace" fill="#8C8378">{visits}회</text>
    </g>
  );
}

function MapVisual({ planted = TERRITORIES.length, animKey = 0 }) {
  return (
    <svg viewBox="0 0 100 90" style={{ width: "100%", height: "100%", display: "block" }}>
      <defs>
        <pattern id="paperGrain" patternUnits="userSpaceOnUse" width="2" height="2">
          <rect width="2" height="2" fill="#E8E2D5"/>
          <circle cx="0.4" cy="0.4" r="0.12" fill="#161310" opacity="0.06"/>
          <circle cx="1.5" cy="1.2" r="0.08" fill="#161310" opacity="0.04"/>
        </pattern>
        <pattern id="contour" patternUnits="userSpaceOnUse" width="6" height="6">
          <path d="M 0 3 Q 1.5 2 3 3 T 6 3" stroke="#8C8378" strokeWidth="0.18" fill="none" opacity="0.4"/>
        </pattern>
      </defs>

      {/* paper background with subtle grain */}
      <rect width="100" height="90" fill="url(#paperGrain)"/>

      {/* district shapes — abstracted irregular blocks */}
      <g opacity="0.85">
        <path d="M 8 18 Q 14 12 24 14 L 30 22 Q 28 30 22 32 L 14 30 Q 8 26 8 18 Z" fill="#DDD5C2" stroke="#8C8378" strokeWidth="0.25"/>
        <path d="M 30 22 L 38 14 Q 48 12 52 18 L 50 28 Q 44 32 36 30 Z" fill="#E8E2D5" stroke="#8C8378" strokeWidth="0.25"/>
        <path d="M 52 16 Q 62 10 70 14 L 74 22 Q 70 28 62 28 L 54 26 Z" fill="#DDD5C2" stroke="#8C8378" strokeWidth="0.25"/>
        <path d="M 8 30 Q 14 32 22 32 L 30 36 L 28 48 Q 22 54 14 52 L 8 44 Z" fill="#E8E2D5" stroke="#8C8378" strokeWidth="0.25"/>
        <path d="M 30 36 L 50 30 L 56 38 Q 54 48 46 50 L 36 48 L 28 48 Z" fill="#DDD5C2" stroke="#8C8378" strokeWidth="0.25"/>
        <path d="M 56 30 L 74 26 L 84 32 Q 82 42 74 44 L 60 42 L 56 38 Z" fill="#E8E2D5" stroke="#8C8378" strokeWidth="0.25"/>
        <path d="M 8 50 L 24 54 L 28 64 Q 22 72 12 70 L 6 60 Z" fill="#DDD5C2" stroke="#8C8378" strokeWidth="0.25"/>
        <path d="M 28 56 L 46 50 L 56 60 Q 54 70 44 72 L 30 68 Z" fill="#E8E2D5" stroke="#8C8378" strokeWidth="0.25"/>
        <path d="M 56 60 L 74 50 L 86 56 L 84 68 Q 76 76 64 72 L 56 68 Z" fill="#DDD5C2" stroke="#8C8378" strokeWidth="0.25"/>
      </g>

      {/* contour overlay */}
      <rect width="100" height="90" fill="url(#contour)" opacity="0.6"/>

      {/* roads / rivers */}
      <path d="M 0 38 Q 30 36 50 42 T 100 40" stroke="#8C8378" strokeWidth="0.4" fill="none" opacity="0.5" strokeDasharray="0.8 1.2"/>
      <path d="M 40 0 Q 44 30 38 50 Q 36 70 42 90" stroke="#8C8378" strokeWidth="0.3" fill="none" opacity="0.4" strokeDasharray="0.8 1.2"/>

      {/* compass */}
      <g transform="translate(88, 8)" opacity="0.6">
        <circle r="3.5" fill="none" stroke="#161310" strokeWidth="0.2"/>
        <path d="M 0 -3 L 0.6 0 L 0 3 L -0.6 0 Z" fill="#161310"/>
        <text x="0" y="-4.5" fontSize="2" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fill="#4A4239">N</text>
      </g>

      {/* scale bar */}
      <g transform="translate(6, 84)" opacity="0.5">
        <line x1="0" y1="0" x2="14" y2="0" stroke="#161310" strokeWidth="0.3"/>
        <line x1="0" y1="-1" x2="0" y2="1" stroke="#161310" strokeWidth="0.3"/>
        <line x1="14" y1="-1" x2="14" y2="1" stroke="#161310" strokeWidth="0.3"/>
        <text x="7" y="-2" fontSize="1.8" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fill="#4A4239">500m</text>
      </g>

      {/* district labels */}
      {TERRITORIES.map(t => (
        <text key={t.id+"-l"} x={t.x} y={t.y - 6} fontSize="2.2"
              textAnchor="middle" fontFamily="Pretendard, sans-serif"
              fill="#4A4239" fontWeight="500" opacity="0.7">
          {t.name}
        </text>
      ))}

      {/* flags */}
      {TERRITORIES.map((t, i) => (
        <Flag key={`${t.id}-${animKey}`}
              x={t.x} y={t.y}
              color={t.color}
              label={t.flag}
              visits={t.visits}
              planted={i < planted}
              delay={i * 120 + 200} />
      ))}
    </svg>
  );
}

window.MapVisual = MapVisual;
window.TERRITORIES = TERRITORIES;
