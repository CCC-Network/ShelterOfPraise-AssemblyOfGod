// src/pages/about.page.tsx
import { useState, useEffect, useRef, useCallback } from "react";
import { Users, BookOpen, BarChart3, Grid3X3, List, ChevronRight } from "lucide-react";
import * as d3 from "d3";

import { historyData, membersData, orgChartData, type OrgNode, type MemberProfile } from "../../app/database/data/about-us/about.data";
import CongregationProfileView from "../pages/about/CongregationProfileView";
import "../styles/about.page.css";

type MembersLayout = "carousel" | "list" | "graph";

/* ── OrgChart (D3 tree) ─────────────────────────────────────── */
function OrgChart() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const fullWidth = Math.max(container.offsetWidth, 700);
    const fullHeight = 520;
    const margin = { top: 40, right: 120, bottom: 40, left: 120 };
    const width = fullWidth - margin.left - margin.right;
    const height = fullHeight - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    svg.attr("width", fullWidth).attr("height", fullHeight);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const root = d3.hierarchy<OrgNode>(orgChartData);
    const treeLayout = d3.tree<OrgNode>().size([height, width]);
    treeLayout(root);

    // Links
    g.selectAll<SVGPathElement, d3.HierarchyPointLink<OrgNode>>(".org-link")
      .data(root.links())
      .join("path")
      .attr("class", "org-link")
      .attr(
        "d",
        d3
          .linkHorizontal<d3.HierarchyPointLink<OrgNode>, d3.HierarchyPointNode<OrgNode>>()
          .x((d) => d.y)
          .y((d) => d.x)
      );

    // Node groups
    const node = g
      .selectAll<SVGGElement, d3.HierarchyPointNode<OrgNode>>(".org-node")
      .data(root.descendants())
      .join("g")
      .attr("class", "org-node")
      .attr("transform", (d) => `translate(${d.y},${d.x})`);

    // Clip path for avatar circles
    const defs = svg.append("defs");
    root.descendants().forEach((_d, i) => {
      defs
        .append("clipPath")
        .attr("id", `org-clip-${i}`)
        .append("circle")
        .attr("r", 24);
    });

    // Avatar circle background
    node
      .append("circle")
      .attr("r", 26)
      .attr("class", (d) =>
        d.depth === 0
          ? "org-node-circle org-node-root"
          : d.depth === 1
          ? "org-node-circle org-node-l1"
          : "org-node-circle org-node-l2"
      );

    // Avatar image
    node
      .append("image")
      .attr("x", -24)
      .attr("y", -24)
      .attr("width", 48)
      .attr("height", 48)
      .attr("clip-path", (_, i) => `url(#org-clip-${i})`)
      .attr("href", (d) => d.data.image ?? "")
      .attr("preserveAspectRatio", "xMidYMid slice");

    // Name label
    node
      .append("text")
      .attr("class", "org-label-name")
      .attr("dy", (d) => (d.children ? -36 : 42))
      .attr("text-anchor", "middle")
      .text((d) => {
        const parts = d.data.name.split(" ");
        return parts.length > 2 ? `${parts[0]} ${parts[parts.length - 1]}` : d.data.name;
      });

    // Role label
    node
      .append("text")
      .attr("class", "org-label-role")
      .attr("dy", (d) => (d.children ? -22 : 56))
      .attr("text-anchor", "middle")
      .text((d) => d.data.role);

  }, []);

  return (
    <div className="org-chart-section">
      <div className="about-section-header">
        <h2 className="about-section-title">Organizational Structure</h2>
        <p className="about-section-sub">Church Leadership Hierarchy</p>
      </div>
      <div className="org-chart-container" ref={containerRef}>
        <svg ref={svgRef} />
      </div>
    </div>
  );
}

/* ── Main Page ──────────────────────────────────────────────── */
const AboutUsPage = () => {
  const [activeTab, setActiveTab]         = useState<"history" | "members">("history");
  const [membersLayout, setMembersLayout] = useState<MembersLayout>("carousel");
  const [navOpen, setNavOpen]             = useState(false);
  const [currentSlide, setCurrentSlide]  = useState(0);
  const [selectedMember, setSelectedMember] = useState<MemberProfile | null>(null);

  /* ── Carousel auto-advance ── */
  useEffect(() => {
    if (activeTab !== "members" || membersLayout !== "carousel") return;
    const timer = setInterval(() => setCurrentSlide((p) => (p + 1) % 2), 4000);
    return () => clearInterval(timer);
  }, [activeTab, membersLayout]);

  /* ── History tab ── */
  const renderHistory = () => (
    <div className="history-section">
      <div className="about-section-header">
        <h2 className="about-section-title">{historyData.title}</h2>
        <p className="about-section-sub">Founded in {historyData.founding}</p>
      </div>
      <div className="history-timeline">
        <div className="history-line" />
        {historyData.content.map((item, index) => (
          <div key={index} className="history-item">
            <div className="history-dot" />
            <div className="history-card">
              <div className="history-card-header">
                <span className="history-year">{item.year}</span>
                <h3 className="history-card-title">{item.title}</h3>
              </div>
              <p className="history-card-desc">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  /* ── Carousel view ── */
  const renderCarousel = () => {
    const CHUNK = 4;
    const rows: MemberProfile[][] = [];
    for (let i = 0; i < membersData.length; i += CHUNK) {
      rows.push(membersData.slice(i, i + CHUNK));
    }

    return (
      <div className="members-carousel-section">
        <div className="about-section-header">
          <h2 className="about-section-title">Our Team</h2>
          <p className="about-section-sub">Meet the people who make our ministry possible</p>
        </div>
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="carousel-row-wrap">
            <div
              className="carousel-row-track"
              style={{
                transform: `translateX(${
                  rowIndex % 2 === 0 ? -currentSlide * 280 : currentSlide * 280
                }px)`,
              }}
            >
              {[...row, ...row].map((member, index) => (
                <div
                  key={`${member.id}-${index}`}
                  className="member-card"
                  onClick={() => setSelectedMember(member)}
                >
                  <div className="member-card-img-wrap">
                    <img
                      src={member.image}
                      alt={member.name}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=200&background=dbeafe&color=1e40af`;
                      }}
                    />
                  </div>
                  <div className="member-card-body">
                    <h3 className="member-card-name">{member.name}</h3>
                    <p className="member-card-role">{member.role}</p>
                    <p className="member-card-dept">{member.department}</p>
                    <span className={`member-card-badge ${member.active ? "badge-active" : "badge-inactive"}`}>
                      {member.active ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  /* ── List view ── */
  const renderList = () => (
    <div className="members-list-section">
      <div className="about-section-header">
        <h2 className="about-section-title">Team Directory</h2>
      </div>
      <div className="members-table-wrap">
        <table className="members-table">
          <thead>
            <tr>
              <th>Member</th>
              <th>Role</th>
              <th>Department</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {membersData.map((member) => (
              <tr
                key={member.id}
                className="members-table-row"
                onClick={() => setSelectedMember(member)}
              >
                <td>
                  <div className="table-member-cell">
                    <img
                      className="table-avatar"
                      src={member.image}
                      alt={member.name}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=40&background=dbeafe&color=1e40af`;
                      }}
                    />
                    <span className="table-member-name">{member.name}</span>
                  </div>
                </td>
                <td className="table-cell">{member.role}</td>
                <td className="table-cell table-cell-muted">{member.department}</td>
                <td>
                  <span className={`member-card-badge ${member.active ? "badge-active" : "badge-inactive"}`}>
                    {member.active ? "Active" : "Inactive"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  /* ── Render members by layout ── */
  const renderMembers = () => {
    switch (membersLayout) {
      case "carousel": return renderCarousel();
      case "list":     return renderList();
      case "graph":    return <OrgChart />;
      default:         return renderCarousel();
    }
  };

  return (
    <div className="about-page">

      {/* ── Sidebar toggle button ── */}
      <button
        className={`about-nav-toggle ${navOpen ? "about-nav-toggle--open" : ""}`}
        onClick={() => setNavOpen((v) => !v)}
        aria-label={navOpen ? "Close navigation" : "Open navigation"}
        title={navOpen ? "Close" : "Open menu"}
      >
        <ChevronRight
          size={18}
          className={`about-nav-toggle-icon ${navOpen ? "rotated" : ""}`}
        />
      </button>

      {/* ── Sidebar panel ── */}
      <aside className={`about-nav-panel ${navOpen ? "about-nav-panel--open" : ""}`}>
        <h3 className="about-nav-title">📖 About Us</h3>

        <button
          className={`about-nav-btn ${activeTab === "history" ? "about-nav-btn--active" : ""}`}
          onClick={() => { setActiveTab("history"); setNavOpen(false); }}
        >
          <BookOpen size={18} />
          <span>History</span>
        </button>

        <button
          className={`about-nav-btn ${activeTab === "members" ? "about-nav-btn--active" : ""}`}
          onClick={() => setActiveTab("members")}
        >
          <Users size={18} />
          <span>Members</span>
        </button>

        {activeTab === "members" && (
          <div className="about-nav-sub">
            {(["carousel", "list", "graph"] as MembersLayout[]).map((layout) => (
              <button
                key={layout}
                className={`about-nav-sub-btn ${membersLayout === layout ? "about-nav-sub-btn--active" : ""}`}
                onClick={() => { setMembersLayout(layout); setNavOpen(false); }}
              >
                {layout === "carousel" && <Grid3X3 size={14} />}
                {layout === "list"    && <List     size={14} />}
                {layout === "graph"   && <BarChart3 size={14} />}
                <span>{layout.charAt(0).toUpperCase() + layout.slice(1)}</span>
              </button>
            ))}
          </div>
        )}
      </aside>

      {/* Overlay to close sidebar on mobile */}
      {navOpen && <div className="about-nav-overlay" onClick={() => setNavOpen(false)} />}

      {/* ── Main content ── */}
      <main className="about-main">
        <h1 className="about-page-title">About Us</h1>

        {activeTab === "history" && renderHistory()}
        {activeTab === "members" && renderMembers()}
      </main>

      {/* ── Profile popup ── */}
      {selectedMember && (
        <CongregationProfileView
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}
    </div>
  );
};

export default AboutUsPage;