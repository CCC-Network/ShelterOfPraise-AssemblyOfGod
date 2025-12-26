import React, { useState } from 'react';
import { ChevronUp, Play, Music, Building, Video, BookOpen, Music2, FileText } from 'lucide-react';

import thumbnailAlay from '../assets/photos/thumbnail-alay.png';

type PopupType = 'description' | 'lyrics' | 'story' | null;
type SectionType = 'description' | 'lyrics' | 'story';

const ProjectsPage = () => {
  const [activeTab, setActiveTab] = useState('music-videos');
  const [activePopup, setActivePopup] = useState<PopupType>(null);
  const [showVideoOverlay, setShowVideoOverlay] = useState(true);

  const togglePopup = (popup: SectionType) => {
    setActivePopup(activePopup === popup ? null : popup);
  };

  const closePopup = () => {
    setActivePopup(null);
  };

  const handleVideoOverlayClick = () => {
    setShowVideoOverlay(false);
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

  const highlightVideo = [
    {
    id: 1,
    title: "ALAY - Official Music Video",
    artist: "JHERICO BALASA",
    youtubeId: "oJVMKmauUSI", // Replace with actual YouTube video ID
    description: "From the first strum, to the late-night edits, to the tears behind the lyrics—this song has been a journey of pain, healing, and worship. This isn’t just a song… it’s a prayer. It’s a tribute to the brothers we lost. And above all, it’s an offering to the One who deserves it all. 🙌",
    lyrics: `Verse 1:
When the world feels heavy on my shoulders
And the path ahead seems unclear
I remember what You've promised
That You're always drawing near

Chorus:
So I jump, jump, jump into Your arms
Jump, jump, jump beyond my fears
With faith that moves the mountains
I jump into Your love that never disappears

Verse 2:
Every step becomes a leap of worship
Every breath becomes a song of praise
In the rhythm of Your heartbeat
I find strength for all my days`,
    story: "This song was born during our youth retreat when we were discussing how faith sometimes requires us to 'jump' beyond our comfort zones. The contemporary sound reflects our desire to reach younger generations while maintaining the core message of trust in God. The recording process brought our entire worship team together, creating not just a song, but a testimony of our collective faith journey."
  },
  {
    id: 2,
    title: "ALAB - Official Music Video",
    artist: "JHERICO BALASA",
    youtubeId: "6f3yne-cvgg",
    description: "",
    lyrics: "",
    story: ""
  }
];

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
              <h3 className="custom-h4 mb-4">Project Categories</h3>
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
                        background: activeTab === tab.id ? 'var(--color-black-90)' : 'transparent',
                        color: activeTab === tab.id ? 'var(--color-white)' : 'var(--color-black)'
                      }}
                    >
                      <IconComponent size={18} />
                      <span className="custom-span font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content Area - Centered */}
          <div className="lg:col-span-8">
            {activeTab === 'music-videos' && (
              <div className="space-y-6 relative">
                {/* Featured Video */}
                <div className="custom-box">
                  {/* Large Video Player */}
                  <div id="bg-cover-bg" className="aspect-video bg-black rounded-lg mb-6 relative overflow-hidden group" style={{ minHeight: '500px' }}>
                    {/* YouTube Embed */}
                    <iframe 
                      width="100%" 
                      height="100%" 
                      src="https://www.youtube.com/embed/oJVMKmauUSI" 
                      title="ALAY (Music Video)" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                      referrerPolicy="strict-origin-when-cross-origin" 
                      allowFullScreen
                      className="absolute inset-0 w-full h-full rounded-lg"
                    />
                    
                    {/* Overlay Elements - Show/Hide based on state */}
                    {showVideoOverlay && (
                      <>
                        {/* Video Thumbnail | https://iili.io/K9YgG1e.png */}
                        <img  
                          src={thumbnailAlay} 
                          alt="ALAY - Official Music Video"
                          loading="lazy" className="absolute inset-0 w-full h-full object-cover rounded-lg cursor-pointer z-10"
                          onClick={handleVideoOverlayClick}
                        />
                        
                        {/* Play Button Overlay */}
                        <div id="play-button-overlay-g" 
                          className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center group-hover:bg-opacity-40 transition-all duration-300 cursor-pointer z-20"
                          onClick={handleVideoOverlayClick}
                        >
                          <div className="bg-white bg-opacity-90 rounded-full p-6 group-hover:scale-110 transition-transform duration-300">
                            <Play size={48} className="text-black ml-1" />
                          </div>
                        </div>
                        
                        {/* Video Title Overlay */}
                        <div className="absolute bottom-4 left-4 right-4 z-30">
                          <div className="bg-black bg-opacity-70 rounded-lg p-4">
                            <h3 className="text-white text-xl font-bold mb-1">ALAY - Official Music Video</h3>
                            <p className="text-white opacity-80 text-sm">JHERICO BALASA</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Video Info */}
                  <div className="mb-6">
                    <h2 className="custom-h2 mb-2">{highlightVideo.title}</h2>
                    <p className="custom-span" style={{ color: 'var(--color-black-60)' }}>
                      {highlightVideo.artist}
                    </p>
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
                      className="fixed inset-0 bg-black bg-opacity-50 z-40"
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
                            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                          >
                            <ChevronUp size={24} style={{ transform: 'rotate(45deg)' }} />
                          </button>
                        </div>

                        <div className="space-y-4">
                          {activePopup === 'description' && (
                            <p className="custom-p" style={{ color: 'var(--color-black-80)' }}>
                              {highlightVideo.description}
                            </p>
                          )}

                          {activePopup === 'lyrics' && (
                            <pre className="custom-p whitespace-pre-line" style={{ color: 'var(--color-black-80)' }}>
                              {highlightVideo.lyrics}
                            </pre>
                          )}

                          {activePopup === 'story' && (
                            <p className="custom-p" style={{ color: 'var(--color-black-80)' }}>
                              {highlightVideo.story}
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
              <h3 className="custom-h4 mb-4">Related Content</h3>
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