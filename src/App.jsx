//Use Commands cd netboard and npm run dev to open
import { useState, useEffect } from 'react'
import './App.css'

// =============================================
// CONSTANTS & MOCK DATA
// =============================================
const ID_TYPES = [
  { key: 'ein',      label: 'EIN',               desc: 'Employer Identification Number' },
  { key: 'brn',      label: 'Business Reg. No.', desc: 'State registration number'      },
  { key: 'cik',      label: 'SEC CIK',           desc: 'Public filing index key'         },
  { key: 'minority', label: 'Minority Cert.',    desc: 'NMSDC minority certificate'     },
  { key: 'npi',      label: 'NPI',               desc: 'National Provider Identifier'   },
  { key: 'sba',      label: 'SBA Profile ID',    desc: 'Small Business Admin. ID'       },
]

const INDUSTRIES = [
  'Technology', 'Healthcare', 'Finance', 'Education / Research',
  'Marketing / Media', 'Nonprofit / Advocacy', 'Engineering',
  'Legal', 'Retail / Commerce', 'Other',
]

const OPP_TYPES = [
  'All', 'Shadow', 'Internship', 'Research Assistant',
  'Mentorship', 'Project Collaborator', 'Part-Time', 'Volunteer', 'Other',
]

const MOCK_BUSINESSES = [
  { id: 1, name: "Malik's Tech Studio", industry: 'Technology', location: 'Greensboro, NC', about: 'Small Black-owned web development studio building websites and apps for local businesses and community organizations. We believe in hands-on learning and love working with students.', contact: 'malik@maliktech.com', phone: '(336) 555-0101' },
  { id: 2, name: 'Triad Wellness Collective', industry: 'Healthcare', location: 'Winston-Salem, NC', about: 'Community health organization focused on underserved neighborhoods across the Triad. We partner with universities to conduct research that makes a real difference.', contact: 'research@triadwellness.org', phone: '(336) 555-0188' },
  { id: 3, name: 'Brown Sugar Creative Co.', industry: 'Marketing / Media', location: 'Durham, NC', about: 'Black-owned design studio specializing in branding, social media, and print work for small businesses. We are passionate about mentoring the next generation of creatives.', contact: 'hello@brownsugarcreative.com', phone: '(919) 555-0234' },
  { id: 4, name: 'Greenwood Wealth Advisors', industry: 'Finance', location: 'Charlotte, NC', about: 'Independent Black-owned financial advisory firm offering one-on-one mentorship to students interested in wealth management, financial planning, and breaking into finance.', contact: 'mentors@greenwoodwealth.com', phone: '(704) 555-0312' },
  { id: 5, name: 'Njoku Fabrication Lab', industry: 'Engineering', location: 'High Point, NC', about: 'Small fabrication and prototyping lab working on community-driven engineering projects. We collaborate with students on real-world builds from concept to completion.', contact: 'lab@njokufab.com', phone: '(336) 555-0456' },
]

const MOCK_OPPORTUNITIES = [
  { id: 1, title: 'Web Dev Shadow', org: "Malik's Tech Studio", type: 'Shadow', field: 'Technology', location: 'Greensboro, NC', pay: 'Unpaid', payAmount: null, datePosted: 'Jun 1, 2026', description: 'Come shadow our small dev team for a week and see how we build real client websites from scratch. Great for freshmen or sophomores.', contactEmail: 'malik@maliktech.com', contactPhone: '(336) 555-0101', contacted: 3, saved: 7 },
  { id: 2, title: 'Community Health Research Assistant', org: 'Triad Wellness Collective', type: 'Research Assistant', field: 'Healthcare', location: 'Winston-Salem, NC', pay: 'Stipend', payAmount: '500/mo', datePosted: 'Jun 3, 2026', description: 'Help us gather and analyze community health data in underserved neighborhoods. Looking for a student with basic stats knowledge.', contactEmail: 'research@triadwellness.org', contactPhone: '(336) 555-0188', contacted: 5, saved: 12 },
  { id: 3, title: 'Junior Graphic Design Intern', org: 'Brown Sugar Creative Co.', type: 'Internship', field: 'Marketing / Media', location: 'Durham, NC', pay: 'Paid', payAmount: '15/hr', datePosted: 'Jun 5, 2026', description: 'Small Black-owned design studio looking for a creative intern to assist with client branding, social media assets, and print work. Portfolio required.', contactEmail: 'hello@brownsugarcreative.com', contactPhone: '(919) 555-0234', contacted: 8, saved: 19 },
  { id: 4, title: 'Finance Mentorship', org: 'Greenwood Wealth Advisors', type: 'Mentorship', field: 'Finance', location: 'Charlotte, NC', pay: 'Unpaid', payAmount: null, datePosted: 'Jun 4, 2026', description: 'One-on-one mentorship with a Black financial advisor. Monthly meetings, career guidance, and real talk about breaking into finance without a Wall Street network.', contactEmail: 'mentors@greenwoodwealth.com', contactPhone: '(704) 555-0312', contacted: 11, saved: 23 },
  { id: 5, title: 'Engineering Project Collaborator', org: 'Njoku Fabrication Lab', type: 'Project Collaborator', field: 'Engineering', location: 'High Point, NC', pay: 'Unpaid', payAmount: null, datePosted: 'Jun 2, 2026', description: 'Help us prototype a low-cost water filtration device for a community project. Looking for a mechanical or civil engineering student with CAD experience.', contactEmail: 'lab@njokufab.com', contactPhone: '(336) 555-0456', contacted: 4, saved: 9 },
]

const MOCK_STUDENT_PROJECTS = [
  { id: 1, title: 'AI Resume Screener', field: 'Technology', description: 'Building a tool that helps small businesses quickly screen resumes without bias. Looking for someone with ML experience.', status: 'Approved', helpType: 'Project Collaborator', planUrl: 'architecture_diagram.png' },
  { id: 2, title: 'HBCU Alumni Network Analysis', field: 'Education / Research', description: 'Research project mapping career outcomes of HBCU graduates across the southeast. Need help with data collection and visualization.', status: 'Under Review', helpType: 'Research Assistant', planUrl: 'uml_v1.pdf' },
]

const MOCK_EMPLOYERS = [
  { id: 1, name: 'Jordan Ellis', email: 'jordan@maliktech.com', role: 'Lead Developer', joined: 'Jan 2025', active: true },
  { id: 2, name: 'Priya Okafor', email: 'priya@maliktech.com', role: 'Project Manager', joined: 'Mar 2025', active: true },
]

const MOCK_MY_LISTINGS = [
  { id: 1, title: 'Web Dev Shadow', type: 'Shadow', field: 'Technology', pay: 'Unpaid', payAmount: null, datePosted: 'Jun 1, 2026', contacted: 3, saved: 7, status: 'Active' },
]

// =============================================
// APP ROOT
// =============================================
export default function App() {
  const [view, setView] = useState('landing')
  const [theme, setTheme] = useState('dark')
  const go = (v) => setView(v)
  const toggleTheme = () => setTheme(p => p === 'dark' ? 'light' : 'dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <div className="app-container">
      <Nav view={view} go={go} />
      {view === 'landing'           && <LandingPage go={go} />}
      {view === 'student'           && <StudentSignUp go={go} />}
      {view === 'employer'          && <EmployerSignUp go={go} />}
      {view === 'business'          && <BusinessRegistration go={go} />}
      {view === 'studentDashboard'  && <StudentDashboard go={go} theme={theme} toggleTheme={toggleTheme} />}
      {view === 'employerDashboard' && <EmployerDashboard go={go} theme={theme} toggleTheme={toggleTheme} />}
      {view === 'tos'               && <TermsOfService go={go} />}
      {view === 'registered'        && <BusinessRegistered go={go} />}
      <footer className="landing-footer">
        <p>© 2026 netBoard</p>
        <button className="footer-link" onClick={() => go('tos')}>Terms of Service</button>
      </footer>
    </div>
  )
}

// =============================================
// NAV
// =============================================
function Nav({ view, go }) {
  const isDashboard = view === 'studentDashboard' || view === 'employerDashboard'
  const links = [
    { label: 'Home',       v: 'landing'  },
    { label: 'Students',   v: 'student'  },
    { label: 'Employers',  v: 'employer' },
    { label: 'Businesses', v: 'business' },
  ]

  return (
    <header className="navbar">
      <button className="logo" onClick={() => go('landing')}>
        net<span>Board</span>
      </button>
      {isDashboard ? (
        <button className="btn-outline" onClick={() => go('landing')}>Sign out</button>
      ) : (
        <nav className="nav-links">
          {links.map(({ label, v }) => (
            <button key={v} className={`nav-pill ${view === v ? 'active' : ''}`} onClick={() => go(v)}>
              {label}
            </button>
          ))}
        </nav>
      )}
    </header>
  )
}

// =============================================
// LANDING PAGE
// =============================================
function LandingPage({ go }) {
  return (
    <div className="landing">
      <section className="hero">
        <div className="hero-lines" aria-hidden="true">
          <span /><span /><span /><span /><span />
        </div>
        <span className="hero-badge">HBCU × Black Business Network</span>
        <h1>Find your opportunity, <br /><em>one-on-one.</em></h1>
        <p>Connect directly with Black-owned businesses and researchers. No noise, no applications, just real conversations.</p>
      </section>

      <div className="auth-grid">
        <LoginCard
          eyebrow="Students"
          title="Student login"
          emailPlaceholder=".edu email"
          onSignup={() => go('student')}
          signupLabel="Create account"
          onLogin={() => go('studentDashboard')}
        />
        <LoginCard
          eyebrow="Employers"
          title="Employer login"
          emailPlaceholder="Work email"
          onSignup={() => go('employer')}
          signupLabel="Join your org"
          onLogin={() => go('employerDashboard')}
        />
      </div>

      <div className="biz-banner">
        <div className="biz-banner-text">
          <p>Own a business or run a research lab?</p>
          <p>Register your business entity — EIN or government ID required.</p>
        </div>
        <button className="btn-outline" onClick={() => go('business')}>Register business</button>
      </div>
    </div>
  )
}

function LoginCard({ eyebrow, title, emailPlaceholder, onSignup, signupLabel, onLogin }) {
  return (
    <div className="auth-card">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <input className="field" type="email" placeholder={emailPlaceholder} />
      <input className="field" type="password" placeholder="Password" />
      <button className="btn-primary" onClick={onLogin}>Sign in</button>
      <p className="card-footer">New here? <span className="link" onClick={onSignup}>{signupLabel}</span></p>
    </div>
  )
}

// =============================================
// SIGN UP FORMS
// =============================================
function StudentSignUp({ go }) {
  return (
    <FormShell onBack={() => go('landing')} title="Student sign up" subtitle="Use your university .edu email to create your account.">
      <div className="field-row">
        <div className="field-wrap"><label className="field-label">First name</label><input className="field" type="text" placeholder="First name" /></div>
        <div className="field-wrap"><label className="field-label">Last name</label><input className="field" type="text" placeholder="Last name" /></div>
      </div>
      <div className="field-wrap"><label className="field-label">.edu email</label><input className="field" type="email" placeholder="you@university.edu" /></div>
      <div className="field-wrap"><label className="field-label">Password</label><input className="field" type="password" placeholder="Create a password" /></div>
      <div className="field-wrap"><label className="field-label">Date of birth</label><input className="field" type="date" /></div>
      <button className="btn-primary" onClick={() => go('studentDashboard')}>Create student account</button>
    </FormShell>
  )
}

function EmployerSignUp({ go }) {
  return (
    <FormShell onBack={() => go('landing')} title="Employer sign up" subtitle="Join your company's team. Your account will be linked to your registered business.">
      <div className="field-wrap"><label className="field-label">Work email</label><input className="field" type="email" placeholder="you@company.com" /></div>
      <div className="field-wrap"><label className="field-label">Contact phone</label><input className="field" type="tel" placeholder="(xxx) xxx-xxxx" /></div>
      <div className="field-wrap"><label className="field-label">Password</label><input className="field" type="password" placeholder="Create a password" /></div>
      <div className="field-wrap"><label className="field-label">Date of birth</label><input className="field" type="date" /></div>
      <button className="btn-primary" onClick={() => go('employerDashboard')}>Join team</button>
    </FormShell>
  )
}

function BusinessRegistration({ go }) {
  const [selectedId, setSelectedId] = useState('ein')
  return (
    <FormShell onBack={() => go('landing')} title="Register your business" subtitle="Provide your business details and a government ID for verification. Your listing will be reviewed before going live.">
      <div className="field-row">
        <div className="field-wrap"><label className="field-label">Owner first name</label><input className="field" type="text" placeholder="First name" /></div>
        <div className="field-wrap"><label className="field-label">Owner last name</label><input className="field" type="text" placeholder="Last name" /></div>
      </div>
      <div className="field-wrap"><label className="field-label">Business email</label><input className="field" type="email" placeholder="contact@yourbusiness.com" /></div>
      <div className="field-wrap"><label className="field-label">Business phone</label><input className="field" type="tel" placeholder="(xxx) xxx-xxxx" /></div>
      <div className="field-wrap"><label className="field-label">Business name</label><input className="field" type="text" placeholder="Your business name" /></div>
      <div className="field-wrap">
        <label className="field-label">Industry</label>
        <select className="field"><option value="">Select industry</option>{INDUSTRIES.map(i => <option key={i}>{i}</option>)}</select>
      </div>
      <div className="field-wrap">
        <label className="field-label">Government ID type</label>
        <div className="id-grid">
          {ID_TYPES.map(({ key, label, desc }) => (
            <button key={key} type="button" className={`id-option ${selectedId === key ? 'active' : ''}`} onClick={() => setSelectedId(key)}>
              <p className="id-option-label">{label}</p>
              <p className="id-option-desc">{desc}</p>
            </button>
          ))}
        </div>
        <input className="field" type="text" placeholder="Enter your ID number" />
      </div>
      <button className="btn-primary" onClick={() => go('registered')}>Submit for review</button>
    </FormShell>
  )
}

function BusinessRegistered({ go }) {
  return (
    <div className="registered">
      <FormShell onBack={() => go('landing')} title="Form Submitted!" subtitle="If your business is verified, you will receive an email with a generated password and a link to register an employer page within 24-48 hours.">
      </FormShell>
    </div>
  )
}

function FormShell({ onBack, title, subtitle, children }) {
  return (
    <div className="form-shell">
      <button className="back-btn" onClick={onBack}>← Back</button>
      <h2>{title}</h2>
      {subtitle && <p className="form-subtitle">{subtitle}</p>}
      {children}
    </div>
  )
}

// =============================================
// STUDENT DASHBOARD
// =============================================
function StudentDashboard({ go, theme, toggleTheme }) {
  const [tab, setTab] = useState('browse')
  const [selectedCompany, setSelectedCompany] = useState(null)
  const [favIds, setFavIds] = useState([])
  const [savedIds, setSavedIds] = useState([])

  const toggleFav = (id) => setFavIds(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id])
  const toggleSave = (id) => setSavedIds(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id])

  const navItems = [
    { key: 'browse',        label: 'Browse',        icon: '◈' },
    { key: 'saved',         label: 'Saved',          icon: '◇' },
    { key: 'companies',     label: 'Companies',      icon: '◆' },
    { key: 'projects',      label: 'My Projects',    icon: '◉' },
    { key: 'submitProject', label: 'Submit Project', icon: '＋' },
    { key: 'settings',      label: 'Settings',       icon: '◎' },
    { key: 'support',       label: 'Support',        icon: '◐' },
  ]

  const goToCompany = (bizName) => {
    const biz = MOCK_BUSINESSES.find(b => b.name === bizName)
    if (biz) { setSelectedCompany(biz); setTab('companyView') }
  }

  return (
    <div className="dashboard">
      <aside className="dash-sidebar">
        <div className="dash-profile">
          <div className="dash-avatar">ZW</div>
          <div>
            <p className="dash-name">Zion</p>
            <p className="dash-meta">zwhitted@aggies.ncat.edu</p>
          </div>
        </div>
        <nav className="dash-nav">
          {navItems.map(({ key, label, icon }) => (
            <button key={key} className={`dash-nav-item ${tab === key ? 'active' : ''}`} onClick={() => setTab(key)}>
              <span className="nav-icon">{icon}</span>{label}
            </button>
          ))}
        </nav>
      </aside>
      <main className="dash-main">
        {tab === 'browse'        && <StudentBrowse onViewCompany={goToCompany} favIds={favIds} toggleFav={toggleFav} savedIds={savedIds} toggleSave={toggleSave} />}
        {tab === 'saved'         && <StudentSaved savedIds={savedIds} toggleSave={toggleSave} onViewCompany={goToCompany} />}
        {tab === 'companies'     && <StudentCompanies favIds={favIds} toggleFav={toggleFav} onView={(biz) => { setSelectedCompany(biz); setTab('companyView') }} />}
        {tab === 'companyView'   && <CompanyView company={selectedCompany} favIds={favIds} toggleFav={toggleFav} onBack={() => setTab('companies')} />}
        {tab === 'projects'      && <StudentProjects />}
        {tab === 'submitProject' && <SubmitProject onSubmit={() => setTab('projects')} />}
        {tab === 'settings'      && <AccountSettings theme={theme} toggleTheme={toggleTheme} userType="student" />}
        {tab === 'support'       && <SupportCenter />}
      </main>
    </div>
  )
}

function StudentBrowse({ onViewCompany, favIds, toggleFav, savedIds, toggleSave }) {
  const [filter, setFilter] = useState('All')
  const [payFilter, setPayFilter] = useState('All')
  const [location, setLocation] = useState('')

  const filtered = MOCK_OPPORTUNITIES.filter(o =>
    (filter === 'All' || o.type === filter) &&
    (payFilter === 'All' || o.pay === payFilter) &&
    (location === '' || o.location.toLowerCase().includes(location.toLowerCase()))
  )

  return (
    <div>
      <div className="section-header">
        <div>
          <h2 className="section-title">Browse Opportunities</h2>
          <p className="section-sub">Local businesses and researchers looking for students like you.</p>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          <input
            className="field filter-select"
            type="text"
            placeholder="City, state or zip..."
            value={location}
            onChange={e => setLocation(e.target.value)}
          />
          <select className="field filter-select" value={filter} onChange={e => setFilter(e.target.value)}>
            {OPP_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <select className="field filter-select" value={payFilter} onChange={e => setPayFilter(e.target.value)}>
            {['All', 'Paid', 'Unpaid', 'Stipend'].map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>
      <div className="opp-list">
        {filtered.map(o => {
          const biz = MOCK_BUSINESSES.find(b => b.name === o.org)
          const isFaved = biz && favIds.includes(biz.id)
          const isSaved = savedIds.includes(o.id)
          return (
            <div key={o.id} className="opp-card">
              <div className="opp-card-top">
                <div>
                  <p className="opp-card-title">{o.title}</p>
                  <button className="opp-org-link" onClick={() => onViewCompany(o.org)}>{o.org}</button>
                  <p className="opp-card-org">{o.location}</p>
                </div>
                <div className="opp-card-badges">
                  <span className="badge badge-type">{o.type}</span>
                  <span className={`badge badge-pay badge-${o.pay.toLowerCase()}`}>
                    {o.pay}{o.payAmount ? ` · $${o.payAmount}` : ''}
                  </span>
                </div>
              </div>
              <p className="opp-card-desc">{o.description}</p>
              <div className="opp-card-footer">
                <span className="opp-contact">✉ {o.contactEmail} &nbsp; ☎ {o.contactPhone}</span>
                <span className="opp-date">Posted {o.datePosted}</span>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {biz && (
                    <button className={`save-btn ${isFaved ? 'saved' : ''}`} onClick={() => toggleFav(biz.id)}>
                      {isFaved ? '♥' : '♡'}
                    </button>
                  )}
                  <button className={`save-btn ${isSaved ? 'saved' : ''}`} onClick={() => toggleSave(o.id)}>
                    {isSaved ? '★ Saved' : '☆ Save'}
                  </button>
                </div>
              </div>
            </div>
          )
        })}
        {filtered.length === 0 && <p className="empty-msg">No opportunities match those filters.</p>}
      </div>
    </div>
  )
}

function StudentSaved({ savedIds, toggleSave, onViewCompany }) {
  const savedOpps = MOCK_OPPORTUNITIES.filter(o => savedIds.includes(o.id))

  return (
    <div>
      <div className="section-header">
        <div>
          <h2 className="section-title">Saved Opportunities</h2>
          <p className="section-sub">Listings you bookmarked for later.</p>
        </div>
      </div>
      {savedOpps.length === 0 ? (
        <p className="empty-msg">No saved opportunities yet. Browse and hit ☆ Save on anything that interests you.</p>
      ) : (
        <div className="opp-list">
          {savedOpps.map(o => (
            <div key={o.id} className="opp-card">
              <div className="opp-card-top">
                <div>
                  <p className="opp-card-title">{o.title}</p>
                  <button className="opp-org-link" onClick={() => onViewCompany(o.org)}>{o.org}</button>
                  <p className="opp-card-org">{o.location}</p>
                </div>
                <div className="opp-card-badges">
                  <span className="badge badge-type">{o.type}</span>
                  <span className={`badge badge-pay badge-${o.pay.toLowerCase()}`}>
                    {o.pay}{o.payAmount ? ` · $${o.payAmount}` : ''}
                  </span>
                </div>
              </div>
              <p className="opp-card-desc">{o.description}</p>
              <div className="opp-card-footer">
                <span className="opp-contact">✉ {o.contactEmail} &nbsp; ☎ {o.contactPhone}</span>
                <span className="opp-date">Posted {o.datePosted}</span>
                <button className="save-btn saved" onClick={() => toggleSave(o.id)}>★ Unsave</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function StudentCompanies({ favIds, toggleFav, onView }) {
  const [showFavsOnly, setShowFavsOnly] = useState(false)
  const displayed = showFavsOnly ? MOCK_BUSINESSES.filter(b => favIds.includes(b.id)) : MOCK_BUSINESSES

  return (
    <div>
      <div className="section-header">
        <div>
          <h2 className="section-title">Companies</h2>
          <p className="section-sub">Browse and favorite businesses posting on netBoard.</p>
        </div>
        <button className={`save-btn ${showFavsOnly ? 'saved' : ''}`} onClick={() => setShowFavsOnly(p => !p)}>
          {showFavsOnly ? '♥ Favorites only' : '♡ Show favorites'}
        </button>
      </div>
      <div className="opp-list">
        {displayed.map(biz => (
          <div key={biz.id} className="opp-card">
            <div className="opp-card-top">
              <div>
                <p className="opp-card-title">{biz.name}</p>
                <p className="opp-card-org">{biz.industry} &middot; {biz.location}</p>
              </div>
              <button className={`save-btn ${favIds.includes(biz.id) ? 'saved' : ''}`} onClick={() => toggleFav(biz.id)}>
                {favIds.includes(biz.id) ? '♥ Favorited' : '♡ Favorite'}
              </button>
            </div>
            <p className="opp-card-desc">{biz.about}</p>
            <div className="opp-card-footer">
              <span className="opp-contact">{MOCK_OPPORTUNITIES.filter(o => o.org === biz.name).length} active listing(s)</span>
              <button className="action-btn" onClick={() => onView(biz)}>View listings →</button>
            </div>
          </div>
        ))}
        {displayed.length === 0 && <p className="empty-msg">No favorited companies yet. Browse listings and hit ♡ to favorite a business.</p>}
      </div>
    </div>
  )
}

function CompanyView({ company, favIds, toggleFav, onBack }) {
  const listings = MOCK_OPPORTUNITIES.filter(o => o.org === company.name)
  const isFaved = favIds.includes(company.id)

  return (
    <div>
      <div className="section-header">
        <div>
          <button className="back-btn" onClick={onBack}>← Back to companies</button>
          <h2 className="section-title">{company.name}</h2>
          <p className="section-sub">{company.industry} &middot; {company.location}</p>
        </div>
        <button className={`save-btn ${isFaved ? 'saved' : ''}`} onClick={() => toggleFav(company.id)}>
          {isFaved ? '♥ Favorited' : '♡ Favorite'}
        </button>
      </div>
      <div className="form-card" style={{ marginBottom: '20px' }}>
        <h3 className="form-card-title">About</h3>
        <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.7', fontWeight: '300', marginBottom: '14px' }}>{company.about}</p>
        <div style={{ display: 'flex', gap: '20px', fontSize: '13px', color: 'var(--text-muted)' }}>
          <span>✉ {company.contact}</span>
          <span>☎ {company.phone}</span>
        </div>
      </div>
      <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--cream)', marginBottom: '12px' }}>
        Active Listings ({listings.length})
      </h3>
      <div className="opp-list">
        {listings.map(o => (
          <div key={o.id} className="opp-card">
            <div className="opp-card-top">
              <div>
                <p className="opp-card-title">{o.title}</p>
                <p className="opp-card-org">{o.location}</p>
              </div>
              <div className="opp-card-badges">
                <span className="badge badge-type">{o.type}</span>
                <span className={`badge badge-pay badge-${o.pay.toLowerCase()}`}>
                  {o.pay}{o.payAmount ? ` · $${o.payAmount}` : ''}
                </span>
              </div>
            </div>
            <p className="opp-card-desc">{o.description}</p>
            <div className="opp-card-footer">
              <span className="opp-contact">✉ {o.contactEmail} &nbsp; ☎ {o.contactPhone}</span>
              <span className="opp-date">Posted {o.datePosted}</span>
            </div>
          </div>
        ))}
        {listings.length === 0 && <p className="empty-msg">No active listings from this company right now.</p>}
      </div>
    </div>
  )
}

function StudentProjects() {
  return (
    <div>
      <div className="section-header">
        <div>
          <h2 className="section-title">My Projects</h2>
          <p className="section-sub">Projects you submitted for review.</p>
        </div>
      </div>
      <div className="opp-list">
        {MOCK_STUDENT_PROJECTS.map(p => (
          <div key={p.id} className="opp-card">
            <div className="opp-card-top">
              <div>
                <p className="opp-card-title">{p.title}</p>
                <p className="opp-card-org">{p.field}</p>
              </div>
              <span className={`badge status-badge status-${p.status.toLowerCase().replace(' ', '-')}`}>{p.status}</span>
            </div>
            <p className="opp-card-desc">{p.description}</p>
            <div className="opp-card-footer">
              <span className="badge badge-type">{p.helpType}</span>
              {p.planUrl && <span className="opp-contact">📎 {p.planUrl}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SubmitProject({ onSubmit }) {
  const [projectTitle, setProjectTitle] = useState('')
  const [projectDescription, setProjectDescription] = useState('')
  const [fieldOfStudy, setFieldOfStudy] = useState('')
  const [fileName, setFileName] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleProjectSubmit = () => {
    MOCK_STUDENT_PROJECTS.push({
      id: MOCK_STUDENT_PROJECTS.length + 1,
      title: projectTitle,
      field: fieldOfStudy || 'General',
      description: projectDescription,
      status: 'Under Review',
      planUrl: fileName || 'No document attached'
    })
    setProjectTitle(''); setProjectDescription(''); setFieldOfStudy(''); setFileName('')
    setSubmitted(true)
    setTimeout(() => { setSubmitted(false); if (onSubmit) onSubmit() }, 2000)
  }

  return (
    <div>
      <div className="section-header">
        <div>
          <h2 className="section-title">Submit a Project</h2>
          <p className="section-sub">Register a personal project or research — reviewed before going live.</p>
        </div>
      </div>
      <div className="form-card">
        <div className="field-wrap"><label className="field-label">Project name</label><input className="field" type="text" value={projectTitle} onChange={e => setProjectTitle(e.target.value)} placeholder="e.g. Autonomous Drone Navigation" /></div>
        <div className="field-wrap"><label className="field-label">Field of study</label><input className="field" type="text" value={fieldOfStudy} onChange={e => setFieldOfStudy(e.target.value)} placeholder="e.g. Computer Science" /></div>
        <div className="field-wrap"><label className="field-label">Description</label><textarea className="field" rows={5} value={projectDescription} onChange={e => setProjectDescription(e.target.value)} placeholder="Describe what you're building and what kind of help you need..." /></div>
        <div className="field-wrap">
          <label className="field-label">Project plan / UML / hypothesis</label>
          <input className="field" type="file" onChange={e => setFileName(e.target.files[0]?.name || '')} accept=".pdf,.png,.jpg,.jpeg,.zip" />
          <p className="field-hint">PDFs, diagrams, or structural docs</p>
        </div>
        <button type="button" onClick={handleProjectSubmit} className="btn-primary">Submit for review</button>
        {submitted && <div className="success-msg">Submitted! Redirecting to your projects...</div>}
      </div>
    </div>
  )
}

// =============================================
// EMPLOYER DASHBOARD
// =============================================
function EmployerDashboard({ go, theme, toggleTheme }) {
  const [tab, setTab] = useState('listings')

  const navItems = [
    { key: 'listings',  label: 'Our Listings', icon: '◈' },
    { key: 'post',      label: 'Post Position', icon: '＋' },
    { key: 'employers', label: 'Team Members',  icon: '◉' },
    { key: 'resources', label: 'Business Resources', icon: '✽'},
    { key: 'settings',  label: 'Settings',      icon: '◎' },
    { key: 'support',   label: 'Support',       icon: '◐' },
  ]

  return (
    <div className="dashboard">
      <aside className="dash-sidebar">
        <div className="dash-profile">
          <div className="dash-avatar">MT</div>
          <div>
            <p className="dash-name">Malik Turner</p>
            <p className="dash-meta">Malik's Tech Studio</p>
          </div>
        </div>
        <nav className="dash-nav">
          {navItems.map(({ key, label, icon }) => (
            <button key={key} className={`dash-nav-item ${tab === key ? 'active' : ''}`} onClick={() => setTab(key)}>
              <span className="nav-icon">{icon}</span>{label}
            </button>
          ))}
        </nav>
      </aside>
      <main className="dash-main">
        {tab === 'listings'  && <EmployerListings />}
        {tab === 'post'      && <PostOpportunity onPost={() => setTab('listings')} />}
        {tab === 'employers' && <ManageEmployers />}
        {tab == 'resources' && <BusinessResources />}
        {tab === 'settings'  && <AccountSettings theme={theme} toggleTheme={toggleTheme} userType="employer" />}
        {tab === 'support'   && <SupportCenter />}
      </main>
    </div>
  )
}

function EmployerListings() {
  const [listings, setListings] = useState(MOCK_MY_LISTINGS)
  return (
    <div>
      <div className="section-header">
        <div>
          <h2 className="section-title">Our Listings</h2>
          <p className="section-sub">Track how students engage with your opportunities.</p>
        </div>
      </div>
      <div className="opp-list">
        {listings.map(l => (
          <div key={l.id} className="opp-card">
            <div className="opp-card-top">
              <div>
                <p className="opp-card-title">{l.title}</p>
                <p className="opp-card-org">{l.field} &middot; {l.type}</p>
              </div>
              <div className="opp-card-badges">
                <span className={`badge badge-pay badge-${l.pay.toLowerCase()}`}>
                  {l.pay}{l.payAmount ? ` · $${l.payAmount}` : ''}
                </span>
                <span className="badge status-badge status-active">{l.status}</span>
              </div>
            </div>
            <div className="listing-stats">
              <div className="stat-block"><span className="stat-num">{l.contacted}</span><span className="stat-label">contacted</span></div>
              <div className="stat-block"><span className="stat-num">{l.saved}</span><span className="stat-label">saved</span></div>
            </div>
            <div className="opp-card-footer">
              <span className="opp-date">Posted {l.datePosted}</span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button className="action-btn">Edit</button>
                <button className="action-btn danger" onClick={() => setListings(p => p.filter(x => x.id !== l.id))}>Delete</button>
              </div>
            </div>
          </div>
        ))}
        {listings.length === 0 && <p className="empty-msg">No listings yet. Post your first opportunity!</p>}
      </div>
    </div>
  )
}

function PostOpportunity({ onPost }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [organization, setOrganization] = useState('')
  const [authorLocation, setAuthorLocation] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [fieldOfStudy, setFieldOfStudy] = useState('')
  const [opportunityType, setOpportunityType] = useState('Shadow')
  const [pay, setPay] = useState('Unpaid')
  const [payAmount, setPayAmount] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    const datePosted = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    MOCK_OPPORTUNITIES.push({
      id: MOCK_OPPORTUNITIES.length + 1, title,
      org: organization || 'Independent Employer',
      type: opportunityType, field: fieldOfStudy || 'General',
      location: authorLocation || 'Remote',
      pay, payAmount: payAmount || null,
      datePosted,
      description, contactEmail, contactPhone, contacted: 0, saved: 0
    })
    setTitle(''); setDescription(''); setOrganization(''); setAuthorLocation('')
    setContactEmail(''); setContactPhone(''); setFieldOfStudy(''); setOpportunityType('Shadow')
    setPay('Unpaid'); setPayAmount('')
    setSubmitted(true)
    setTimeout(() => { setSubmitted(false); if (onPost) onPost() }, 2000)
  }

  return (
    <div>
      <div className="section-header">
        <div>
          <h2 className="section-title">Post an Opportunity</h2>
          <p className="section-sub">Keep it local and personal — this platform is for small businesses, not corporate recruiters.</p>
        </div>
      </div>
      <div className="form-card">
        <div className="field-wrap"><label className="field-label">Opportunity title</label><input className="field" type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Web Dev Shadow, Research Assistant" /></div>
        <div className="field-wrap"><label className="field-label">Description</label><textarea className="field" rows={4} value={description} onChange={e => setDescription(e.target.value)} placeholder="Describe the opportunity and what the student will get out of it..." /></div>
        <div className="field-row">
          <div className="field-wrap"><label className="field-label">Organization</label><input className="field" type="text" value={organization} onChange={e => setOrganization(e.target.value)} placeholder="Your business name" /></div>
          <div className="field-wrap"><label className="field-label">Location</label><input className="field" type="text" value={authorLocation} onChange={e => setAuthorLocation(e.target.value)} placeholder="City, State" /></div>
        </div>
        <div className="field-row">
          <div className="field-wrap"><label className="field-label">Contact email</label><input className="field" type="email" value={contactEmail} onChange={e => setContactEmail(e.target.value)} placeholder="contact@yourbusiness.com" /></div>
          <div className="field-wrap"><label className="field-label">Contact phone</label><input className="field" type="tel" value={contactPhone} onChange={e => setContactPhone(e.target.value)} placeholder="(xxx) xxx-xxxx" /></div>
        </div>
        <div className="field-row">
          <div className="field-wrap"><label className="field-label">Field of study</label><input className="field" type="text" value={fieldOfStudy} onChange={e => setFieldOfStudy(e.target.value)} placeholder="e.g. Technology, Healthcare" /></div>
          <div className="field-wrap">
            <label className="field-label">Opportunity type</label>
            <select className="field" value={opportunityType} onChange={e => setOpportunityType(e.target.value)}>
              {OPP_TYPES.filter(t => t !== 'All').map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
        </div>
        <div className="field-wrap">
          <label className="field-label">Pay type</label>
          <select className="field" value={pay} onChange={e => { setPay(e.target.value); if (e.target.value === 'Unpaid') setPayAmount('') }}>
            <option>Unpaid</option>
            <option>Paid</option>
            <option>Stipend</option>
          </select>
        </div>
        {(pay === 'Paid' || pay === 'Stipend') && (
          <div className="field-wrap">
            <label className="field-label">Amount {pay === 'Paid' ? '(e.g. 15/hr)' : '(e.g. 500/mo)'}</label>
            <input className="field" type="text" value={payAmount} onChange={e => setPayAmount(e.target.value)} placeholder={pay === 'Paid' ? '15/hr' : '500/mo'} />
          </div>
        )}
        <button type="button" onClick={handleSubmit} className="btn-primary">Post opportunity</button>
        {submitted && <div className="success-msg">Posted! Redirecting to your listings...</div>}
      </div>
    </div>
  )
}

function ManageEmployers() {
  const [employers, setEmployers] = useState(MOCK_EMPLOYERS)
  const [showInvite, setShowInvite] = useState(false)

  return (
    <div>
      <div className="section-header">
        <div>
          <h2 className="section-title">Team Members</h2>
          <p className="section-sub">Manage who can post on behalf of your business.</p>
        </div>
        <button className="btn-outline" onClick={() => setShowInvite(p => !p)}>{showInvite ? 'Cancel' : '+ Invite member'}</button>
      </div>
      {showInvite && (
        <div className="form-card" style={{ marginBottom: '20px' }}>
          <div className="field-row">
            <div className="field-wrap"><label className="field-label">Full name</label><input className="field" type="text" placeholder="Employer name" /></div>
            <div className="field-wrap"><label className="field-label">Work email</label><input className="field" type="email" placeholder="employer@yourbusiness.com" /></div>
          </div>
          <div className="field-wrap"><label className="field-label">Role / title</label><input className="field" type="text" placeholder="e.g. Project Manager" /></div>
          <button type="button" className="btn-primary" onClick={() => setShowInvite(false)}>Send invite</button>
        </div>
      )}
      <div className="employer-list">
        {employers.map(e => (
          <div key={e.id} className="employer-row">
            <div className="employer-avatar">{e.name.split(' ').map(n => n[0]).join('')}</div>
            <div className="employer-info">
              <p className="employer-name">{e.name}</p>
              <p className="employer-meta">{e.email} &middot; {e.role}</p>
            </div>
            <div className="employer-right">
              <span className={`badge status-badge ${e.active ? 'status-approved' : 'status-under-review'}`}>{e.active ? 'Active' : 'Inactive'}</span>
              <p className="employer-joined">Joined {e.joined}</p>
              <button className="action-btn danger" onClick={() => setEmployers(p => p.filter(x => x.id !== e.id))}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function BusinessResources() {
  return (
    <div>
      <div className='section-header'>
        <div>
          <h2 className='section-title'>Resources for Small Businesses (Coming Soon!)</h2>
          <p className="section-sub">This is your hub for small business resources and support. The netBoard team is actively curating tools and information that can help you succeed. Check back soon!</p>
        </div>
      </div>
    </div>
  )
}

// =============================================
// SHARED PAGES
// =============================================
function AccountSettings({ theme, toggleTheme, userType }) {
  const [profileSaved, setProfileSaved] = useState(false)
  const [pwSaved, setPwSaved] = useState(false)

  // Student-specific profile fields
  const [classification, setClassification] = useState('')
  const [major, setMajor] = useState('')
  const [gpa, setGpa] = useState('')
  const [university, setUniversity] = useState('')
  const [desiredIndustry, setDesiredIndustry] = useState('')

  return (
    <div>
      <div className="section-header">
        <div>
          <h2 className="section-title">Account Settings</h2>
          <p className="section-sub">Update your personal information and password.</p>
        </div>
      </div>

      {/* Appearance */}
      <div className="form-card" style={{ marginBottom: '20px' }}>
        <h3 className="form-card-title">Appearance</h3>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontSize: '14px', color: 'var(--text)', fontWeight: '500' }}>Theme</p>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>Currently {theme === 'dark' ? 'dark' : 'light'} mode</p>
          </div>
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'dark' ? '☀ Switch to Light' : '☾ Switch to Dark'}
          </button>
        </div>
      </div>

      {/* Profile */}
      <div className="form-card" style={{ marginBottom: '20px' }}>
        <h3 className="form-card-title">Profile</h3>
        <div className="field-row">
          <div className="field-wrap"><label className="field-label">First name</label><input className="field" type="text" placeholder="First name" /></div>
          <div className="field-wrap"><label className="field-label">Last name</label><input className="field" type="text" placeholder="Last name" /></div>
        </div>
        <div className="field-wrap"><label className="field-label">Email</label><input className="field" type="email" placeholder="your@email.com" /></div>

        {/* Student-only profile fields */}
        {userType === 'student' && (
          <>
            <div className="field-row">
              <div className="field-wrap">
                <label className="field-label">University</label>
                <input className="field" type="text" value={university} onChange={e => setUniversity(e.target.value)} placeholder="e.g. NC A&T State University" />
              </div>
              <div className="field-wrap">
                <label className="field-label">Classification</label>
                <select className="field" value={classification} onChange={e => setClassification(e.target.value)}>
                  <option value="">Select classification</option>
                  {['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate'].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div className="field-row">
              <div className="field-wrap">
                <label className="field-label">Major</label>
                <input className="field" type="text" value={major} onChange={e => setMajor(e.target.value)} placeholder="e.g. Computer Science" />
              </div>
              <div className="field-wrap">
                <label className="field-label">GPA</label>
                <input className="field" type="number" step="0.01" min="0" max="4" value={gpa} onChange={e => setGpa(e.target.value)} placeholder="e.g. 3.6" />
              </div>
            </div>
            <div className="field-wrap">
              <label className="field-label">Desired industry</label>
              <select className="field" value={desiredIndustry} onChange={e => setDesiredIndustry(e.target.value)}>
                <option value="">Select industry</option>
                {INDUSTRIES.map(i => <option key={i}>{i}</option>)}
              </select>
            </div>
          </>
        )}

        <button type="button" className="btn-primary" onClick={() => { setProfileSaved(true); setTimeout(() => setProfileSaved(false), 2500) }}>Save changes</button>
        {profileSaved && <div className="success-msg">Profile updated!</div>}
      </div>

      {/* Password */}
      <div className="form-card">
        <h3 className="form-card-title">Change password</h3>
        <div className="field-wrap"><label className="field-label">Current password</label><input className="field" type="password" placeholder="Current password" /></div>
        <div className="field-wrap"><label className="field-label">New password</label><input className="field" type="password" placeholder="New password" /></div>
        <div className="field-wrap"><label className="field-label">Confirm new password</label><input className="field" type="password" placeholder="Confirm new password" /></div>
        <button type="button" className="btn-primary" onClick={() => { setPwSaved(true); setTimeout(() => setPwSaved(false), 2500) }}>Update password</button>
        {pwSaved && <div className="success-msg">Password updated!</div>}
      </div>
    </div>
  )
}

function SupportCenter() {
  const [submitted, setSubmitted] = useState(false)
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [category, setCategory] = useState('General')

  const handleSubmit = () => {
    setSubject(''); setMessage(''); setCategory('General')
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div>
      <div className="section-header">
        <div>
          <h2 className="section-title">Support Center</h2>
          <p className="section-sub">Have a question or issue? Send us a ticket and we'll get back to you.</p>
        </div>
      </div>
      <div className="support-faqs">
        {[
          { q: 'How do I get verified as a student?', a: 'Sign up with a valid .edu email address. Verification is automatic.' },
          { q: 'How long does business review take?', a: 'Most business registrations are reviewed within 2–3 business days.' },
          { q: 'Can I post more than one opportunity?', a: 'Yes — employers can post as many listings as they need under their business.' },
        ].map((faq, i) => (
          <div key={i} className="faq-item">
            <p className="faq-q">{faq.q}</p>
            <p className="faq-a">{faq.a}</p>
          </div>
        ))}
      </div>
      <div className="form-card">
        <h3 className="form-card-title">Send a ticket</h3>
        <div className="field-row">
          <div className="field-wrap">
            <label className="field-label">Category</label>
            <select className="field" value={category} onChange={e => setCategory(e.target.value)}>
              {['General', 'Account Issue', 'Listing Problem', 'Technical Bug', 'Verification', 'Other'].map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="field-wrap"><label className="field-label">Subject</label><input className="field" type="text" value={subject} onChange={e => setSubject(e.target.value)} placeholder="Brief summary of your issue" /></div>
        </div>
        <div className="field-wrap"><label className="field-label">Message</label><textarea className="field" rows={5} value={message} onChange={e => setMessage(e.target.value)} placeholder="Describe your issue in detail..." /></div>
        <button type="button" className="btn-primary" onClick={handleSubmit}>Send ticket</button>
        {submitted && <div className="success-msg">Ticket sent! We'll follow up at your account email.</div>}
      </div>
    </div>
  )
}

function TermsOfService({ go }) {
  return (
    <div className="tos-shell">
      <button className="back-btn" onClick={() => go('landing')}>← Back</button>
      <h2 className="tos-title">Terms of Service</h2>
      <p className="tos-date">Effective: January 1, 2025</p>
      <div className="tos-body">
        <section className="tos-section"><h3>1. About netBoard</h3><p>netBoard is a networking platform designed to connect HBCU students with Black-owned businesses, researchers, and community professionals. Our goal is personal, one-on-one connection — not mass applications or corporate recruiting.</p></section>
        <section className="tos-section"><h3>2. Eligibility</h3><p>Students must have a valid .edu email address issued by an accredited university. Employers must be associated with a registered business entity. Businesses must provide a valid government ID (EIN, BRN, NPI, etc.) for verification before their listing goes live.</p></section>
        <section className="tos-section"><h3>3. User Conduct</h3><p>Users agree to engage honestly and respectfully. Misrepresentation of identity, credentials, or business status is grounds for immediate removal. netBoard is not a platform for spam, mass outreach, or corporate recruiting efforts.</p></section>
        <section className="tos-section"><h3>4. Student Privacy</h3><p>Student contact information is protected. We do not sell or share your personal data with third parties. Resume submissions are only visible to the employer or business you submit them to.</p></section>
        <section className="tos-section"><h3>5. Content Review</h3><p>All business registrations and student project submissions are reviewed by the netBoard team before going live. We reserve the right to reject or remove any listing that violates our community standards.</p></section>
        <section className="tos-section"><h3>6. Limitation of Liability</h3><p>netBoard facilitates connections but is not responsible for the outcomes of those connections. We are not liable for any agreements, disputes, or arrangements made between users off-platform.</p></section>
        <section className="tos-section"><h3>7. Changes to These Terms</h3><p>We may update these terms as the platform grows. Continued use of netBoard after changes are posted constitutes acceptance of the new terms.</p></section>
        <section className="tos-section"><h3>8. Contact</h3><p>Questions about these terms? Reach out through the Support Center inside your dashboard.</p></section>
      </div>
    </div>
  )
}