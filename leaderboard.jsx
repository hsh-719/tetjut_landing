// Leaderboard.jsx — interactive leaderboard preview

const { useState: useStateLB, useEffect: useEffectLB } = React;

const RESTAURANTS = [
  {
    id: "halmae",
    name: "옥분이네 손칼국수",
    type: "칼국수 · 1973년 개업",
    address: "을지로3가 · 서울",
    rating: 4.7,
    occupier: { handle: "@old_seoul", visits: 81, spend: 1248000, since: "2023.04", reviews: 24 },
    rankings: [
      { rank: 1, handle: "@old_seoul", visits: 81, spend: "₩1,248,000", points: 9842, trend: "▲" },
      { rank: 2, handle: "@office_lunch", visits: 56, spend: "₩892,400", points: 6710, trend: "▲" },
      { rank: 3, handle: "@noodle_lover", visits: 41, spend: "₩614,200", points: 4892, trend: "—" },
      { rank: 4, handle: "@kim.j", visits: 28, spend: "₩398,000", points: 3120, trend: "▼" },
      { rank: 5, handle: "@chase_kim", visits: 22, spend: "₩336,500", points: 2654, trend: "▲" },
    ],
    representative: {
      headline: "12시 30분 넘으면 면이 다 떨어집니다. 진짜로요.",
      body: "10년째 다니는 단골이라 자신있게 말합니다. 바지락 칼국수 시키시고, 양념장은 반만 푸세요. 사장님이 직접 만든 김치 맛이 진짜인데 다들 이걸 안 먹고 가더라고요. 화요일은 휴무.",
    },
  },
  {
    id: "samhae",
    name: "삼해집",
    type: "닭한마리 · 종로",
    address: "종로5가 · 서울",
    rating: 4.5,
    occupier: { handle: "@regular_jay", visits: 64, spend: "1,920,000", since: "2022.11", reviews: 31 },
    rankings: [
      { rank: 1, handle: "@regular_jay", visits: 64, spend: "₩1,920,000", points: 8412, trend: "—" },
      { rank: 2, handle: "@dak.lover", visits: 48, spend: "₩1,344,000", points: 5882, trend: "▲" },
      { rank: 3, handle: "@jongnoman", visits: 39, spend: "₩1,092,000", points: 4778, trend: "▲" },
      { rank: 4, handle: "@h.park", visits: 31, spend: "₩868,000", points: 3801, trend: "▼" },
      { rank: 5, handle: "@taste_seoul", visits: 24, spend: "₩672,000", points: 2944, trend: "▲" },
    ],
    representative: {
      headline: "사리는 칼국수 두 개. 무조건.",
      body: "겨울에 가야 진가가 나오는 집. 4명 이상이면 닭 두 마리 시키시고, 마지막에 죽 만들어 달라고 하세요. 사장님이 미리 말 안 하면 잊어버리실 때 있음.",
    },
  },
  {
    id: "yeonnam",
    name: "연남방앗간",
    type: "한식 · 연남동",
    address: "연남동 · 서울",
    rating: 4.6,
    occupier: { handle: "@kim_food", visits: 47, spend: "564,000", since: "2024.01", reviews: 18 },
    rankings: [
      { rank: 1, handle: "@kim_food", visits: 47, spend: "₩564,000", points: 5612, trend: "▲" },
      { rank: 2, handle: "@ynam_local", visits: 38, spend: "₩471,200", points: 4533, trend: "—" },
      { rank: 3, handle: "@h_eats", visits: 29, spend: "₩376,400", points: 3408, trend: "▲" },
      { rank: 4, handle: "@walk_seoul", visits: 21, spend: "₩282,000", points: 2517, trend: "▼" },
      { rank: 5, handle: "@s.j", visits: 14, spend: "₩196,400", points: 1689, trend: "▲" },
    ],
    representative: {
      headline: "혼밥 가능. 카운터 자리가 명당입니다.",
      body: "솥밥 메뉴가 메인이지만, 오히려 점심 정식이 가성비 최고. 들기름 막국수는 여름 한정인데 사장님이 직접 짜시는 들기름 쓰셔서 다른 데랑 차원이 다름.",
    },
  },
];

function TrendBadge({ t }) {
  const color = t === "▲" ? "#1F3A2E" : t === "▼" ? "#C13A2C" : "#8C8378";
  return <span style={{ color, fontSize: 11, fontFamily: "var(--font-mono)" }}>{t}</span>;
}

function Leaderboard() {
  const [activeId, setActiveId] = useStateLB(RESTAURANTS[0].id);
  const [animTick, setAnimTick] = useStateLB(0);
  const r = RESTAURANTS.find(x => x.id === activeId);

  useEffectLB(() => { setAnimTick(t => t + 1); }, [activeId]);

  return (
    <div className="lb-wrap">
      {/* tab selector */}
      <div className="lb-tabs">
        <span className="kicker no-line" style={{ marginRight: 8 }}>매장 선택</span>
        {RESTAURANTS.map(rest => (
          <button key={rest.id}
                  className={`lb-tab ${rest.id === activeId ? "active" : ""}`}
                  onClick={() => setActiveId(rest.id)}>
            {rest.name}
          </button>
        ))}
      </div>

      <div key={animTick} className="lb-card reveal-stagger in">
        {/* header */}
        <div className="lb-header">
          <div>
            <div className="kicker kicker-flag">현재 점령 중</div>
            <h3 style={{ marginTop: 12, marginBottom: 6, fontSize: "clamp(28px, 3vw, 40px)" }}>{r.name}</h3>
            <div className="mono" style={{ color: "var(--ink-mute)", fontSize: 13 }}>
              {r.type} · {r.address}
            </div>
          </div>
          <div className="lb-rating">
            <div className="mono" style={{ fontSize: 11, color: "var(--ink-mute)", letterSpacing: "0.1em" }}>RATING</div>
            <div className="mono tnum" style={{ fontSize: 28, fontWeight: 600 }}>{r.rating.toFixed(1)}</div>
          </div>
        </div>

        {/* main grid: occupier card + rankings */}
        <div className="lb-grid">
          {/* OCCUPIER REPRESENTATIVE */}
          <div className="lb-occupier">
            <div className="occ-badge">
              <svg width="18" height="22" viewBox="0 0 18 22" style={{ display: "block" }}>
                <line x1="2" y1="0" x2="2" y2="22" stroke="#161310" strokeWidth="1.2"/>
                <path d="M 2 1 L 17 4 L 14 8 L 17 12 L 2 9 Z" fill="#C13A2C"/>
              </svg>
              <span className="mono" style={{ fontSize: 11, letterSpacing: "0.12em", color: "var(--ink-soft)" }}>
                점령자 · OCCUPIER
              </span>
            </div>

            <div className="occ-handle">{r.occupier.handle}</div>

            <div className="occ-stats">
              <div>
                <div className="occ-stat-label mono">방문</div>
                <div className="occ-stat-val tnum"><span>{r.occupier.visits}</span><i>회</i></div>
              </div>
              <div>
                <div className="occ-stat-label mono">사용</div>
                <div className="occ-stat-val tnum">
                  <span>₩{(typeof r.occupier.spend === "number" ? r.occupier.spend : parseInt(String(r.occupier.spend).replace(/[^0-9]/g, ""))).toLocaleString()}</span>
                </div>
              </div>
              <div>
                <div className="occ-stat-label mono">단골 시작</div>
                <div className="occ-stat-val tnum"><span>{r.occupier.since}</span></div>
              </div>
              <div>
                <div className="occ-stat-label mono">작성 리뷰</div>
                <div className="occ-stat-val tnum"><span>{r.occupier.reviews}</span><i>건</i></div>
              </div>
            </div>

            <div className="occ-review">
              <div className="kicker no-line" style={{ marginBottom: 14 }}>대표 리뷰</div>
              <p className="occ-review-head">{r.representative.headline}</p>
              <p className="occ-review-body">{r.representative.body}</p>
            </div>
          </div>

          {/* RANKINGS TABLE */}
          <div className="lb-rankings">
            <div className="rank-head">
              <span className="kicker no-line">실시간 점령 순위</span>
              <span className="pill" style={{ background: "transparent", border: "1px solid var(--line)" }}>
                <span className="dot"></span>LIVE
              </span>
            </div>
            <table className="rank-table">
              <thead>
                <tr>
                  <th>#</th><th>아이디</th>
                  <th className="tnum">방문</th>
                  <th className="tnum">사용액</th>
                  <th className="tnum">포인트</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {r.rankings.map(row => (
                  <tr key={row.rank} className={row.rank === 1 ? "first" : ""}>
                    <td className="rk">
                      {row.rank === 1
                        ? <span className="rk-flag">▲</span>
                        : <span className="mono">{String(row.rank).padStart(2, "0")}</span>}
                    </td>
                    <td className="mono">{row.handle}</td>
                    <td className="tnum mono">{row.visits}</td>
                    <td className="tnum mono">{row.spend}</td>
                    <td className="tnum mono"><strong>{row.points.toLocaleString()}</strong></td>
                    <td><TrendBadge t={row.trend} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="rank-foot mono">
              마지막 갱신 · 방금 전 · 실시간 포인트로 순위 변동
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.Leaderboard = Leaderboard;
