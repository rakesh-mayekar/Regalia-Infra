import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { services } from '../data/content.js'
import { Button } from './ui.jsx'
import SocialFeed from './SocialFeed.jsx'

export function Header() {
  const [menu, setMenu] = useState(false)
  const [drop, setDrop] = useState(null)
  const [mSvc, setMSvc] = useState(false)
  const [mAbout, setMAbout] = useState(false)
  const loc = useLocation()
  const dropRef = useRef(null)
  const toggleRef = useRef(null)

  useEffect(() => { setMenu(false); setDrop(null); setMSvc(false); setMAbout(false) }, [loc.pathname])

  useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') {
        if (drop) { dropRef.current?.querySelector(`[data-dd="${drop}"] > button`)?.focus(); setDrop(null) }
        if (menu) { setMenu(false); toggleRef.current?.focus() }
      }
    }
    const onClick = e => { if (drop && dropRef.current && !dropRef.current.contains(e.target)) setDrop(null) }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('mousedown', onClick) }
  }, [drop, menu])

  const aboutLinks = [{ to: '/about', label: 'About Regalia' }, { to: '/about/samiksha-singh', label: 'About the Owner' }]
  const svcLinks = [{ to: '/services', label: 'Services Overview' }, ...services.map(s => ({ to: `/services/${s.slug}`, label: s.nav }))]

  return (
    <header className="site-header">
      <a href="#main" className="skip">Skip to content</a>
      <div className="container header-row">
        <Link to="/" className="wordmark">REGALIA INFRA</Link>
        <nav className="desktop-nav" aria-label="Main" ref={dropRef}>
          <NavLink to="/" end>Home</NavLink>
          <div className="dropdown" data-dd="about">
            <button type="button" className={loc.pathname.startsWith('/about') ? 'active' : ''} aria-expanded={drop === 'about'} aria-controls="about-menu" onClick={() => setDrop(drop === 'about' ? null : 'about')}>About <span aria-hidden="true">▾</span></button>
            {drop === 'about' && (
              <ul id="about-menu" className="dropdown-menu">
                {aboutLinks.map(l => <li key={l.to}><Link to={l.to}>{l.label}</Link></li>)}
              </ul>
            )}
          </div>
          <div className="dropdown" data-dd="svc">
            <button type="button" aria-expanded={drop === 'svc'} aria-controls="svc-menu" onClick={() => setDrop(drop === 'svc' ? null : 'svc')}>Services <span aria-hidden="true">▾</span></button>
            {drop === 'svc' && (
              <ul id="svc-menu" className="dropdown-menu">
                {svcLinks.map(l => <li key={l.to}><Link to={l.to}>{l.label}</Link></li>)}
              </ul>
            )}
          </div>
          <NavLink to="/opportunities">Opportunities</NavLink>
          <NavLink to="/partner-with-us">Partner With Us</NavLink>
        </nav>
        <div className="header-cta"><Button to="/contact">Submit Requirement</Button></div>
        <button type="button" ref={toggleRef} className="menu-toggle" aria-expanded={menu} aria-controls="mobile-menu" onClick={() => setMenu(!menu)}>
          {menu ? 'Close' : 'Menu'}
        </button>
      </div>
      {menu && (
        <nav id="mobile-menu" className="mobile-nav" aria-label="Mobile">
          <div className="container">
            <Link to="/">Home</Link>
            <button type="button" aria-expanded={mAbout} aria-controls="m-about" onClick={() => setMAbout(!mAbout)}>
              About <span aria-hidden="true">{mAbout ? '–' : '+'}</span>
            </button>
            {mAbout && <div id="m-about" className="mobile-sub">{aboutLinks.map(l => <Link key={l.to} to={l.to}>{l.label}</Link>)}</div>}
            <button type="button" aria-expanded={mSvc} aria-controls="m-svc" onClick={() => setMSvc(!mSvc)}>
              Services <span aria-hidden="true">{mSvc ? '–' : '+'}</span>
            </button>
            {mSvc && <div id="m-svc" className="mobile-sub">{svcLinks.map(l => <Link key={l.to} to={l.to}>{l.label}</Link>)}</div>}
            <Link to="/opportunities">Opportunities</Link>
            <Link to="/partner-with-us">Partner With Us</Link>
            <Link to="/contact">Contact</Link>
            <Button to="/contact">Submit Requirement</Button>
          </div>
        </nav>
      )}
    </header>
  )
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <p className="wordmark">REGALIA INFRA</p>
          <p className="muted">Real estate advisory, leasing and sales.</p>
        </div>
        <nav aria-label="Footer pages">
          <h2>Pages</h2>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Regalia</Link></li>
            <li><Link to="/about/samiksha-singh">About the Owner</Link></li>
            <li><Link to="/opportunities">Opportunities</Link></li>
            <li><Link to="/partner-with-us">Partner With Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
        <nav aria-label="Footer services">
          <h2>Services</h2>
          <ul>
            <li><Link to="/services">Services Overview</Link></li>
            {services.map(s => <li key={s.slug}><Link to={`/services/${s.slug}`}>{s.nav}</Link></li>)}
          </ul>
        </nav>
      </div>
      <div className="container footer-bottom">
        <span className="muted">Wireframe preview</span>
        <span><Link to="/privacy">Privacy</Link> · <Link to="/terms">Terms</Link></span>
      </div>
    </footer>
  )
}

export function Layout() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const els = [...document.querySelectorAll('main .section .container > *')]
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
    }), { threshold: 0.08 })
    els.forEach(el => { el.classList.add('reveal'); io.observe(el) })
    const failsafe = setTimeout(() => els.forEach(el => el.classList.add('in')), 2500)
    return () => { io.disconnect(); clearTimeout(failsafe) }
  }, [pathname])
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1}><Outlet /></main>
      <SocialFeed />
      <Footer />
    </>
  )
}
