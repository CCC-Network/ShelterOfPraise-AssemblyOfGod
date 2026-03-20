import { useState } from 'react';
import { ChevronUp, Play, Music, Building, Video, BookOpen, Music2, FileText } from 'lucide-react';

// Import thumbnails
import thumbnailAlay from '../assets/photos/thumbnail-alay.png';
import thumbnailAlab from '../assets/photos/thumbnail-alab.jpg';

// Import page styles
import '../styles/project.page.css';

/* ─── Types ─────────────────────────────────────────── */
type PopupType = 'description' | 'lyrics' | 'story' | null;
type SectionType = 'description' | 'lyrics' | 'story';

interface HighlightVideo {
  id: number;
  title: string;
  artist: string;
  youtubeId: string;
  thumbnail: string;
  description: string;
  lyrics: string;
  story: string;
  isNew?: boolean;
}

interface SidebarVideo {
  id: number;
  title: string;
  description: string;
  type: string;
}

/* ─── Data ───────────────────────────────────────────── */
const tabs = [
  { id: 'music-videos',    label: 'Music Videos',       icon: Music    },
  { id: 'church-projects', label: 'Church Projects',    icon: Building },
  { id: 'behind-scenes',   label: 'Behind the Scenes',  icon: Video    },
];

const highlightVideos: HighlightVideo[] = [
  {
    id: 1,
    title: 'ALAY - Official Music Video',
    artist: 'JHERICO BALASA',
    youtubeId: 'oJVMKmauUSI',
    thumbnail: thumbnailAlay,
    description:
      "From the first strum, to the late-night edits, to the tears behind the lyrics—this song has been a journey of pain, healing, and worship. This isn't just a song… it's a prayer. It's a tribute to the brothers we lost. And above all, it's an offering to the One who deserves it all. 🙌",
    lyrics: `[VERSE 1]

Ikaw ang pahinga
Sa presensya mo Hesus
Lahat ay titila

[VERSE 2]
Oh ikaw ang pag-asa
Lahat ay posible
pag kasama ka

[CHORUS]
Di ka Tatalikod
Di ka hihinto
Di ka magbabago
magunaw man ang mundo ko
ikaw ang tanging alab sa buhay ko

[VERSE 3]
ikaw ang buhay ko
akoy iyong likha kaya akoy sayo
Ikaw ang Awit ko
kahulugan ng liriko

Cho: 
Di ka Tatalikod
Di ka hihinto
Di ka magbabago
magunaw man ang mundo ko
ikaw ang tanging alab sa buhay ko

[BRIDGE]

Kaya di na mangangamba kailanman- 
pagka't ikaw ang kasama ngayunpaman

Kaya di na mangangamba kailanman- 
pagka't ikaw ang kasama ngayunpaman

Cho:

Refrain: 
Ang Alab ikaw ang tanging alab- back
Ang Alab ikaw ang tanging alab- chin
Ang Alab ikaw ang tanging alab- nikko
Ang alab ikaw- front`,
    story:
      'This song was born during our youth retreat when we were discussing how faith sometimes requires us to "jump" beyond our comfort zones. The contemporary sound reflects our desire to reach younger generations while maintaining the core message of trust in God. The recording process brought our entire worship team together, creating not just a song, but a testimony of our collective faith journey.',
    isNew: false,
  },
  {
    id: 2,
    title: 'ALAB - Official Music Video',
    artist: 'JHERICO BALASA',
    youtubeId: '6f3yne-cvgg',
    thumbnail: thumbnailAlab,
    description:
      'A powerful worship anthem that ignites the fire of faith within us. ALAB represents the burning passion we have for worship and our commitment to serving God with all our hearts.',
    lyrics: `Ang yong pangalan
saki'y nananahan
Di kakalimutan
kabutihan mong walang hanggan

Di bibitawan
salita moy sandigan
aking kakapitan
habambuhay ay tatandaan

Cho:
Ang pag ibig mo- kailanma'y di lilisan, 
di kayang iwasan, 
puso'y sigaw ay ikaw at ikaw
pangako mo'y panghahawakan, 
aking ipaglalaban
habangbuhay, puso ma'y alay

Sa bawat oras
Na lumilipas
sakripisyo mo'y lunas, 
sa kasalanan ko syang nagwakas

Kaya lagi't lagi
ibibigay ang sarili
Maubos man ay di sapat 
Habag moy higit pa sa sapat


Bridge:
Payapa sa gulo ang boses mo
Liwanag sa dilim ang presensya mo
Lunas sa hapdi ang haplos mo
Init sa lamig ang yakap mo

di batid ang lawak, di batid ang lalim
ng pag ibig mo`,
    story:
      "ALAB was written during a season of spiritual revival in our church. The word 'alab' means 'flame' in Filipino, representing the fire of the Holy Spirit that burns within every believer. This song became an anthem for our youth ministry and has been sung in churches across the Philippines.",
    isNew: true,
  },
];

const sidebarVideos: SidebarVideo[] = [
  {
    id: 1,
    title: 'Behind the Scenes: 뛰어(JUMP) Recording',
    description:
      'Go behind the scenes of our latest worship song recording session.',
    type: 'behind-scenes',
  },
  {
    id: 2,
    title: 'Church Extension Project Update',
    description:
      'Latest updates on our sanctuary expansion project and whats coming next.',
    type: 'project',
  },
  {
    id: 3,
    title: 'Worship Team Practice Sessions',
    description:
      'Join our worship team during their practice sessions for Sunday service.',
    type: 'behind-scenes',
  },
  {
    id: 4,
    title: 'Community Outreach Program',
    description:
      'Highlights from our recent community outreach initiatives.',
    type: 'project',
  },
];

/* ─── Sub-components ─────────────────────────────────── */

/** Thumbnail card in the playlist strip */
const PlaylistCard = ({
  video,
  isActive,
  onClick,
}: {
  video: HighlightVideo;
  isActive: boolean;
  onClick: () => void;
}) => (
  <div
    className={`playlist-card${isActive ? ' active' : ''}`}
    onClick={onClick}
  >
    <div className="playlist-thumb">
      <img src={video.thumbnail} alt={video.title} loading="lazy" />
      <div className="playlist-thumb-dim">
        <Play size={14} color="#fff" />
      </div>
      {video.isNew && <span className="playlist-badge">NEW MV</span>}
    </div>
    <p className="playlist-title">{video.title}</p>
    <p className="video-artist-txt">{video.artist}</p>
  </div>
);

/* ─── Main Page ──────────────────────────────────────── */
const ProjectsPage = () => {
  const [activeTab, setActiveTab]               = useState('music-videos');
  const [activePopup, setActivePopup]           = useState<PopupType>(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [overlayVisible, setOverlayVisible]     = useState<Record<number, boolean>>({});

  const currentVideo = highlightVideos[currentVideoIndex];
  const showOverlay  = overlayVisible[currentVideo.id] !== false;

  const togglePopup = (section: SectionType) =>
    setActivePopup(prev => (prev === section ? null : section));

  const closePopup = () => setActivePopup(null);

  const handlePlay = (id: number) =>
    setOverlayVisible(prev => ({ ...prev, [id]: false }));

  const handleVideoSelect = (index: number) => {
    setCurrentVideoIndex(index);
    setActivePopup(null);
  };

  /* ─ render ─ */
  return (
    <div className="projects-page">

      {/* ── Page Header ── */}
      <div className="projects-header">
        <h1 className="custom-h1">Projects</h1>
        <p className="custom-p" style={{ color: 'var(--color-black-60)', marginTop: '0.25rem' }}>
          <em>Worship Team | Music Publishing</em>
        </p>
        <p className="custom-span" style={{ marginTop: '0.5rem' }}>
          Original music, videos, lyrics, behind the song stories
        </p>
      </div>

      {/* ── Tab Bar ── */}
      <div className="projects-tab-bar">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            className={`projects-tab-btn${activeTab === id ? ' active' : ''}`}
            onClick={() => setActiveTab(id)}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </div>

      {/* ── Body ── */}
      <div className="projects-body">

        {/* ── Main Column ── */}
        <div className="projects-main">

          {/* Music Videos tab content */}
          {activeTab === 'music-videos' && (
            <>
              {/* Video Stage */}
              <div className="video-stage custom-box">
                <div className="video-stage-player">
                  <iframe
                    key={currentVideo.youtubeId}
                    src={`https://www.youtube.com/embed/${currentVideo.youtubeId}?enablejsapi=1`}
                    title={currentVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />

                  {currentVideo.isNew && !showOverlay && (
                    <span className="new-mv-badge">NEW MV</span>
                  )}

                  {showOverlay && (
                    <div className="video-overlay" onClick={() => handlePlay(currentVideo.id)}>
                      <img src={currentVideo.thumbnail} alt={currentVideo.title} loading="lazy" />
                      {currentVideo.isNew && <span className="new-mv-badge">NEW MV</span>}
                      <div className="video-overlay-dim">
                        <div id="play-container-toggle" className="video-play-btn">
                          <Play size={44} color="#fff" style={{ marginLeft: 3 }} />
                        </div>
                      </div>
                      <div className="video-title-overlay">
                        <div className="video-title-overlay-inner">
                          <h3>{currentVideo.title}</h3>
                          <p>{currentVideo.artist}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Video meta */}
                <div className="video-meta">
                  <h2 className="custom-h2">{currentVideo.title}</h2>
                  <p className="custom-span" style={{ color: 'var(--color-black-60)' }}>
                    {currentVideo.artist}
                  </p>
                  {currentVideo.isNew && (
                    <span className="new-release-badge">NEW RELEASE</span>
                  )}
                </div>

                {/* Action buttons */}
                <div className="video-action-btns">
                  {(
                    [
                      { key: 'description', label: 'Description', Icon: FileText },
                      { key: 'lyrics',      label: 'Lyrics',      Icon: Music2  },
                      { key: 'story',       label: 'Story',       Icon: BookOpen },
                    ] as const
                  ).map(({ key, label, Icon }) => (
                    <button
                      key={key}
                      className={`video-action-btn${activePopup === key ? ' active' : ''}`}
                      onClick={() => togglePopup(key)}
                    >
                      <Icon size={18} />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Playlist Strip */}
              <div className="projects-playlist custom-box">
                <h4 id="project-categories-hdr">Music Videos</h4>
                <div className="playlist-items">
                  {highlightVideos.map((v, i) => (
                    <PlaylistCard
                      key={v.id}
                      video={v}
                      isActive={currentVideoIndex === i}
                      onClick={() => handleVideoSelect(i)}
                    />
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === 'church-projects' && (
            <div className="custom-box tab-placeholder">
              <h2 className="custom-h2">Church Infrastructure Projects</h2>
              <p className="custom-p" style={{ color: 'var(--color-black-60)', marginTop: '0.5rem' }}>
                Information about our building extensions and infrastructure improvements will be available soon.
              </p>
            </div>
          )}

          {activeTab === 'behind-scenes' && (
            <div className="custom-box tab-placeholder">
              <h2 className="custom-h2">Behind the Scenes</h2>
              <p className="custom-p" style={{ color: 'var(--color-black-60)', marginTop: '0.5rem' }}>
                Exclusive behind-the-scenes content from our music production and worship team activities.
              </p>
            </div>
          )}
        </div>

        {/* ── Right Sidebar — always visible ── */}
        <aside className="projects-sidebar">
          <div className="custom-box related-content-box">
            <h3 id="related-content-hdr">Related Content</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {sidebarVideos.map(video => (
                <div key={video.id} className="related-item">
                  <div className="related-thumb">
                    <Play size={14} color="var(--color-black-60)" />
                  </div>
                  <p className="related-title">{video.title}</p>
                  <p className="related-desc">{video.description}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* ── Popup Modal ── */}
      {activePopup && (
        <>
          <div className="bg-cover-popup" onClick={closePopup} />
          <div className="popup-modal-wrap">
            <div className="popup-modal">
              <div className="popup-header">
                <h3 className="custom-h3">
                  {activePopup === 'description' && 'Description'}
                  {activePopup === 'lyrics'      && 'Lyrics'}
                  {activePopup === 'story'       && 'Behind the Song'}
                </h3>
                <button className="close-button" onClick={closePopup} aria-label="Close">
                  {/*<ChevronUp size={18} style={{ transform: 'rotate(45deg)' }} />*/}
                  <img className="closeThisComponents" src="/assets/system/close.png"/>
                </button>
              </div>

              {activePopup === 'description' && (
                <p className="custom-p" style={{ color: 'var(--color-black-80)' }}>
                  {currentVideo.description}
                </p>
              )}
              {activePopup === 'lyrics' && (
                <pre className="custom-p" style={{ color: 'var(--color-black-80)', whiteSpace: 'pre-line' }}>
                  {currentVideo.lyrics}
                </pre>
              )}
              {activePopup === 'story' && (
                <p className="custom-p" style={{ color: 'var(--color-black-80)' }}>
                  {currentVideo.story}
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectsPage;