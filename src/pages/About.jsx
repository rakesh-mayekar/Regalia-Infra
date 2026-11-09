import Icon from '../components/Icon.jsx'
import { Button, Eyebrow, CheckCards, InfoCard, Section, SectionHead, Placeholder, FinalCta, Breadcrumbs, Steps, TextLink } from '../components/ui.jsx'
import { services, principles, audienceDetail, founder, photos } from '../data/content.js'

export default function About() {
  return (
    <>
      <Section>
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'About' }]} />
        <div className="about-home">
          <div className="about-text">
            <h1>About Regalia</h1>
            <p className="lead">Regalia Infra is a real estate consultancy connecting buyers, brands and property owners with relevant opportunities.</p>
            <p>We work across retail leasing, brand expansion, residential sales and commercial sales and leasing. Every engagement starts with your requirement and moves through shortlisting, visits and discussions.</p>
            <ul className="about-points">
              <li><Icon name="search" size={24} /><div><strong>Requirement first</strong><span>We begin with what you need, not a fixed list.</span></div></li>
              <li><Icon name="visit" size={24} /><div><strong>Relevant options</strong><span>Shortlists matched to location, space and budget.</span></div></li>
              <li><Icon name="handshake" size={24} /><div><strong>Coordinated discussions</strong><span>Visits, conversations and next steps organised.</span></div></li>
            </ul>
            <div className="actions"><Button to="/contact">Submit Requirement</Button><Button to="/services" variant="secondary">Explore Services</Button></div>
          </div>
          <Placeholder label="Sample architectural image" ratio="4/5" src={photos.greenery} className="about-img" />
        </div>
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
          <Placeholder label="Samiksha Singh" ratio="4/5" src="/images/owner.png" className="portrait" />
          <div className="founder-body">
            <Eyebrow>Founder</Eyebrow>
            <h2>{founder.name}</h2>
            <p className="muted">{founder.role}</p>
            <p><TextLink to="/about/samiksha-singh">View full profile</TextLink></p>
            {founder.bio.map(t => <p key={t} className="lead">{t}</p>)}

            <h3 className="founder-h">Focus areas</h3>
            <CheckCards items={founder.focus} />

          </div>
        </div>
      </Section>
      <FinalCta />
    </>
  )
}
