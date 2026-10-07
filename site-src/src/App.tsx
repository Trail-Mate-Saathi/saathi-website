import { useState } from "react";

const photos = {
  road: "/photos/road.jpg",
  hikers: "/photos/hikers.jpg",
  rishikesh: "/photos/rishikesh.jpg",
  rafting: "/photos/rafting.jpg",
  manali: "/photos/manali.jpg",
  jaipur: "/photos/jaipur.jpg",
  street: "/photos/street.jpg",
  beach: "/photos/beach.jpg",
  camping: "/photos/camping.jpg",
};

const screens = {
  welcome: "/screens/welcome.jpg",
  explore: "/screens/explore.jpg",
  plan: "/screens/plan.jpg",
  people: "/screens/people.jpg",
  groupChat: "/screens/group-chat.jpg",
  createPlan: "/screens/create-plan.jpg",
};

// Illustrated example avatars, the same cartoon portraits the app's demo profiles use.
const portraits = {
  aditi: "/people/aditi.jpg",
  kabir: "/people/kabir.jpg",
  meera: "/people/meera.jpg",
};

// Launch switches. Android goes live 11 Oct 2026 (IST). Set IOS_LIVE to the real
// date once Apple approves; if iPhone slips, move it and the page says "coming soon".
const PLAY_LIVE = Date.parse("2026-10-11T00:00:00+05:30");
const IOS_LIVE = Date.parse("2026-10-11T00:00:00+05:30");
const PLAY_URL = "https://play.google.com/store/apps/details?id=com.trailmatesaathi.saathi";
const IOS_URL = "https://apps.apple.com/app/id6813837164";

type Launch = { playLive: boolean; iosLive: boolean; sameDay: boolean };

function useLaunch(): Launch {
  const [now] = useState(() => Date.now());
  return { playLive: now >= PLAY_LIVE, iosLive: now >= IOS_LIVE, sameDay: PLAY_LIVE === IOS_LIVE };
}

function launchLine(l: Launch): string {
  if (l.playLive && l.iosLive) return "Live on Android & iPhone";
  if (l.playLive) return "Live on Android · iPhone coming soon";
  return l.sameDay ? "Launching 11 Oct on Android & iPhone" : "Launching 11 Oct on Android";
}

// Official Google Play and App Store badges, unmodified, at the same height.
function StoreBadges() {
  const l = useLaunch();
  const playNote = l.playLive ? null : "Coming 11 Oct";
  const iosNote = l.iosLive ? null : l.sameDay ? "Coming 11 Oct" : "Coming soon";
  return (
    <div className="badges">
      <div className="badge-col">
        <a className="store-official" href={PLAY_URL} target="_blank" rel="noopener noreferrer">
          <img className="badge-play" src="/badges/google-play-badge.svg" alt="Get it on Google Play" height={54} />
        </a>
        {playNote ? <span className="badge-note">{playNote}</span> : null}
      </div>
      <div className="badge-col">
        <a className="store-official" href={IOS_URL} target="_blank" rel="noopener noreferrer">
          <img className="badge-ios" src="/badges/app-store-badge.svg" alt="Download on the App Store" height={58} />
        </a>
        {iosNote ? <span className="badge-note">{iosNote}</span> : null}
      </div>
    </div>
  );
}

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <i />
      <i />
    </span>
  );
}

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a className={`logo ${light ? "logo-light" : ""}`} href="#top" aria-label="TripMate home">
      <BrandMark />
      <span>TripMate</span>
    </a>
  );
}

function Arrow() {
  return <span className="arrow" aria-hidden="true">↗</span>;
}

type ButtonProps = {
  children: React.ReactNode;
  href: string;
  variant?: "primary" | "dark" | "outline" | "cream";
  className?: string;
};

function Button({ children, href, variant = "primary", className = "" }: ButtonProps) {
  return (
    <a className={`button button-${variant} ${className}`} href={href}>
      <span>{children}</span>
      <Arrow />
    </a>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="section-label">
      <BrandMark />
      {children}
    </p>
  );
}

function Phone({
  src,
  alt,
  className = "",
  loading = "lazy",
}: {
  src: string;
  alt: string;
  className?: string;
  loading?: "eager" | "lazy";
}) {
  return (
    <div className={`phone ${className}`}>
      <div className="phone-speaker" />
      <div className="phone-screen">
        <img src={src} alt={alt} loading={loading} />
      </div>
    </div>
  );
}

function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-nav">
      <div className="nav-inner">
        <Logo />
        <nav className="desktop-links" aria-label="Main navigation">
          <a href="#trips">Explore</a>
          <a href="#how">How it works</a>
          <a href="#safety">Safety</a>
          <a href="#about">About</a>
        </nav>
        <div className="nav-actions">
          <button
            className="menu-toggle"
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
          <Button href="#get-app" className="nav-cta">Get the app</Button>
        </div>
      </div>
      {open && (
        <nav className="mobile-links" aria-label="Mobile navigation">
          <a href="#trips" onClick={() => setOpen(false)}>Explore</a>
          <a href="#how" onClick={() => setOpen(false)}>How it works</a>
          <a href="#safety" onClick={() => setOpen(false)}>Safety</a>
          <a href="#about" onClick={() => setOpen(false)}>About</a>
        </nav>
      )}
    </header>
  );
}

function Hero() {
  const launch = useLaunch();
  return (
    <section className="hero" id="top">
      <div className="hero-copy">
        <SectionLabel>Har trail pe, ek saathi</SectionLabel>
        <h1>
          Don&apos;t wait
          <br />
          for your friends
          <br />
          <em>to travel.</em>
        </h1>
        <p className="hero-sub">
          Find people who want to go where you&apos;re going — for the trek, the
          road trip, the food walk, or just the company.
        </p>
        <div className="hero-actions">
          <StoreBadges />
        </div>
        <p className="launch-note"><i /> {launchLine(launch)}</p>
        <p className="mini-proof">
          <span className="avatar-stack"><i /><i /><i /></span>
          Discover trips. Meet travellers. Go together.
        </p>
      </div>
      <div className="hero-art" aria-label="TripMate app set against a warm mountain landscape">
        <div className="sun" />
        <div className="mountain mountain-back" />
        <div className="mountain mountain-mid" />
        <div className="mountain mountain-front" />
        <svg className="hero-route" viewBox="0 0 600 340" aria-hidden="true">
          <path d="M18 286 C125 215 181 309 278 230 S420 240 568 96" />
          <circle cx="568" cy="96" r="8" />
        </svg>
        <div className="floating-card float-one">
          <strong>Triund sunrise · Sat</strong>
          <span>3 going · McLeodganj</span>
        </div>
        <div className="floating-card float-two">
          <strong>Food walk · tonight</strong>
          <span>Example plan</span>
        </div>
        <Phone
          src={screens.welcome}
          alt="TripMate welcome screen showing its never explore alone message"
          className="hero-phone"
          loading="eager"
        />
        <span className="hero-stamp">Plans become trips</span>
      </div>
    </section>
  );
}

const problems = [
  ["01", "Friends can’t make it"],
  ["02", "Don’t want to travel alone"],
  ["03", "Don’t know who to travel with"],
];

function Problem() {
  return (
    <section className="problem dark-section">
      <div className="problem-head">
        <SectionLabel>The gap TripMate closes</SectionLabel>
        <h2>You want to go.<br /><em>They want to go too.</em></h2>
        <p>
          Your friends are busy. Your schedules don&apos;t match. You don&apos;t
          want to travel alone. But you still want to go.
        </p>
      </div>
      <div className="problem-flow">
        <div className="problem-list">
          {problems.map(([number, label]) => (
            <div className="problem-row" key={number}>
              <span>{number}</span>
              <strong>{label}</strong>
            </div>
          ))}
        </div>
        <div className="flow-line" aria-hidden="true"><i /><i /><i /></div>
        <div className="solution-card">
          <BrandMark />
          <p>TripMate</p>
          <h3>Find people who are already going.</h3>
          <span>Travel idea → shared plan</span>
        </div>
      </div>
    </section>
  );
}

const steps = [
  {
    number: "01",
    title: "Post a plan",
    text: "Pick the place, dates and number of people.",
    src: screens.createPlan,
    alt: "TripMate create a plan screen",
    note: "Set the plan",
  },
  {
    number: "02",
    title: "Find your people",
    text: "Browse trips and travellers who want the same experience.",
    src: screens.people,
    alt: "TripMate traveller discovery screen",
    note: "Check compatibility",
  },
  {
    number: "03",
    title: "Chat, then go",
    text: "Talk with your group, sort the details and meet before you leave.",
    src: screens.groupChat,
    alt: "TripMate trip group chat screen",
    note: "Make it real",
  },
];

function HowItWorks() {
  return (
    <section className="section cream-section" id="how">
      <div className="section-heading split-heading">
        <div>
          <SectionLabel>How it works</SectionLabel>
          <h2>From “I want to go”<br />to <em>“we&apos;re going.”</em></h2>
        </div>
        <p>One place to turn an idea into a group, and a group into a trip.</p>
      </div>
      <div className="steps">
        {steps.map((step) => (
          <article className="step-card" key={step.number}>
            <div className="step-copy">
              <span className="step-number">{step.number}</span>
              <p className="step-note">{step.note}</p>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
            <div className="step-screen">
              <div className="full-app-screen">
                <img src={step.src} alt={step.alt} loading="lazy" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

const categories = [
  ["Treks", "Chase the mountains.", photos.hikers],
  ["Road trips", "Take the long way.", photos.road],
  ["Food walks", "Eat your way through the city.", photos.street],
  ["Weekend getaways", "Just enough time to escape.", photos.rishikesh],
  ["Beach escapes", "Trade plans for sunsets.", photos.beach],
  ["Camping", "Sleep under a bigger sky.", photos.camping],
];

function Categories() {
  return (
    <section className="section white-section" id="trips">
      <div className="section-heading">
        <SectionLabel>Explore your way</SectionLabel>
        <h2>What kind of trip<br />are you looking for?</h2>
      </div>
      <div className="category-grid">
        {categories.map(([name, text, image], index) => (
          <a className={`category-card category-${index + 1}`} href="#example-trips" key={name}>
            <img src={image} alt={`${name} in India`} loading="lazy" />
            <span className="image-shade" />
            <div>
              <p>0{index + 1}</p>
              <h3>{name}</h3>
              <span>{text}</span>
            </div>
            <Arrow />
          </a>
        ))}
      </div>
    </section>
  );
}

const sampleTrips = [
  {
    place: "Rishikesh",
    title: "River camping & rafting weekend",
    image: photos.rishikesh,
    days: "3 days",
    going: "4 going",
    spots: "4 spots left",
    cost: "₹4,200",
    host: "Kabir",
    hostPhoto: portraits.kabir,
    tag: "Camping",
  },
  {
    place: "Manali",
    title: "Old Manali sunset photowalk",
    image: photos.manali,
    days: "1 day",
    going: "2 going",
    spots: "3 spots left",
    cost: "₹1,100",
    host: "Meera",
    hostPhoto: portraits.meera,
    tag: "Photowalk",
  },
  {
    place: "McLeodganj",
    title: "Triund sunrise trek",
    image: photos.hikers,
    days: "2 days",
    going: "3 going",
    spots: "3 spots left",
    cost: "₹5,500",
    host: "Aditi",
    hostPhoto: portraits.aditi,
    tag: "Trek",
  },
];

function TripCard({ trip }: { trip: (typeof sampleTrips)[number] }) {
  return (
    <article className="trip-card">
      <div className="trip-image">
        <img src={trip.image} alt={`Travel scene in ${trip.place}`} loading="lazy" />
        <span className="location-pill">{trip.place}</span>
        <span className="example-pill">Example</span>
        <div className="trip-stats">
          <span>{trip.days}</span>
          <span>{trip.going}</span>
          <span className="accent-pill">{trip.spots}</span>
        </div>
      </div>
      <div className="trip-content">
        <div className="trip-title">
          <h3>{trip.title}</h3>
          <div><span>Est. cost</span><strong>{trip.cost}</strong></div>
        </div>
        <div className="trip-host">
          <img className="host-avatar host-avatar-img" src={trip.hostPhoto} alt="" loading="lazy" />
          <p><span>Hosted by</span><strong>{trip.host}</strong></p>
          <span className="tag">{trip.tag}</span>
        </div>
      </div>
    </article>
  );
}

function ExampleTrips() {
  return (
    <section className="section trips-section" id="example-trips">
      <div className="section-heading split-heading">
        <div>
          <SectionLabel>Example trips</SectionLabel>
          <h2>Trips people<br />are planning.</h2>
        </div>
        <p>Examples of the plans travellers post on TripMate, built around who is going, not just where.</p>
      </div>
      <div className="trip-grid">
        {sampleTrips.map((trip) => <TripCard trip={trip} key={trip.title} />)}
      </div>
      <div className="center-action"><Button href="#get-app" variant="dark">Get the app</Button></div>
    </section>
  );
}

const smallProfiles = [
  { name: "Aditi, 26", place: "Bengaluru", tags: "Treks · Cafés", photo: portraits.aditi },
  { name: "Meera, 27", place: "Kochi", tags: "Food walks · Beaches", photo: portraits.meera },
];

function People() {
  return (
    <section className="section people-section">
      <div className="people-copy">
        <SectionLabel>Find your people</SectionLabel>
        <h2>The destination is only <em>half the trip.</em></h2>
        <p>The right people can completely change the experience. See how they travel before you say hello.</p>
        <div className="compatibility-list">
          <span>Travel pace</span><span>Shared interests</span><span>Trip style</span>
        </div>
        <p className="example-note">Example profiles, drawn for this page. Real profiles carry their own photos.</p>
        <Button href="#get-app" variant="dark">Meet your travel people</Button>
      </div>
      <div className="profile-stage">
        <article className="profile-main">
          <img src={portraits.kabir} alt="Illustrated example of a traveller profile" loading="lazy" />
          <div className="profile-gradient" />
          <div className="profile-info">
            <span className="verified">Verified traveller</span>
            <h3>Kabir Mehta, 29</h3>
            <p>Mumbai, Maharashtra</p>
            <div><span>Road trips</span><span>Photography</span><span>Food walks</span></div>
            <q>Road-trip planner, amateur photographer, always the one with the playlist.</q>
          </div>
        </article>
        {smallProfiles.map((profile, index) => (
          <article className={`profile-small profile-small-${index + 1}`} key={profile.name}>
            <img src={profile.photo} alt={`${profile.name}, example traveller`} loading="lazy" />
            <div>
              <span className="verified-dot">✓</span>
              <h3>{profile.name}</h3>
              <p>{profile.place}</p>
              <span>{profile.tags}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

const appScreens = [
  [screens.welcome, "Welcome", "Start"],
  [screens.explore, "Discover", "Explore trips"],
  [screens.people, "Find people", "Meet travellers"],
  [screens.plan, "Plan", "Trip details"],
  [screens.groupChat, "Connect", "Chat before you go"],
];

function AppExperience() {
  return (
    <section className="app-showcase dark-section">
      <div className="section-heading split-heading">
        <div>
          <SectionLabel>Inside the app</SectionLabel>
          <h2>See TripMate<br /><em>in action.</em></h2>
        </div>
        <p>Discover a plan. See who&apos;s going. Connect before you leave.</p>
      </div>
      <div className="phones-scroll">
        {appScreens.map(([src, label, detail], index) => (
          <figure className={`showcase-phone showcase-phone-${index + 1}`} key={label}>
            <Phone src={src} alt={`TripMate ${detail} app screen`} />
            <figcaption><span>{label}</span>{detail}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function TripDetail() {
  return (
    <section className="section detail-section">
      <div className="detail-visual">
        <div className="detail-blob" />
        <Phone src={screens.plan} alt="TripMate trip detail screen" className="detail-phone" />
        <div className="detail-floating-card">
          <span>People going</span>
          <div className="avatar-stack"><i /><i /><i /><b>+1</b></div>
        </div>
      </div>
      <div className="detail-copy">
        <SectionLabel>From connection to departure</SectionLabel>
        <h2>A trip is more than <em>a destination.</em></h2>
        <p>
          TripMate isn&apos;t simply a social feed. Every connection becomes an
          actual plan with clear details and a group you can get to know.
        </p>
        <div className="detail-list">
          {["About the trip", "Itinerary", "Host", "People going", "Join"].map((item, index) => (
            <div key={item}><span>0{index + 1}</span><strong>{item}</strong><Arrow /></div>
          ))}
        </div>
      </div>
    </section>
  );
}

const safetyItems = [
  ["01", "Selfie verification", "Verified profiles carry a visible badge."],
  ["02", "Host approval", "Hosts can approve who joins their trip."],
  ["03", "Profile visibility", "You control who can find you."],
  ["04", "Report & block", "Act quickly if someone makes you uncomfortable."],
  ["05", "Trip-only chats", "Group chats stay with people on the trip."],
];

function Safety() {
  return (
    <section className="safety dark-section" id="safety">
      <div className="safety-intro">
        <SectionLabel>Built-in trust</SectionLabel>
        <h2>Meet people.<br /><em>Travel with confidence.</em></h2>
        <p>Meeting someone new should feel exciting — not uncertain.</p>
        <div className="safety-seal">
          <BrandMark />
          <span>People first</span>
          <strong>Safer by design</strong>
        </div>
      </div>
      <div className="safety-grid">
        {safetyItems.map(([number, title, text]) => (
          <article className="safety-card" key={number}>
            <span>{number}</span>
            <i>✓</i>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Audiences() {
  return (
    <section className="audience-section">
      <article className="audience-card traveler-card">
        <div>
          <SectionLabel>For travellers</SectionLabel>
          <h2>Don&apos;t wait for your friends.</h2>
          <p>Find trips. Find people. Join.</p>
          <Button href="#example-trips" variant="cream">Explore trips</Button>
        </div>
        <img src={photos.rafting} alt="Travellers rafting together on a river" loading="lazy" />
      </article>
      <article className="audience-card host-card">
        <div>
          <SectionLabel>For hosts</SectionLabel>
          <h2>Got a plan?</h2>
          <p>Post your trip. Choose who joins. Build your group.</p>
          <Button href="#get-app" variant="dark">Post a trip</Button>
        </div>
        <svg viewBox="0 0 500 220" aria-hidden="true">
          <path d="M10 180 C100 40 180 240 275 106 S405 95 480 22" />
          <circle cx="480" cy="22" r="9" />
        </svg>
      </article>
    </section>
  );
}

const destinations = [
  ["Rishikesh", photos.rishikesh],
  ["McLeodganj", photos.hikers],
  ["Manali", photos.manali],
  ["Jaipur", photos.jaipur],
  ["Spiti Valley", photos.road],
  ["Anywhere you want to go", photos.street],
];

function Destinations() {
  return (
    <section className="section destinations">
      <div className="section-heading split-heading">
        <div>
          <SectionLabel>Pick a place, find the people</SectionLabel>
          <h2>Where are<br />you headed?</h2>
        </div>
        <p>Rishikesh · McLeodganj · Bir Billing · Manali · Kasol · Spiti Valley · Goa · Jaipur · Bali · Bangkok · Dubai</p>
      </div>
      <div className="destination-grid">
        {destinations.map(([name, image], index) => (
          <a className={`destination-card destination-${index + 1}`} href="#get-app" key={name}>
            <img src={image} alt={`Travel in ${name}`} loading="lazy" />
            <span />
            <p>{name}</p>
            <Arrow />
          </a>
        ))}
      </div>
    </section>
  );
}

const thoughtQuotes = [
  "I want to travel but my friends are busy.",
  "I want to meet people who travel like me.",
  "I want to find a group before I leave.",
  "I want to make spontaneous plans.",
];

function SocialProof() {
  return (
    <section className="section thoughts-section">
      <div className="thoughts-title">
        <SectionLabel>Built for people who...</SectionLabel>
        <h2>You&apos;re not the only one who wants to go.</h2>
      </div>
      <div className="thoughts">
        {thoughtQuotes.map((quote, index) => (
          <blockquote key={quote}>
            <span>0{index + 1}</span>
            <p>“{quote}”</p>
          </blockquote>
        ))}
      </div>
    </section>
  );
}

function buildFaqs(l: Launch): string[][] {
  const where =
    l.playLive && l.iosLive
      ? "TripMate is on Google Play and the App Store. Use the buttons at the top of this page."
      : l.playLive
        ? "TripMate is on Google Play, and the iPhone version is coming soon. Use the buttons at the top of this page."
        : l.sameDay
          ? "TripMate launches on 11 October 2026 on Google Play and the App Store. The buttons at the top of this page become the store links on launch day."
          : "TripMate launches on 11 October 2026 on Google Play, with the iPhone version following shortly. The buttons at the top of this page become the store links on launch day.";
  return [
    ["What is TripMate?", "TripMate is a social travel app that helps people discover trips, meet compatible travellers, connect before departure and travel together."],
    ["How does TripMate work?", "Post or discover a plan, see the host and people going, join the trip and use the trip group chat to coordinate."],
    ["Can I create my own trip?", "Yes. Pick the place, dates and group size, then post your plan for other travellers to discover."],
    ["Can I join someone else’s trip?", "Yes. Browse available plans and request to join, or use instant join where the host has enabled it."],
    ["How does traveller verification work?", "TripMate uses selfie verification and displays a badge on verified traveller profiles."],
    ["How does TripMate keep travellers safe?", "TripMate includes host approval, visibility controls, report and block tools, and trip-only group chats. It does not run background checks, so use the same care you would meeting anyone new."],
    ["Can hosts approve who joins?", "Yes. Hosts can choose to review and approve travellers before they join a trip."],
    ["Can I report or block someone?", "Yes. Report and block controls are available in the app."],
    ["Is TripMate free?", "Yes. Posting plans, joining trips and chatting with your group are free."],
    ["Where can I download the app?", where],
  ];
}

function FAQ() {
  const faqs = buildFaqs(useLaunch());
  return (
    <section className="section faq-section">
      <div className="faq-heading">
        <SectionLabel>Questions, answered</SectionLabel>
        <h2>Before you<br />pack your bag.</h2>
        <p>Everything you need to know before finding your first travel saathi.</p>
      </div>
      <div className="faq-list">
        {faqs.map(([question, answer], index) => (
          <details key={question}>
            <summary><span>0{index + 1}</span>{question}<i>+</i></summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function FinalCTA() {
  const launch = useLaunch();
  return (
    <section className="final-cta" id="get-app">
      <svg viewBox="0 0 1200 400" aria-hidden="true">
        <path d="M-20 360 C220 40 390 440 610 170 S940 335 1220 40" />
        <circle cx="1220" cy="40" r="13" />
      </svg>
      <SectionLabel>Your next plan starts here</SectionLabel>
      <h2>Your next trip<br /><em>has company.</em></h2>
      <p>Download TripMate and post your first plan in a couple of minutes.</p>
      <span className="launch-badge"><i /> {launchLine(launch)}</span>
      <div>
        <StoreBadges />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer" id="about">
      <div className="footer-brand">
        <Logo light />
        <h2>Find your<br />travel saathi.</h2>
        <p>Post a trip. See who&apos;s going. Chat before you go.</p>
      </div>
      <div className="footer-links">
        <div><h3>Explore</h3><a href="#trips">Explore trips</a><a href="#how">How it works</a><a href="#get-app">Get the app</a></div>
        <div><h3>Trust</h3><a href="#safety">Safety</a><a href="mailto:saathi.app.dev@gmail.com">Report a problem</a></div>
        <div><h3>Company</h3><a href="#about">About</a><a href="mailto:saathi.app.dev@gmail.com">Contact</a></div>
        <div><h3>Legal</h3><a href="./privacy.html">Privacy policy</a><a href="./terms.html">Terms &amp; conditions</a><a href="./delete-account.html">Delete your account</a></div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 TripMate / Wanderly Technologies</p>
        <p>Made for the ones who still want to go. Photography: Unsplash.</p>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Problem />
        <HowItWorks />
        <Categories />
        <ExampleTrips />
        <People />
        <AppExperience />
        <TripDetail />
        <Safety />
        <Audiences />
        <Destinations />
        <SocialProof />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
