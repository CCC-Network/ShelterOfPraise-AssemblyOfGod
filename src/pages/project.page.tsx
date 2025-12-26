import React, { useState } from 'react';
import { ChevronUp, Play, Music, Building, Video, BookOpen, Music2, FileText } from 'lucide-react';

// Import thumbnails
import thumbnailAlay from '../assets/photos/thumbnail-alay.png';
import thumbnailAlab from '../assets/photos/thumbnail-alab.jpg';

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

const ProjectsPage = () => {
  const [activeTab, setActiveTab] = useState('music-videos');
  const [activePopup, setActivePopup] = useState<PopupType>(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videoOverlayStates, setVideoOverlayStates] = useState<{ [key: number]: boolean }>({});

  const togglePopup = (popup: SectionType) => {
    setActivePopup(activePopup === popup ? null : popup);
  };

  const closePopup = () => {
    setActivePopup(null);
  };

  const handleVideoOverlayClick = (videoId: number) => {
    setVideoOverlayStates(prev => ({
      ...prev,
      [videoId]: false
    }));
  };

  const handleVideoSelect = (index: number) => {
    setCurrentVideoIndex(index);
    setActivePopup(null);
  };

  const tabs = [
    { id: 'music-videos', label: 'Music Videos', icon: Music },
    { id: 'church-projects', label: 'Church Projects', icon: Building },
    { id: 'behind-scenes', label: 'Behind the Scenes', icon: Video }
  ];

  const sidebarVideos = [
    {
      id: 1,
      title: "Behind the Scenes: 뛰어(JUMP) Recording",
      description: "Go behind the scenes of our latest worship song recording session. See how our team worked together to create this powerful anthem of faith and hope.",
      thumbnail: "/api/placeholder/120/80",
      type: "behind-scenes"
    },
    {
      id: 2,
      title: "Church Extension Project Update",
      description: "Latest updates on our sanctuary expansion project. See the progress we've made and what's coming next in our building journey.",
      thumbnail: "/api/placeholder/120/80",
      type: "project"
    },
    {
      id: 3,
      title: "Worship Team Practice Sessions",
      description: "Join our worship team during their practice sessions as they prepare for Sunday service and special events.",
      thumbnail: "/api/placeholder/120/80",
      type: "behind-scenes"
    },
    {
      id: 4,
      title: "Community Outreach Program",
      description: "Highlights from our recent community outreach initiatives and how we're serving our local neighborhood.",
      thumbnail: "/api/placeholder/120/80",
      type: "project"
    }
  ];

  const highlightVideos: HighlightVideo[] = [
    {
      id: 1,
      title: "ALAY - Official Music Video",
      artist: "JHERICO BALASA",
      youtubeId: "oJVMKmauUSI",
      thumbnail: thumbnailAlay,
      description: "From the first strum, to the late-night edits, to the tears behind the lyrics—this song has been a journey of pain, healing, and worship. This isn't just a song… it's a prayer. It's a tribute to the brothers we lost. And above all, it's an offering to the One who deserves it all. 🙌",
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
      story: "This song was born during our youth retreat when we were discussing how faith sometimes requires us to 'jump' beyond our comfort zones. The contemporary sound reflects our desire to reach younger generations while maintaining the core message of trust in God. The recording process brought our entire worship team together, creating not just a song, but a testimony of our collective faith journey.",
      isNew: false
    },
    {
      id: 2,
      title: "ALAB - Official Music Video",
      artist: "JHERICO BALASA",
      youtubeId: "6f3yne-cvgg",
      thumbnail: thumbnailAlab,
      description: "A powerful worship anthem that ignites the fire of faith within us. ALAB represents the burning passion we have for worship and our commitment to serving God with all our hearts.",
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
      story: "ALAB was written during a season of spiritual revival in our church. The word 'alab' means 'flame' in Filipino, representing the fire of the Holy Spirit that burns within every believer. This song became an anthem for our youth ministry and has been sung in churches across the Philippines.",
      isNew: true
    }
  ];

  const currentVideo = highlightVideos[currentVideoIndex];
  const showOverlay = videoOverlayStates[currentVideo.id] !== false;

  // Video Card Component
  const VideoCard = ({ video, isActive, onClick }: { video: HighlightVideo, isActive: boolean, onClick: () => void }) => (
    <div 
      className={`p-3 shadow-lg rounded-lg transition-all duration-200 cursor-pointer ${isActive ? 'bg-black text-white' : 'hover:bg-gray-80'}`}
      style={{
        background: isActive ? 'var(--bg-main-box)' : 'transparent',
        color: isActive ? 'var(--color-white)' : 'var(--color-black)',
      }}
      onClick={onClick}
    >
      <div className="w-full h-20 rounded mb-2 flex items-center justify-center relative overflow-hidden">
        <img 
          src={video.thumbnail} 
          alt={video.title}
          loading="lazy" 
          className="w-full h-full object-cover rounded"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">   
          <Play size={16} className="text-white" />
        </div>
        {video.isNew && (
          <div className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
            NEW MV
          </div>
        )}
      </div>
      <div>
        <h4 className="custom-span font-medium line-clamp-2 mb-1 text-xs leading-tight">
          {video.title}
        </h4>
        <p 
          className="video-artist-txt line-clamp-1 text-xs"
          style={{ color: isActive ? 'var(--color-purple-60)' : 'var(--color-black-60)' }}
        >
          {video.artist}
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-main)' }}>
      {/* Header */}
      <div className="border-b" style={{ borderColor: 'var(--color-black-20)' }}>
        <div className="container mx-auto px-4 py-8">
          <h1 className="custom-h1 text-center mb-4">Projects</h1>
          <p className="custom-p text-center" style={{ color: 'var(--color-black-60)' }}>
            <em>Worship Team | Music Publishing</em>
          </p>
          <p className="custom-span text-center mt-2">
            Original music, videos, lyrics, behind the song stories
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Navigation */}
          <div className="lg:col-span-2">
            <div className="custom-box sticky top-6">
              <h3 id="project-categories-hdr" className="custom-h4 mb-4">Project Categories</h3>
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'bg-black text-white shadow-md'
                          : 'hover:bg-gray-100'
                      }`}
                      style={{
                        background: activeTab === tab.id ? 'var(--bg-main-box)' : 'transparent',
                        color: activeTab === tab.id ? 'var(--color-white)' : 'var(--color-black)'
                      }}
                    >
                      <IconComponent size={18} />
                      <span className="custom-span font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Music Videos List */}
              {activeTab === 'music-videos' && (
                <div className="mt-6">
                  <h4 className="custom-h4 mb-3">Music Videos</h4>
                  <div className="space-y-2">
                    {highlightVideos.map((video, index) => (
                      <VideoCard
                        key={video.id}
                        video={video}
                        isActive={currentVideoIndex === index}
                        onClick={() => handleVideoSelect(index)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main Content Area - Centered */}
          <div className="lg:col-span-8">
            {activeTab === 'music-videos' && (
              <div className="space-y-6 relative">
                {/* Featured Video */}
                <div className="custom-box">
                  {/* Large Video Player */}
                  <div className="aspect-video bg-black rounded-lg mb-6 relative overflow-hidden group" style={{ minHeight: 'none' }}>
                    {/* YouTube Embed */}
                    <iframe 
                      key={currentVideo.youtubeId} // Force re-render when video changes
                      width="100%" 
                      height="100%" 
                      src={`https://www.youtube.com/embed/${currentVideo.youtubeId}?enablejsapi=1`}
                      title={currentVideo.title}
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                      referrerPolicy="strict-origin-when-cross-origin" 
                      allowFullScreen
                      className="absolute inset-0 w-full h-full rounded-lg"
                    />
                    
                    {/* New MV Watermark - Only for new videos */}
                    {currentVideo.isNew && (
                      <div 
                        className={`absolute top-4 right-4 z-30 transition-opacity duration-500 ${
                          showOverlay ? 'opacity-100' : 'opacity-0'
                        }`}
                      >
                        <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                          NEW MV
                        </div>
                      </div>
                    )}
                    
                    {/* Overlay Elements - Show/Hide based on state */}
                    {showOverlay && (
                      <>
                        {/* Video Thumbnail */}
                        <img 
                          src={currentVideo.thumbnail} 
                          alt={currentVideo.title}
                          loading="lazy" 
                          className="absolute inset-0 w-full h-full object-cover rounded-lg cursor-pointer z-10"
                          onClick={() => handleVideoOverlayClick(currentVideo.id)}
                        />
                        
                        {/* Play Button Overlay */}
                        <div 
                          className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-opacity-40 transition-all duration-300 cursor-pointer z-20"
                          onClick={() => handleVideoOverlayClick(currentVideo.id)}
                        >
                          <div className="bg-white/25 rounded-full p-6 group-hover:scale-110 transition-transform duration-300">
                            <Play size={48} className="text-black ml-1" />
                          </div>
                        </div>
                        
                        {/* Video Title Overlay */}
                        <div className="absolute bottom-4 left-4 right-4 z-30">
                          <div className="bg-black/30 rounded-lg p-4">
                            <h3 className="text-white text-xl font-bold mb-1">{currentVideo.title}</h3>
                            <p className="text-white opacity-80 text-sm">{currentVideo.artist}</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Video Info */}
                  <div className="mb-6">
                    <h2 className="custom-h2 mb-2">{currentVideo.title}</h2>
                    <p className="custom-span" style={{ color: 'var(--color-black-60)' }}>
                      {currentVideo.artist}
                    </p>
                    {currentVideo.isNew && (
                      <span className="inline-block bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold mt-2">
                        NEW RELEASE
                      </span>
                    )}
                  </div>

                  {/* Action Buttons - Horizontal Layout */}
                  <div className="flex flex-wrap gap-3 justify-center">
                    <button
                      onClick={() => togglePopup('description')}
                      className="flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-200 hover:scale-105 flex-1 min-w-0 justify-center sm:flex-initial sm:min-w-[140px]"
                      style={{
                        background: activePopup === 'description' ? 'var(--color-black-90)' : 'var(--bg-main-box)',
                        color: activePopup === 'description' ? 'var(--color-white)' : 'var(--color-black)'
                      }}
                    >
                      <FileText size={20} />
                      <span className="custom-span font-medium">Description</span>
                    </button>
                    
                    <button
                      onClick={() => togglePopup('lyrics')}
                      className="flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-200 hover:scale-105 flex-1 min-w-0 justify-center sm:flex-initial sm:min-w-[140px]"
                      style={{
                        background: activePopup === 'lyrics' ? 'var(--color-black-90)' : 'var(--bg-main-box)',
                        color: activePopup === 'lyrics' ? 'var(--color-white)' : 'var(--color-black)'
                      }}
                    >
                      <Music2 size={20} />
                      <span className="custom-span font-medium">Lyrics</span>
                    </button>
                    
                    <button
                      onClick={() => togglePopup('story')}
                      className="flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-200 hover:scale-105 flex-1 min-w-0 justify-center sm:flex-initial sm:min-w-[140px]"
                      style={{
                        background: activePopup === 'story' ? 'var(--color-black-90)' : 'var(--bg-main-box)',
                        color: activePopup === 'story' ? 'var(--color-white)' : 'var(--color-black)'
                      }}
                    >
                      <BookOpen size={20} />
                      <span className="custom-span font-medium">Story</span>
                    </button>
                  </div>
                </div>

                {/* Popup Modal */}
                {activePopup && (
                  <>
                    {/* Overlay */}
                    <div 
                      className="bg-cover-popup fixed inset-0 bg-black bg-opacity-50 z-40"
                      onClick={closePopup}
                    ></div>
                    
                    {/* Popup Content */}
                    <div className="fixed inset-4 lg:inset-20 z-50 flex items-center justify-center">
                      <div 
                        className="custom-box max-w-4xl w-full max-h-full overflow-y-auto"
                        style={{ background: 'var(--bg-main)' }}
                      >
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="custom-h3">
                            {activePopup === 'description' && 'Description'}
                            {activePopup === 'lyrics' && 'Lyrics'}
                            {activePopup === 'story' && 'Behind the Song'}
                          </h3>
                          <button
                            onClick={closePopup}
                            className="close-button p-2 rounded-full hover:bg-gray-100 transition-colors"
                          >
                            <ChevronUp size={24} style={{ transform: 'rotate(45deg)' }} />
                          </button>
                        </div>

                        <div className="space-y-4">
                          {activePopup === 'description' && (
                            <p className="custom-p" style={{ color: 'var(--color-black-80)' }}>
                              {currentVideo.description}
                            </p>
                          )}

                          {activePopup === 'lyrics' && (
                            <pre className="custom-p whitespace-pre-line" style={{ color: 'var(--color-black-80)' }}>
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
                    </div>
                  </>
                )}
              </div>
            )}

            {activeTab === 'church-projects' && (
              <div className="custom-box">
                <h2 className="custom-h2 mb-4">Church Infrastructure Projects</h2>
                <p className="custom-p" style={{ color: 'var(--color-black-60)' }}>
                  Information about our building extensions and infrastructure improvements will be available soon.
                </p>
              </div>
            )}

            {activeTab === 'behind-scenes' && (
              <div className="custom-box">
                <h2 className="custom-h2 mb-4">Behind the Scenes</h2>
                <p className="custom-p" style={{ color: 'var(--color-black-60)' }}>
                  Exclusive behind-the-scenes content from our music production and worship team activities.
                </p>
              </div>
            )}
          </div>

          {/* Right Sidebar - Related Videos */}
          <div className="lg:col-span-2">
            <div className="custom-box sticky top-6">
              <h3 id="related-content-hdr" className="custom-h4 mb-4">Related Content</h3>
              <div className="space-y-4">
                {sidebarVideos.map((video) => (
                  <div key={video.id} className="p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="w-full h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded mb-2 flex items-center justify-center">
                      <Play size={16} style={{ color: 'var(--color-black-60)' }} />
                    </div>
                    <div>
                      <h4 className="custom-span font-medium line-clamp-2 mb-1 text-xs leading-tight">
                        {video.title}
                      </h4>
                      <p 
                        className="custom-caption line-clamp-1 text-xs"
                        style={{ color: 'var(--color-black-60)' }}
                      >
                        {video.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;