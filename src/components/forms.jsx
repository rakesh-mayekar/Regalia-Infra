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

/* ---------- Requirement form ---------- */
const emptyC = {
  name: '', phone: '', email: '', method: 'Phone',
  brand: '', category: '', location: '', area: '', budget: '', timeline: '',
  config: '', purpose: '', dealType: '', use: '', message: '', notes: '', consent: false,
}

export function RequirementForm({ type, property }) {
  const nav = useNavigate()
  const root = useRef()
  const [step, setStep] = useState(1)
  const [v, setV] = useState(emptyC)
  const [errors, setErrors] = useState({})
  const [status, submit, reset] = useDemoSubmit(() => nav('/thank-you'))
  const set = k => e => setV(s => ({ ...s, [k]: e.target ? e.target.value : e }))

  const check1 = () => {
    const e = {}
    if (req(v.name)) e.name = 'Enter your name.'
    if (req(v.phone)) e.phone = 'Enter your phone number.'
    else if (!phoneOk(v.phone)) e.phone = 'Enter a valid phone number.'
    if (v.email && !emailOk(v.email)) e.email = 'Enter a valid email address.'
    if (v.method === 'Email' && !v.email) e.email = 'Email is required when Email is your preferred method.'
    return e
  }
  const check2 = () => {
    const e = {}
    if (type !== 'general' && req(v.location)) e.location = 'Enter a preferred location.'
    if (type === 'general' && req(v.message)) e.message = 'Enter a message.'
    if (!v.consent) e.consent = 'Please give your consent to be contacted.'
    return e
  }

  const next = ev => {
    ev.preventDefault()
    const e = check1(); setErrors(e)
    if (Object.keys(e).length) return focusFirstError(root)
    setStep(2)
  }
  const onSubmit = ev => {
    ev.preventDefault()
    const e = check2(); setErrors(e)
    if (Object.keys(e).length) return focusFirstError(root)
    submit()
  }

  useEffect(() => { root.current?.querySelector('h2')?.focus() }, [step])

  if (status === 'error') return <SubmissionError onRetry={reset} />

  return (
    <form ref={root} noValidate onSubmit={step === 1 ? next : onSubmit} className="form">
      <h2 tabIndex={-1} className="form-step">Step {step} of 2 — {step === 1 ? 'Your Details' : 'Your Requirement'}</h2>
      <p className="muted">Fields marked (required) must be completed.</p>
      {property && (
        <div className="context" aria-label="Selected property">
          <span className="tag">Selected property</span>
          <p><strong>{property.title}</strong> · {property.id}</p>
        </div>
      )}
      {step === 1 && (
        <>
          <Field label="Name" required value={v.name} onChange={set('name')} error={errors.name} autoComplete="name" />
          <Field label="Phone" required type="tel" value={v.phone} onChange={set('phone')} error={errors.phone} autoComplete="tel" />
          <Field label="Email" type="email" value={v.email} onChange={set('email')} error={errors.email} autoComplete="email" />
          <RadioGroup legend="Preferred contact method" name="method" options={['Phone', 'Email']} value={v.method} onChange={set('method')} required />
          <DemoNote />
          <SubmitBar status={status}>Continue</SubmitBar>
        </>
      )}
      {step === 2 && (
        <>
          {(type === 'retail' || type === 'brand') && (
            <>
              <Field label="Brand name" value={v.brand} onChange={set('brand')} />
              <Field label="Business category" value={v.category} onChange={set('category')} />
              <Field label="Preferred location" required value={v.location} onChange={set('location')} error={errors.location} />
              <Field label="Required area" value={v.area} onChange={set('area')} />
              <Field label="Budget" value={v.budget} onChange={set('budget')} />
              <Field label="Timeline" value={v.timeline} onChange={set('timeline')} />
            </>
          )}
          {type === 'residential' && (
            <>
              <Field label="Preferred location" required value={v.location} onChange={set('location')} error={errors.location} />
              <Field label="Configuration" as="select" value={v.config} onChange={set('config')}>
                <option value="">Select</option>
                {['1 BHK', '2 BHK', '3 BHK', '4 BHK+', 'Other'].map(o => <option key={o}>{o}</option>)}
              </Field>
              <Field label="Budget" value={v.budget} onChange={set('budget')} />
              <RadioGroup legend="Purpose" name="purpose" options={['Home', 'Investment']} value={v.purpose} onChange={set('purpose')} />
              <Field label="Timeline" value={v.timeline} onChange={set('timeline')} />
            </>
          )}
          {type === 'commercial' && (
            <>
              <RadioGroup legend="Buy / Lease" name="dealType" options={['Buy', 'Lease']} value={v.dealType} onChange={set('dealType')} />
              <Field label="Intended use" value={v.use} onChange={set('use')} />
              <Field label="Preferred location" required value={v.location} onChange={set('location')} error={errors.location} />
              <Field label="Required area" value={v.area} onChange={set('area')} />
              <Field label="Budget" value={v.budget} onChange={set('budget')} />
              <Field label="Timeline" value={v.timeline} onChange={set('timeline')} />
            </>
          )}
          {type === 'general' && <Field label="Message" as="textarea" required value={v.message} onChange={set('message')} error={errors.message} />}
          {type !== 'general' && <Field label="Additional notes" as="textarea" value={v.notes} onChange={set('notes')} />}
          <Consent checked={v.consent} onChange={c => setV(s => ({ ...s, consent: c }))} error={errors.consent} />
          <DemoNote />
          <SubmitBar status={status} back={<Button variant="secondary" onClick={() => setStep(1)} disabled={status === 'submitting'}>Back</Button>}>Submit</SubmitBar>
        </>
      )}
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

