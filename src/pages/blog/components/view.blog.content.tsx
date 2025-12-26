import { X, Facebook, Twitter, Instagram, Share2, Clock, Calendar, Eye } from 'lucide-react';

interface BlogContentProps {
  isOpen: boolean;
  onClose: () => void;
  content: {
    id?: number;
    title: string;
    author: string;
    date: string;
    readTime?: string;
    verse?: string;
    verseReference?: string;
    image?: string;
    fullContent?: string;
    description?: string;
    prayer?: string;
    category?: string;
  };
  upcomingContent?: Array<{
    id: number;
    title: string;
    date: string;
    readTime: string;
  }>;
  topStories?: Array<{
    id: number;
    image: string;
    title: string;
    author: string;
    views: string;
    daysAgo: string;
  }>;
}

const ViewBlogContent = ({ 
  isOpen, 
  onClose, 
  content, 
  upcomingContent = [],
  topStories = []
}: BlogContentProps) => {
  if (!isOpen) return null;

  const handleShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(content.title);
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      instagram: `https://www.instagram.com/`,
      threads: `https://www.threads.net/intent/post?text=${text}%20${url}`
    };

    if (platform === 'instagram') {
      alert('Please share this content by copying the URL and posting to Instagram.');
    } else {
      window.open(shareUrls[platform as keyof typeof shareUrls], '_blank', 'width=600,height=400');
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white w-full max-w-6xl h-[90vh] rounded-2xl shadow-2xl relative animate-fadeIn flex flex-col overflow-hidden">
        {/* Close button - Fixed position */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 p-2 rounded-full bg-white/90 hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl group"
          aria-label="Close"
        >
          <X className="w-6 h-6 text-gray-700 group-hover:text-gray-900 transition-colors" />
        </button>

        {/* Scrollable Content Container */}
        <div className="flex-1 overflow-y-auto">
          {/* Main Content Container */}
          <div className="grid lg:grid-cols-3 gap-8 p-8 lg:p-12">
            {/* Left Side - Main Reading Area (2 columns) - SCROLLABLE */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header Section */}
              <div className="space-y-4">
                {content.category && (
                  <span className="inline-block bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold">
                    {content.category}
                  </span>
                )}
                
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
                  {content.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 text-gray-600 text-base">
                  <span className="font-semibold text-gray-800">{content.author}</span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {content.date}
                  </span>
                  {content.readTime && (
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      {content.readTime}
                    </span>
                  )}
                </div>
              </div>

              {/* Bible Verse - Featured Quote */}
              {content.verse && (
                <div className="relative">
                  <div className="absolute -left-4 top-0 text-6xl text-blue-200 font-serif leading-none">"</div>
                  <blockquote className="relative bg-gradient-to-br from-blue-50 to-indigo-50 border-l-4 border-blue-600 pl-8 pr-6 py-6 rounded-r-xl">
                    <p className="text-xl md:text-2xl italic text-gray-800 leading-relaxed font-serif mb-4">
                      {content.verse}
                    </p>
                    {content.verseReference && (
                      <footer className="flex items-center gap-2">
                        <div className="h-px flex-grow bg-blue-300"></div>
                        <cite className="not-italic font-bold text-blue-900 text-lg tracking-wide">
                          {content.verseReference}
                        </cite>
                      </footer>
                    )}
                  </blockquote>
                </div>
              )}

              {/* Article Content */}
              <div className="prose prose-lg max-w-none">
                <div className="text-gray-700 leading-relaxed space-y-6">
                  {content.description && (
                    <p className="text-lg md:text-xl leading-loose font-medium text-gray-800">
                      {content.description}
                    </p>
                  )}
                  {content.fullContent?.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} className="text-base md:text-lg leading-loose text-justify">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Share Buttons */}
              <div className="pt-8 border-t-2 border-gray-200">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="text-gray-700 font-semibold text-lg">Share this article:</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleShare('facebook')}
                      className="group p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-200 hover:scale-110 shadow-md hover:shadow-lg"
                      title="Share on Facebook"
                      aria-label="Share on Facebook"
                    >
                      <Facebook className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleShare('twitter')}
                      className="group p-3 bg-black text-white rounded-full hover:bg-gray-800 transition-all duration-200 hover:scale-110 shadow-md hover:shadow-lg"
                      title="Share on X (Twitter)"
                      aria-label="Share on X"
                    >
                      <Twitter className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleShare('instagram')}
                      className="group p-3 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white rounded-full hover:opacity-90 transition-all duration-200 hover:scale-110 shadow-md hover:shadow-lg"
                      title="Share on Instagram"
                      aria-label="Share on Instagram"
                    >
                      <Instagram className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleShare('threads')}
                      className="group p-3 bg-gray-800 text-white rounded-full hover:bg-gray-900 transition-all duration-200 hover:scale-110 shadow-md hover:shadow-lg"
                      title="Share on Threads"
                      aria-label="Share on Threads"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Sidebar (1 column) - FIXED/STICKY */}
            <div className="space-y-6">
              <div className="lg:sticky lg:top-8 space-y-6">
                {/* Cover Image - FIXED SIZE */}
                {content.image && (
                  <div className="rounded-xl overflow-hidden shadow-xl border-4 border-white ring-2 ring-gray-200">
                    <img 
                      src={content.image} 
                      alt={content.title} 
                      className="w-full h-64 object-cover"
                    />
                  </div>
                )}

                {/* Reflection Verse Card - FIXED */}
                {content.verse && (
                  <div className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-xl p-6 shadow-md border border-gray-200">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl">📖</span>
                      <h4 className="font-bold text-gray-800 text-lg">Today's Verse</h4>
                    </div>
                    <p className="text-sm italic text-gray-700 leading-relaxed mb-3">
                      "{content.verse}"
                    </p>
                    <p className="text-sm font-bold text-gray-900 tracking-wide">
                      — {content.verseReference}
                    </p>
                  </div>
                )}

                {/* Prayer Section - FIXED */}
                {content.prayer && (
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border-l-4 border-amber-500 shadow-md">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-2xl">🙏</span>
                      <h3 className="text-xl font-bold text-gray-800">Prayer</h3>
                    </div>
                    <p className="text-gray-700 italic leading-relaxed text-base">
                      {content.prayer}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Top Stories Section */}
          {topStories.length > 0 && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-t-2 border-gray-200 px-8 lg:px-12 py-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">🔥</span>
                <h3 className="text-2xl font-bold text-gray-800">Top Stories</h3>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {topStories.map((story) => (
                  <div
                    key={story.id}
                    className="group bg-white hover:bg-blue-50 rounded-xl overflow-hidden border-2 border-gray-200 hover:border-blue-400 cursor-pointer transition-all duration-200 hover:shadow-xl hover:-translate-y-1"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <img 
                        src={story.image} 
                        alt={story.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-gray-800 group-hover:text-blue-700 mb-3 line-clamp-2 leading-snug">
                        {story.title}
                      </h4>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span className="font-medium">{story.author}</span>
                        <div className="flex items-center gap-2">
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {story.views}
                          </span>
                          <span>•</span>
                          <span>{story.daysAgo}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upcoming & Featured Reads Section */}
          {upcomingContent.length > 0 && (
            <div className="bg-gradient-to-r from-gray-50 to-slate-50 border-t-2 border-gray-200 px-8 lg:px-12 py-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">📅</span>
                <h3 className="text-2xl font-bold text-gray-800">Upcoming & Featured Reads</h3>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {upcomingContent.map((item) => (
                  <div
                    key={item.id}
                    className="group bg-white hover:bg-blue-50 p-5 rounded-xl border-2 border-gray-200 hover:border-blue-400 cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
                  >
                    <h4 className="font-semibold text-gray-800 group-hover:text-blue-700 mb-3 line-clamp-2 leading-snug">
                      {item.title}
                    </h4>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {item.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {item.readTime}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        /* Custom scrollbar styling */
        .overflow-y-auto::-webkit-scrollbar {
          width: 8px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
};

export default ViewBlogContent;