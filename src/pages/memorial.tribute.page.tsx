import React, { useState } from 'react';

// Sample data for memorial profiles
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
        content: 'Jhonwhein dedicated his life to serving others in the ministry. His compassionate heart and unwavering faith touched countless lives throughout his journey with us. He was known for his gentle spirit and his ability to comfort those in need...',
        image: 'https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/albums/JohnWeinQuitor/Wein_11.jpg?raw=true'
      }
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
      'https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/albums/JohnWeinQuitor/Wein_12.jpg?raw=true'
    ],
    videos: [
      { title: 'Sunday Service Message', thumbnail: '/api/placeholder/200/150' },
      { title: 'Community Outreach', thumbnail: '/api/placeholder/200/150' },
      { title: 'Family Testimonial', thumbnail: '/api/placeholder/200/150' }
    ]
  },
  {
    id: 2,
    name: 'Mark Stephen Frondozo',
    image: 'https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/congregation/6_Mark.Stephen.Frondozo.jpg?raw=true',
    birthDate: '12.07.2006',
    deathDate: '16.06.2025',
    quote: 'Her gentle spirit and loving heart continue to inspire us daily. She now rests in the peace of our Savior.',
    role: 'Our beloved mother & wife',
    stories: [
      {
        title: 'A Mother\'s Love',
        content: 'Helena was known for her nurturing spirit and unconditional love for her family and church community...',
        image: 'https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/albums/MarkStephenFrondozo/mark_6.jpg?raw=true'
      }
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
      'https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/albums/MarkStephenFrondozo/mark_12.jpg?raw=true'
    ],
    videos: [
      { title: 'Family Memories', thumbnail: '/api/placeholder/200/150' }
    ]
  }
];

// Sample messages data
const initialMessages = [
  {
    id: 1,
    name: 'Jane Madison',
    image: '/api/placeholder/60/60',
    message: 'I really miss you Aunt, you give me everything that never could do it for me.'
  },
  {
    id: 2,
    name: 'Jane Madison',
    image: '/api/placeholder/60/60',
    message: 'I really miss you Aunt, you give me everything that never could do it for me.'
  },
  {
    id: 3,
    name: 'Jane Madison',
    image: '/api/placeholder/60/60',
    message: 'I really miss you Aunt, you give me everything that never could do it for me.'
  }
];

const MemorialTributePage = () => {
  const [selectedProfile, setSelectedProfile] = useState(memorialProfiles[0]);
  const [activeTab, setActiveTab] = useState('memorial');
  const [messages, setMessages] = useState(initialMessages);
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [expandedMessage, setExpandedMessage] = useState(null);
  const [messageForm, setMessageForm] = useState({
    name: '',
    image: null,
    imagePreview: '/api/placeholder/60/60',
    message: ''
  });

  const tabs = [
    { id: 'memorial', icon: '🏆', label: 'Memorial Card' },
    { id: 'stories', icon: '✝️', label: 'Stories' },
    { id: 'photos', icon: '🌸', label: 'Photos' },
    { id: 'videos', icon: '📹', label: 'Videos' }
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setMessageForm({
          ...messageForm,
          image: file,
          imagePreview: e.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddMessage = () => {
    if (messageForm.name && messageForm.message) {
      const newMessage = {
        id: messages.length + 1,
        name: messageForm.name,
        image: messageForm.imagePreview,
        message: messageForm.message
      };
      setMessages([...messages, newMessage]);
      setMessageForm({ 
        name: '', 
        image: null, 
        imagePreview: '/api/placeholder/60/60', 
        message: '' 
      });
      setShowMessageForm(false);
    }
  };

  const truncateMessage = (message, length = 60) => {
    return message.length > length ? message.substring(0, length) + '...' : message;
  };

  const renderCenterContent = () => {
    switch (activeTab) {
      case 'memorial':
        return (
          <div className="memorial-card-content">
            <div className="memorial-header">
              <div className="dove-icon">🕊️</div>
              <p className="in-memory-text">In loving memory of</p>
            </div>
            
            <div className="memorial-body">
              <div className="floral-decorations">
                <div className="floral-left">🌿</div>
                <div className="floral-right">🌸</div>
              </div>
              
              <div className="memorial-photo-container">
                <img 
                  src={selectedProfile.image} 
                  alt={selectedProfile.name}
                  className="memorial-photo"
                />
              </div>
              
              <div className="memorial-info">
                <h2 className="memorial-name">{selectedProfile.name}</h2>
                <p className="memorial-dates">{selectedProfile.birthDate} - {selectedProfile.deathDate}</p>
                <p className="memorial-role">{selectedProfile.role}</p>
              </div>
              
              <div className="quote-section">
                <div className="quote-box">
                  <p className="quote-text">{selectedProfile.quote}</p>
                </div>
              </div>
            </div>
            
            <div className="memorial-footer">
              <div className="angel-decoration">👼</div>
            </div>
          </div>
        );
        
      case 'stories':
        return (
          <div className="stories-content">
            <div className="story-image-container">
              <img 
                src={selectedProfile.stories[0]?.image} 
                alt={selectedProfile.name}
                className="story-image"
              />
            </div>
            <div className="story-text">
              <h3 className="story-title">{selectedProfile.stories[0]?.title}</h3>
              <p className="story-content">{selectedProfile.stories[0]?.content}</p>
            </div>
          </div>
        );
        
      case 'photos':
        return (
          <div className="photos-grid">
            {selectedProfile.photos.map((photo, index) => (
              <div key={index} className="photo-item">
                <img 
                  src={photo} 
                  alt={`Memory ${index + 1}`}
                  className="photo-image"
                />
              </div>
            ))}
          </div>
        );
        
      case 'videos':
        return (
          <div className="videos-grid">
            {selectedProfile.videos.map((video, index) => (
              <div key={index} className="video-item">
                <div className="video-thumbnail">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="video-image"
                  />
                  <div className="play-button">▶</div>
                </div>
                <p className="video-title">{video.title}</p>
              </div>
            ))}
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="memorial-page">
      <div className="container">
        <header className="page-header">
          <h1 className="page-title">🕊️ Memorial Tribute</h1>
          <p className="page-subtitle">
            Honoring the faithful lives of those who served and are now with the Lord.
          </p>
        </header>

        <div className="memorial-layout">
          {/* Left Profile Sidebar */}
          <div className="profile-sidebar">
            {memorialProfiles.map((profile) => (
              <div
                key={profile.id}
                className={`profile-item ${selectedProfile.id === profile.id ? 'active' : ''}`}
                onClick={() => setSelectedProfile(profile)}
              >
                <div className="profile-avatar-container">
                  <img 
                    src={profile.image} 
                    alt={profile.name}
                    className="profile-avatar"
                  />
                </div>
                <div className="profile-tooltip">
                  {profile.name}
                </div>
              </div>
            ))}
          </div>

          {/* Center Memorial Content */}
          <div className="memorial-center">
            {renderCenterContent()}
          </div>

          {/* Right Tabs Sidebar */}
          <div className="tabs-sidebar">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className={`tab-item ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <div className="tab-icon">
                  <span>{tab.icon}</span>
                </div>
                <div className="tab-label">
                  {tab.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message Wall Section */}
        <section className="message-wall-section">
          <div className="message-wall-header">
            <h3 className="section-title">Message Wall</h3>
          </div>

          <div className="message-cards-container">
            {messages.map((message) => (
              <div key={message.id} className="message-card">
                <div className="message-header">
                  <img 
                    src={message.image} 
                    alt={message.name}
                    className="message-avatar"
                  />
                  <h4 className="message-author">{message.name}</h4>
                </div>
                <p 
                  className="message-text"
                  onClick={() => setExpandedMessage(expandedMessage === message.id ? null : message.id)}
                >
                  {expandedMessage === message.id ? message.message : truncateMessage(message.message)}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Fixed Floating Message Wall Button */}
      <button 
        className="floating-message-button"
        onClick={() => setShowMessageForm(true)}
      >
        💬 Message Wall
      </button>

      {/* Message Form Modal */}
      {showMessageForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-title">Add Your Message</h3>
            
            <div className="form-group">
              <label className="form-label">Profile Picture</label>
              <div className="image-upload-container">
                <div className="current-image">
                  <img 
                    src={messageForm.imagePreview} 
                    alt="Profile preview"
                    className="preview-image"
                  />
                </div>
                <label className="upload-button">
                  Choose Photo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Your Name</label>
              <input
                type="text"
                className="form-input"
                value={messageForm.name}
                onChange={(e) => setMessageForm({...messageForm, name: e.target.value})}
                placeholder="Enter your name"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Your Message</label>
              <textarea
                className="form-textarea"
                rows={4}
                value={messageForm.message}
                onChange={(e) => setMessageForm({...messageForm, message: e.target.value})}
                placeholder="Share your memories and thoughts..."
              />
            </div>

            <div className="modal-buttons">
              <button 
                className="submit-button"
                onClick={handleAddMessage}
              >
                Add Message
              </button>
              <button 
                className="cancel-button"
                onClick={() => setShowMessageForm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/*<style jsx>{`
      `}</style>*/}
    </div>
  );
};

export default MemorialTributePage;