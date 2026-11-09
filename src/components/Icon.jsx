const paths = {
  store: <><path d="M3 9l1.5-5h15L21 9" /><path d="M3 9h18v2a3 3 0 01-6 0 3 3 0 01-6 0 3 3 0 01-6 0z" /><path d="M5 14v6h14v-6" /><path d="M10 20v-4h4v4" /></>,
  expand: <><path d="M4 20V10l8-6 8 6v10" /><path d="M9 20v-6h6v6" /><path d="M15 4h5v5" /></>,
  home: <><path d="M3 11l9-8 9 8" /><path d="M5 10v10h14V10" /><path d="M10 20v-6h4v6" /></>,
  building: <><rect x="5" y="3" width="14" height="18" /><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2" /><path d="M11 21v-3h2v3" /></>,
  key: <><circle cx="8" cy="15" r="4" /><path d="M11 12l9-9M16 7l3 3" /></>,
  owner: <><path d="M3 21h18" /><path d="M5 21V9l7-5 7 5v12" /><path d="M9 13h6" /></>,
  buyer: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></>,
  invest: <><path d="M3 17l6-6 4 4 8-8" /><path d="M15 7h6v6" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></>,
  visit: <><path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z" /><circle cx="12" cy="9" r="2.5" /></>,
  handshake: <><path d="M3 12l5-5 4 3 4-3 5 5" /><path d="M8 17l2 2 2-2 2 2 2-2" /></>,
  doc: <><path d="M6 3h9l4 4v14H6z" /><path d="M14 3v5h5M9 13h7M9 17h7" /></>,
  chat: <><path d="M4 5h16v11H9l-5 4z" /></>,
  phone: <><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A15 15 0 013 6a2 2 0 012-2z" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>,
  whatsapp: <><path d="M4 20l1.4-4.2A8 8 0 118 18.6z" /><path d="M9 9c0 3 3 6 6 6l1.2-1.6-2.2-1-1 .8c-1-.4-1.8-1.2-2.2-2.2l.8-1-1-2.2z" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
}

export default function Icon({ name, size = 28 }) {
  return (
    <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {paths[name]}
    </svg>
  )
}

export function Skyline() {
  return (
    <svg className="skyline" viewBox="0 0 400 300" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true" preserveAspectRatio="xMidYMax slice">
      <path d="M0 290h400" />
      <path d="M20 290V170h60v120M20 170l30-24 30 24M35 190h10M55 190h10M35 215h10M55 215h10M35 240h10M55 240h10" />
      <path d="M100 290V90h70v200M100 90l35-30 35 30M115 115h12M143 115h12M115 145h12M143 145h12M115 175h12M143 175h12M115 205h12M143 205h12M115 235h12M143 235h12" />
      <path d="M190 290V130h50v160M200 150h8M222 150h8M200 180h8M222 180h8M200 210h8M222 210h8" />
      <path d="M260 290V40h60v250M290 40V15M270 70h40M270 100h40M270 130h40M270 160h40M270 190h40M270 220h40" />
      <path d="M340 290V200h45v90M350 220h8M366 220h8M350 245h8M366 245h8" />
    </svg>
  )
}

export function PortraitArt() {
  return (
    <svg className="portrait-art" viewBox="0 0 300 380" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true" preserveAspectRatio="xMidYMax meet">
      <circle cx="150" cy="120" r="62" />
      <path d="M118 112c18-6 44-6 64 0M130 140c12 8 28 8 40 0" />
      <path d="M20 380c0-86 52-132 130-132s130 46 130 132" />
      <path d="M118 176v34M182 176v34M118 210c8 16 56 16 64 0" />
      <path d="M60 380c4-50 30-84 62-100M240 380c-4-50-30-84-62-100" strokeDasharray="3 5" />
    </svg>
  )
}

export function Rings() {
  return (
    <svg className="rings" viewBox="0 0 160 160" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
      {[74, 60, 46, 32, 18, 6].map(r => <circle key={r} cx="80" cy={160 - r - 6} r={r} />)}
    </svg>
  )
}
