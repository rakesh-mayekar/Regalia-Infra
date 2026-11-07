import { Section, Button, StateMessage } from '../components/ui.jsx'

export function ThankYou() {
  return (
    <Section>
      <StateMessage title="Demo enquiry complete." text="Your form is valid. No information was sent." actions={<>
        <Button to="/">Back to Home</Button>
        <Button to="/opportunities" variant="secondary">Explore Opportunities</Button>
      </>} />
    </Section>
  )
}

export function Legal({ title }) {
  return (
    <Section>
      <h1>{title}</h1>
      <p className="tag">Placeholder</p>
      <p>This page is a placeholder. Final content will be provided by the client.</p>
      <Button to="/" variant="secondary">Back to Home</Button>
    </Section>
  )
}

export function NotFound() {
  return (
    <Section>
      <StateMessage title="Page not found." text="The page you’re looking for doesn’t exist." actions={<>
        <Button to="/">Back to Home</Button>
        <Button to="/contact" variant="secondary">Share Your Requirement</Button>
      </>} />
    </Section>
  )
}
