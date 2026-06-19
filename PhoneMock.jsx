const SigBars = () => (
  <svg width="16" height="10" viewBox="0 0 17 11" fill="currentColor" aria-hidden="true">
    <rect x="0" y="7" width="3" height="4" rx="1"/>
    <rect x="4.5" y="5" width="3" height="6" rx="1"/>
    <rect x="9" y="2.5" width="3" height="8.5" rx="1"/>
    <rect x="13.5" y="0" width="3" height="11" rx="1"/>
  </svg>
)
const WifiIcon = () => (
  <svg width="15" height="11" viewBox="0 0 16 12" fill="currentColor" aria-hidden="true">
    <path d="M8 2.5c2.6 0 5 1 6.8 2.7l-1.4 1.5A7.6 7.6 0 0 0 8 4.6 7.6 7.6 0 0 0 2.6 6.7L1.2 5.2A9.6 9.6 0 0 1 8 2.5Z"/>
    <path d="M8 6.3c1.5 0 2.9.6 3.9 1.6l-1.5 1.5A3.4 3.4 0 0 0 8 8.3c-.9 0-1.8.4-2.4 1.1L4.1 7.9A5.4 5.4 0 0 1 8 6.3Z"/>
    <circle cx="8" cy="11" r="1.2"/>
  </svg>
)
const BatteryIcon = () => (
  <svg width="23" height="11" viewBox="0 0 25 12" fill="none" aria-hidden="true">
    <rect x="0.5" y="0.5" width="21" height="11" rx="3" stroke="currentColor" strokeOpacity="0.35"/>
    <rect x="2" y="2" width="16" height="8" rx="1.5" fill="currentColor"/>
    <rect x="23" y="4" width="1.5" height="4" rx="0.75" fill="currentColor" fillOpacity="0.35"/>
  </svg>
)
const WarnIcon = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" aria-hidden="true">
    <path d="M12 3.4 21.4 20H2.6L12 3.4Z" stroke="#d97706" strokeWidth="2" strokeLinejoin="round"/>
    <path d="M12 10v4M12 17.2h.01" stroke="#d97706" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

export default function PhoneMock() {
  return (
    <div className="relative mx-auto" style={{ width: 282 }}>
      <div
        className="relative rounded-[44px] p-2"
        style={{
          background: '#0b0b0d',
          boxShadow: '0 30px 60px -28px rgba(15,23,42,.28), 0 6px 18px -8px rgba(15,23,42,.1)',
        }}
      >
        <div
          className="relative flex flex-col overflow-hidden"
          style={{ borderRadius: 37, height: 552, background: '#fff' }}
        >
          {/* status bar */}
          <div className="flex flex-shrink-0 items-center justify-between px-[22px] pt-[13px] text-neutral-900">
            <span className="mono text-[13px] font-medium">9:41</span>
            <div className="flex items-center gap-[5px]">
              <SigBars /><WifiIcon /><BatteryIcon />
            </div>
          </div>

          {/* Dynamic Island */}
          <div
            className="absolute z-10"
            style={{
              top: 8, left: '50%', transform: 'translateX(-50%)',
              width: 120, height: 34, background: '#0b0b0d', borderRadius: 22,
            }}
          />

          {/* header */}
          <div className="flex-shrink-0 px-[22px] pb-[18px] pt-[34px]">
            <div className="text-[13px] text-neutral-400">Today</div>
            <div className="mt-0.5 text-[22px] font-semibold text-neutral-900" style={{ letterSpacing: '-0.01em' }}>
              1 collision
            </div>
          </div>

          {/* card */}
          <div className="px-[18px]">
            <div
              className="rounded-[14px] bg-white p-4 pb-[18px]"
              style={{ border: '1px solid #f0f0f0', borderLeft: '3px solid #d97706' }}
            >
              <div className="mb-[14px] flex items-baseline justify-between">
                <span className="mono text-[18px] font-medium text-neutral-900" style={{ letterSpacing: '-0.01em' }}>CCL</span>
                <span className="mono text-[12px] text-neutral-400">3 puts</span>
              </div>
              <div className="flex items-baseline justify-between border-b border-neutral-100 pb-[14px]">
                <span className="text-[13px] text-neutral-400">Expires</span>
                <span className="mono text-[14px] text-neutral-900">Jul 18</span>
              </div>
              <div className="flex items-baseline justify-between pt-[14px]">
                <span className="flex items-center gap-1.5 text-[13px] text-amber-600">
                  <WarnIcon /> Earnings inside window
                </span>
                <span className="mono text-[14px] text-amber-600">Jun 30</span>
              </div>
            </div>
          </div>

          {/* home indicator */}
          <div
            className="absolute"
            style={{
              bottom: 8, left: '50%', transform: 'translateX(-50%)',
              width: 110, height: 4, borderRadius: 99, background: '#111',
            }}
          />
        </div>
      </div>
    </div>
  )
}
