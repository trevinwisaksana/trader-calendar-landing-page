import { useEffect, useRef } from 'react'

// Shared geometry
const TOTAL_DAYS = 40
const X_START = 110
const X_END = 970
const DRAW = X_END - X_START
const dx = (d) => X_START + (d / TOTAL_DAYS) * DRAW

const AXIS = [[0,'Jun 18'],[7,'Jun 25'],[14,'Jul 2'],[21,'Jul 9'],[28,'Jul 16'],[35,'Jul 23']]

const CATALYSTS = [
  { id:'MU',   label:'MU',   date:'Jun 23', day:5,  tier:'top' },
  { id:'QCOM', label:'QCOM', date:'Jun 24', day:6,  tier:'bottom' },
  { id:'CCL',  label:'CCL',  date:'Jun 30', day:12, tier:'top' },
  { id:'JOBS', label:'Jobs', date:'Jul 3',  day:15, tier:'bottom' },
  { id:'CPI',  label:'CPI',  date:'Jul 14', day:26, tier:'top' },
]

const POSITIONS = [
  { ticker:'CCL',  structure:'3 puts',  expDay:30, exp:'Jul 18', y:215 },
  { ticker:'QCOM', structure:'2 calls', expDay:30, exp:'Jul 18', y:260 },
  { ticker:'NVDA', structure:'5 calls', expDay:37, exp:'Jul 25', y:305 },
]

export default function CollisionTimeline() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const pref = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (pref) { el.classList.add('tl-in'); return }

    if (!('IntersectionObserver' in window)) { el.classList.add('tl-in'); return }

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.classList.add('tl-in')
        io.disconnect()
      }
    }, { threshold: 0.18 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="border-t border-b border-neutral-100 bg-neutral-50">
      <div className="mx-auto max-w-[1100px] px-8 py-16 md:py-24">

        <div className="mb-9 flex flex-wrap items-baseline justify-between gap-6">
          <h2 className="m-0 max-w-[22ch] text-[clamp(1.4rem,2.4vw,1.85rem)] font-medium leading-tight text-neutral-900" style={{ letterSpacing:'-0.02em' }}>
            Three positions, the next six weeks.
          </h2>
          <span className="mono text-[12px] text-neutral-400" style={{ letterSpacing:'0.04em' }}>
            2 of 3 collide
          </span>
        </div>

        {/* horizontally scrollable on mobile */}
        <div className="overflow-x-auto" style={{ margin:'0 -32px', padding:'0 32px', WebkitOverflowScrolling:'touch' }}>
          <div style={{ minWidth: 760 }}>
            <svg viewBox="0 0 1000 340" style={{ width:'100%', height:'auto', display:'block' }} aria-label="Position-catalyst collision timeline">

              {/* axis ticks */}
              {AXIS.map(([d, lbl]) => (
                <g key={d}>
                  <text x={dx(d)} y={20} textAnchor="middle" fontSize="10"
                    fontFamily="'JetBrains Mono',monospace" fill="#a1a1aa">{lbl}</text>
                  <line x1={dx(d)} y1={28} x2={dx(d)} y2={33} stroke="#d4d4d8"/>
                </g>
              ))}
              <line x1={X_START} y1={33} x2={X_END} y2={33} stroke="#f0f0f0"/>

              {/* TODAY */}
              <text x={X_START} y={50} textAnchor="middle" fontSize="9"
                fontFamily="'JetBrains Mono',monospace" fill="#9ca3af" letterSpacing="1.4">TODAY</text>
              <circle className="tl-today-pulse" cx={X_START} cy={36} r="3.2" fill="#d97706"
                style={{ transformOrigin:`${X_START}px 36px` }}/>

              {/* section labels */}
              <text x={X_START - 14} y={88} textAnchor="end" fontSize="10"
                fontFamily="'JetBrains Mono',monospace" fill="#a1a1aa" letterSpacing="1.2">CATALYSTS</text>
              <text x={X_START - 14} y={195} textAnchor="end" fontSize="10"
                fontFamily="'JetBrains Mono',monospace" fill="#a1a1aa" letterSpacing="1.2">YOUR BOOK</text>

              {/* catalyst markers */}
              {CATALYSTS.map((c, i) => {
                const x = dx(c.day)
                const isTop = c.tier === 'top'
                const lY = isTop ? 78 : 118
                const gY = isTop ? 95 : 135
                return (
                  <g key={c.id} className="tl-catalyst" style={{ animationDelay:`${0.05 + i * 0.05}s` }}>
                    <line x1={x} y1={gY} x2={x} y2={330} stroke="#e7e5e4" strokeDasharray="2 4"/>
                    <text x={x} y={lY} textAnchor="middle"
                      fontFamily="'JetBrains Mono',monospace" fontSize="12" fontWeight="500" fill="#3f3f46">
                      {c.label}
                    </text>
                    <text x={x} y={lY + 13} textAnchor="middle"
                      fontFamily="'JetBrains Mono',monospace" fontSize="10" fill="#a1a1aa">
                      {c.date}
                    </text>
                  </g>
                )
              })}

              {/* divider */}
              <line x1={X_START} y1={170} x2={X_END} y2={170} stroke="#f5f5f4"/>

              {/* positions */}
              {POSITIONS.map((p, pi) => {
                const endX = dx(p.expDay)
                const barW = endX - X_START
                const collisions = CATALYSTS.filter(c => c.id === p.ticker && c.day <= p.expDay)
                const hasColl = collisions.length > 0
                const baseDelay = 0.4 + pi * 0.15

                return (
                  <g key={p.ticker}>
                    <text className="tl-position-label" x={X_START - 14} y={p.y + 4}
                      textAnchor="end" fontSize="13" fill="#111"
                      style={{ animationDelay:`${baseDelay}s` }}>
                      <tspan fontFamily="'JetBrains Mono',monospace" fontWeight="500">{p.ticker}</tspan>
                      <tspan fontFamily="Helvetica,Arial" fontSize="11" fill="#9ca3af" dx="6">{p.structure}</tspan>
                    </text>

                    <rect className="tl-bar" x={X_START} y={p.y - 4} width={barW} height="8" rx="4"
                      fill={hasColl ? '#fef3c7' : '#e7e5e4'}
                      style={{ animationDelay:`${baseDelay + 0.1}s` }}/>

                    <text className="tl-expiry-label" x={endX + 12} y={p.y + 4}
                      fontFamily="'JetBrains Mono',monospace" fontSize="11" fill="#a1a1aa"
                      style={{ animationDelay:`${baseDelay + 0.7}s` }}>
                      {p.exp}
                    </text>

                    {collisions.map((c, ci) => {
                      const cx2 = dx(c.day)
                      const MINI_LABELS = { CCL:'earnings', QCOM:'Investor Day' }
                      return (
                        <g key={c.id}>
                          <text className="tl-label-mini" x={cx2} y={p.y - 14}
                            textAnchor="middle" fontFamily="'JetBrains Mono',monospace"
                            fontSize="9" fill="#92400e"
                            style={{ animationDelay:`${baseDelay + 1.35 + ci * 0.05}s` }}>
                            {MINI_LABELS[c.id] || c.label}
                          </text>
                          <g className="tl-dot"
                            style={{ animationDelay:`${baseDelay + 0.9 + ci * 0.08}s`,
                              transformOrigin:`${cx2}px ${p.y}px` }}>
                            <circle cx={cx2} cy={p.y} r="7" fill="#d97706"/>
                            <circle cx={cx2} cy={p.y} r="2.5" fill="#fff"/>
                          </g>
                        </g>
                      )
                    })}
                  </g>
                )
              })}

            </svg>
          </div>
        </div>

        <p className="mt-8 max-w-[44em] text-[15px] leading-relaxed text-neutral-500">
          Calendars hand you every event in the market and leave you to filter down. Frist starts from the trades you actually hold and only surfaces the dates that land inside them.
        </p>

      </div>
    </section>
  )
}
