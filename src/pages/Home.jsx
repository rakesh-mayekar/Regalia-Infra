import { InfoCard, Steps, Button, Eyebrow, Section, SectionHead, Placeholder, ServiceLink, OpportunityCard, Accordion, FinalCta, TextLink } from '../components/ui.jsx'
import { Link } from 'react-router-dom'
import HeroSlider from '../components/HeroSlider.jsx'
import Icon from '../components/Icon.jsx'
import { founder, services, opportunities, process, processIcons, audiences, startPaths, faqs, photos } from '../data/content.js'

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
        <div className="cards cards-4">
          {audiences.map(([ic, t, d]) => <InfoCard key={t} icon={ic} title={t} text={d} />)}
        </div>
      </Section>

      <Section label="About Regalia">
        <div className="about-home">
          <div className="about-text">
            <Eyebrow>About</Eyebrow>
            <h2>Real estate, with a clear approach.</h2>
            <p className="lead">We connect buyers, brands and property owners with relevant real estate opportunities.</p>
            <p>Regalia Infra is a real estate consultancy covering leasing and sales. We start with your requirement, shortlist options that fit, and coordinate the conversations that follow.</p>
            <ul className="about-points">
              <li><Icon name="store" size={24} /><div><strong>Leasing and brand expansion</strong><span>Retail space, location sourcing and property matching.</span></div></li>
              <li><Icon name="home" size={24} /><div><strong>Residential and commercial sales</strong><span>Advisory and shortlisting for buyers and investors.</span></div></li>
              <li><Icon name="handshake" size={24} /><div><strong>Support through to the transaction</strong><span>Visits, discussions and next steps, coordinated.</span></div></li>
            </ul>
            <div className="actions"><Button to="/about" variant="secondary">About Regalia</Button><Button to="/contact">Submit Requirement</Button></div>
          </div>
          <Placeholder label="Sample architectural image" ratio="4/5" src={photos.park} className="about-img" />
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
        <Steps steps={process} />
      </Section>

      <Section label="Founder">
        <div className="founder">
          <Placeholder label="Samiksha Singh" ratio="4/5" src="/images/owner.png" className="portrait" />
          <div>
            <Eyebrow>Founder</Eyebrow>
            <h2>Samiksha Singh</h2>
            <p className="muted">Founder, Regalia Infra</p>
            <p>{founder.short}</p>
            <div className="actions"><TextLink to="/about/samiksha-singh">View full profile</TextLink><TextLink to="/about">About Regalia</TextLink></div>
          </div>
        </div>
      </Section>

      <Section label="Where to begin">
        <SectionHead eyebrow="Get started" title="Where would you like to begin?" />
        <div className="cards cards-auto">
          {startPaths.map(([t, d, to], k) => <InfoCard key={t} index={String(k + 1).padStart(2, '0')} title={t} text={d} to={to} link="Start" />)}
        </div>
      </Section>

      <Section tone="grey" label="FAQs">
        <SectionHead eyebrow="FAQs" title="Frequently asked questions." />
        <Accordion items={faqs} />
      </Section>

      <FinalCta />
    </>
  )
}
