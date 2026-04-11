// src/pages/about/components/CongregationProfileView.tsx
import { useEffect } from "react";
import { X, MapPin, BookOpen, GraduationCap, Calendar, Star } from "lucide-react";
import type { MemberProfile } from "../../../app/database/data/about-us/about.data";

interface Props {
  member: MemberProfile;
  onClose: () => void;
}

export default function CongregationProfileView({ member, onClose }: Props) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const hasAlbum = member.album && member.album.length > 0;

  return (
    <>
      {/* ── Backdrop ── */}
      <div className="cpv-backdrop" onClick={onClose} />

      {/* ── Modal ── */}
      <div className="cpv-modal" role="dialog" aria-modal="true" aria-label={member.name}>

        {/* Close */}
        <button className="cpv-close-btn" onClick={onClose} aria-label="Close">
          <X size={16} />
        </button>

        {/* ── Cover photo ── */}
        <div className="cpv-cover">
          {/* blurred duplicate of profile as cover */}
          <img
            className="cpv-cover-bg"
            src={member.image}
            alt=""
            aria-hidden="true"
          />
          <div className="cpv-cover-overlay" />
        </div>

        {/* ── Profile avatar (overlaps cover) ── */}
        <div className="cpv-avatar-wrap">
          <img
            className="cpv-avatar"
            src={member.image}
            alt={member.name}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=120&background=3b82f6&color=fff`;
            }}
          />
          <span className={`cpv-status-badge ${member.active ? "cpv-status-active" : "cpv-status-inactive"}`}>
            {member.active ? "Active" : "Inactive"}
          </span>
        </div>

        {/* ── Scrollable body ── */}
        <div className="cpv-body">

          {/* Name & role */}
          <div className="cpv-identity">
            <h2 className="cpv-name">{member.name}</h2>
            <p className="cpv-role">{member.role}</p>
            <span className="cpv-dept-chip">{member.department}</span>
          </div>

          {/* Info grid */}
          <div className="cpv-info-grid">
            {member.age && (
              <div className="cpv-info-item">
                <Star size={14} className="cpv-info-icon" />
                <span className="cpv-info-label">Age</span>
                <span className="cpv-info-value">{member.age}</span>
              </div>
            )}
            {member.birthdate && (
              <div className="cpv-info-item">
                <Calendar size={14} className="cpv-info-icon" />
                <span className="cpv-info-label">Birthday</span>
                <span className="cpv-info-value">{member.birthdate}</span>
              </div>
            )}
            {member.school && (
              <div className="cpv-info-item">
                <GraduationCap size={14} className="cpv-info-icon" />
                <span className="cpv-info-label">School</span>
                <span className="cpv-info-value">{member.school}</span>
              </div>
            )}
            {member.address && (
              <div className="cpv-info-item">
                <MapPin size={14} className="cpv-info-icon" />
                <span className="cpv-info-label">Address</span>
                <span className="cpv-info-value">{member.address}</span>
              </div>
            )}
            {member.favoriteVerse && (
              <div className="cpv-info-item cpv-info-verse">
                <BookOpen size={14} className="cpv-info-icon" />
                <span className="cpv-info-label">Favorite Verse</span>
                <span className="cpv-info-value">{member.favoriteVerse}</span>
              </div>
            )}
          </div>

          {/* If no extended info is set, show a placeholder */}
          {!member.age && !member.birthdate && !member.school && !member.address && !member.favoriteVerse && (
            <p className="cpv-no-info">More details coming soon. 🙏</p>
          )}

          {/* ── Gallery ── */}
          <div className="cpv-gallery-section">
            <h3 className="cpv-gallery-title">Gallery</h3>
            {hasAlbum ? (
              <div className="cpv-gallery-grid">
                {member.album!.map((src, i) => (
                  <div key={i} className="cpv-gallery-item">
                    <img
                      src={src}
                      alt={`${member.name} photo ${i + 1}`}
                      loading="lazy"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="cpv-gallery-empty">
                <p>No photos yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
