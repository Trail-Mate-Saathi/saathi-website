import { useState } from "react";

const screens = {
  welcome: "/screens/welcome.jpg",
  explore: "/screens/explore.jpg",
  plan: "/screens/plan.jpg",
  people: "/screens/people.jpg",
  groupChat: "/screens/group-chat.jpg",
  createPlan: "/screens/create-plan.jpg",
  passport: "/screens/passport.jpg",
};

// Launch switches. Android and iPhone go live together on 29 Nov 2026 (moved from 20 Nov) (IST).
// Until then the badges are not links (the store pages do not exist yet) and the
// page says "Launching 29 Nov". If one store slips, move its date.
const PLAY_LIVE = Date.parse("2026-11-29T00:00:00+05:30");
const IOS_LIVE = Date.parse("2026-11-29T00:00:00+05:30");
const LAUNCH_DAY = "29 Nov";
const LAUNCH_DAY_LONG = "29 November 2026";
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
  return l.sameDay ? `Launching ${LAUNCH_DAY} on Android & iPhone` : `Launching ${LAUNCH_DAY} on Android`;
}

// Official Google Play and App Store badges, unmodified, at the same height.
function StoreBadges() {
  const l = useLaunch();
  const playNote = l.playLive ? null : `Coming ${LAUNCH_DAY}`;
  const iosNote = l.iosLive ? null : l.sameDay ? `Coming ${LAUNCH_DAY}` : "Coming soon";
  const play = <img className="badge-play" src="/badges/google-play-badge.svg" alt="Get it on Google Play" height={54} />;
  const ios = <img className="badge-ios" src="/badges/app-store-badge.svg" alt="Download on the App Store" height={58} />;
  return (
    <div className="badges">
      <div className="badge-col">
        {l.playLive ? (
          <a className="store-official" href={PLAY_URL} target="_blank" rel="noopener noreferrer">{play}</a>
        ) : (
          <span className="store-official store-soon">{play}</span>
        )}
        {playNote ? <span className="badge-note">{playNote}</span> : null}
      </div>
      <div className="badge-col">
        {l.iosLive ? (
          <a className="store-official" href={IOS_URL} target="_blank" rel="noopener noreferrer">{ios}</a>
        ) : (
          <span className="store-official store-soon">{ios}</span>
        )}
        {iosNote ? <span className="badge-note">{iosNote}</span> : null}
      </div>
    </div>
  );
}

function BrandMark() {
  return <img className="brand-mark" src="/logo-pin.png" alt="" aria-hidden="true" width={22} height={29} />;
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
                    <a href="#how">How it works</a>
          <a href="#passport">Passport</a>
          <a href="#safety">Safety</a>
          <a href="#faq">FAQ</a>
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
                    <a href="#how" onClick={() => setOpen(false)}>How it works</a>
          <a href="#passport" onClick={() => setOpen(false)}>Passport</a>
          <a href="#safety" onClick={() => setOpen(false)}>Safety</a>
          <a href="#faq" onClick={() => setOpen(false)}>FAQ</a>
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
    text: "Browse trips and travellers. Each card shows what you have in common.",
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

const passportPoints = [
  ["Verified seal", "Stamped only after our team approves the selfie."],
  ["Trip stamps", "One for every trip that really happened on TripMate."],
  ["Endorsements", "Great company, on time, respectful: picked by the people they travelled with."],
  ["Ratings & trust score", "Reviews open only after a trip, from people who were on it."],
];

function Passport() {
  return (
    <section className="section detail-section passport-section" id="passport">
      <div className="detail-visual">
        <div className="detail-blob" />
        <Phone src={screens.passport} alt="TripMate travel passport with a verified seal and trip stamps" className="detail-phone" />
        <div className="detail-floating-card">
          <span>Example passport</span>
          <strong>9 trips · 4.7★</strong>
        </div>
      </div>
      <div className="detail-copy">
        <SectionLabel>The travel passport</SectionLabel>
        <h2>Every traveller carries <em>a passport.</em></h2>
        <p>
          Each profile is a travel passport. The seal, stamps and endorsements
          are earned on real trips and cannot be bought or typed in. Before you travel with someone, you can see where they have
          been and what their co-travellers said.
        </p>
        <div className="detail-list passport-list">
          {passportPoints.map(([title, text], index) => (
            <div key={title}><span>0{index + 1}</span><strong>{title}<small>{text}</small></strong></div>
          ))}
        </div>
      </div>
    </section>
  );
}

const safetyItems = [
  ["01", "Every selfie checked", "Our team reviews each selfie. Only verified travellers can join trips or connect with people."],
  ["02", "Women-only trips", "Verified women can host trips that only other verified women can see and join."],
  ["03", "SOS & check-ins", "On a trip, text your location to your emergency contact in one tap, and let them know you arrived."],
  ["04", "Report & block", "Our team reviews every report. Hosts approve who joins. Block anyone, any time."],
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

function buildFaqs(l: Launch): string[][] {
  const where =
    l.playLive && l.iosLive
      ? "TripMate is on Google Play and the App Store. Use the buttons at the top of this page."
      : l.playLive
        ? "TripMate is on Google Play, and the iPhone version is coming soon. Use the buttons at the top of this page."
        : l.sameDay
          ? `TripMate launches on ${LAUNCH_DAY_LONG} on Google Play and the App Store. The buttons at the top of this page become the store links on launch day.`
          : `TripMate launches on ${LAUNCH_DAY_LONG} on Google Play, with the iPhone version following shortly. The buttons at the top of this page become the store links on launch day.`;
  return [
    ["What is TripMate?", "TripMate is a social travel app that helps people discover trips, meet compatible travellers, connect before departure and travel together."],
    ["How does traveller verification work?", "You take a quick selfie in the app and our team checks it against your profile photo. Verified travellers get a badge, and only verified travellers can join trips, connect with people or appear in People."],
    ["How does TripMate keep travellers safe?", "Every selfie is checked by our team, hosts can approve who joins, and you can report or block anyone. On a trip you can share the trip details, check in when you arrive, and send your location to your emergency contact with SOS. TripMate does not run background checks, so use the same care you would meeting anyone new."],
["What if nobody is going where I want to go?", "Follow the destination and TripMate tells you when someone posts a plan there. Or post the plan yourself and let others find you."],
    ["Is TripMate free?", "Yes. Posting plans, joining trips and chatting with your group are free."],
    ["Where can I download the app?", where],
  ];
}

function FAQ() {
  const faqs = buildFaqs(useLaunch());
  return (
    <section className="section faq-section" id="faq">
      <div className="faq-heading">
        <SectionLabel>Questions, answered</SectionLabel>
        <h2>Before you<br />pack your bag.</h2>
              </div>
      <div className="faq-list">
        {faqs.map(([question, answer], index) => (
          <details key={question}>
            <summary><span>{String(index + 1).padStart(2, "0")}</span>{question}<i>+</i></summary>
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
        <div><h3>Explore</h3><a href="#how">How it works</a><a href="#get-app">Get the app</a></div>
        <div><h3>Trust</h3><a href="#safety">Safety</a><a href="mailto:support@tripmatego.in">Report a problem</a></div>
        <div><h3>Company</h3><a href="#faq">FAQ</a><a href="mailto:support@tripmatego.in">Contact</a></div>
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
        <HowItWorks />
        <Passport />
        <Safety />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
