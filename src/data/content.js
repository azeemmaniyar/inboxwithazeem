// ─────────────────────────────────────────────────────────────
//  ALL SITE CONTENT LIVES HERE. Edit this file to update the site.
//  Lines marked  TODO  are placeholders waiting for your resume details.
//  `accent` keys map to colours in src/lib/accents.js
//  (violet, emerald, pink, amber, sky, orange, teal, rose, indigo).
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: 'Mohammad Azeem Maniyar',
  shortName: 'Azeem',
  initials: 'MA',
  headline: ['I get your emails', 'into the inbox.'],
  // Shown under the headline, rotating
  roles: [
    'Deliverability Specialist',
    'Campaign Analyst',
    'CRM Campaign Builder',
    'Inbox Placement Fixer',
  ],
  title: 'Email Marketing Executive · Campaign Analyst · Email Deliverability Specialist',
  intro:
    'Campaign Executive at Aghreni Technologies. I build CRM campaigns and keep sender reputation healthy so mail reaches people, not spam folders.',
  location: 'Bengaluru, Karnataka, India',
  email: 'azeemmaniyar24@gmail.com',
  phone: '+91 8050486730',
  linkedin: 'https://www.linkedin.com/in/mohammad-azeem-maniyar-4022b820b',
  github: 'https://github.com/azeem47s',
  // TODO: put your resume in /public (e.g. /public/resume.pdf) and set '/resume.pdf'
  resumeUrl: '',
  // TODO: add a small photo to /public (e.g. /public/azeem.webp, ~400px, <60KB) and set '/azeem.webp'
  photo: '',
}

export const stats = [
  { value: 1.6, decimals: 1, suffix: '+', label: 'years in email marketing', accent: 'violet' },
  { value: 100000, decimals: 0, suffix: '+', label: 'subscribers reached', accent: 'pink' },
  { value: 0, decimals: 0, suffix: '', label: 'missed SLAs', accent: 'emerald' },
  { value: 5, decimals: 0, suffix: '', label: 'CRM tools', accent: 'amber' },
]

// Copy for the hero "email journey" demo
export const journey = {
  checks: [
    {
      key: 'spf',
      label: 'SPF',
      accent: 'emerald',
      plain: 'Is this server allowed to send for your domain?',
      off: 'Without SPF, anyone could pretend to be you, so inboxes get suspicious.',
    },
    {
      key: 'dkim',
      label: 'DKIM',
      accent: 'sky',
      plain: 'A digital signature that proves nobody tampered with the email.',
      off: 'Without DKIM, inboxes can’t prove the email really came from you.',
    },
    {
      key: 'dmarc',
      label: 'DMARC',
      accent: 'violet',
      plain: 'Your policy telling inboxes what to do when a check fails.',
      off: 'Without DMARC, inboxes have no instructions and trust your domain less.',
    },
  ],
  allOn: 'All three checks pass, so inbox providers trust you and mail lands in the inbox.',
  hint: 'Switch a check off and watch what happens. Move your mouse or finger over the envelopes.',
}

export const skillGroups = [
  {
    id: 'crm',
    label: 'CRMs',
    icon: '◎',
    accent: 'violet',
    blurb: 'Platforms I build and send campaigns on.',
    items: ['CleverTap', 'WebEngage', 'Growlytics', 'Xeno', 'Mapp Engage', 'Salesforce'],
  },
  {
    id: 'deliverability',
    label: 'Deliverability',
    icon: '✓',
    accent: 'emerald',
    blurb: 'Keeping sender reputation healthy and mail out of spam.',
    items: ['SPF', 'DKIM', 'DMARC', 'IP warming', 'Blacklist monitoring', 'FBL integration', 'SMTP bounce analysis'],
  },
  {
    id: 'campaigns',
    label: 'Campaigns',
    icon: '✉',
    accent: 'pink',
    blurb: 'From segment to send, tested and on time.',
    items: [
      'Lifecycle campaigns',
      'Automated workflows',
      'A/B testing',
      'QA',
      'Scheduling',
      'Mobile optimization',
      'Segmentation',
      'List hygiene',
      'Suppression lists',
    ],
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: '▲',
    accent: 'amber',
    blurb: 'Measuring inbox placement and campaign results.',
    items: [
      'Looker Studio',
      'Google Postmaster Tools',
      'GlockApps',
      'Litmus',
      'Mail-Tester',
      'DMARC Analyzer',
      'Sender Score',
      'Microsoft SNDS',
      'Excel',
      'Google Sheets',
    ],
  },
  {
    id: 'build',
    label: 'Build',
    icon: '</>',
    accent: 'sky',
    blurb: 'Templates and tools I code myself.',
    items: ['HTML5', 'CSS3', 'Responsive email templates', 'React', 'PHP', 'Email Validator'],
  },
  {
    id: 'teamwork',
    label: 'Teamwork',
    icon: '⇄',
    accent: 'orange',
    blurb: 'Keeping clients and teams in sync.',
    items: ['Cross-team coordination', 'Approval management', 'SLA adherence', 'Client reporting'],
  },
]

export const experience = [
  {
    role: 'Campaign Executive',
    company: 'Aghreni Technologies Pvt. Ltd',
    period: 'Mar 2025 – Present',
    location: 'Bengaluru',
    accent: 'emerald',
    summary: 'CRM email campaigns and deliverability for client brands.',
    // TODO: replace with the exact bullet points from your resume
    points: [
      'Build, QA and schedule lifecycle and automated campaigns on CleverTap, WebEngage, Growlytics, Xeno and Mapp Engage.',
      'Monitor deliverability: SPF, DKIM, DMARC, IP warming, blacklists, FBLs and SMTP bounces.',
      'Report campaign performance with weekly Looker Studio dashboards.',
      'Coordinate approvals across teams with 0 missed SLAs.',
    ],
    tags: ['CleverTap', 'WebEngage', 'Mapp Engage', 'Looker Studio'],
  },
  {
    role: 'Salesforce Administrator Intern',
    company: 'Amethyst IT Services',
    period: '', // TODO: add dates, e.g. 'Jan 2024 – Jun 2024'
    location: '',
    accent: 'sky',
    summary: 'Salesforce administration internship.',
    // TODO: replace with the exact bullet points from your resume
    points: ['Hands-on Salesforce administration during the internship.'],
    tags: ['Salesforce'],
  },
  {
    role: 'Web & Fullstack Developer Intern',
    company: 'Amethyst IT Services',
    period: '', // TODO: add dates
    location: '',
    accent: 'pink',
    summary: 'Web and full-stack development internship.',
    // TODO: replace with the exact bullet points from your resume
    points: ['Built web pages and full-stack features with HTML5, CSS3, React and PHP.'],
    tags: ['HTML5', 'CSS3', 'React', 'PHP'],
  },
]

export const projects = [
  {
    title: 'Campaign Analysis Tool',
    kicker: 'Internal tool · Aghreni Technologies',
    accent: 'violet',
    icon: '◈',
    // TODO: describe what the tool does and the problem it solves (keep it to 1–2 lines)
    description: 'An internal tool I built to analyse campaign performance.The tool pulls data from multiple sources, visualizes core KPIs, and provides interactive filters so teams can quickly identify trends, measure ROI, and make data-driven decisions without manual reporting.',
    tags: ['Campaign analytics', 'Internal tool'],
    links: [{ label: 'See it on LinkedIn', href: 'https://www.linkedin.com/in/mohammad-azeem-maniyar-4022b820b' }], // TODO: link to the exact post
  },
  {
    title: 'Weekly Looker Studio Dashboards',
    kicker: 'Client reporting',
    accent: 'amber',
    icon: '▦',
    description: 'Weekly campaign performance dashboards in Looker Studio for client reporting.',
    tags: ['Looker Studio', 'Google Sheets', 'Reporting'],
    links: [],
  },
  {
    title: 'Degree College Website',
    kicker: 'SECAB Institute of Business Administration, Vijayapura',
    accent: 'teal',
    icon: '⌂',
    description: 'The college website for SECAB Institute of Business Administration, Vijayapura.',
    tags: ['HTML5', 'CSS3', 'JavaScript'],
    links: [{ label: 'GitHub', href: 'https://github.com/azeem47s/College-Website' }],
  },
  {
    title: 'Vehicle Parking Management System',
    kicker: 'Academic project',
    accent: 'orange',
    icon: '⛍',
    description: 'Manages the records of incoming and outgoing vehicles in a parking lot.',
    tags: ['PHP', 'Web app'],
    links: [{ label: 'GitHub', href: 'https://github.com/azeem47s/Vehicle-Parking-Management-System' }],
  },
]

// TODO: replace with the certifications listed on your resume (name + issuer)
export const certifications = [
  { name: 'Certification name', issuer: 'Issuer' },
  { name: 'Certification name', issuer: 'Issuer' },
  { name: 'Certification name', issuer: 'Issuer' },
  { name: 'Certification name', issuer: 'Issuer' },
]

export const education = [
  { degree: 'MCA', school: 'Visvesvaraya Technological University (VTU)', score: 'CGPA 9.02', accent: 'violet' },
  { degree: 'BCA', school: 'Rani Channamma University', score: '75%', accent: 'pink' },
  { degree: 'PUC (Science)', school: 'Pre-University', score: '73%', accent: 'amber' },
]

export const contact = {
  heading: ['Emails landing in spam?', 'Let’s fix that.'],
  text: 'Deliverability audits, CRM campaigns or reporting: drop me a line.',
}

export const nav = [
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#credentials', label: 'Credentials' },
  { href: '#contact', label: 'Contact' },
]
