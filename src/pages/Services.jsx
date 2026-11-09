import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { InfoCard, CheckCards, Eyebrow, Section, SectionHead, Breadcrumbs, Button, TextLink, Placeholder, Accordion, FinalCta, Steps, StateMessage } from '../components/ui.jsx'
import { services, shareList, serviceImage } from '../data/content.js'
import Icon from '../components/Icon.jsx'

export function ServicesOverview() {
  return (
    <>
      <Section>
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Services' }]} />
        <h1>Services</h1>
        <p className="lead">Advisory, leasing and sales across four areas.</p>
      </Section>
      <Section>
        <div className="cards cards-2">
          {services.map((x, k) => <InfoCard key={x.slug} icon={x.icon} index={String(k + 1).padStart(2, '0')} title={x.title} tag={x.audience} text={x.sentence} items={x.help.map(h => h[0])} to={`/services/${x.slug}`} link="View service" />)}
        </div>
      </Section>
      <Section tone="grey">
        <SectionHead eyebrow="At a glance" title="Which service fits?" />
        <div className="cards cards-4">
          {services.map(x => <InfoCard key={x.slug} icon={x.icon} tag="Best for" title={x.short} text={x.audience.replace(/ · /g, ', ')} to={`/contact?req=${x.req}`} link={x.cta} />)}
        </div>
      </Section>
      <Section tone="dark">
        <SectionHead eyebrow="Process" title="How it works" />
        <Steps steps={['Share your requirement', 'Review options', 'Visit and discuss', 'Coordinate the transaction']} />
      </Section>
      <FinalCta />
    </>
  )
}

export function ServiceDetail() {
  const { slug } = useParams()
  const s = services.find(x => x.slug === slug)
  if (!s) return (
    <Section><StateMessage title="Service not found." text="This service page doesn’t exist." actions={<Button to="/services">View Services</Button>} /></Section>
  )
  const contact = `/contact?req=${s.req}`
  return (
    <>
      <Section>
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Services', to: '/services' }, { label: s.title }]} />
        <div className="hero-grid">
          <div>
            <h1>{s.title}</h1>
            <p className="lead">{s.intro}</p>
            <div className="actions"><Button to={contact}>{s.cta}</Button></div>
          </div>
          <Placeholder label={`${s.title} (sample image)`} ratio="4/3" src={serviceImage[s.slug]} />
        </div>
      </Section>
      <Section tone="grey">
        <div className="split">
          <h2>Who It’s For</h2>
          <div className={`cards cards-${s.forWho.length === 2 ? 2 : 3}`}>{s.forWho.map(([t, d]) => <InfoCard key={t} icon="buyer" title={t} text={d} />)}</div>
        </div>
        {s.pathways && (
          <div className="split pathways">
            <h3>Pathways</h3>
            <div className="cards cards-2">
              {s.pathways.map(([t, d]) => <InfoCard key={t} icon={t === 'Buy' ? 'key' : 'doc'} title={t} text={d} to={`/contact?req=commercial`} link={`Enquire to ${t.toLowerCase()}`} />)}
            </div>
          </div>
        )}
      </Section>
      <Section>
        <div className="split">
          <h2>How We Help</h2>
          <div className="cards cards-4">{s.help.map(([t, d], k) => <InfoCard key={t} index={String(k + 1).padStart(2, '0')} title={t} text={d} />)}</div>
        </div>
        {s.ownerLink && <p className="owner-link">Own retail space? <TextLink to="/partner-with-us">Partner With Us</TextLink></p>}
      </Section>
      <Section tone="dark">
        <SectionHead eyebrow="Process" title="Process" />
        <Steps steps={s.process} />
      </Section>
      <Section>
        <SectionHead eyebrow="FAQs" title="FAQs" />
        <Accordion items={s.faqs} />
      </Section>
      <Section tone="grey">
        <SectionHead eyebrow="Related" title="Other services" />
        <div className="related">
          {services.filter(x => x.slug !== s.slug).map(x => (
            <Link key={x.slug} to={`/services/${x.slug}`}><Icon name={x.icon} /><span>{x.short}</span><span aria-hidden="true">→</span></Link>
          ))}
        </div>
      </Section>
      <FinalCta to={contact} label={s.cta} />
    </>
  )
}
