import { useId, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon, { Skyline } from './Icon.jsx'

export function Button({ to, children, variant = 'primary', type = 'button', ...rest }) {
  const cls = `btn btn-${variant}`
  if (to) return <Link to={to} className={cls} {...rest}>{children}<span aria-hidden="true" className="btn-arrow">→</span></Link>
  return <button type={type} className={cls} {...rest}>{children}</button>
}

export function TextLink({ to, children }) {
  return <Link to={to} className="text-link">{children} <span aria-hidden="true">→</span></Link>
}

export function Section({ children, className = '', tone, id, label }) {
  return (
    <section className={`section ${tone ? `section-${tone}` : ''} ${className}`} id={id} aria-label={label}>
      <div className="container">{children}</div>
    </section>
  )
}

export function Placeholder({ label, ratio = '16/9', className = '', art }) {
  return (
    <div className={`placeholder ${className}`} style={{ aspectRatio: ratio }} role="img" aria-label={label}>
      {art && <Skyline />}
      <span>{label}</span>
    </div>
  )
}

export function ServiceLink({ to, title, text, audience, index, icon }) {
  return (
    <Link to={to} className="service-link">
      <span className="service-link-top">{icon && <Icon name={icon} />}{index && <span className="service-link-n">{String(index).padStart(2, '0')}</span>}</span>
      <span className="service-link-title">{title}</span>
      <span className="service-link-text">{text}{audience && <small>{audience}</small>}</span>
      <span className="service-link-more">Explore <span aria-hidden="true">→</span></span>
    </Link>
  )
}

export function OpportunityCard({ o }) {
  return (
    <article className="opp-card">
      <Placeholder label="Property image" ratio="4/3" />
      <p className="tag">Demo listing</p>
      <h3><Link to={`/opportunities/${o.slug}`}>{o.title}</Link></h3>
      <p className="muted">{o.location} (illustrative)</p>
      <dl className="opp-meta">
        <div><dt>Type</dt><dd>{o.type}</dd></div>
        <div><dt>Mode</dt><dd>{o.mode}</dd></div>
        <div><dt>{o.type === 'Residential' ? 'Configuration' : 'Area'}</dt><dd>{o.area}</dd></div>
        <div><dt>Price</dt><dd>On request</dd></div>
      </dl>
      <TextLink to={`/opportunities/${o.slug}`}>View Details</TextLink>
    </article>
  )
}

export function Field({ label, error, required, hint, children, as = 'input', ...props }) {
  const id = useId()
  const errId = `${id}-e`
  const describedBy = [error && errId, hint && `${id}-h`].filter(Boolean).join(' ') || undefined
  const common = { id, 'aria-invalid': !!error, 'aria-describedby': describedBy, 'aria-required': required || undefined }
  let control
  if (as === 'select') control = <select {...common} {...props}>{children}</select>
  else if (as === 'textarea') control = <textarea rows={4} {...common} {...props} />
  else control = <input {...common} {...props} />
  return (
    <div className={`field ${error ? 'has-error' : ''}`}>
      <label htmlFor={id}>{label} {required ? <span className="req">(required)</span> : <span className="opt">(optional)</span>}</label>
      {control}
      {hint && <p className="hint" id={`${id}-h`}>{hint}</p>}
      {error && <p className="error" id={errId} role="alert">{error}</p>}
    </div>
  )
}

export function RadioGroup({ legend, name, options, value, onChange, error, required }) {
  const id = useId()
  return (
    <fieldset className={`field radio-group ${error ? 'has-error' : ''}`} aria-describedby={error ? `${id}-e` : undefined}>
      <legend>{legend} {required ? <span className="req">(required)</span> : <span className="opt">(optional)</span>}</legend>
      <div className="radio-row">
        {options.map(opt => (
          <label key={opt} className="radio">
            <input type="radio" name={name} value={opt} checked={value === opt} onChange={() => onChange(opt)} />
            <span>{opt}</span>
          </label>
        ))}
      </div>
      {error && <p className="error" id={`${id}-e`} role="alert">{error}</p>}
    </fieldset>
  )
}

export function Consent({ checked, onChange, error }) {
  const id = useId()
  return (
    <div className={`field ${error ? 'has-error' : ''}`}>
      <label className="check" htmlFor={id}>
        <input id={id} type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} aria-invalid={!!error} aria-required="true" />
        <span>I agree to be contacted about this enquiry. <span className="req">(required)</span></span>
      </label>
      {error && <p className="error" role="alert">{error}</p>}
    </div>
  )
}

export function Accordion({ items }) {
  const [open, setOpen] = useState(null)
  const base = useId()
  return (
    <div className="accordion">
      {items.map(([q, a], i) => {
        const isOpen = open === i
        return (
          <div className="acc-item" key={q}>
            <h3>
              <button type="button" aria-expanded={isOpen} aria-controls={`${base}-${i}`} id={`${base}-b${i}`} onClick={() => setOpen(isOpen ? null : i)}>
                <span>{q}</span><span aria-hidden="true">{isOpen ? '–' : '+'}</span>
              </button>
            </h3>
            <div id={`${base}-${i}`} role="region" aria-labelledby={`${base}-b${i}`} hidden={!isOpen}><p>{a}</p></div>
          </div>
        )
      })}
    </div>
  )
}

export function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs">
      <ol>
        {items.map((it, i) => (
          <li key={it.label}>
            {it.to && i < items.length - 1 ? <Link to={it.to}>{it.label}</Link> : <span aria-current="page">{it.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export function StateMessage({ title, text, actions, tone }) {
  return (
    <div className={`state ${tone || ''}`} role={tone === 'error' ? 'alert' : undefined}>
      <h1>{title}</h1>
      {text && <p>{text}</p>}
      {actions && <div className="actions">{actions}</div>}
    </div>
  )
}

export function SubmissionError({ onRetry }) {
  return (
    <div className="state error" role="alert">
      <h2>Submission failed.</h2>
      <p>Something went wrong. Please try again.</p>
      <div className="actions"><Button onClick={onRetry} variant="secondary">Try Again</Button></div>
    </div>
  )
}

export function Eyebrow({ children }) {
  return <p className="eyebrow">{children}</p>
}

export function SectionHead({ title, intro, eyebrow }) {
  return (
    <header className="section-head">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2>{title}</h2>
      {intro && <p>{intro}</p>}
    </header>
  )
}

export function FinalCta({ title = 'Tell us what you’re looking for.', to = '/contact', label = 'Share Your Requirement' }) {
  return (
    <Section tone="black" className="final-cta">
      <Eyebrow>Get in touch</Eyebrow>
      <h2>{title}</h2>
      <Button to={to} variant="inverse">{label}</Button>
    </Section>
  )
}

export function Steps({ steps }) {
  return <ol className="steps">{steps.map((s, i) => <li key={s}><span className="step-n">{String(i + 1).padStart(2, '0')}</span><span>{s}</span></li>)}</ol>
}

export function InfoCard({ icon, title, text, tag, items, to, link, index }) {
  const body = (
    <>
      <span className="card-top">{icon && <Icon name={icon} />}{index && <span className="service-link-n">{index}</span>}</span>
      {tag && <span className="tag">{tag}</span>}
      <h3>{title}</h3>
      {text && <p className="card-text">{text}</p>}
      {items && <ul className="card-items">{items.map(x => <li key={x}>{x}</li>)}</ul>}
      {to && <span className="service-link-more">{link || 'Learn more'} <span aria-hidden="true">→</span></span>}
    </>
  )
  return to ? <Link to={to} className="info-card is-link">{body}</Link> : <div className="info-card">{body}</div>
}

export function CheckCards({ items }) {
  return (
    <ul className="check-cards">
      {items.map(x => <li key={x}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12l4.5 4.5L19 7" /></svg><span>{x}</span></li>)}
    </ul>
  )
}
