import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Field, RadioGroup, Consent, SubmissionError } from './ui.jsx'


const emailOk = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
const phoneOk = v => /^[+\d][\d\s\-()]{6,17}$/.test(v.trim())
const req = v => !String(v || '').trim()

function useDemoSubmit(onDone) {
  const [status, setStatus] = useState('idle')
  const timer = useRef()
  useEffect(() => () => clearTimeout(timer.current), [])
  const submit = () => {
    setStatus('submitting')
    timer.current = setTimeout(() => { setStatus('success'); onDone() }, 800)
  }
  return [status, submit, () => setStatus('idle')]
}

function focusFirstError(root) {
  setTimeout(() => root.current?.querySelector('[aria-invalid="true"]')?.focus(), 0)
}

function SubmitBar({ status, children, back }) {
  return (
    <div className="form-actions">
      {back}
      <Button type="submit" disabled={status === 'submitting'}>{status === 'submitting' ? 'Submitting…' : children}</Button>
    </div>
  )
}

const DemoNote = () => <p className="muted form-note">Demo form — details are not sent.</p>

/* ---------- Requirement forms (one distinct form per requirement type) ---------- */
const TIMELINES = ['Immediately', 'Within 1–3 months', 'Within 3–6 months', 'Just exploring']
const t = (k, label, o = {}) => ({ k, label, kind: 'text', ...o })
const sel = (k, label, options, o = {}) => ({ k, label, kind: 'select', options, ...o })
const rad = (k, label, options, o = {}) => ({ k, label, kind: 'radio', options, ...o })
const area = (k, label, o = {}) => ({ k, label, kind: 'area', ...o })
const ta = (k, label, o = {}) => ({ k, label, kind: 'textarea', ...o })

export const requirementForms = {
  retail: {
    title: 'Retail leasing enquiry', intro: 'Tell us about the space your business needs.', submit: 'Submit Retail Enquiry',
    fields: [
      t('brand', 'Business or brand name', { required: true, msg: 'Enter your business name.' }),
      sel('category', 'Business category', ['Fashion and apparel', 'Food and beverage', 'Grocery and daily needs', 'Electronics', 'Health and beauty', 'Services', 'Other'], { required: true, msg: 'Select a category.' }),
      t('location', 'Preferred locations or catchment', { required: true, msg: 'Enter a preferred location.' }),
      rad('format', 'Preferred setting', ['High street', 'Inside a mall', 'Standalone', 'Open to options']),
      area('area', 'Space needed'),
      t('frontage', 'Frontage or floor preference'),
      t('budget', 'Monthly rent budget'),
      sel('timeline', 'Target opening', TIMELINES),
      ta('notes', 'Anything else we should know'),
    ],
  },
  brand: {
    title: 'Brand expansion enquiry', intro: 'Share your expansion plan and we will look at suitable locations.', submit: 'Submit Expansion Plan',
    fields: [
      t('brand', 'Brand name', { required: true, msg: 'Enter your brand name.' }),
      t('category', 'Business category', { required: true, msg: 'Enter a category.' }),
      sel('count', 'Number of new locations planned', ['1', '2–5', '6–15', '16 or more', 'Not decided'], { required: true, msg: 'Select an option.' }),
      t('location', 'Target cities or areas', { required: true, msg: 'Enter target cities or areas.' }),
      rad('format', 'Store format', ['Standalone store', 'Mall outlet', 'High-street store', 'Kiosk', 'Flexible']),
      area('area', 'Space needed per location'),
      rad('model', 'Operating model', ['Company-owned', 'Franchise', 'Both']),
      sel('timeline', 'Expansion timeline', TIMELINES),
      ta('notes', 'Anything else about your plan'),
    ],
  },
  residential: {
    title: 'Residential enquiry', intro: 'Tell us what kind of home you are looking for.', submit: 'Submit Residential Enquiry',
    fields: [
      rad('deal', 'Buy or lease', ['Buy', 'Lease'], { required: true, msg: 'Select Buy or Lease.' }),
      rad('purpose', 'Purpose', ['Home to live in', 'Investment']),
      t('location', 'Preferred locations', { required: true, msg: 'Enter a preferred location.' }),
      sel('config', 'Configuration', ['1 BHK', '2 BHK', '3 BHK', '4 BHK or more', 'Villa / independent house', 'Other']),
      t('budget', 'Budget range'),
      rad('possession', 'Possession', ['Ready to move', 'Under construction', 'Either']),
      sel('timeline', 'Timeline', TIMELINES),
      ta('notes', 'Anything else we should know'),
    ],
  },
  commercial: {
    title: 'Commercial enquiry', intro: 'Tell us about the commercial space you want to buy or lease.', submit: 'Submit Commercial Enquiry',
    fields: [
      rad('deal', 'Buy or lease', ['Buy', 'Lease'], { required: true, msg: 'Select Buy or Lease.' }),
      sel('ptype', 'Property type', ['Office', 'Showroom', 'Shop / retail', 'Warehouse', 'Co-working', 'Other'], { required: true, msg: 'Select a property type.' }),
      t('use', 'Intended use'),
      t('location', 'Preferred locations', { required: true, msg: 'Enter a preferred location.' }),
      area('area', 'Area needed'),
      t('budget', 'Budget'),
      sel('timeline', 'Timeline', TIMELINES),
      ta('notes', 'Anything else we should know'),
    ],
  },
  general: {
    title: 'General enquiry', intro: 'Not sure where to start? Send us a message.', submit: 'Send Message',
    fields: [
      sel('topic', 'What is it about?', ['Services', 'An opportunity I saw', 'Working together', 'Something else']),
      ta('message', 'Your message', { required: true, msg: 'Enter a message.', rows: 6 }),
    ],
  },
}

export function RequirementForm({ type, property }) {
  const nav = useNavigate()
  const root = useRef()
  const cfg = requirementForms[type]
  const [v, setV] = useState({ name: '', phone: '', email: '', method: 'Phone', consent: false, unit: 'sq ft' })
  const [errors, setErrors] = useState({})
  const [status, submit, reset] = useDemoSubmit(() => nav('/thank-you'))
  const set = k => e => setV(s => ({ ...s, [k]: e.target ? e.target.value : e }))

  const onSubmit = ev => {
    ev.preventDefault()
    const e = {}
    if (req(v.name)) e.name = 'Enter your name.'
    if (req(v.phone)) e.phone = 'Enter your phone number.'
    else if (!phoneOk(v.phone)) e.phone = 'Enter a valid phone number.'
    if (v.email && !emailOk(v.email)) e.email = 'Enter a valid email address.'
    if (v.method === 'Email' && !v.email) e.email = 'Email is required when Email is your preferred method.'
    cfg.fields.forEach(f => { if (f.required && req(v[f.k])) e[f.k] = f.msg || 'This field is required.' })
    if (!v.consent) e.consent = 'Please give your consent to be contacted.'
    setErrors(e)
    if (Object.keys(e).length) return focusFirstError(root)
    submit()
  }

  if (status === 'error') return <SubmissionError onRetry={reset} />

  const render = f => {
    const common = { key: f.k, label: f.label, required: f.required, value: v[f.k] || '', error: errors[f.k] }
    if (f.kind === 'select') return (
      <Field {...common} as="select" onChange={set(f.k)}>
        <option value="">Select</option>
        {f.options.map(o => <option key={o}>{o}</option>)}
      </Field>
    )
    if (f.kind === 'radio') return <RadioGroup key={f.k} legend={f.label} name={f.k} options={f.options} required={f.required} value={v[f.k] || ''} onChange={set(f.k)} error={errors[f.k]} />
    if (f.kind === 'textarea') return <Field {...common} as="textarea" rows={f.rows || 4} onChange={set(f.k)} />
    if (f.kind === 'area') return (
      <div className="field-pair" key={f.k}>
        <Field label={f.label} value={v[f.k] || ''} onChange={set(f.k)} inputMode="decimal" />
        <Field label="Unit" as="select" value={v.unit} onChange={set('unit')}>{['sq ft', 'sq m'].map(o => <option key={o}>{o}</option>)}</Field>
      </div>
    )
    return <Field {...common} onChange={set(f.k)} />
  }

  return (
    <form ref={root} noValidate onSubmit={onSubmit} className="form" aria-label={cfg.title}>
      <h2 className="form-title">{cfg.title}</h2>
      <p className="muted">{cfg.intro} Fields marked (required) must be completed.</p>
      {property && (
        <div className="context" aria-label="Selected property">
          <span className="tag">Selected property</span>
          <p><strong>{property.title}</strong> · {property.id}</p>
        </div>
      )}
      <h3 className="form-sub">About you</h3>
      <Field label="Name" required value={v.name} onChange={set('name')} error={errors.name} autoComplete="name" />
      <Field label="Phone" required type="tel" value={v.phone} onChange={set('phone')} error={errors.phone} autoComplete="tel" />
      <Field label="Email" type="email" value={v.email} onChange={set('email')} error={errors.email} autoComplete="email" />
      <RadioGroup legend="Preferred contact method" name="method" options={['Phone', 'Email']} value={v.method} onChange={set('method')} required />
      <h3 className="form-sub">Your requirement</h3>
      {cfg.fields.map(render)}
      <Consent checked={v.consent} onChange={c => setV(s => ({ ...s, consent: c }))} error={errors.consent} />
      <DemoNote />
      <SubmitBar status={status}>{cfg.submit}</SubmitBar>
    </form>
  )
}

/* ---------- Property submission form ---------- */
const emptyP = { name: '', phone: '', email: '', role: '', ptype: '', location: '', area: '', unit: 'sq ft', deal: '', details: '', consent: false }

export function PartnerForm() {
  const nav = useNavigate()
  const root = useRef()
  const [v, setV] = useState(emptyP)
  const [errors, setErrors] = useState({})
  const [status, submit, reset] = useDemoSubmit(() => nav('/thank-you'))
  const set = k => e => setV(s => ({ ...s, [k]: e.target ? e.target.value : e }))

  const onSubmit = ev => {
    ev.preventDefault()
    const e = {}
    if (req(v.name)) e.name = 'Enter your name.'
    if (req(v.phone)) e.phone = 'Enter your phone number.'
    else if (!phoneOk(v.phone)) e.phone = 'Enter a valid phone number.'
    if (v.email && !emailOk(v.email)) e.email = 'Enter a valid email address.'
    if (!v.role) e.role = 'Select one option.'
    if (!v.ptype) e.ptype = 'Select a property type.'
    if (req(v.location)) e.location = 'Enter the property location.'
    if (req(v.area)) e.area = 'Enter the area.'
    else if (!(Number(v.area) > 0)) e.area = 'Enter a valid number.'
    if (!v.deal) e.deal = 'Select Sell or Lease.'
    if (!v.consent) e.consent = 'Please give your consent to be contacted.'
    setErrors(e)
    if (Object.keys(e).length) return focusFirstError(root)
    submit()
  }

  if (status === 'error') return <SubmissionError onRetry={reset} />

  return (
    <form ref={root} noValidate onSubmit={onSubmit} className="form" id="submit-property">
      <p className="muted">Fields marked (required) must be completed.</p>
      <Field label="Name" required value={v.name} onChange={set('name')} error={errors.name} autoComplete="name" />
      <Field label="Phone" required type="tel" value={v.phone} onChange={set('phone')} error={errors.phone} autoComplete="tel" />
      <Field label="Email" type="email" value={v.email} onChange={set('email')} error={errors.email} autoComplete="email" />
      <RadioGroup legend="I am the" name="role" required options={['Owner', 'Authorised Representative']} value={v.role} onChange={set('role')} error={errors.role} />
      <Field label="Property type" required as="select" value={v.ptype} onChange={set('ptype')} error={errors.ptype}>
        <option value="">Select</option>
        {['Retail space', 'Residential', 'Commercial / Office', 'Land', 'Other'].map(o => <option key={o}>{o}</option>)}
      </Field>
      <Field label="Location" required value={v.location} onChange={set('location')} error={errors.location} />
      <div className="field-pair">
        <Field label="Area" required inputMode="decimal" value={v.area} onChange={set('area')} error={errors.area} />
        <Field label="Unit" required as="select" value={v.unit} onChange={set('unit')}>
          {['sq ft', 'sq m', 'acre'].map(o => <option key={o}>{o}</option>)}
        </Field>
      </div>
      <RadioGroup legend="Sell / Lease" name="deal" required options={['Sell', 'Lease']} value={v.deal} onChange={set('deal')} error={errors.deal} />
      <Field label="Additional details" as="textarea" value={v.details} onChange={set('details')} />
      <Consent checked={v.consent} onChange={c => setV(s => ({ ...s, consent: c }))} error={errors.consent} />
      <DemoNote />
      <SubmitBar status={status}>Submit Property</SubmitBar>
    </form>
  )
}

