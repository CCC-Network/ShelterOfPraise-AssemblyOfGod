import { useState } from "react";
import {
  ShoppingBag,
  Presentation,
  Mic,
  Users,
  Flame,
  Crown,
  Check,
  Layers,
  Download,
  Eye,
  Sprout,
  Calendar,
  Globe,
  Star,
  ExternalLink,
  ShoppingCart,
} from "lucide-react";
import ShowMerchProduct from "../components/showMerchantProduct";
import "../styles/product.page.css";

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */
interface PptItem {
  id: number;
  title: string;
  slides: number;
  topics: string[];
  price: number;
  badge?: string;
  Icon: React.ElementType;
}

interface CoachPlan {
  id: number;
  title: string;
  subtitle: string;
  price: number;
  frequency: string;
  features: string[];
  highlight: boolean;
  Icon: React.ElementType;
}

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const PPT_ITEMS: PptItem[] = [
  {
    id: 1,
    title: "Sunday Sermon Starter Pack",
    slides: 40,
    topics: ["Salvation", "Faith", "Grace", "Holy Spirit"],
    price: 599,
    badge: "Most Popular",
    Icon: Mic,
  },
  {
    id: 2,
    title: "Life Group Discussion Deck",
    slides: 25,
    topics: ["Community", "Prayer", "Accountability", "Growth"],
    price: 399,
    Icon: Users,
  },
  {
    id: 3,
    title: "Youth Ministry Bundle",
    slides: 60,
    topics: ["Identity in Christ", "Purity", "Purpose", "Peer Pressure"],
    price: 799,
    badge: "Bundle Deal",
    Icon: Flame,
  },
  {
    id: 4,
    title: "Leadership Training Slides",
    slides: 35,
    topics: ["Servant Leadership", "Vision", "Team Building", "Integrity"],
    price: 549,
    Icon: Crown,
  },
  {
    id: 5,
    title: "Advent & Christmas Series",
    slides: 50,
    topics: ["Hope", "Peace", "Joy", "Love", "The Nativity"],
    price: 699,
    badge: "Seasonal",
    Icon: Star,
  },
  {
    id: 6,
    title: "Evangelism & Outreach Kit",
    slides: 30,
    topics: ["The Gospel", "Testimony", "Reaching the Lost"],
    price: 449,
    Icon: Globe,
  },
];

const COACH_PLANS: CoachPlan[] = [
  {
    id: 1,
    title: "Foundations",
    subtitle: "For aspiring preachers & new leaders",
    price: 1500,
    frequency: "/ month",
    features: [
      "2× 60-min 1-on-1 coaching calls/month",
      "Sermon structure & delivery basics",
      "Voice & presence training",
      "Feedback on your recorded message",
      "Access to SOP sermon library",
    ],
    highlight: false,
    Icon: Sprout,
  },
  {
    id: 2,
    title: "Kingdom Leader",
    subtitle: "For pastors, worship leads & ministry heads",
    price: 3500,
    frequency: "/ month",
    features: [
      "4× 60-min coaching calls/month",
      "Advanced preaching & storytelling",
      "Church growth & vision strategy",
      "Leadership team mentoring sessions",
      "Custom sermon outlines provided",
      "Direct WhatsApp access between sessions",
    ],
    highlight: true,
    Icon: Crown,
  },
  {
    id: 3,
    title: "Ministry Intensive",
    subtitle: "Weekend or week-long immersive retreat",
    price: 12000,
    frequency: "one-time",
    features: [
      "Full-day or weekend intensive retreat",
      "Preaching practicum with live feedback",
      "Ministry model & structure workshop",
      "Team leadership alignment session",
      "30-day post-intensive email support",
      "Certificate of completion",
    ],
    highlight: false,
    Icon: Flame,
  },
];

/* ─────────────────────────────────────────────
   POWERPOINT TAB
───────────────────────────────────────────── */
function PowerPointTab() {
  const [selected, setSelected] = useState<PptItem | null>(null);

  return (
    <div className="ppt-section">
      <div className="section-hero">
        <div className="section-icon-wrap">
          <Presentation size={26} strokeWidth={1.4} />
        </div>
        <h2 className="section-title">Ready-to-Preach PowerPoint Assets</h2>
        <p className="section-sub">
          Scripture-filled, professionally designed slide decks for sermons, life groups, youth
          ministry, and leadership training. Download instantly. Preach confidently.
        </p>
      </div>

      <div className="ppt-grid">
        {PPT_ITEMS.map((p) => {
          const PIcon = p.Icon;
          return (
            <div
              key={p.id}
              className={`ppt-card ${selected?.id === p.id ? "ppt-card-selected" : ""}`}
              onClick={() => setSelected(selected?.id === p.id ? null : p)}
            >
              <div className="ppt-card-top">
                <div className="ppt-icon-wrap">
                  <PIcon size={20} strokeWidth={1.4} />
                </div>
                {p.badge && <span className="ppt-badge">{p.badge}</span>}
              </div>
              <h3 className="ppt-title">{p.title}</h3>
              <p className="ppt-slides">
                <Layers size={11} /> {p.slides} slides included
              </p>
              <div className="ppt-topics">
                {p.topics.map((t) => (
                  <span key={t} className="ppt-topic">{t}</span>
                ))}
              </div>
              <div className="ppt-footer">
                <span className="ppt-price">₱{p.price.toLocaleString()}</span>
                <button
                  className="btn-primary btn-sm"
                  onClick={(e) => { e.stopPropagation(); alert(`Purchasing: ${p.title}`); }}
                >
                  <ShoppingCart size={12} /> Get Deck
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {selected && (
        <div className="ppt-action-bar">
          <span className="ppt-action-label">
            <Presentation size={13} />
            <strong>{selected.title}</strong> selected
          </span>
          <div className="ppt-action-btns">
            <button className="btn-outline" onClick={() => alert("Preview loading…")}>
              <Eye size={13} /> Preview
            </button>
            <button className="btn-primary" onClick={() => alert("Checkout…")}>
              <Download size={13} /> Buy ₱{selected.price.toLocaleString()}
            </button>
            <button className="btn-secondary" onClick={() => alert("TikTok Shop…")}>
              <ExternalLink size={13} /> TikTok Shop
            </button>
          </div>
        </div>
      )}

      <div className="ppt-chips">
        {[".pptx + .key formats", "Editable & brandable", "Instant digital download", "Scripture-accurate"].map((c) => (
          <span key={c} className="info-chip">
            <Check size={11} /> {c}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   COACHING TAB
───────────────────────────────────────────── */
function CoachingTab() {
  return (
    <div className="coaching-section">
      <div className="section-hero">
        <div className="section-icon-wrap">
          <Mic size={26} strokeWidth={1.4} />
        </div>
        <h2 className="section-title">Coaching &amp; Mentorship</h2>
        <p className="section-sub">
          Years of ministry experience poured into you. Learn to preach with power, lead with
          integrity, and grow your ministry — for the glory of God alone.
        </p>
      </div>

      <blockquote className="coach-quote">
        "The best investment you can make is equipping yourself to serve God's people better."
      </blockquote>

      <div className="coach-chips">
        {["Preaching & Delivery", "Leadership Development", "Sermon Preparation", "Church Growth", "Life Group Facilitation", "Spiritual Disciplines"].map((t) => (
          <span key={t} className="coach-chip">{t}</span>
        ))}
      </div>

      <div className="coach-plans">
        {COACH_PLANS.map((plan) => {
          const PlanIcon = plan.Icon;
          return (
            <div key={plan.id} className={`coach-card ${plan.highlight ? "coach-card-highlight" : ""}`}>
              {plan.highlight && <div className="coach-ribbon">Most Chosen</div>}
              <div className="coach-icon-wrap">
                <PlanIcon size={22} strokeWidth={1.4} />
              </div>
              <h3 className="coach-plan-name">{plan.title}</h3>
              <p className="coach-plan-sub">{plan.subtitle}</p>
              <div className="coach-price-row">
                <span className="coach-price">₱{plan.price.toLocaleString()}</span>
                <span className="coach-freq">{plan.frequency}</span>
              </div>
              <ul className="coach-features">
                {plan.features.map((f) => (
                  <li key={f}>
                    <Check size={13} className="check-icon" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="coach-cta">
                <button
                  className={plan.highlight ? "btn-primary btn-full" : "btn-outline btn-full"}
                  onClick={() => alert(`Booking: ${plan.title}`)}
                >
                  <Calendar size={14} /> Book a Session
                </button>
                <button className="btn-ghost btn-full" onClick={() => alert("Inquiry form…")}>
                  Ask a Question
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="coach-process">
        <h3 className="process-title">How It Works</h3>
        <div className="process-steps">
          {[
            { n: "01", label: "Apply", desc: "Fill out the short ministry intake form." },
            { n: "02", label: "Discovery Call", desc: "Free 20-min call to align your goals." },
            { n: "03", label: "Custom Plan", desc: "We design your coaching roadmap." },
            { n: "04", label: "Start Growing", desc: "Sessions, resources, and real results." },
          ].map((s) => (
            <div key={s.n} className="process-step">
              <span className="step-num">{s.n}</span>
              <strong>{s.label}</strong>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
const TABS = [
  { label: "Merchandise", Icon: ShoppingBag },
  { label: "PowerPoint Assets", Icon: Presentation },
  { label: "Coaching", Icon: Mic },
];

const ProductPage = () => {
  const [tab, setTab] = useState(0);

  return (
    <div className="sop-page">
      <header className="sop-header">
        <h1 className="sop-title">Shelter of Praise</h1>
        <p className="sop-subtitle">Assembly of God · Resources for Ministry</p>
        <p className="sop-tagline">Every purchase fuels ministry. Every resource equips the Church.</p>
      </header>

      <nav className="projects-tab-bar">
        {TABS.map(({ label, Icon: TabIcon }, i) => (
          <button
            key={label}
            className={`projects-tab-btn ${tab === i ? "active" : ""}`}
            onClick={() => setTab(i)}
          >
            <TabIcon size={15} strokeWidth={1.6} />
            {label}
          </button>
        ))}
      </nav>

      <main className="sop-content">
        {tab === 0 && (
          <div className="fade-in">
            <div className="section-hero">
              <div className="section-icon-wrap">
                <ShoppingBag size={26} strokeWidth={1.4} />
              </div>
              <h2 className="section-title">Church Merchandise</h2>
              <p className="section-sub">
                Quality goods that carry the message. Crafted with excellence — because God deserves our best.
              </p>
            </div>
            <ShowMerchProduct />
          </div>
        )}
        {tab === 1 && <div className="fade-in"><PowerPointTab /></div>}
        {tab === 2 && <div className="fade-in"><CoachingTab /></div>}
      </main>
    </div>
  );
};

export default ProductPage;