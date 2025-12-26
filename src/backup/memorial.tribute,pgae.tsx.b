import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

const MemorialTributePage = () => {
  const [selectedPerson, setSelectedPerson] = useState(0);
  const [activeTab, setActiveTab] = useState('memorial');
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      name: "Jane Madison",
      profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      message: "I really miss you Aunt, you give me everything that never could do it for me. Your love and guidance will forever be in my heart."
    },
    {
      id: 2,
      name: "Michael Chen",
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      message: "Your faith and kindness touched so many lives. We will carry your legacy forward."
    },
    {
      id: 3,
      name: "Sarah Johnson",
      profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      message: "Thank you for being such an inspiration to our community. Your memory lives on in all of us."
    }
  ]);
  const [newMessage, setNewMessage] = useState({ name: '', profileImage: '', message: '' });

  // Sample data for memorial persons
  const memorialPersons = [
    {
      id: 1,
      name: "Helene S.",
      profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      birthDate: "20.01.1980",
      deathDate: "18.08.2024",
      role: "Our beloved mother & wife",
      quote: "Though he walks now in the arms of our Lord, his words, his faith, and his love remain with us, guiding our hearts each day",
      biography: "Helene was a devoted mother, loving wife, and faithful servant of God. She dedicated her life to raising her children in faith and serving the community through various ministry programs. Her gentle spirit and unwavering faith touched countless lives.",
      photos: [
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=300&h=200&fit=crop"
      ],
      videos: [
        { title: "Sunday Service Message", thumbnail: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=200&fit=crop" },
        { title: "Family Memories", thumbnail: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=200&fit=crop" }
      ]
    },
    {
      id: 2,
      name: "Robert M.",
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      birthDate: "15.03.1975",
      deathDate: "22.07.2024",
      role: "Faithful brother & father",
      quote: "His love for God and family was evident in everything he did. His legacy of faith continues to inspire us all.",
      biography: "Robert was a pillar in our church community, leading youth ministry for over 15 years. His passion for teaching God's word and mentoring young people left an indelible mark on our congregation.",
      photos: [
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=200&fit=crop"
      ],
      videos: [
        { title: "Youth Ministry Highlights", thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop" }
      ]
    },
    {
      id: 3,
      name: "Mary T.",
      profileImage: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face",
      birthDate: "08.12.1960",
      deathDate: "10.06.2024",
      role: "Beloved grandmother & servant",
      quote: "Her hands were always busy serving others, and her heart was always open to those in need.",
      biography: "Mary dedicated her life to serving in the church kitchen, organizing community meals, and caring for the elderly. Her servant's heart was an example to all who knew her.",
      photos: [
        "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=300&h=200&fit=crop"
      ],
      videos: []
    }
  ];

  const currentPerson = memorialPersons[selectedPerson];

  const handleAddMessage = () => {
    if (newMessage.name && newMessage.message) {
      const message = {
        id: Date.now(),
        name: newMessage.name,
        profileImage: newMessage.profileImage || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        message: newMessage.message
      };
      setMessages([...messages, message]);
      setNewMessage({ name: '', profileImage: '', message: '' });
      setIsMessageModalOpen(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'memorial':
        return (
          <div className="memorial-card-content">
            <div className="memorial-card">
              <div className="memorial-image-container">
                <img 
                  src={currentPerson.profileImage} 
                  alt={currentPerson.name}
                  className="memorial-image"
                />
                <div className="memorial-overlay">
                  <div className="memorial-dove">🕊️</div>
                  <h3 className="memorial-name">{currentPerson.name}</h3>
                  <p className="memorial-dates">{currentPerson.birthDate} - {currentPerson.deathDate}</p>
                  <p className="memorial-role">{currentPerson.role}</p>
                </div>
              </div>
              <div className="memorial-quote">
                <p className="custom-p italic">{currentPerson.quote}</p>
              </div>
            </div>
          </div>
        );
      
      case 'stories':
        return (
          <div className="stories-content">
            <div className="story-image-container">
              <img 
                src={currentPerson.profileImage} 
                alt={currentPerson.name}
                className="story-main-image"
              />
            </div>
            <div className="story-text">
              <h3 className="custom-h3 mb-4">{currentPerson.name}</h3>
              <p className="custom-p leading-relaxed">{currentPerson.biography}</p>
            </div>
          </div>
        );
      
      case 'photos':
        return (
          <div className="photos-content">
            <h3 className="custom-h3 mb-6 text-center">Photo Memories</h3>
            <div className="photos-grid">
              {currentPerson.photos.map((photo, index) => (
                <div key={index} className="photo-item">
                  <img src={photo} alt={`Memory ${index + 1}`} className="photo-image" />
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'videos':
        return (
          <div className="videos-content">
            <h3 className="custom-h3 mb-6 text-center">Video Memories</h3>
            <div className="videos-grid">
              {currentPerson.videos.length > 0 ? (
                currentPerson.videos.map((video, index) => (
                  <div key={index} className="video-item">
                    <div className="video-thumbnail">
                      <img src={video.thumbnail} alt={video.title} className="thumbnail-image" />
                      <div className="play-button">▶</div>
                    </div>
                    <p className="custom-span mt-2">{video.title}</p>
                  </div>
                ))
              ) : (
                <p className="custom-p text-center opacity-60">No videos available</p>
              )}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="memorial-page">
      {/* Header */}
      <div className="memorial-header">
        <h1 className="custom-h1">🕊️ Memorial Tribute</h1>
        <p className="custom-p opacity-80">Honoring the faithful lives of those who served and are now with the Lord.</p>
      </div>

      {/* Main Content */}
      <div className="memorial-main">
        {/* Left Sidebar - Person List */}
        <div className="person-sidebar">
          <div className="person-list">
            {memorialPersons.map((person, index) => (
              <div 
                key={person.id}
                className={`person-item ${selectedPerson === index ? 'active' : ''}`}
                onClick={() => setSelectedPerson(index)}
              >
                <img 
                  src={person.profileImage} 
                  alt={person.name}
                  className="person-avatar"
                />
                <div className="person-name-overlay">
                  <span className="custom-span">{person.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Center Content */}
        <div className="center-content">
          {renderContent()}
        </div>

        {/* Right Sidebar - Tabs */}
        <div className="tabs-sidebar">
          <div className="tab-list">
            <div 
              className={`tab-item ${activeTab === 'memorial' ? 'active' : ''}`}
              onClick={() => setActiveTab('memorial')}
            >
              <div className="tab-icon">📝</div>
              <span className="tab-label">Memorial Card</span>
            </div>
            <div 
              className={`tab-item ${activeTab === 'stories' ? 'active' : ''}`}
              onClick={() => setActiveTab('stories')}
            >
              <div className="tab-icon">📖</div>
              <span className="tab-label">Stories</span>
            </div>
            <div 
              className={`tab-item ${activeTab === 'photos' ? 'active' : ''}`}
              onClick={() => setActiveTab('photos')}
            >
              <div className="tab-icon">📷</div>
              <span className="tab-label">Photos</span>
            </div>
            <div 
              className={`tab-item ${activeTab === 'videos' ? 'active' : ''}`}
              onClick={() => setActiveTab('videos')}
            >
              <div className="tab-icon">🎬</div>
              <span className="tab-label">Videos</span>
            </div>
          </div>
        </div>
      </div>

      {/* Message Wall */}
      <div className="message-wall-section">
        <div className="message-wall-header">
          <h2 className="custom-h2">💬 Message Wall</h2>
          <button 
            className="custom-button"
            onClick={() => setIsMessageModalOpen(true)}
          >
            <Plus size={16} />
            Add Message
          </button>
        </div>
        
        <div className="message-carousel">
          {messages.map((message) => (
            <div key={message.id} className="message-card">
              <img 
                src={message.profileImage} 
                alt={message.name}
                className="message-avatar"
              />
              <div className="message-content">
                <h4 className="custom-h4">{message.name}</h4>
                <p className="custom-p message-text">
                  {message.message.length > 100 
                    ? `${message.message.substring(0, 100)}...` 
                    : message.message
                  }
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Message Modal */}
      {isMessageModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="custom-h3">Add Memorial Message</h3>
              <button 
                className="close-button"
                onClick={() => setIsMessageModalOpen(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="message-form">
              <input
                type="text"
                placeholder="Your Name"
                value={newMessage.name}
                onChange={(e) => setNewMessage({...newMessage, name: e.target.value})}
                className="form-input"
              />
              <input
                type="url"
                placeholder="Profile Image URL (optional)"
                value={newMessage.profileImage}
                onChange={(e) => setNewMessage({...newMessage, profileImage: e.target.value})}
                className="form-input"
              />
              <textarea
                placeholder="Your message to honor their memory..."
                value={newMessage.message}
                onChange={(e) => setNewMessage({...newMessage, message: e.target.value})}
                className="form-textarea"
                rows={4}
              />
              <div className="form-actions">
                <button type="button" className="cancel-button" onClick={() => setIsMessageModalOpen(false)}>
                  Cancel
                </button>
                <button type="button" className="custom-button" onClick={handleAddMessage}>
                  Add Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .memorial-page {
          min-height: 100vh;
          background: var(--bg-main);
          padding: 2rem 1rem;
        }

        .memorial-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .memorial-main {
          display: grid;
          grid-template-columns: 200px 1fr 120px;
          gap: 2rem;
          max-width: 1400px;
          margin: 0 auto 4rem;
          min-height: 500px;
        }

        /* Left Sidebar */
        .person-sidebar {
          background: var(--bg-main-box);
          border-radius: 0.75rem;
          padding: 1.5rem;
          box-shadow: var(--box-shadow);
        }

        .person-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .person-item {
          position: relative;
          cursor: pointer;
          border-radius: 50%;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .person-item:hover {
          transform: scale(1.05);
        }

        .person-item.active {
          ring: 3px solid var(--color-black-90);
          box-shadow: var(--box-shadow);
        }

        .person-avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          object-fit: cover;
        }

        .person-name-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent, rgba(0,0,0,0.8));
          color: white;
          padding: 0.5rem;
          text-align: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .person-item:hover .person-name-overlay {
          opacity: 1;
        }

        /* Center Content */
        .center-content {
          background: var(--bg-main-box);
          border-radius: 0.75rem;
          padding: 2rem;
          box-shadow: var(--box-shadow);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .memorial-card {
          position: relative;
          width: 100%;
          max-width: 500px;
          text-align: center;
        }

        .memorial-image-container {
          position: relative;
          margin-bottom: 1.5rem;
        }

        .memorial-image {
          width: 200px;
          height: 200px;
          border-radius: 50%;
          object-fit: cover;
          margin: 0 auto;
          display: block;
          border: 4px solid var(--color-white);
          box-shadow: var(--box-shadow);
        }

        .memorial-overlay {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          padding: 1rem;
        }

        .memorial-dove {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }

        .memorial-name {
          font-size: var(--font-size-h2);
          font-weight: var(--font-weight-bold);
          color: var(--color-black);
          margin: 0.5rem 0;
        }

        .memorial-dates {
          font-size: var(--font-size-p);
          color: var(--color-black-60);
          margin: 0.25rem 0;
        }

        .memorial-role {
          font-size: var(--font-size-span);
          color: var(--color-black-40);
          margin: 0;
        }

        .memorial-quote {
          background: rgba(255,255,255,0.8);
          padding: 1.5rem;
          border-radius: 0.5rem;
          opacity: 0;
          transition: opacity 0.3s ease;
          margin-top: 1rem;
        }

        .memorial-card:hover .memorial-quote {
          opacity: 1;
        }

        .stories-content {
          width: 100%;
          display: grid;
          grid-template-columns: 200px 1fr;
          gap: 2rem;
          align-items: start;
        }

        .story-image-container img {
          width: 100%;
          height: 250px;
          object-fit: cover;
          border-radius: 0.5rem;
        }

        .photos-content, .videos-content {
          width: 100%;
        }

        .photos-grid, .videos-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }

        .photo-image, .thumbnail-image {
          width: 100%;
          height: 150px;
          object-fit: cover;
          border-radius: 0.5rem;
        }

        .video-item {
          position: relative;
        }

        .video-thumbnail {
          position: relative;
          cursor: pointer;
        }

        .play-button {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(0,0,0,0.8);
          color: white;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
        }

        /* Right Sidebar */
        .tabs-sidebar {
          background: var(--bg-main-box);
          border-radius: 0.75rem;
          padding: 1rem;
          box-shadow: var(--box-shadow);
        }

        .tab-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .tab-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1rem 0.5rem;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }

        .tab-item:hover {
          background: var(--color-gray);
        }

        .tab-item.active {
          background: var(--color-black-90);
          color: white;
        }

        .tab-icon {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }

        .tab-label {
          font-size: var(--font-size-caption);
          text-align: center;
          opacity: 0;
          transition: opacity 0.3s ease;
          position: absolute;
          bottom: 0.25rem;
          white-space: nowrap;
        }

        .tab-item:hover .tab-label,
        .tab-item.active .tab-label {
          opacity: 1;
        }

        /* Message Wall */
        .message-wall-section {
          max-width: 1400px;
          margin: 0 auto;
        }

        .message-wall-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .message-carousel {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .message-card {
          background: var(--bg-main-box);
          padding: 1.5rem;
          border-radius: 0.75rem;
          box-shadow: var(--box-shadow);
          display: flex;
          gap: 1rem;
        }

        .message-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          object-fit: cover;
          flex-shrink: 0;
        }

        .message-content {
          flex: 1;
        }

        .message-text {
          margin-top: 0.5rem;
          line-height: 1.5;
        }

        /* Modal */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-content {
          background: var(--bg-main);
          padding: 2rem;
          border-radius: 0.75rem;
          width: 90%;
          max-width: 500px;
          box-shadow: var(--box-shadow);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .close-button {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 0.25rem;
        }

        .close-button:hover {
          background: var(--color-gray);
        }

        .message-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .form-input, .form-textarea {
          padding: 0.75rem;
          border: 1px solid var(--color-black-20);
          border-radius: 0.5rem;
          font-family: var(--font-main);
          font-size: var(--font-size-p);
        }

        .form-input:focus, .form-textarea:focus {
          outline: none;
          border-color: var(--color-black-60);
          box-shadow: 0 0 0 2px rgba(0,0,0,0.1);
        }

        .form-actions {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
        }

        .cancel-button {
          padding: 0.75rem 1.5rem;
          background: var(--color-gray);
          color: var(--color-black-60);
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          font-weight: var(--font-weight-bold);
        }

        .cancel-button:hover {
          background: var(--color-black-20);
        }

        .italic {
          font-style: italic;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .memorial-main {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .person-sidebar {
            order: -1;
          }
          
          .person-list {
            flex-direction: row;
            justify-content: center;
            flex-wrap: wrap;
          }
          
          .tabs-sidebar {
            order: 1;
          }
          
          .tab-list {
            flex-direction: row;
            justify-content: center;
          }
          
          .stories-content {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }

        @media (max-width: 768px) {
          .memorial-page {
            padding: 1rem;
          }
          
          .message-wall-header {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }
          
          .message-carousel {
            grid-template-columns: 1fr;
          }
          
          .modal-content {
            margin: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default MemorialTributePage;
