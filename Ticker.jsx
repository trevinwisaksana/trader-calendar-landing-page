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

function TickerGroup() {
  return (
    <div className="flex flex-shrink-0 items-center">
      <span className="mono px-5 text-[11px] text-neutral-300 uppercase" style={{ letterSpacing: '0.16em' }}>
        Next 14 days
      </span>
      {ITEMS.map(([t, what, when], i) => (
        <span key={i} className="mono inline-flex items-center gap-2 px-5 text-[12px] text-neutral-500">
          <span className="font-medium text-neutral-900">{t}</span>
          <span className="text-neutral-300">·</span>
          <span>{what}</span>
          <span className="text-neutral-300">·</span>
          <span>{when}</span>
        </span>
      ))}
    </div>
  )
}

export default function Ticker() {
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden border-t border-b border-neutral-100 py-[11px]"
      style={{
        WebkitMaskImage: 'linear-gradient(90deg, transparent, black 5%, black 95%, transparent)',
        maskImage: 'linear-gradient(90deg, transparent, black 5%, black 95%, transparent)',
      }}
    >
      <div className="ticker-track flex whitespace-nowrap" style={{ width: 'max-content' }}>
        <TickerGroup />
        <TickerGroup />
      </div>
    </div>
  )
}
