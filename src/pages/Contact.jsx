import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { Section, Breadcrumbs, Button } from '../components/ui.jsx'
import { RequirementForm } from '../components/forms.jsx'
import { requirements, opportunities, contactReady, nextSteps } from '../data/content.js'

const propReq = { Retail: 'retail', Residential: 'residential', Commercial: 'commercial' }

export default function Contact() {
  const [params, setParams] = useSearchParams()
  const nav = useNavigate()
  const property = opportunities.find(o => o.id === params.get('property'))
  let type = params.get('req')
  if (!requirements.some(r => r.id === type)) type = property ? propReq[property.type] : null

  useEffect(() => { if (type === 'list') nav('/partner-with-us', { replace: true }) }, [type, nav])

  const choose = id => {
    if (id === 'list') return nav('/partner-with-us')
    const next = new URLSearchParams(params); next.set('req', id)
    setParams(next, { replace: true })
  }

  return (
    <Section>
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Contact' }]} />
      <h1>Share Your Requirement</h1>
      <div className="contact-grid">
      <div className="form-wrap">
        <fieldset className="selector">
          <legend>I’m looking for</legend>
          <div className="selector-grid">
            {requirements.map(r => (
              <button key={r.id} type="button" className="chip" aria-pressed={type === r.id} onClick={() => choose(r.id)}>{r.label}</button>
            ))}
          </div>
        </fieldset>
        {type && type !== 'list' && <RequirementForm key={type} type={type} property={property} />}
        {!type && <p className="muted">Select a requirement to continue.</p>}
      </div>
      <aside className="side">
        <h2>Have ready</h2>
        <ul className="checklist">{contactReady.map(x => <li key={x}>{x}</li>)}</ul>
        <h2>What happens next</h2>
        <ol className="next">{nextSteps.map(([t, d], i) => <li key={t}><span className="step-n">{String(i + 1).padStart(2, '0')}</span><div><strong>{t}</strong><p>{d}</p></div></li>)}</ol>
      </aside>
      </div>
    </Section>
  )
}
