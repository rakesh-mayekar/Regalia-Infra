export const services = [
  {
    slug: 'retail-leasing', icon: 'store', nav: 'Retail Leasing', title: 'Retail Leasing', short: 'Retail Leasing',
    req: 'retail', audience: 'Retail brands · Property owners',
    sentence: 'Find and lease the right retail space for your business.',
    intro: 'Space requirements, location shortlisting and leasing discussions for retail businesses.',
    cta: 'Share Your Leasing Requirement',
    forWho: [['Retail brands', 'Businesses seeking new retail space.'], ['High-street and commercial developments', 'Street-front and mixed-use settings.'], ['Property owners', 'Owners with retail space to lease.']],
    help: [['Define your requirement', 'Clarify space needs and preferred locations.'], ['Shortlist options', 'Review retail spaces that fit your brief.'], ['Arrange site visits', 'Coordinate visits to shortlisted spaces.'], ['Support leasing talks', 'Help move discussions towards terms.']],
    process: ['Share your requirement', 'Review shortlisted spaces', 'Visit and discuss', 'Coordinate lease terms'],
    faqs: [
      ['What details should I share?', 'Preferred locations, space needed and timeline help us shortlist more relevant options.'],
      ['Can property owners list retail space?', 'Yes. Use the Partner With Us page to put your property forward.'],
      ['Do you handle site visits?', 'We coordinate visits for spaces that match your requirement.'],
    ],
    ownerLink: true,
  },
  {
    slug: 'brand-expansion', icon: 'expand', nav: 'Brand Tie-ups & Expansion', title: 'Brand Tie-ups & Expansion', short: 'Brand Expansion',
    req: 'brand', audience: 'Retail brands',
    sentence: 'Location sourcing and property matching for brands planning to grow.',
    intro: 'Help for retail brands planning expansion across new locations and formats.',
    cta: 'Share Your Expansion Plan',
    forWho: [['Brands planning expansion', 'Retail brands growing to new locations.'], ['New market entrants', 'Brands entering a new city or area.'], ['Format explorers', 'Businesses testing new store formats.']],
    help: [['Understand your plan', 'Locations, formats and space needs.'], ['Source locations', 'Identify areas that suit your format.'], ['Match properties', 'Connect your needs with suitable spaces.'], ['Coordinate discussions', 'Support conversations with property owners.']],
    process: ['Share your expansion plan', 'Review matched properties', 'Visit and discuss', 'Move to terms'],
    faqs: [
      ['What should an expansion brief include?', 'Brand name, category, preferred locations, formats and space needs.'],
      ['Can you support multiple locations?', 'Share your plan and we will discuss how to approach it.'],
      ['Is there a fixed format?', 'No. Requirements vary by brand, and we work from yours.'],
    ],
  },
  {
    slug: 'residential', icon: 'home', nav: 'Residential Sales & Advisory', title: 'Residential Sales & Advisory', short: 'Residential Sales',
    req: 'residential', audience: 'Home buyers · Residential investors',
    sentence: 'Advisory and shortlisting for people buying homes or investing.',
    intro: 'Guidance for choosing residential property that fits your preferences.',
    cta: 'Share Your Buying Requirement',
    forWho: [['Home buyers', 'People looking for a home to live in.'], ['Residential investors', 'Buyers considering property as an investment.']],
    help: [['Capture preferences', 'Location, configuration and budget.'], ['Shortlist properties', 'Review homes that fit your brief.'], ['Coordinate visits', 'Arrange visits to shortlisted properties.'], ['Guide next steps', 'Support discussions through to purchase.']],
    process: ['Share your preferences', 'Review shortlisted homes', 'Visit properties', 'Coordinate the purchase'],
    faqs: [
      ['What do I need to share?', 'Location, configuration, budget and whether it is a home or an investment.'],
      ['Can I enquire without a fixed budget?', 'Yes. Budget is optional in the form.'],
      ['Do you arrange visits?', 'We coordinate visits for shortlisted properties.'],
    ],
  },
  {
    slug: 'commercial', icon: 'building', nav: 'Commercial Sales & Leasing', title: 'Commercial Sales & Leasing', short: 'Commercial Sales & Leasing',
    req: 'commercial', audience: 'Commercial buyers · Investors · Occupiers',
    sentence: 'Buy or lease commercial property for business use or investment.',
    intro: 'Separate buy and lease pathways for commercial requirements.',
    cta: 'Discuss Your Commercial Requirement',
    forWho: [['Commercial buyers and investors', 'Purchasing business property.'], ['Businesses leasing space', 'Occupiers seeking commercial space on lease.']],
    pathways: [['Buy', 'For owner-occupiers and investors purchasing commercial property.'], ['Lease', 'For businesses seeking commercial space on lease.']],
    help: [['Clarify the brief', 'Intended use, location, area and budget.'], ['Shortlist options', 'Review commercial properties that fit.'], ['Coordinate visits and talks', 'Arrange visits and discussions.'], ['Support the transaction', 'Help coordinate through to completion.']],
    process: ['Share your requirement', 'Review shortlisted options', 'Visit and negotiate', 'Coordinate the transaction'],
    faqs: [
      ['Can I choose between buying and leasing?', 'Yes. Select Buy or Lease in the form, or discuss both.'],
      ['What is intended use?', 'How you plan to use the space, such as office, showroom or investment.'],
      ['Can owners list commercial property?', 'Yes. Use the Partner With Us page.'],
    ],
  },
]

export const requirements = [
  { id: 'retail', label: 'Retail Leasing' },
  { id: 'brand', label: 'Brand Expansion' },
  { id: 'residential', label: 'Residential' },
  { id: 'commercial', label: 'Commercial' },
  { id: 'list', label: 'List My Property' },
  { id: 'general', label: 'General Enquiry' },
]

export const process = ['Share your requirement', 'Review suitable options', 'Visit and discuss', 'Negotiate terms', 'Coordinate the transaction']

export const faqs = [
  ['What services does Regalia Infra offer?', 'Retail leasing, brand expansion, residential sales and advisory, and commercial sales and leasing.'],
  ['How do I make an enquiry?', 'Use Share Your Requirement, choose your type, and fill in a short two-step form.'],
  ['Can I submit my property?', 'Yes. Developers and owners can use the Partner With Us page.'],
  ['Are the listed opportunities real?', 'The opportunities shown in this preview are demo listings for illustration.'],
]

export const opportunities = [
  { id: 'OPP-001', slug: 'high-street-retail-unit', title: 'High-Street Retail Unit', type: 'Retail', mode: 'Lease', location: 'Sample Location A', area: '1,200 sq ft', available: true,
    overview: 'A ground-floor retail unit example on a busy street. Illustrative content only.', specs: [['Area', '1,200 sq ft'], ['Frontage', '20 ft'], ['Floor', 'Ground'], ['Use', 'Retail']] },
  { id: 'OPP-002', slug: 'mall-retail-space', title: 'Mall Retail Space', type: 'Retail', mode: 'Lease', location: 'Sample Location B', area: '850 sq ft', available: true,
    overview: 'An in-mall retail space example. Illustrative content only.', specs: [['Area', '850 sq ft'], ['Floor', 'First'], ['Use', 'Retail']] },
  { id: 'OPP-003', slug: 'three-bedroom-apartment', title: 'Three-Bedroom Apartment', type: 'Residential', mode: 'Buy', location: 'Sample Location C', area: '3 BHK', available: true,
    overview: 'A family apartment example. Illustrative content only.', specs: [['Configuration', '3 BHK'], ['Carpet area', '1,150 sq ft'], ['Floor', 'Mid-rise'], ['Furnishing', 'Unfurnished']] },
  { id: 'OPP-004', slug: 'two-bedroom-rental-home', title: 'Two-Bedroom Residence', type: 'Residential', mode: 'Lease', location: 'Sample Location D', area: '2 BHK', available: false,
    overview: 'A two-bedroom residence example. Illustrative content only.', specs: [['Configuration', '2 BHK'], ['Carpet area', '850 sq ft'], ['Furnishing', 'Semi-furnished']] },
  { id: 'OPP-005', slug: 'office-floor-plate', title: 'Office Floor', type: 'Commercial', mode: 'Lease', location: 'Sample Location E', area: '4,000 sq ft', available: true,
    overview: 'An office floor example for business occupiers. Illustrative content only.', specs: [['Area', '4,000 sq ft'], ['Floor', 'Upper'], ['Use', 'Office'], ['Parking', 'Available']] },
  { id: 'OPP-006', slug: 'commercial-showroom', title: 'Commercial Showroom', type: 'Commercial', mode: 'Buy', location: 'Sample Location F', area: '2,500 sq ft', available: true,
    overview: 'A showroom property example for purchase. Illustrative content only.', specs: [['Area', '2,500 sq ft'], ['Frontage', '30 ft'], ['Use', 'Showroom']] },
]

export const propertyTypes = ['Retail', 'Residential', 'Commercial']
export const locations = [...new Set(opportunities.map(o => o.location))]

export const processIcons = ['chat', 'search', 'visit', 'doc', 'handshake']
export const audiences = [
  ['store', 'Retail brands', 'Looking to expand or lease space.'],
  ['owner', 'Developers and owners', 'With property to lease or sell.'],
  ['buyer', 'Residential buyers', 'Looking for a home or investment.'],
  ['invest', 'Commercial buyers and investors', 'Seeking business property.'],
]

export const shareList = {
  'retail-leasing': ['Preferred locations or catchment', 'Space needed and any frontage preference', 'Business type', 'Target timeline'],
  'brand-expansion': ['Brand name and category', 'Preferred locations and formats', 'Space and budget range', 'Expansion timeline'],
  residential: ['Preferred locations', 'Configuration (such as 2 or 3 BHK)', 'Budget range', 'Home or investment'],
  commercial: ['Buy or lease', 'Intended use', 'Location and area', 'Budget and timeline'],
}
export const contactReady = ['Your preferred location', 'Rough space or configuration needed', 'Budget range, if decided', 'Your timeline']
export const nextSteps = [
  ['Submit your enquiry', 'Share a few details about what you need.'],
  ['We review it', 'Your requirement is matched against relevant options.'],
  ['We get in touch', 'Using the contact method you choose.'],
]
export const partnerReady = ['Property type and location', 'Approximate area', 'Whether it is for sale or lease', 'Your role as owner or representative']
export const partnerFaqs = [
  ['Who can submit a property?', 'Developers, property owners and authorised representatives.'],
  ['Does submitting guarantee a listing?', 'No. Submissions are reviewed first, and next steps are discussed with you.'],
  ['Do I need to upload documents?', 'Not at this stage. The form only asks for basic details.'],
]
export const principles = [
  ['Listen first', 'We start with your requirement, not a fixed list of properties.'],
  ['Stay relevant', 'We shortlist options that match what you asked for.'],
  ['Keep it coordinated', 'We help organise visits, discussions and next steps.'],
]
export const startPaths = [
  ['Looking for retail space', 'Leasing and brand expansion', '/contact?req=retail'],
  ['Buying a home', 'Residential sales and advisory', '/contact?req=residential'],
  ['Buying or leasing commercial space', 'Offices, showrooms and more', '/contact?req=commercial'],
  ['Own a property', 'Put it forward for review', '/partner-with-us'],
  ['Not sure yet', 'Send a general enquiry', '/contact?req=general'],
]

export const audienceDetail = {
  'Retail brands': ['store', 'Looking to lease space or plan expansion.', ['Space and location needs', 'Site visits', 'Leasing discussions'], '/contact?req=retail'],
  'Owners and developers': ['owner', 'With property to lease or sell.', ['Share property details', 'Review by our team', 'Discuss next steps'], '/partner-with-us'],
  'Residential buyers': ['buyer', 'Looking for a home or an investment.', ['Location and configuration', 'Budget preferences', 'Visit coordination'], '/contact?req=residential'],
  'Commercial buyers and investors': ['invest', 'Seeking property for business use or investment.', ['Buy or lease pathways', 'Intended use and area', 'Transaction coordination'], '/contact?req=commercial'],
}
export const partnerCategories = [
  ['store', 'Retail spaces', 'Shops, street-front units and spaces within commercial developments.'],
  ['home', 'Residential property', 'Apartments, homes and other residential units.'],
  ['building', 'Commercial and office', 'Offices, showrooms and other business premises.'],
]

export const founder = {
  name: 'Samiksha Singh',
  role: 'Founder, Regalia Infra',
  short: 'Samiksha founded Regalia Infra in October 2025 after several years in the real estate industry, including marketing and leasing leadership at HPGK Infra.',
  bio: [
    'Samiksha founded Regalia Infra in October 2025, a real estate consultancy focused on commercial leasing and brand expansion advisory.',
    'She works with developers, landlords and expanding brands to structure leasing partnerships and identify suitable retail locations.',
  ],
  focus: ['Retail leasing for high-street and commercial developments', 'Brand tie-ups with developers and property owners', 'Franchise location sourcing and market feasibility', 'Commercial space advisory for investors and retailers'],
  background: [
    ['Founder', 'Regalia Infra', 'Oct 2025 – Present'],
    ['Head – Marketing & Leasing', 'HPGK Infra Private Limited', 'Apr 2025 – Oct 2025'],
    ['Head of Marketing', 'HPGK Infra Private Limited', 'Jun 2024 – Mar 2025'],
    ['Marketing Manager', 'SMV Agencies Private Limited', 'Nov 2018 – Mar 2021'],
  ],
  education: [['MBA', 'Madan Mohan Malaviya University of Technology', '2021 – 2023'], ['B.Com (Hons.)', 'Swami Vivekananda Subharti University, Meerut', '2014 – 2017']],
}
