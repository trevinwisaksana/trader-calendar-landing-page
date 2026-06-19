import Ticker from './Ticker'
import PhoneMock from './PhoneMock'
import WaitlistForm from './WaitlistForm'
import CollisionTimeline from './CollisionTimeline'

export default function App() {
  return (
    <div style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>

      {/* nav */}
      <header className="mx-auto max-w-[1100px] px-8 py-6">
        <span className="text-[16px] font-semibold" style={{ letterSpacing: '-0.01em' }}>Frist</span>
      </header>

      {/* ticker */}
      <Ticker />

      {/* hero */}
      <section className="mx-auto grid max-w-[1080px] items-center gap-[clamp(40px,7vw,96px)] px-8 pb-[clamp(48px,8vw,120px)] pt-[clamp(40px,7vw,100px)] md:grid-cols-[1.1fr_1fr]">
        <div>
          <h1 className="m-0 mb-[22px] text-[clamp(2rem,4vw,3rem)] font-medium text-neutral-900"
            style={{ lineHeight: 1.1, letterSpacing: '-0.025em' }}>
            Your option expiries, checked against every catalyst.
          </h1>
          <p className="mb-9 max-w-[32em] text-[17px] leading-[1.55] text-neutral-500">
            Add what you're holding. Frist flags any earnings, Fed date, or launch that lands inside one of your expiry windows. For iPhone.
          </p>
          <WaitlistForm />
          <p className="mt-3.5 text-[13px] text-neutral-400">
            Free during the beta. iPhone only.
          </p>
        </div>
        <PhoneMock />
      </section>

      {/* anchor — magazine moment */}
      <section className="mx-auto max-w-[900px] px-8 py-[clamp(64px,10vw,140px)] text-center">
        <p className="mono m-0 mb-7 text-[11px] uppercase text-neutral-400" style={{ letterSpacing: '0.18em' }}>
          CCL · 3 puts · exp Jul 18
        </p>
        <p className="mono m-0 mb-8 font-medium text-neutral-900"
          style={{ fontSize: 'clamp(5rem,14vw,10rem)', lineHeight: 0.95, letterSpacing: '-0.05em' }}>
          Jun&nbsp;30
        </p>
        <p className="mx-auto m-0 max-w-[32em] text-neutral-500"
          style={{ fontSize: 'clamp(1rem,1.4vw,1.2rem)', lineHeight: 1.55 }}>
          Earnings land here. You priced direction. The market will price{' '}
          <span style={{ color: '#92400e' }}>vol</span>.
        </p>
      </section>

      {/* timeline */}
      <CollisionTimeline />

      {/* footer */}
      <footer className="px-8 py-[clamp(48px,7vw,80px)]">
        <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-between gap-4 text-[13px] text-neutral-400">
          <span>Frist · Not investment advice.</span>
          <span className="mono">© 2026</span>
        </div>
      </footer>

    </div>
  )
}
