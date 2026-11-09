import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Eyebrow, InfoCard, CheckCards, Section, SectionHead, Breadcrumbs, FinalCta } from '../components/ui.jsx'
import Icon, { Rings, Skyline } from '../components/Icon.jsx'
import { founder, services } from '../data/content.js'

const focusMap = [['store', 'retail-leasing'], ['expand', 'brand-expansion'], ['search', 'brand-expansion'], ['building', 'commercial']]

function useParallax() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const update = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height)))
      el.style.setProperty('--p', p.toFixed(3))
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf) }
  }, [])
  return ref
}

function CopyLink() {
  const [done, setDone] = useState(false)
  const copy = async () => {
    try { await navigator.clipboard.writeText(window.location.href); setDone(true); setTimeout(() => setDone(false), 2200) } catch { setDone(false) }
  }
  return (
    <div className="copy-link">
      <button type="button" className="btn btn-secondary" onClick={copy}>Copy profile link</button>
      <span role="status" aria-live="polite" className="muted">{done ? 'Link copied.' : ''}</span>
    </div>
  )
}

export default function Founder() {
  const hero = useParallax()
  const [now, ...past] = founder.background
  return (
    <>
      <section className="fhero" ref={hero} aria-label="About the founder">
        <div className="fhero-text">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'About', to: '/about' }, { label: founder.name }]} />
          <span className="pill"><i aria-hidden="true" />The founder</span>
          <h1>Meet {founder.name}.<span className="line">The person behind Regalia Infra.</span></h1>
          <p className="lead">A real estate professional focused on commercial leasing and brand expansion.</p>
        </div>
        <div className="fhero-stage">
          <aside className="ftip ftip-a" aria-label="Founded">
            <small>Founded</small>
            <strong>Regalia Infra</strong>
            <span>{now[2]}</span>
          </aside>
          <div className="fportrait">
            <img src="/images/owner.png" alt="Portrait of Samiksha Singh" fetchpriority="high" />
          </div>
          <aside className="ftip ftip-c" aria-label="Focus">
            <small>Focus</small>
            <strong>Leasing &amp; brand expansion</strong>
            <span>Developers, landlords and brands</span>
          </aside>
          <aside className="ftip ftip-d" aria-label="Education">
            <small>Education</small>
            <strong>{founder.education[0][0]}</strong>
            <span>{founder.education[0][1]}</span>
          </aside>
          <aside className="ftip ftip-e" aria-label="Earlier role">
            <small>Earlier</small>
            <strong>{founder.background[3][0]}</strong>
            <span>{founder.background[3][1]}</span>
          </aside>
          <aside className="ftip ftip-f" aria-label="Education, bachelor's">
            <small>Education</small>
            <strong>{founder.education[1][0]}</strong>
            <span>{founder.education[1][1]}</span>
          </aside>
          <aside className="ftip ftip-b" aria-label="Previous role">
            <small>Previously</small>
            <strong>{past[0][0]}</strong>
            <span>{past[0][1]}</span>
          </aside>
        </div>
      </section>

      <Section label="Introduction" className="fintro">
        <Eyebrow>In brief</Eyebrow>
        <h2>A consultancy built around leasing, brands and the right location.</h2>
        <Rings />
        <p className="lead">{founder.short}</p>
      </Section>

      <Section tone="grey" label="At a glance">
        <SectionHead eyebrow="At a glance" title="Samiksha, in short" />
        <div className="bento">
          <article className="bento-cell bento-role">
            <span className="bento-label">01 · Role</span>
            <strong className="bento-big">Founder</strong>
            <p>Regalia Infra, a real estate consultancy.</p>
            <Rings />
          </article>
          <article className="bento-cell bento-focus">
            <span className="bento-label">02 · Focus</span>
            <h3>Leasing and brand expansion</h3>
            <p>Commercial leasing and brand expansion advisory.</p>
            <Skyline />
          </article>
          <article className="bento-cell bento-with">
            <span className="bento-label">03 · Works with</span>
            <ul className="bento-chips">{['Developers', 'Landlords', 'Expanding brands'].map(x => <li key={x}>{x}</li>)}</ul>
          </article>
          <article className="bento-cell bento-since">
            <span className="bento-label">04 · Since</span>
            <strong className="bento-year">{now[2].match(/\d{4}/)[0]}</strong>
            <p>Regalia Infra founded after several years in the industry.</p>
          </article>
          <article className="bento-cell bento-line" aria-label="Career timeline">
            <span className="bento-label">05 · Timeline</span>
            <ol className="bento-timeline">
              {[...founder.background].reverse().map(([role, org, dates]) => (
                <li key={role + dates}><i aria-hidden="true" /><b>{dates.match(/\d{4}/)[0]}</b><span>{role}</span><small>{org}</small></li>
              ))}
            </ol>
          </article>
        </div>
        </Section>

      <Section label="Approach and focus">
        <SectionHead eyebrow="What she does" title="How Samiksha works" />
        <div className="works">
          <div className="works-lead">
            <span className="works-mark" aria-hidden="true">“</span>
            <p className="works-big">{founder.bio[0]}</p>
            <p className="works-small">{founder.bio[1]}</p>
          </div>
          <div className="works-grid">
            {founder.focus.map((f, i) => {
              const [icon, slug] = focusMap[i]
              return (
                <Link key={f} to={`/services/${slug}`} className="works-card">
                  <span className="works-n">{String(i + 1).padStart(2, '0')}</span>
                  <Icon name={icon} />
                  <strong>{f}</strong>
                  <span className="works-more">View service <span aria-hidden="true">→</span></span>
                </Link>
              )
            })}
          </div>
        </div>
      </Section>

      <Section tone="dark" label="Experience">
        <SectionHead eyebrow="Experience" title="Experience in the field" />
        <div className="cards cards-2 fexp">
          {founder.background.map(([role, org, dates], i) => <InfoCard key={role + dates} index={`/${String(i + 1).padStart(2, '0')}`} tag={dates} title={role} text={org} />)}
        </div>
      </Section>

      <Section label="Education">
        <SectionHead eyebrow="Education" title="Education" />
        <div className="cards cards-2">{founder.education.map(([d, o, y]) => <InfoCard key={d} icon="doc" tag={y} title={d} text={o} />)}</div>
      </Section>

      <Section tone="grey" label="Services">
        <SectionHead eyebrow="Work with Samiksha" title="Where she can help" />
        <div className="cards cards-4">
          {services.map(s => <InfoCard key={s.slug} icon={s.icon} title={s.title} text={s.sentence} to={`/services/${s.slug}`} link="Explore" />)}
        </div>
      </Section>

      <Section label="Share">
        <Eyebrow>Share this page</Eyebrow>
        <h2>Send this profile to someone.</h2>
        <p className="lead">This page has its own link, so you can share Samiksha’s profile directly.</p>
        <div className="actions"><CopyLink /><Button to="/about" variant="secondary">About Regalia Infra</Button></div>
      </Section>
      <FinalCta title="Want to speak with Samiksha?" />
    </>
  )
}
