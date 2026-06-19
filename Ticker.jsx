const ITEMS = [
  ['MRVL', 'S&P inclusion', 'Jun 22'],
  ['MU',   'earnings',      'Jun 23'],
  ['QCOM', 'Investor Day',  'Jun 24'],
  ['CCL',  'earnings',      'Jun 30'],
  ['Jobs', 'print',         'Jul 3'],
  ['CPI',  'print',         'Jul 14'],
  ['MSFT', 'earnings',      'Jul 22'],
  ['GOOG', 'earnings',      'Jul 23'],
]

function TickerGroup({ dark }) {
  return (
    <div className="flex flex-shrink-0 items-center">
      <span
        className="mono px-5 text-[11px] uppercase"
        style={{ letterSpacing: '0.16em', color: dark ? 'rgba(255,255,255,0.18)' : '#d4d4d8' }}
      >
        Next 14 days
      </span>
      {ITEMS.map(([t, what, when], i) => (
        <span
          key={i}
          className="mono inline-flex items-center gap-2 px-5 text-[12px]"
          style={{ color: dark ? 'rgba(255,255,255,0.38)' : '#a1a1aa' }}
        >
          <span style={{ fontWeight: '500', color: dark ? 'rgba(255,255,255,0.75)' : '#111' }}>{t}</span>
          <span style={{ color: dark ? 'rgba(255,255,255,0.12)' : '#d4d4d8' }}>·</span>
          <span>{what}</span>
          <span style={{ color: dark ? 'rgba(255,255,255,0.12)' : '#d4d4d8' }}>·</span>
          <span>{when}</span>
        </span>
      ))}
    </div>
  )
}

export default function Ticker({ dark }) {
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden py-[11px]"
      style={{
        borderTop: dark ? '1px solid rgba(255,255,255,0.06)' : '1px solid #f4f4f5',
        borderBottom: dark ? '1px solid rgba(255,255,255,0.06)' : '1px solid #f4f4f5',
        WebkitMaskImage: 'linear-gradient(90deg, transparent, black 5%, black 95%, transparent)',
        maskImage: 'linear-gradient(90deg, transparent, black 5%, black 95%, transparent)',
      }}
    >
      <div className="ticker-track flex whitespace-nowrap" style={{ width: 'max-content' }}>
        <TickerGroup dark={dark} />
        <TickerGroup dark={dark} />
      </div>
    </div>
  )
}
