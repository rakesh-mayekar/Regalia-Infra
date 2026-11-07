import { Button, Eyebrow, Section, SectionHead, Placeholder, ServiceLink, OpportunityCard, Accordion, FinalCta, TextLink } from '../components/ui.jsx'
import { Link } from 'react-router-dom'
import HeroSlider from '../components/HeroSlider.jsx'
import Icon from '../components/Icon.jsx'
import { founder, services, opportunities, process, processIcons, audiences, startPaths, faqs } from '../data/content.js'

export default function Home() {
  return (
    <>
      <HeroSlider />

      <div className="strip" aria-hidden="true">
        {['Retail Leasing', 'Brand Expansion', 'Residential Sales', 'Commercial Sales & Leasing', 'Retail Leasing', 'Brand Expansion', 'Residential Sales', 'Commercial Sales & Leasing'].map((t, i) => <span key={i}>{t}<i /></span>)}
      </div>

      <Section label="Services">
        <SectionHead eyebrow="What we do" title="Find the right service." />
        <div className="service-list">
          {services.map((s, i) => <ServiceLink key={s.slug} index={i + 1} icon={s.icon} to={`/services/${s.slug}`} title={s.short} text={s.sentence} />)}
        </div>
      </Section>

      <Section tone="grey" label="Who we work with">
        <SectionHead eyebrow="Who we work with" title="Built around your requirement." />
        <ul className="audience">
          {audiences.map(([ic, t, d]) => <li key={t}><Icon name={ic} size={32} /><h3>{t}</h3><p>{d}</p></li>)}
        </ul>
      </Section>

      <Section label="About Regalia">
        <div className="split">
          <div><Eyebrow>About</Eyebrow><h2>Real estate, with a clear approach.</h2></div>
          <div>
            <p className="lead">We connect buyers, brands and property owners with relevant real estate opportunities.</p>
            <TextLink to="/about">About Regalia</TextLink>
          </div>
        </div>
      </Section>

      <Section tone="grey" label="Selected Opportunities">
        <SectionHead eyebrow="Opportunities" title="Selected Opportunities" intro="Demo listings shown for illustration." />
        <div className="grid-3">
          {[opportunities[0], opportunities[2], opportunities[4]].map(o => <OpportunityCard key={o.id} o={o} />)}
        </div>
        <div className="section-cta"><Button to="/opportunities" variant="secondary">View All Opportunities</Button></div>
      </Section>

      <Section tone="dark" label="Our Process">
        <SectionHead eyebrow="How we work" title="Our Process" />
        <ol className="steps">
          {process.map((p, i) => <li key={p}><Icon name={processIcons[i]} size={26} /><span className="step-n">{String(i + 1).padStart(2, '0')}</span><span>{p}</span></li>)}
        </ol>
      </Section>

      <Section label="Founder">
        <div className="founder">
          <Placeholder label="Portrait" ratio="4/5" className="portrait" />
          <div>
            <Eyebrow>Founder</Eyebrow>
            <h2>Samiksha Singh</h2>
            <p className="muted">Founder, Regalia Infra</p>
            <p>{founder.short}</p>
            <TextLink to="/about">About Regalia</TextLink>
          </div>
        </div>
      </Section>

      <Section label="Where to begin">
        <SectionHead eyebrow="Get started" title="Where would you like to begin?" />
        <ul className="paths">
          {startPaths.map(([t, d, to]) => (
            <li key={t}><Link to={to}><span className="paths-t">{t}</span><span className="muted">{d}</span><span aria-hidden="true">→</span></Link></li>
          ))}
        </ul>
      </Section>

      <Section tone="grey" label="FAQs">
        <SectionHead eyebrow="FAQs" title="Frequently asked questions." />
        <Accordion items={faqs} />
      </Section>

      <FinalCta />
    </>
  )
}
