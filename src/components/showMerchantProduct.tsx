import { useState } from "react";
import {
  X,
  ShoppingCart,
  ExternalLink,
  Tag,
  Package,
  BookOpen,
  Coffee,
  ShoppingBag,
  Award,
  Book,
  Shirt,
  Star,
  Check,
} from "lucide-react";

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */
export interface Swatch {
  label: string;
  hex: string;
}

export interface MerchItem {
  id: number;
  name: string;
  tagline: string;
  description: string;
  material: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  rating: number;
  sold: number;
  Icon: React.ElementType;
  swatches: Swatch[];
  category: string;
  specs: { label: string; value: string }[];
}

/* ─────────────────────────────────────────────
   MOCK DATA
───────────────────────────────────────────── */
export const MERCH_DATA: MerchItem[] = [
  {
    id: 1,
    name: "Leather Devotional Journal",
    tagline: "Write what God is speaking.",
    description:
      "Full-grain leather journal embossed with the Shelter of Praise crest. 200 cream-lined pages, a ribbon bookmark, and a scripture verse opening each section — built to outlast a season of growth.",
    material: "Full-grain leather · 200 acid-free pages · Lay-flat binding · Ribbon bookmark",
    price: 649,
    originalPrice: 799,
    badge: "Best Seller",
    rating: 4.9,
    sold: 214,
    Icon: BookOpen,
    swatches: [
      { label: "Tan", hex: "#A0785A" },
      { label: "Midnight", hex: "#2C2C2C" },
      { label: "Forest", hex: "#2D4A3E" },
    ],
    category: "Stationery",
    specs: [
      { label: "Pages", value: "200 acid-free cream pages" },
      { label: "Cover", value: "Full-grain leather, embossed" },
      { label: "Binding", value: "Lay-flat sewn binding" },
      { label: "Size", value: "A5 (148 × 210 mm)" },
      { label: "Extras", value: "Ribbon bookmark, elastic closure" },
    ],
  },
  {
    id: 2,
    name: "Stoneware Worship Mug",
    tagline: "Start every morning in His presence.",
    description:
      "High-fired stoneware mug featuring the 'Let Everything That Has Breath' hand-lettered design. Comfortable handle, rich matte glaze — microwave and dishwasher safe.",
    material: "High-fire stoneware · 14 oz · Matte glaze · Microwave & dishwasher safe",
    price: 349,
    rating: 4.7,
    sold: 183,
    Icon: Coffee,
    swatches: [
      { label: "Cream", hex: "#F0EAD6" },
      { label: "Slate", hex: "#4A5568" },
    ],
    category: "Drinkware",
    specs: [
      { label: "Capacity", value: "14 oz (414 ml)" },
      { label: "Material", value: "High-fire stoneware" },
      { label: "Finish", value: "Matte exterior, glossy interior" },
      { label: "Care", value: "Microwave & dishwasher safe" },
      { label: "Print", value: "Hand-lettered, kiln-fired" },
    ],
  },
  {
    id: 3,
    name: "Scripture Canvas Tote",
    tagline: "Carry the Word wherever you go.",
    description:
      "Heavy-duty 12 oz canvas tote with screen-printed scripture artwork. Reinforced stitched handles, inner zip pocket — perfect for your Bible, notes, and Sunday essentials.",
    material: "12 oz cotton canvas · Screen-print ink · Reinforced stitching · Inner zip pocket",
    price: 449,
    badge: "New",
    rating: 4.8,
    sold: 97,
    Icon: ShoppingBag,
    swatches: [
      { label: "Natural", hex: "#D9C9A3" },
      { label: "Black", hex: "#1A1A1A" },
    ],
    category: "Bags",
    specs: [
      { label: "Weight", value: "12 oz 100% cotton canvas" },
      { label: "Dimensions", value: "38 × 42 cm + 10 cm gusset" },
      { label: "Handles", value: "Reinforced 60 cm straps" },
      { label: "Pocket", value: "Interior zip pocket" },
      { label: "Print", value: "Water-based screen print" },
    ],
  },
  {
    id: 4,
    name: "Hard Enamel Pin Set",
    tagline: "Wear your testimony.",
    description:
      "Set of 3 collector-grade hard-enamel pins — a flame, a dove, and the SOP cross crest. 18k gold plating, rubber clutch backs, presented in a gift-ready kraft box.",
    material: "Hard enamel · 18k gold plating · Rubber clutch · Kraft gift box",
    price: 299,
    originalPrice: 350,
    rating: 4.6,
    sold: 312,
    Icon: Award,
    swatches: [
      { label: "Gold", hex: "#C9A84C" },
      { label: "Silver", hex: "#B0B0B0" },
    ],
    category: "Accessories",
    specs: [
      { label: "Quantity", value: "Set of 3 pins" },
      { label: "Plating", value: "18k gold plating" },
      { label: "Size", value: "Approx. 2.5 cm each" },
      { label: "Backing", value: "Rubber clutch" },
      { label: "Packaging", value: "Kraft gift box" },
    ],
  },
  {
    id: 5,
    name: "Vegan Leather Bible Cover",
    tagline: "Protect the living Word.",
    description:
      "Handcrafted vegan leather cover stamped with the SOP emblem. Fits standard and large-print Bibles. YKK zip closure, pen loop, and three card slots — everything in one place.",
    material: "Premium vegan leather · Microfiber lining · YKK zipper · Pen loop + 3 card slots",
    price: 799,
    badge: "Limited",
    rating: 4.9,
    sold: 68,
    Icon: Book,
    swatches: [
      { label: "Forest", hex: "#2D4A3E" },
      { label: "Cognac", hex: "#A0785A" },
      { label: "Midnight", hex: "#2C2C2C" },
    ],
    category: "Accessories",
    specs: [
      { label: "Material", value: "Premium vegan leather" },
      { label: "Lining", value: "Soft microfiber" },
      { label: "Closure", value: "YKK zip-around" },
      { label: "Fits", value: "Standard & large-print Bibles" },
      { label: "Extras", value: "Pen loop, 3 card slots, ribbon" },
    ],
  },
  {
    id: 6,
    name: "Worship Team Hoodie",
    tagline: "Built for kingdom workers.",
    description:
      "400 GSM French-terry hoodie with an embroidered SOP logo on the chest and 'For His Glory' woven on the sleeve cuff. Pre-shrunk, double-lined hood, unisex cut.",
    material: "400 GSM French-terry cotton blend · Embroidered · Pre-shrunk · Unisex",
    price: 1299,
    badge: "Premium",
    rating: 4.8,
    sold: 155,
    Icon: Shirt,
    swatches: [
      { label: "Charcoal", hex: "#3A3A3A" },
      { label: "Forest", hex: "#2D4A3E" },
      { label: "Navy", hex: "#1B2A4A" },
    ],
    category: "Apparel",
    specs: [
      { label: "Weight", value: "400 GSM French-terry" },
      { label: "Composition", value: "80% cotton, 20% polyester" },
      { label: "Logo", value: "Embroidered chest + sleeve" },
      { label: "Fit", value: "Unisex relaxed fit" },
      { label: "Sizes", value: "XS – 3XL" },
    ],
  },
];

/* ─────────────────────────────────────────────
   STAR RATING
───────────────────────────────────────────── */
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="star-row">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={11}
          className={s <= Math.round(rating) ? "star-filled" : "star-empty"}
        />
      ))}
      <span className="star-value">{rating.toFixed(1)}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PRODUCT DETAIL POPUP
───────────────────────────────────────────── */
interface PopupProps {
  item: MerchItem;
  onClose: () => void;
}

function ProductPopup({ item, onClose }: PopupProps) {
  const [swatch, setSwatch] = useState(0);
  const [qty, setQty] = useState(1);
  const { Icon } = item;

  return (
    <>
      {/* Backdrop */}
      <div className="bg-cover-popup" onClick={onClose} />

      {/* Modal */}
      <div className="popup-modal-wrap">
        <div className="popup-modal">
          {/* Header */}
          <div className="popup-header">
            <span className="popup-category-chip">{item.category}</span>
            <button className="close-button" onClick={onClose} aria-label="Close">
              <X size={14} />
            </button>
          </div>

          {/* Body */}
          <div className="popup-body">
            {/* Visual */}
            <div
              className="popup-visual"
              style={{ background: item.swatches[swatch]?.hex + "18" }}
            >
              <div
                className="popup-icon"
                style={{ color: item.swatches[swatch]?.hex }}
              >
                <Icon size={96} strokeWidth={1} />
              </div>
              {item.badge && (
                <span className="merch-tile-badge">
                  <Tag size={9} /> {item.badge}
                </span>
              )}
            </div>

            {/* Info */}
            <div className="popup-info">
              <h2 className="popup-name">{item.name}</h2>
              <p className="popup-tagline">{item.tagline}</p>

              <div className="popup-rating-row">
                <StarRating rating={item.rating} />
                <span className="popup-sold">{item.sold.toLocaleString()} sold</span>
              </div>

              <div className="popup-price-row">
                <span className="popup-price">₱{item.price.toLocaleString()}</span>
                {item.originalPrice && (
                  <span className="popup-original">₱{item.originalPrice.toLocaleString()}</span>
                )}
                {item.originalPrice && (
                  <span className="popup-discount">
                    -{Math.round((1 - item.price / item.originalPrice) * 100)}%
                  </span>
                )}
              </div>

              <p className="popup-desc">{item.description}</p>

              {/* Colour */}
              <div className="popup-swatch-section">
                <span className="popup-label">
                  Colour: <strong>{item.swatches[swatch]?.label}</strong>
                </span>
                <div className="popup-swatches">
                  {item.swatches.map((s, i) => (
                    <button
                      key={s.hex}
                      className={`swatch-btn ${i === swatch ? "swatch-active" : ""}`}
                      style={{ background: s.hex }}
                      title={s.label}
                      onClick={() => setSwatch(i)}
                    />
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="popup-qty-section">
                <span className="popup-label">Quantity</span>
                <div className="qty-control">
                  <button
                    className="qty-btn"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                  >−</button>
                  <span className="qty-value">{qty}</span>
                  <button className="qty-btn" onClick={() => setQty((q) => q + 1)}>+</button>
                </div>
              </div>

              {/* Specs */}
              <div className="popup-specs">
                <span className="popup-label"><Package size={12} /> Specs &amp; Materials</span>
                <table className="specs-table">
                  <tbody>
                    {item.specs.map((s) => (
                      <tr key={s.label}>
                        <td className="spec-key">{s.label}</td>
                        <td className="spec-val">{s.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* CTAs */}
              <div className="popup-cta">
                <button
                  className="btn-primary btn-full"
                  onClick={() => alert(`Ordering ${qty}× ${item.name}…`)}
                >
                  <ShoppingCart size={15} /> Buy Now · ₱{(item.price * qty).toLocaleString()}
                </button>
                <button
                  className="btn-outline btn-full"
                  onClick={() => alert("Opening TikTok Shop…")}
                >
                  <ExternalLink size={14} /> Also on TikTok Shop
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────
   MERCH TILE (single product card)
───────────────────────────────────────────── */
interface TileProps {
  item: MerchItem;
  onView: (item: MerchItem) => void;
}

function MerchTile({ item, onView }: TileProps) {
  const { Icon } = item;
  const discount = item.originalPrice
    ? Math.round((1 - item.price / item.originalPrice) * 100)
    : null;

  return (
    <div className="merch-tile" onClick={() => onView(item)}>
      {/* Image area */}
      <div className="merch-tile-visual">
        <div className="merch-tile-icon">
          <Icon size={52} strokeWidth={1.1} />
        </div>
        {item.badge && (
          <span className="merch-tile-badge">
            <Tag size={9} /> {item.badge}
          </span>
        )}
        {discount && (
          <span className="merch-tile-discount">-{discount}%</span>
        )}
        <div className="merch-tile-hover-overlay">
          <span className="merch-tile-view-label">View Details</span>
        </div>
      </div>

      {/* Info */}
      <div className="merch-tile-body">
        <p className="merch-tile-category">{item.category}</p>
        <h3 className="merch-tile-name">{item.name}</h3>

        <StarRating rating={item.rating} />

        <div className="merch-tile-footer">
          <div className="merch-tile-prices">
            <span className="merch-tile-price">₱{item.price.toLocaleString()}</span>
            {item.originalPrice && (
              <span className="merch-tile-original">
                ₱{item.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          <span className="merch-tile-sold">{item.sold} sold</span>
        </div>

        {/* Swatch dots preview */}
        <div className="merch-tile-swatches">
          {item.swatches.map((s) => (
            <span
              key={s.hex}
              className="tile-swatch-dot"
              style={{ background: s.hex }}
              title={s.label}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN EXPORT — MerchGrid
───────────────────────────────────────────── */
const CATEGORIES = ["All", ...Array.from(new Set(MERCH_DATA.map((m) => m.category)))];

export default function ShowMerchProduct() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [popup, setPopup] = useState<MerchItem | null>(null);

  const filtered =
    activeCategory === "All"
      ? MERCH_DATA
      : MERCH_DATA.filter((m) => m.category === activeCategory);

  return (
    <div className="merch-section">
      {/* Category filter bar */}
      <div className="merch-filter-bar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`merch-filter-btn ${activeCategory === cat ? "merch-filter-active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="merch-results-count">
        Showing <strong>{filtered.length}</strong> item{filtered.length !== 1 ? "s" : ""}
        {activeCategory !== "All" && ` in ${activeCategory}`}
      </p>

      {/* Tile grid */}
      <div className="merch-grid">
        {filtered.map((item) => (
          <MerchTile key={item.id} item={item} onView={setPopup} />
        ))}
      </div>

      {/* Popup */}
      {popup && (
        <ProductPopup item={popup} onClose={() => setPopup(null)} />
      )}
    </div>
  );
}