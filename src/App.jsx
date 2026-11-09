import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import { ServicesOverview, ServiceDetail } from './pages/Services.jsx'
import { Opportunities, OpportunityDetail } from './pages/Opportunities.jsx'
import Founder from './pages/Founder.jsx'
import Partner from './pages/Partner.jsx'
import Contact from './pages/Contact.jsx'
import { ThankYou, Legal, NotFound } from './pages/Misc.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/about/samiksha-singh" element={<Founder />} />
        <Route path="/services" element={<ServicesOverview />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/opportunities" element={<Opportunities />} />
        <Route path="/opportunities/:slug" element={<OpportunityDetail />} />
        <Route path="/partner-with-us" element={<Partner />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/privacy" element={<Legal title="Privacy" />} />
        <Route path="/terms" element={<Legal title="Terms" />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
