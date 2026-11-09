import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { services, photos, serviceImage } from '../data/content.js'

const slides = [
  { id: 'main', eyebrow: 'Real estate consultancy', title: ['The right space.', 'The right opportunity.'], text: 'Real estate advisory, retail leasing and property sales.',
    cta: ['Submit Requirement', '/contact'], alt: ['Explore Services', '/services'], image: 'Architectural image', src: photos.homes },
  ...services.map(s => ({
    id: s.slug, eyebrow: s.short, title: [s.sentence], text: s.audience.replace(/ · /g, ', ') + '.',
    cta: [s.cta, `/contact?req=${s.req}`], alt: ['View Service', `/services/${s.slug}`], image: `${s.short} image`, src: serviceImage[s.slug],
  })),
]

export default function HeroSlider() {
  const [i, setI] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [hover, setHover] = useState(false)
  const reduced = useRef(typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)
  const go = n => setI((n + slides.length) % slides.length)

  useEffect(() => {
    if (!playing || hover || reduced.current) return
    const t = setTimeout(() => setI(x => (x + 1) % slides.length), 6500)
    return () => clearTimeout(t)
  }, [i, playing, hover])

  const onKey = e => {
    if (e.key === 'ArrowRight') go(i + 1)
    if (e.key === 'ArrowLeft') go(i - 1)
  }

  return (
    <section className={`slider ${i % 2 ? 'slider-dark' : ''}`} aria-roledescription="carousel" aria-label="Featured"
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)} onBlur={() => setHover(false)} onKeyDown={onKey}>
      <div className="slides" aria-live={playing && !hover ? 'off' : 'polite'}>
        {slides.map((s, n) => {
          const Tag = n === 0 ? 'h1' : 'h2'
          const active = n === i
          return (
            <div key={s.id} className={`slide ${n % 2 ? 'slide-dark' : ''} ${active ? 'is-active' : ''}`}
              role="group" aria-roledescription="slide" aria-label={`${n + 1} of ${slides.length}`} aria-hidden={!active} inert={!active ? '' : undefined}>
              <div className="slide-text">
                <span className="pill"><i aria-hidden="true" />{s.eyebrow}</span>
                <Tag>{s.title.map((t, k) => <span key={k} className="line">{t}</span>)}</Tag>
                <p className="lead">{s.text}</p>
                <div className="actions">
                  <Link to={s.cta[1]} className={`btn ${n % 2 ? 'btn-inverse' : 'btn-primary'}`}>{s.cta[0]}<span className="btn-arrow" aria-hidden="true">→</span></Link>
                  <Link to={s.alt[1]} className="btn btn-secondary">{s.alt[0]}<span className="btn-arrow" aria-hidden="true">→</span></Link>
                </div>
              </div>
              <div className="slide-media" role="img" aria-label={s.image}>
                <img src={s.src} alt="" loading={n === 0 ? 'eager' : 'lazy'} />
                <span>{s.image}</span>
              </div>
            </div>
          )
        })}
      </div>
      <div className="slider-bar">
        <div className="slider-dots" role="group" aria-label="Choose slide">
          {slides.map((s, n) => (
            <button key={s.id} type="button" className="dot" aria-label={`Slide ${n + 1}: ${s.eyebrow}`} aria-current={n === i} onClick={() => setI(n)}><i /></button>
          ))}
        </div>
        <span className="slider-count" aria-hidden="true">{String(i + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</span>
        <div className="slider-ctrl">
          <button type="button" onClick={() => setPlaying(p => !p)} aria-label={playing ? 'Pause slides' : 'Play slides'}>{playing ? '❚❚' : '▶'}</button>
          <button type="button" onClick={() => go(i - 1)} aria-label="Previous slide">←</button>
          <button type="button" onClick={() => go(i + 1)} aria-label="Next slide">→</button>
        </div>
      </div>
    </section>
  )
}
