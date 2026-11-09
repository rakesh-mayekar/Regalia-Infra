import { social } from '../data/content.js'

const Linked = () => <span className="li-badge" aria-hidden="true">in</span>

function LinkOrNote({ className, children }) {
  const url = social.linkedin.url
  if (url) return <a className={className} href={url} target="_blank" rel="noopener noreferrer">{children}</a>
  return <span className={`${className} is-off`} aria-disabled="true" title="LinkedIn link to be added">{children}</span>
}

export default function SocialFeed() {
  return (
    <section className="social" aria-label="LinkedIn posts">
      <div className="container">
        <div className="social-head">
          <div>
            <p className="eyebrow">Social</p>
            <h2>Latest from LinkedIn</h2>
            <p className="muted">Updates from Regalia Infra, shown here from LinkedIn.</p>
          </div>
          <LinkOrNote className="btn btn-secondary">Follow on LinkedIn <span className="btn-arrow" aria-hidden="true">→</span></LinkOrNote>
        </div>
        <ul className="social-row">
          {social.posts.map((p, i) => (
            <li key={i}>
              <article className="post">
                <header className="post-top">
                  <span className="post-avatar" aria-hidden="true">◆</span>
                  <div>
                    <strong>{social.linkedin.handle}</strong>
                    <small>Company page · date shown here</small>
                  </div>
                  <Linked />
                </header>
                <div className="post-lines" aria-hidden="true"><i /><i /><i className="short" /></div>
                <div className="post-media"><img src={p.image} alt="" loading="lazy" /><span>{p.tag}</span></div>
                <footer className="post-foot">
                  <span className="muted">Post text appears here once LinkedIn is connected.</span>
                  <LinkOrNote className="post-link">View on LinkedIn <span aria-hidden="true">→</span></LinkOrNote>
                </footer>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
