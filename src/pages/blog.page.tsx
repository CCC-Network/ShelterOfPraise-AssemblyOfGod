import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal, Clock, Eye, Calendar } from 'lucide-react';

import { answersContent } from './blog/answer.blog';
import { devotionalContent } from './blog/devotional.blog';
import { sermonsContent } from './blog/sermon.blog';
import { newsContent } from './blog/news.blog';
import { informationalContent } from './blog/informational.blog';
import { communityContent } from './blog/community.blog';

import ViewBlogContent from './blog/components/view.blog.content';

const BlogPage = () => {
  const [activeTab, setActiveTab] = useState('answers');
  const [selectedContent, setSelectedContent] = useState<any | null>(null);
  const [topStoriesIndex, setTopStoriesIndex] = useState(0);
  const [latestStoriesIndex, setLatestStoriesIndex] = useState(0);
  
  const tabs = [
    { id: 'answers', label: 'Answers', path: '/blog/answers' },
    { id: 'devotional', label: 'Daily Devotional', path: '/blog/devotional' },
    { id: 'sermons', label: 'Sermons', path: '/blog/sermons' },
    { id: 'news', label: 'News', path: '/blog/news' },
    { id: 'informational', label: 'Informational', path: '/blog/informational' },
    { id: 'community', label: 'Community-oriented', path: '/blog/community' }
  ];

  // Only one useEffect for URL handling
  useEffect(() => {
    const path = window.location.pathname;
    const tabId = path.split('/').pop();
    if (tabId && tabs.find(t => t.id === tabId)) {
      setActiveTab(tabId);
    }
  }, []);
  
  const handleTabClick = (tabId: string, path: string) => {
    setActiveTab(tabId);
    window.history.pushState({}, '', path);
  };

  const contentByTab = {
    answers: answersContent,
    devotional: devotionalContent,
    sermons: sermonsContent,
    news: newsContent,
    informational: informationalContent,
    community: communityContent
  };

  // Get current content based on active tab
  const currentContent = contentByTab[activeTab as keyof typeof contentByTab];

  // Extract the arrays from current content
  const mainContent = currentContent?.mainContent || [];
  const topStories = currentContent?.topStories || [];
  const latestStories = currentContent?.latestStories || [];
  const sidebarQueue = currentContent?.sidebarQueue || currentContent?.upcomingContent || [];

  const handleTopStoriesNext = () => {
    if (topStories.length > 0) {
      setTopStoriesIndex((prev) => (prev + 1) % topStories.length);
    }
  };

  const handleTopStoriesPrev = () => {
    if (topStories.length > 0) {
      setTopStoriesIndex((prev) => (prev - 1 + topStories.length) % topStories.length);
    }
  };

  const handleLatestStoriesNext = () => {
    if (latestStories.length > 0) {
      setLatestStoriesIndex((prev) => (prev + 1) % latestStories.length);
    }
  };

  const handleLatestStoriesPrev = () => {
    if (latestStories.length > 0) {
      setLatestStoriesIndex((prev) => (prev - 1 + latestStories.length) % latestStories.length);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">Church Blog</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Mini Tabs */}
          <aside className="lg:col-span-2 space-y-2">
            <div className="bg-white rounded-lg shadow-md p-4 sticky top-4">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">Categories</h2>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id, tab.path)}
                  className={`w-full text-left px-4 py-3 rounded-lg mb-2 transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </aside>

          {/* Main Content - Center */}
          <main className="lg:col-span-7 space-y-6">
            {mainContent.length > 0 ? (
              mainContent.map((content: any) => (
                <article key={content.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="grid md:grid-cols-2 gap-0">
                    {/* Left Layout */}
                    <div className="relative h-64 md:h-auto">
                      <img 
                        src={content.image} 
                        alt={content.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                          {content.category}
                        </span>
                      </div>
                    </div>
                    
                    {/* Right Layout */}
                    <div className="p-6 flex flex-col justify-between">
                      <div>
                        <h3 
                          className="text-2xl font-bold text-gray-800 mb-3 hover:text-blue-600 cursor-pointer transition-colors" 
                          onClick={() => setSelectedContent(content)}
                        >
                          {content.title}
                        </h3>
                        <p id="description-layout" className="text-gray-600 mb-4 line-clamp-3">
                          {content.description}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-200">
                        <div className="flex items-center space-x-4">
                          <span className="font-medium text-gray-700">{content.author}</span>
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {content.date}
                          </span>
                        </div>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {content.readTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-8 text-center text-gray-500">
                No content available for this category.
              </div>
            )}
          </main>

          {/* Right Sidebar - Queue */}
          <aside className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-6 text-gray-800">Up Next</h2>
              <div className="space-y-4">
                {sidebarQueue.length > 0 ? (
                  sidebarQueue.map((item: any) => (
                    <div 
                      key={item.id} 
                      className="pb-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 p-2 rounded-lg cursor-pointer transition-colors"
                      onClick={() => setSelectedContent(item)}
                    >
                      <h4 className="font-semibold text-gray-800 mb-2 text-sm leading-tight hover:text-blue-600">
                        {item.title}
                      </h4>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {item.date}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {item.readTime}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No upcoming content</p>
                )}
              </div>
            </div>
          </aside>
        </div>

        {/* Carousels Section */}
        <div className="mt-12 space-y-10">
          {/* Top Stories Carousel */}
          {topStories.length > 0 && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Top Stories</h2>
                <div className="flex space-x-2">
                  <button 
                    onClick={handleTopStoriesPrev}
                    className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                    disabled={topStories.length <= 1}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={handleTopStoriesNext}
                    className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                    disabled={topStories.length <= 1}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${topStoriesIndex * 100}%)` }}
                >
                  {topStories.map((story: any) => (
                    <div key={story.id} className="min-w-full px-2">
                      <div className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer">
                        <div className="relative">
                          <img 
                            src={story.image} 
                            alt={story.title}
                            className="w-full h-64 object-cover"
                          />
                          <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg">
                            <MoreHorizontal className="w-5 h-5 text-gray-600 transform rotate-90" />
                          </div>
                        </div>
                        <div className="p-5">
                          <h3 className="text-xl font-bold text-gray-800 mb-4 hover:text-blue-600 transition-colors">
                            {story.title}
                          </h3>
                          <div className="flex items-center justify-between text-sm text-gray-600">
                            <span className="font-medium">{story.author}</span>
                            <div className="flex items-center space-x-3">
                              <span className="flex items-center">
                                <Eye className="w-4 h-4 mr-1" />
                                {story.views}
                              </span>
                              <span>{story.daysAgo}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Latest Stories Carousel */}
          {latestStories.length > 0 && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Latest Stories</h2>
                <div className="flex space-x-2">
                  <button 
                    onClick={handleLatestStoriesPrev}
                    className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                    disabled={latestStories.length <= 1}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={handleLatestStoriesNext}
                    className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                    disabled={latestStories.length <= 1}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${latestStoriesIndex * 100}%)` }}
                >
                  {latestStories.map((story: any) => (
                    <div key={story.id} className="min-w-full px-2">
                      <div className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer">
                        <div className="relative">
                          <img 
                            src={story.image} 
                            alt={story.title}
                            className="w-full h-64 object-cover"
                          />
                          <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg">
                            <MoreHorizontal className="w-5 h-5 text-gray-600 transform rotate-90" />
                          </div>
                        </div>
                        <div className="p-5">
                          <h3 className="text-xl font-bold text-gray-800 mb-4 hover:text-blue-600 transition-colors">
                            {story.title}
                          </h3>
                          <div className="flex items-center justify-between text-sm text-gray-600">
                            <span className="font-medium">{story.author}</span>
                            <div className="flex items-center space-x-3">
                              <span className="flex items-center">
                                <Eye className="w-4 h-4 mr-1" />
                                {story.views}
                              </span>
                              <span>{story.daysAgo}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <ViewBlogContent
        isOpen={!!selectedContent}
        onClose={() => setSelectedContent(null)}
        content={{
          id: selectedContent?.id,
          title: selectedContent?.title || '',
          author: selectedContent?.author || '',
          date: selectedContent?.date || '',
          readTime: selectedContent?.readTime,
          verse: selectedContent?.verse,
          verseReference: selectedContent?.verseReference,
          image: selectedContent?.image,
          description: selectedContent?.description,
          fullContent: selectedContent?.fullContent,
          prayer: selectedContent?.prayer,
          category: selectedContent?.category
        }}
        topStories={topStories}
        upcomingContent={sidebarQueue}
      />
    </div>
  );
};

export default BlogPage;