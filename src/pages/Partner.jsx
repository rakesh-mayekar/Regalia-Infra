import { InfoCard, CheckCards, Eyebrow, Section, SectionHead, Breadcrumbs, Steps } from '../components/ui.jsx'
import { PartnerForm } from '../components/forms.jsx'
import { Accordion } from '../components/ui.jsx'
import { partnerReady, partnerFaqs, partnerCategories } from '../data/content.js'

export default function Partner() {
  return (
    <>
      <Section>
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Partner With Us' }]} />
        <h1>Put your property forward.</h1>
        <p className="lead">For developers, property owners and authorised representatives.</p>
      </Section>
      <Section tone="grey">
        <div className="split">
          <div><Eyebrow>Categories</Eyebrow><h2>Suitable properties</h2></div>
          <div className="cards cards-3">{partnerCategories.map(([ic, t, d]) => <InfoCard key={t} icon={ic} title={t} text={d} />)}</div>
        </div>
      </Section>
      <Section>
        <SectionHead eyebrow="Process" title="Process" />
        <Steps steps={['Share details', 'Review', 'Discuss next steps']} />
      </Section>
      <Section tone="grey" id="submit">
        <div className="form-wrap">
          <h2>Property Submission</h2>
          <PartnerForm />
        </div>
      </Section>
      <Section>
        <div className="split">
          <div><Eyebrow>Before you submit</Eyebrow><h2>Have ready</h2></div>
          <CheckCards items={partnerReady} />
        </div>
      </Section>
      <Section tone="grey">
        <SectionHead eyebrow="FAQs" title="Common questions" />
        <Accordion items={partnerFaqs} />
      </Section>
    </>
  )
}
