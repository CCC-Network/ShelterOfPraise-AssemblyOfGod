// src/pages/memorial.tribute.page.tsx
import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Trophy, Cross, Images, Video,
  Feather, Heart, MessageCircle, X, Play, Loader2,
} from 'lucide-react';
import '../styles/memorial.tribute.css';
import {
  fetchMemorialMessages,
  submitMemorialMessage,
  formatMessageDate,
  FALLBACK_AVATAR,
  type MemorialMessage,
} from '../utils/memorial.data';

/* ─── Static profile data (unchanged — not from DB) ─────────── */
const memorialProfiles = [
  {
    id: 1,
    name: 'Jhonwhein Quitor',
    image: 'https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/8_John_Whein_Quitor.jpg?raw=true',
    birthDate: '22.10.2008',
    deathDate: '31.05.2025',
    quote: 'Though he walks now in the arms of our Lord, his words, his faith, and his love remain with us, guiding our hearts each day.',
    role: 'Our beloved brother & friend',
    stories: [
      {
        title: 'A Life of Service',
        content: 'Jhonwhein dedicated his life to serving others in the ministry. His compassionate heart and unwavering faith touched countless lives throughout his journey with us. He was known for his gentle spirit and his ability to comfort those in need, always pointing others toward hope.',
        image: 'https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/albums/JohnWeinQuitor/Wein_11.jpg?raw=true',
      },
    ],
    photos: [
      'https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/albums/JohnWeinQuitor/Wein_1.jpg?raw=true',
      'https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/albums/JohnWeinQuitor/Wein_2.jpg?raw=true',
      'https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/albums/JohnWeinQuitor/Wein_3.jpg?raw=true',
      'https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/albums/JohnWeinQuitor/Wein_4.jpg?raw=true',
      'https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/albums/JohnWeinQuitor/Wein_5.jpg?raw=true',
      'https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/albums/JohnWeinQuitor/Wein_6.jpg?raw=true',
      'https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/albums/JohnWeinQuitor/Wein_7.jpg?raw=true',
      'https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/albums/JohnWeinQuitor/Wein_8.jpg?raw=true',
      'https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/albums/JohnWeinQuitor/Wein_9.jpg?raw=true',
      'https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/albums/JohnWeinQuitor/Wein_10.jpg?raw=true',
      'https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/albums/JohnWeinQuitor/Wein_11.jpg?raw=true',
      'https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/albums/JohnWeinQuitor/Wein_12.jpg?raw=true',
    ],
    videos: [
      { title: 'Sunday Service Message', thumbnail: '/api/placeholder/200/150' },
      { title: 'Community Outreach',     thumbnail: '/api/placeholder/200/150' },
      { title: 'Family Testimonial',     thumbnail: '/api/placeholder/200/150' },
    ],
  },
  {
    id: 2,
    name: 'Mark Stephen Frondozo',
    image: 'https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/6_Mark.Stephen.Frondozo.jpg?raw=true',
    birthDate: '12.07.2006',
    deathDate: '16.06.2025',
    quote: 'His gentle spirit and loving heart continue to inspire us daily. He now rests in the peace of our Savior.',
    role: 'Our beloved brother & friend',
    stories: [
      {
        title: "A Brother's Love",
        content: 'Mark Stephen was known for his nurturing spirit and unconditional love for his family and church community. His presence filled every room with warmth, and his faith was a steady light for all who knew him.',
        image: 'https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/albums/MarkStephenFrondozo/mark_6.jpg?raw=true',
      },
    ],
    photos: [
      'https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/albums/MarkStephenFrondozo/mark_1.jpg?raw=true',
      'https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/albums/MarkStephenFrondozo/mark_2.jpg?raw=true',
      'https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/albums/MarkStephenFrondozo/mark_3.jpg?raw=true',
      'https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/albums/MarkStephenFrondozo/mark_4.jpg?raw=true',
      'https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/albums/MarkStephenFrondozo/mark_5.jpg?raw=true',
      'https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/albums/MarkStephenFrondozo/mark_6.jpg?raw=true',
      'https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/albums/MarkStephenFrondozo/mark_7.jpg?raw=true',
      'https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/albums/MarkStephenFrondozo/mark_8.jpg?raw=true',
      'https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/albums/MarkStephenFrondozo/mark_10.jpg?raw=true',
      'https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/albums/MarkStephenFrondozo/mark_11.jpg?raw=true',
      'https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/albums/MarkStephenFrondozo/mark_12.jpg?raw=true',
    ],
    videos: [
      { title: 'Family Memories', thumbnail: '/api/placeholder/200/150' },
    ],
  },
];

const VISIBLE_CARDS = 4;

const tabs = [
  { id: 'memorial', label: 'Memorial', Icon: Trophy  },
  { id: 'stories',  label: 'Stories',  Icon: Feather },
  { id: 'photos',   label: 'Photos',   Icon: Images  },
  { id: 'videos',   label: 'Videos',   Icon: Video   },
];

/* ─── MessageCard sub-component ─────────────────────────────── */
const MessageCard = ({
  msg,
  expanded,
  onToggle,
}: {
  msg: MemorialMessage;
  expanded: boolean;
  onToggle: () => void;
}) => {
  const truncate = (text: string, len = 80) =>
    text.length > len ? text.slice(0, len) + '…' : text;

  const avatar = msg.photo_url
    || `${FALLBACK_AVATAR}${encodeURIComponent(msg.name)}`;

  return (
    <div className="message-card">
      <div className="message-card-header">
        <img
          className="message-avatar"
          src={avatar}
          alt={msg.name}
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              `${FALLBACK_AVATAR}${encodeURIComponent(msg.name)}`;
          }}
        />
        <div>
          <p className="message-author">{msg.name}</p>
          {msg.created_at && (
            <p className="message-date">{formatMessageDate(msg.created_at)}</p>
          )}
        </div>
      </div>
      <p className="message-text" onClick={onToggle} style={{ cursor: 'pointer' }}>
        {expanded ? msg.message : truncate(msg.message)}
      </p>
    </div>
  );
};

/* ─── Main Component ─────────────────────────────────────────── */
const MemorialTributePage = () => {
  const [selectedProfile, setSelectedProfile] = useState(memorialProfiles[0]);
  const [activeTab,        setActiveTab]       = useState('memorial');

  /* Message wall state */
  const [messages,   setMessages]   = useState<MemorialMessage[]>([]);
  const [wallLoading, setWallLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [carouselIdx, setCarouselIdx] = useState(0);

  /* Form state */
  const [showForm,     setShowForm]     = useState(false);
  const [formName,     setFormName]     = useState('');
  const [formMessage,  setFormMessage]  = useState('');
  const [formPhoto,    setFormPhoto]    = useState<File | null>(null);
  const [formPreview,  setFormPreview]  = useState<string | null>(null);
  const [formStatus,   setFormStatus]   = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formError,    setFormError]    = useState('');

  const trackRef = useRef<HTMLDivElement>(null);

  /* ── Fetch messages on mount ───────────────────────────────── */
  const loadMessages = useCallback(async () => {
    setWallLoading(true);
    const data = await fetchMemorialMessages();
    setMessages(data);
    setWallLoading(false);
  }, []);

  useEffect(() => { loadMessages(); }, [loadMessages]);

  /* ── Carousel ──────────────────────────────────────────────── */
  const useCarousel = messages.length > VISIBLE_CARDS;
  const maxSlide    = Math.max(0, messages.length - VISIBLE_CARDS);

  useEffect(() => {
    if (!trackRef.current) return;
    const cardW = trackRef.current.firstElementChild
      ? (trackRef.current.firstElementChild as HTMLElement).offsetWidth + 20
      : 0;
    trackRef.current.style.transform = `translateX(-${carouselIdx * cardW}px)`;
  }, [carouselIdx, messages.length]);

  const prev = useCallback(() => setCarouselIdx(i => Math.max(0, i - 1)), []);
  const next = useCallback(() => setCarouselIdx(i => Math.min(maxSlide, i + 1)), [maxSlide]);

  /* ── Image upload preview ──────────────────────────────────── */
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 500 * 1024) {
      setFormError('Photo must be smaller than 500 KB.');
      return;
    }
    setFormPhoto(file);
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (typeof ev.target?.result === 'string') {
        setFormPreview(ev.target.result);
      }
    };
    reader.readAsDataURL(file);
    setFormError('');
  };

  /* ── Submit message ────────────────────────────────────────── */
  const handleSubmit = async () => {
    if (!formName.trim())    { setFormError('Please enter your name.');    return; }
    if (!formMessage.trim()) { setFormError('Please write your message.'); return; }

    setFormStatus('sending');
    setFormError('');

    const result = await submitMemorialMessage({
      name:    formName,
      message: formMessage,
      photo:   formPhoto,
    });

    if (!result.success) {
      setFormStatus('error');
      setFormError(result.error ?? 'Submission failed. Please try again.');
      return;
    }

    setFormStatus('success');
    await loadMessages(); // refetch so new message appears immediately

    setTimeout(() => {
      setShowForm(false);
      setFormName('');
      setFormMessage('');
      setFormPhoto(null);
      setFormPreview(null);
      setFormStatus('idle');
      setFormError('');
    }, 2000);
  };

  /* ── Reset form on close ───────────────────────────────────── */
  const handleCloseForm = () => {
    setShowForm(false);
    setFormName('');
    setFormMessage('');
    setFormPhoto(null);
    setFormPreview(null);
    setFormStatus('idle');
    setFormError('');
  };

  /* ── Stage content ─────────────────────────────────────────── */
  const renderStage = () => {
    switch (activeTab) {
      case 'memorial':
        return (
          <div className="memorial-card">
            <div className="mc-band" />
            <div className="mc-body">
              <div className="mc-eyebrow">
                <Heart size={12} /> In loving memory of
              </div>
              <div className="mc-photo-wrap">
                <img className="mc-photo" src={selectedProfile.image} alt={selectedProfile.name} />
              </div>
              <h2 className="mc-name">{selectedProfile.name}</h2>
              <p className="mc-dates">{selectedProfile.birthDate} — {selectedProfile.deathDate}</p>
              <p className="mc-role">{selectedProfile.role}</p>
              <div className="mc-divider">
                <div className="mc-divider-line" />
                <Cross size={12} />
                <div className="mc-divider-line" />
              </div>
              <p className="mc-quote">{selectedProfile.quote}</p>
            </div>
            <div className="mc-corner"><Feather size={18} /></div>
          </div>
        );

      case 'stories':
        return (
          <div className="stories-panel">
            <div className="stories-img-col">
              <img src={selectedProfile.stories[0]?.image} alt={selectedProfile.name} />
            </div>
            <div className="stories-text-col">
              <h3>{selectedProfile.stories[0]?.title}</h3>
              <p>{selectedProfile.stories[0]?.content}</p>
            </div>
          </div>
        );

      case 'photos':
        return (
          <div className="photos-panel">
            <div className="photos-grid">
              {selectedProfile.photos.map((src, i) => (
                <div key={i} className="photo-item">
                  <img src={src} alt={`Memory ${i + 1}`} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        );

      case 'videos':
        return (
          <div className="videos-panel">
            <div className="videos-grid">
              {selectedProfile.videos.map((v, i) => (
                <div key={i} className="video-item">
                  <div className="video-thumb">
                    <img src={v.thumbnail} alt={v.title} />
                    <div className="video-play-btn"><Play size={22} /></div>
                  </div>
                  <p className="video-label">{v.title}</p>
                </div>
              ))}
            </div>
          </div>
        );

      default: return null;
    }
  };

  const isSending = formStatus === 'sending';

  /* ─── Render ─────────────────────────────────────────────── */
  return (
    <div className="memorial-page">
      <div className="memorial-container">

        {/* Header */}
        <header className="memorial-page-header">
          <h1 className="memorial-page-title">Memorial Tribute</h1>
          <p className="memorial-page-subtitle">
            Honoring the faithful lives of those who served and are now with the Lord.
          </p>
        </header>

        {/* Body */}
        <div className="memorial-body">

          {/* Left — Profile Sidebar */}
          <div className="profile-sidebar">
            {memorialProfiles.map(profile => (
              <div
                key={profile.id}
                className={`profile-item${selectedProfile.id === profile.id ? ' active' : ''}`}
                onClick={() => { setSelectedProfile(profile); setActiveTab('memorial'); }}
              >
                <div className="profile-avatar-ring">
                  <img className="profile-avatar" src={profile.image} alt={profile.name} />
                </div>
                <div className="profile-tooltip">{profile.name}</div>
              </div>
            ))}
          </div>

          {/* Right — Tabs + Stage */}
          <div className="memorial-right-col">
            <nav className="memorial-tabs">
              {tabs.map(({ id, label, Icon }) => (
                <button
                  key={id}
                  className={`memorial-tab-btn${activeTab === id ? ' active' : ''}`}
                  onClick={() => setActiveTab(id)}
                >
                  <Icon size={15} /> {label}
                </button>
              ))}
            </nav>
            <div className="memorial-stage">{renderStage()}</div>
          </div>
        </div>

        {/* ── Message Wall ── */}
        <section className="message-wall-section">
          <h2 className="message-wall-title">Message Wall</h2>

          {/* Loading */}
          {wallLoading && (
            <div className="flex justify-center items-center py-10 gap-2 text-gray-400">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span style={{ fontSize: '0.85rem' }}>Loading messages…</span>
            </div>
          )}

          {/* Empty */}
          {!wallLoading && messages.length === 0 && (
            <div style={{ textAlign: 'center', padding: '2.5rem 1rem', color: '#9ca3af' }}>
              <p style={{ fontSize: '0.95rem' }}>No messages yet.</p>
              <p style={{ fontSize: '0.8rem', marginTop: '0.4rem' }}>
                Be the first to leave a message. 🕊️
              </p>
            </div>
          )}

          {/* Carousel */}
          {!wallLoading && messages.length > 0 && useCarousel && (
            <div className="message-carousel-wrap">
              <button
                className="carousel-nav-btn prev"
                onClick={prev}
                disabled={carouselIdx === 0}
                aria-label="Previous messages"
              >
                <img className="memorial-left-arrow" src="/assets/system/arrow-left.png" alt="prev" />
              </button>

              <div style={{ overflow: 'hidden', margin: '0 1rem' }}>
                <div className="message-track" ref={trackRef}>
                  {messages.map(msg => (
                    <MessageCard
                      key={msg.id}
                      msg={msg}
                      expanded={expandedId === msg.id}
                      onToggle={() => setExpandedId(expandedId === msg.id ? null : msg.id)}
                    />
                  ))}
                </div>
              </div>

              <button
                className="carousel-nav-btn next"
                onClick={next}
                disabled={carouselIdx >= maxSlide}
                aria-label="Next messages"
              >
                <img className="memorial-right-arrow" src="/assets/system/arrow-right.png" alt="next" />
              </button>
            </div>
          )}

          {/* Static grid (≤4 messages) */}
          {!wallLoading && messages.length > 0 && !useCarousel && (
            <div className="message-static-grid">
              {messages.map(msg => (
                <MessageCard
                  key={msg.id}
                  msg={msg}
                  expanded={expandedId === msg.id}
                  onToggle={() => setExpandedId(expandedId === msg.id ? null : msg.id)}
                />
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Floating button */}
      <button
        className="floating-msg-btn"
        onClick={() => setShowForm(true)}
        title="Leave a message"
        aria-label="Leave a message"
      >
        <MessageCircle size={22} />
      </button>

      {/* Message form modal */}
      {showForm && (
        <div
          className="modal-overlay"
          onClick={(e) => e.target === e.currentTarget && handleCloseForm()}
        >
          <div className="modal-box">
            <div className="modal-header">
              <h3 className="modal-title">Leave a Message</h3>
              <button className="modal-close-btn" onClick={handleCloseForm} aria-label="Close">
                <X size={15} />
              </button>
            </div>

            {/* Success */}
            {formStatus === 'success' ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <p style={{ fontSize: '2rem' }}>🕊️</p>
                <p style={{ fontWeight: 600, color: '#374151', marginTop: '0.5rem' }}>
                  Message posted. Thank you.
                </p>
              </div>
            ) : (
              <>
                {/* Photo */}
                <div className="form-group">
                  <label className="form-label">Photo (optional)</label>
                  <div className="image-upload-row">
                    <div className="preview-ring">
                      <img
                        src={formPreview || `${FALLBACK_AVATAR}?`}
                        alt="Preview"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `${FALLBACK_AVATAR}U`;
                        }}
                      />
                    </div>
                    <label className="upload-label">
                      Choose Photo
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={isSending}
                        style={{ display: 'none' }}
                      />
                    </label>
                  </div>
                  <p style={{ fontSize: '0.72rem', color: '#9ca3af', marginTop: '0.25rem' }}>
                    Max 500 KB
                  </p>
                </div>

                {/* Name */}
                <div className="form-group">
                  <label className="form-label">
                    Your Name <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Enter your name"
                    value={formName}
                    onChange={e => setFormName(e.target.value)}
                    disabled={isSending}
                  />
                </div>

                {/* Message */}
                <div className="form-group">
                  <label className="form-label">
                    Your Message <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <textarea
                    className="form-textarea"
                    rows={4}
                    placeholder="Share your memories and thoughts…"
                    value={formMessage}
                    onChange={e => setFormMessage(e.target.value)}
                    disabled={isSending}
                  />
                </div>

                {/* Error */}
                {formError && (
                  <p style={{ fontSize: '0.8rem', color: '#ef4444', marginBottom: '0.5rem' }}>
                    {formError}
                  </p>
                )}

                {/* Actions */}
                <div className="modal-actions">
                  <button className="btn-cancel" onClick={handleCloseForm} disabled={isSending}>
                    Cancel
                  </button>
                  <button
                    className="btn-submit"
                    onClick={handleSubmit}
                    disabled={isSending}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                  >
                    {isSending ? (
                      <><Loader2 size={14} className="animate-spin" /> Posting…</>
                    ) : (
                      'Post Message'
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MemorialTributePage;