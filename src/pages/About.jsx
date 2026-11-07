import { Eyebrow, CheckCards, InfoCard, Section, SectionHead, Placeholder, FinalCta, Breadcrumbs, Steps } from '../components/ui.jsx'
import { services, principles, audienceDetail, founder } from '../data/content.js'

export default function About() {
  return (
    <>
      <Section>
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'About' }]} />
        <h1>About Regalia</h1>
        <p className="lead">Regalia Infra is a real estate consultancy connecting buyers, brands and property owners with relevant opportunities.</p>
      </Section>
      <Section tone="grey">
        <SectionHead eyebrow="Services" title="What We Do" />
        <div className="cards cards-4">
          {services.map((s, i) => <InfoCard key={s.slug} icon={s.icon} index={String(i + 1).padStart(2, '0')} title={s.short} text={s.sentence} tag={s.audience.split(' · ')[0]} items={s.help.slice(0, 3).map(h => h[0])} to={`/services/${s.slug}`} />)}
        </div>
      </Section>
      <Section>
        <SectionHead eyebrow="Clients" title="Who We Work With" />
        <div className="cards cards-4">
          {Object.entries(audienceDetail).map(([t, [icon, d, items, to]]) => <InfoCard key={t} icon={icon} title={t} text={d} items={items} to={to} link={to === '/partner-with-us' ? 'Partner with us' : 'Share requirement'} />)}
        </div>
      </Section>
      <Section tone="dark">
        <SectionHead eyebrow="Approach" title="Our Approach" />
        <Steps steps={['Understand your requirements', 'Shortlist relevant options', 'Coordinate discussions']} />
      </Section>
      <Section>
        <SectionHead eyebrow="Principles" title="How we like to work" />
        <div className="cards cards-3">{principles.map(([t, d], i) => <InfoCard key={t} index={String(i + 1).padStart(2, '0')} title={t} text={d} />)}</div>
      </Section>
      <Section tone="grey" label="Founder">
        <div className="founder founder-full">
          <Placeholder label="Portrait" ratio="4/5" className="portrait" />
          <div className="founder-body">
            <Eyebrow>Founder</Eyebrow>
            <h2>{founder.name}</h2>
            <p className="muted">{founder.role}</p>
            {founder.bio.map(t => <p key={t} className="lead">{t}</p>)}

            <h3 className="founder-h">Focus areas</h3>
            <CheckCards items={founder.focus} />

            <div className="founder-cols">
              <div>
                <h3 className="founder-h">Background</h3>
                <ul className="timeline">
                  {founder.background.map(([r, o, d]) => <li key={r + d}><strong>{r}</strong><span>{o}</span><em>{d}</em></li>)}
                </ul>
              </div>
              <div>
                <h3 className="founder-h">Education</h3>
                <ul className="timeline">
                  {founder.education.map(([r, o, d]) => <li key={r}><strong>{r}</strong><span>{o}</span><em>{d}</em></li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Section>
      <FinalCta />
    </>
  )
}
