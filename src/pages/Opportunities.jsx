import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Eyebrow, SectionHead, FinalCta, Steps, Section, Breadcrumbs, Button, OpportunityCard, Placeholder, StateMessage, Field } from '../components/ui.jsx'
import { opportunities, propertyTypes, locations, nextSteps } from '../data/content.js'

export function Opportunities() {
  const [f, setF] = useState({ type: '', location: '', mode: '' })
  const set = k => e => setF(s => ({ ...s, [k]: e.target.value }))
  const list = opportunities.filter(o => (!f.type || o.type === f.type) && (!f.location || o.location === f.location) && (!f.mode || o.mode === f.mode))
  const active = f.type || f.location || f.mode
  const clear = () => setF({ type: '', location: '', mode: '' })
  return (
    <>
      <Section>
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Opportunities' }]} />
        <h1>Selected Opportunities</h1>
        <p className="lead">Explore spaces for your next move.</p>
        <p className="muted">Demo listings. Locations and specifications are illustrative.</p>
      </Section>
      <Section tone="grey" className="filters-section">
        <form className="filters" onSubmit={e => e.preventDefault()} aria-label="Filters">
          <Field label="Property type" as="select" value={f.type} onChange={set('type')}>
            <option value="">All</option>{propertyTypes.map(t => <option key={t}>{t}</option>)}
          </Field>
          <Field label="Location" as="select" value={f.location} onChange={set('location')}>
            <option value="">All</option>{locations.map(t => <option key={t}>{t}</option>)}
          </Field>
          <Field label="Buy / Lease" as="select" value={f.mode} onChange={set('mode')}>
            <option value="">All</option><option>Buy</option><option>Lease</option>
          </Field>
          <Button variant="secondary" onClick={clear} disabled={!active}>Clear Filters</Button>
        </form>
      </Section>
      <Section>
        <p className="count" aria-live="polite">{list.length} {list.length === 1 ? 'result' : 'results'}</p>
        {list.length ? (
          <div className="grid-3">{list.map(o => <OpportunityCard key={o.id} o={o} />)}</div>
        ) : (
          <StateMessage title="No matching opportunities." text="Try changing your filters." actions={<>
            <Button variant="secondary" onClick={clear}>Clear Filters</Button>
            <Button to="/contact">Share Your Requirement</Button>
          </>} />
        )}
      </Section>
      <FinalCta title="Can’t find the right fit?" />
    </>
  )
}

const reqFor = { Retail: 'retail', Residential: 'residential', Commercial: 'commercial' }

export function OpportunityDetail() {
  const { slug } = useParams()
  const o = opportunities.find(x => x.slug === slug)
  const [img, setImg] = useState(0)

  if (!o) return (
    <Section><StateMessage title="Property not found." text="This link may be incorrect or the listing may have been removed." actions={<>
      <Button to="/opportunities" variant="secondary">View Other Opportunities</Button>
      <Button to="/contact">Share Your Requirement</Button>
    </>} /></Section>
  )
  if (!o.available) return (
    <Section><StateMessage title="This opportunity is currently unavailable." actions={<>
      <Button to="/opportunities" variant="secondary">View Other Opportunities</Button>
      <Button to="/contact">Share Your Requirement</Button>
    </>} /></Section>
  )

  const enquire = `/contact?req=${reqFor[o.type]}&property=${o.id}`
  const images = ['Main view', 'Interior', 'Layout', 'Surroundings']
  return (
    <>
      <Section>
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Opportunities', to: '/opportunities' }, { label: o.title }]} />
        <div className="detail-grid">
          <div>
            <p className="tag">Demo listing</p>
            <h1>{o.title}</h1>
            <p className="muted">{o.location} (illustrative)</p>

            <div className="gallery">
              <Placeholder label={`${images[img]} — placeholder`} ratio="16/10" />
              <div className="thumbs" role="group" aria-label="Gallery thumbnails">
                {images.map((l, i) => (
                  <button key={l} type="button" className="thumb" aria-pressed={img === i} aria-label={`Show image ${i + 1}: ${l}`} onClick={() => setImg(i)}>{i + 1}</button>
                ))}
              </div>
            </div>

            <h2>Overview</h2>
            <p>{o.overview}</p>

            <h2>Specifications</h2>
            <dl className="specs">
              <div><dt>Buy / Lease</dt><dd>{o.mode}</dd></div>
              <div><dt>Price</dt><dd>On request</dd></div>
              <div><dt>Availability</dt><dd>Available</dd></div>
              {o.specs.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
            </dl>

            <h2>Location</h2>
            <Placeholder label="Location placeholder" ratio="16/7" />

            <h2>What happens next</h2>
            <ol className="next">{nextSteps.map(([t, d], i) => <li key={t}><span className="step-n">{String(i + 1).padStart(2, '0')}</span><div><strong>{t}</strong><p>{d}</p></div></li>)}</ol>
          </div>
          <aside className="enquiry-panel" aria-label="Enquiry">
            <h2>Interested?</h2>
            <p className="muted">{o.title} · {o.id}</p>
            <Button to={enquire}>Enquire About This Property</Button>
          </aside>
        </div>
      </Section>
      <Section tone="grey">
        <SectionHead eyebrow="More" title="Other opportunities" />
        <div className="grid-3">
          {opportunities.filter(x => x.id !== o.id && x.available).slice(0, 3).map(x => <OpportunityCard key={x.id} o={x} />)}
        </div>
      </Section>
      <div className="mobile-enquiry">
        <Link to={enquire} className="btn btn-primary">Enquire About This Property</Link>
      </div>
    </>
  )
}
