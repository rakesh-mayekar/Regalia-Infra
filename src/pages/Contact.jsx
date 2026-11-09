import { useSearchParams } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import { Section, Breadcrumbs, Eyebrow } from '../components/ui.jsx'
import { RequirementForm, PartnerForm } from '../components/forms.jsx'
import { requirements, opportunities, contactReady, photos, contactInfo } from '../data/content.js'

const propReq = { Retail: 'retail', Residential: 'residential', Commercial: 'commercial' }

export default function Contact() {
  const [params, setParams] = useSearchParams()
  const property = opportunities.find(o => o.id === params.get('property'))
  let type = params.get('req')
  if (!requirements.some(r => r.id === type)) type = property ? propReq[property.type] : 'retail'
  const current = requirements.find(r => r.id === type)

  const choose = id => {
    const next = new URLSearchParams(params); next.set('req', id)
    setParams(next, { replace: true })
  }

  return (
    <>
      <section className="chero">
        <div className="chero-text">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Contact' }]} />
          <span className="pill"><i aria-hidden="true" />Contact</span>
          <h1>Get in touch.</h1>
          <p className="lead">Tell us what you are looking for. We review your requirement and get in touch using the method you choose.</p>
        </div>
        <div className="chero-media" aria-hidden="true">
          <img src={photos.corner} alt="" />
          <div className="chero-badge"><small>Demo form</small><strong>Details are not sent</strong></div>
        </div>
      </section>

      <Section label="Share your requirement">
        <Eyebrow>Enquiry</Eyebrow>
        <h2 className="contact-h">Share your requirement</h2>
        <p className="lead">Choose what you are looking for and the matching form opens below.</p>
        <div className="req-tabs" role="group" aria-label="I’m looking for">
          {requirements.map(r => (
            <button key={r.id} type="button" className="chero-tab" aria-pressed={type === r.id} onClick={() => choose(r.id)}>
              <Icon name={r.icon} />{r.label}
            </button>
          ))}
        </div>
        <div className="contact-grid">
          <div className="form-wrap form-card" id="enquiry">
            {type === 'list' && (
              <>
                <h2 className="form-title">List your property</h2>
                <p className="muted">For owners and authorised representatives who want to put a property forward.</p>
                <PartnerForm />
              </>
            )}
            {type !== 'list' && <RequirementForm key={type} type={type} property={property} />}
          </div>
          <aside className="side">
            <div className="side-photo" role="img" aria-label="Sample architectural image">
              <img src={photos.courtyard} alt="" loading="lazy" />
              <div className="side-tags">
                <span className="side-tags-h">Have ready</span>
                <ul>{contactReady.map(x => <li key={x}>{x}</li>)}</ul>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="grey" label="Find us">
        <Eyebrow>Find us</Eyebrow>
        <h2 className="contact-h">Visit or reach Regalia Infra</h2>
        <div className="find-grid">
          <div className="side-map">
            <iframe title="Map (sample location)" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=India&z=4&output=embed" />
            <p className="muted">Sample map. Office location to be added.</p>
          </div>
          <ul className="contact-cards">
            {Object.values(contactInfo).map(c => (
              <li key={c.label} className="contact-card">
                <Icon name={c.icon} />
                <div>
                  <small>{c.label}</small>
                  {c.href ? <a href={c.href}>{c.value}</a> : <strong>{c.value}</strong>}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  )
}
