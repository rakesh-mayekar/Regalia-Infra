import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { services } from '../data/content.js'
import { Button } from './ui.jsx'

export function Header() {
  const [menu, setMenu] = useState(false)
  const [drop, setDrop] = useState(false)
  const [mSvc, setMSvc] = useState(false)
  const loc = useLocation()
  const dropRef = useRef(null)
  const toggleRef = useRef(null)

  useEffect(() => { setMenu(false); setDrop(false); setMSvc(false) }, [loc.pathname])

  useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') {
        if (drop) { setDrop(false); dropRef.current?.querySelector('button')?.focus() }
        if (menu) { setMenu(false); toggleRef.current?.focus() }
      }
    }
    const onClick = e => { if (drop && dropRef.current && !dropRef.current.contains(e.target)) setDrop(false) }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('mousedown', onClick) }
  }, [drop, menu])

  const svcLinks = [{ to: '/services', label: 'Services Overview' }, ...services.map(s => ({ to: `/services/${s.slug}`, label: s.nav }))]

  return (
    <header className="site-header">
      <a href="#main" className="skip">Skip to content</a>
      <div className="container header-row">
        <Link to="/" className="wordmark">REGALIA INFRA</Link>
        <nav className="desktop-nav" aria-label="Main">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <div className="dropdown" ref={dropRef}>
            <button type="button" aria-expanded={drop} aria-controls="svc-menu" onClick={() => setDrop(!drop)}>Services <span aria-hidden="true">▾</span></button>
            {drop && (
              <ul id="svc-menu" className="dropdown-menu">
                {svcLinks.map(l => <li key={l.to}><Link to={l.to}>{l.label}</Link></li>)}
              </ul>
            )}
          </div>
          <NavLink to="/opportunities">Opportunities</NavLink>
          <NavLink to="/partner-with-us">Partner With Us</NavLink>
        </nav>
        <div className="header-cta"><Button to="/contact">Share Your Requirement</Button></div>
        <button type="button" ref={toggleRef} className="menu-toggle" aria-expanded={menu} aria-controls="mobile-menu" onClick={() => setMenu(!menu)}>
          {menu ? 'Close' : 'Menu'}
        </button>
      </div>
      {menu && (
        <nav id="mobile-menu" className="mobile-nav" aria-label="Mobile">
          <div className="container">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <button type="button" aria-expanded={mSvc} aria-controls="m-svc" onClick={() => setMSvc(!mSvc)}>
              Services <span aria-hidden="true">{mSvc ? '–' : '+'}</span>
            </button>
            {mSvc && <div id="m-svc" className="mobile-sub">{svcLinks.map(l => <Link key={l.to} to={l.to}>{l.label}</Link>)}</div>}
            <Link to="/opportunities">Opportunities</Link>
            <Link to="/partner-with-us">Partner With Us</Link>
            <Link to="/contact">Contact</Link>
            <Button to="/contact">Share Your Requirement</Button>
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
            <li><Link to="/about">About</Link></li>
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
      <Footer />
    </>
  )
}
