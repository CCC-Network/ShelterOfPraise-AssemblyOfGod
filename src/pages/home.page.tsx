import { useState, useEffect, useRef } from 'react';

const HomePage = () => {
  const [isVisible, setIsVisible] = useState({
    purpose: false,
    vision: false,
    goal: false,
    strategy: false,
    hook: false,
    video: false,
    sermon: false
  });

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const observerRef = useRef(null);

  // Sample video data
  const videos = [
    {
      id: 1,
      title: "Sunday Worship Service",
      thumbnail: "https://img.youtube.com/vi/6OsKUdMcQdY/maxresdefault.jpg",
      url: "https://youtu.be/6OsKUdMcQdY?si=KEVpdWWPvc3-xOdz"
    },
    {
      id: 2,
      title: "Youth Ministry",
      thumbnail: "https://img.youtube.com/vi/rffjr1MMyKk/maxresdefault.jpg",
      url: "https://youtu.be/rffjr1MMyKk?si=EHFeRPDpfd8DcbUI"
    },
    {
      id: 3,
      title: "Prayer Meeting",
      thumbnail: "https://img.youtube.com/vi/VuZ8K356gN0/maxresdefault.jpg",
      url: "https://youtu.be/VuZ8K356gN0?si=Vrw16DHZM0sKU2--"
    }
  ];

  // Auto-rotate videos every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [videos.length]);

  // Intersection Observer for scroll animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const targetId = entry.target.getAttribute('data-section');
            setIsVisible(prev => ({ ...prev, [targetId]: true }));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const sections = document.querySelectorAll('[data-section]');
    sections.forEach(section => {
      if (observerRef.current) {
        observerRef.current.observe(section);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'var(--bg-main)',
      overflow: 'hidden'
    }}>
      {/* Hero Section */}
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '5rem 1rem' 
      }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h1 style={{
            fontSize: 'var(--font-size-h1)',
            fontWeight: 'var(--font-weight-black)',
            color: 'var(--color-black)',
            lineHeight: '1.2',
            marginBottom: '1.5rem'
          }}>
            🏠 Shelter of Praise
          </h1>
          <p style={{
            fontSize: 'var(--font-size-p)',
            fontWeight: 'var(--font-weight-regular)',
            color: 'var(--color-black-60)',
            lineHeight: '1.6',
            maxWidth: '600px', 
            margin: '0 auto'
          }}>
            A community where faith grows, families are strengthened, and lives are transformed through God's love.
          </p>
        </div>

        {/* Purpose - Fade in from left */}
        <div 
          data-section="purpose"
          style={{
            background: 'var(--bg-main-box)',
            padding: '3rem',
            borderRadius: '0.75rem',
            boxShadow: 'var(--box-shadow)',
            marginBottom: '3rem',
            transform: isVisible.purpose ? 'translateX(0)' : 'translateX(-50px)',
            opacity: isVisible.purpose ? 1 : 0,
            transition: 'all 1s ease-out',
            borderLeft: '6px solid var(--color-black-90)'
          }}
        >
          <h2 style={{
            fontSize: 'var(--font-size-h2)',
            fontWeight: 'var(--font-weight-bold)',
            color: 'var(--color-black)',
            lineHeight: '1.3',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            🎯 Purpose
          </h2>
          <h3 style={{
            fontSize: 'var(--font-size-h3)',
            fontWeight: 'var(--font-weight-medium)',
            color: 'var(--color-black)',
            lineHeight: '1.4',
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            Love God, Love People
          </h3>
          <p style={{
            fontSize: 'var(--font-size-p)',
            fontWeight: 'var(--font-weight-regular)',
            color: 'var(--color-black-80)',
            lineHeight: '1.6',
            textAlign: 'center'
          }}>
            Our purpose is simple yet profound: to love God with all our hearts and extend that love to every person we encounter. We believe that genuine love for God naturally overflows into compassionate service to our community, creating bonds that transform lives and strengthen our faith together.
          </p>
        </div>

        {/* Vision - Fade in from right */}
        <div 
          data-section="vision"
          style={{
            background: 'var(--bg-main-box)',
            padding: '3rem',
            borderRadius: '0.75rem',
            boxShadow: 'var(--box-shadow)',
            marginBottom: '3rem',
            transform: isVisible.vision ? 'translateX(0)' : 'translateX(50px)',
            opacity: isVisible.vision ? 1 : 0,
            transition: 'all 1s ease-out 0.3s',
            borderRight: '6px solid var(--color-black-80)'
          }}
        >
          <h2 style={{
            fontSize: 'var(--font-size-h2)',
            fontWeight: 'var(--font-weight-bold)',
            color: 'var(--color-black)',
            lineHeight: '1.3',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            👁️ Vision
          </h2>
          <h3 style={{
            fontSize: 'var(--font-size-h3)',
            fontWeight: 'var(--font-weight-medium)',
            color: 'var(--color-black)',
            lineHeight: '1.4',
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            Go & Make Disciples
          </h3>
          <p style={{
            fontSize: 'var(--font-size-p)',
            fontWeight: 'var(--font-weight-regular)',
            color: 'var(--color-black-80)',
            lineHeight: '1.6',
            textAlign: 'center'
          }}>
            We envision a church that actively goes beyond its walls to make disciples of all nations. Our vision is to equip every believer with the tools and confidence to share the Gospel, mentor others in faith, and create a ripple effect of spiritual transformation throughout our community and beyond.
          </p>
        </div>

        {/* Goal - Slide from bottom */}
        <div 
          data-section="goal"
          style={{
            background: 'var(--bg-main-box)',
            padding: '3rem',
            borderRadius: '0.75rem',
            boxShadow: 'var(--box-shadow)',
            marginBottom: '3rem',
            transform: isVisible.goal ? 'translateY(0)' : 'translateY(50px)',
            opacity: isVisible.goal ? 1 : 0,
            transition: 'all 1s ease-out 0.5s',
            borderBottom: '6px solid var(--color-black-60)'
          }}
        >
          <h2 style={{
            fontSize: 'var(--font-size-h2)',
            fontWeight: 'var(--font-weight-bold)',
            color: 'var(--color-black)',
            lineHeight: '1.3',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            🎖️ Goal
          </h2>
          <h3 style={{
            fontSize: 'var(--font-size-h3)',
            fontWeight: 'var(--font-weight-medium)',
            color: 'var(--color-black)',
            lineHeight: '1.4',
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            To Make Every Believer a Leader of Leaders
          </h3>
          <p style={{
            fontSize: 'var(--font-size-p)',
            fontWeight: 'var(--font-weight-regular)',
            color: 'var(--color-black-80)',
            lineHeight: '1.6',
            textAlign: 'center'
          }}>
            Our goal is to nurture and develop every member of our congregation into confident leaders who can mentor and guide others. We believe that true growth happens when believers don't just follow, but become equipped to lead others in their faith journey, multiplying our impact exponentially.
          </p>
        </div>

        {/* Strategy - Fade In */}
        <div 
          data-section="strategy"
          style={{
            background: 'var(--bg-main-box)',
            padding: '3rem',
            borderRadius: '0.75rem',
            boxShadow: 'var(--box-shadow)',
            marginBottom: '3rem',
            transform: isVisible.strategy ? 'scale(1)' : 'scale(0.95)',
            opacity: isVisible.strategy ? 1 : 0,
            transition: 'all 1s ease-out 0.7s',
            border: '6px solid var(--color-black-40)'
          }}
        >
          <h2 style={{
            fontSize: 'var(--font-size-h2)',
            fontWeight: 'var(--font-weight-bold)',
            color: 'var(--color-black)',
            lineHeight: '1.3',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            📋 Strategy
          </h2>
          <h3 style={{
            fontSize: 'var(--font-size-h3)',
            fontWeight: 'var(--font-weight-medium)',
            color: 'var(--color-black)',
            lineHeight: '1.4',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            Win | Consolidate | Disciple | Send
          </h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '1.5rem' 
          }}>
            <div style={{ 
              background: 'var(--bg-main)', 
              padding: '1.5rem', 
              borderRadius: '0.75rem',
              boxShadow: 'var(--box-shadow)',
              textAlign: 'center'
            }}>
              <h4 style={{
                fontSize: 'var(--font-size-h4)',
                fontWeight: 'var(--font-weight-regular)',
                color: 'var(--color-black)',
                lineHeight: '1.4',
                marginBottom: '0.75rem'
              }}>Win</h4>
              <p style={{
                fontSize: 'var(--font-size-p)',
                fontWeight: 'var(--font-weight-regular)',
                color: 'var(--color-black-60)',
                lineHeight: '1.6'
              }}>
                Reaching souls through evangelism and community outreach programs.
              </p>
            </div>
            <div style={{ 
              background: 'var(--bg-main)', 
              padding: '1.5rem', 
              borderRadius: '0.75rem',
              boxShadow: 'var(--box-shadow)',
              textAlign: 'center'
            }}>
              <h4 style={{
                fontSize: 'var(--font-size-h4)',
                fontWeight: 'var(--font-weight-regular)',
                color: 'var(--color-black)',
                lineHeight: '1.4',
                marginBottom: '0.75rem'
              }}>Consolidate</h4>
              <p style={{
                fontSize: 'var(--font-size-p)',
                fontWeight: 'var(--font-weight-regular)',
                color: 'var(--color-black-60)',
                lineHeight: '1.6'
              }}>
                Strengthening new believers through fellowship and biblical foundation.
              </p>
            </div>
            <div style={{ 
              background: 'var(--bg-main)', 
              padding: '1.5rem', 
              borderRadius: '0.75rem',
              boxShadow: 'var(--box-shadow)',
              textAlign: 'center'
            }}>
              <h4 style={{
                fontSize: 'var(--font-size-h4)',
                fontWeight: 'var(--font-weight-regular)',
                color: 'var(--color-black)',
                lineHeight: '1.4',
                marginBottom: '0.75rem'
              }}>Disciple</h4>
              <p style={{
                fontSize: 'var(--font-size-p)',
                fontWeight: 'var(--font-weight-regular)',
                color: 'var(--color-black-60)',
                lineHeight: '1.6'
              }}>
                Training believers to grow in faith and spiritual maturity.
              </p>
            </div>
            <div style={{ 
              background: 'var(--bg-main)', 
              padding: '1.5rem', 
              borderRadius: '0.75rem',
              boxShadow: 'var(--box-shadow)',
              textAlign: 'center'
            }}>
              <h4 style={{
                fontSize: 'var(--font-size-h4)',
                fontWeight: 'var(--font-weight-regular)',
                color: 'var(--color-black)',
                lineHeight: '1.4',
                marginBottom: '0.75rem'
              }}>Send</h4>
              <p style={{
                fontSize: 'var(--font-size-p)',
                fontWeight: 'var(--font-weight-regular)',
                color: 'var(--color-black-60)',
                lineHeight: '1.6'
              }}>
                Commissioning mature believers to lead and minister to others.
              </p>
            </div>
          </div>
        </div>

        {/* Hook Contents - Welcome */}
        <div 
          data-section="hook"
          style={{
            marginBottom: '3rem',
            transform: isVisible.hook ? 'translateY(0)' : 'translateY(50px)',
            opacity: isVisible.hook ? 1 : 0,
            transition: 'all 1s ease-out 0.9s',
            background: 'var(--color-black-90)',
            color: 'var(--color-white)',
            padding: '3rem',
            borderRadius: '0.75rem',
            textAlign: 'center',
            boxShadow: 'var(--box-shadow)'
          }}
        >
          <h2 style={{
            fontSize: 'var(--font-size-h2)',
            fontWeight: 'var(--font-weight-bold)',
            color: 'var(--color-white)',
            lineHeight: '1.3',
            marginBottom: '1.5rem'
          }}>
            🤗 Welcome to Our Family
          </h2>
          <p style={{
            fontSize: 'var(--font-size-p)',
            fontWeight: 'var(--font-weight-regular)',
            color: 'var(--color-white)',
            lineHeight: '1.6',
            marginBottom: '2rem',
            maxWidth: '800px',
            margin: '0 auto 2rem auto'
          }}>
            Whether you're seeking spiritual guidance, community fellowship, or simply a place to call home, 
            you'll find open arms and warm hearts here. Come as you are, and discover the transforming power 
            of God's love in your life.
          </p>
          <button style={{
            background: 'var(--color-white)',
            color: 'var(--color-black-90)',
            fontWeight: 'var(--font-weight-bold)',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontSize: 'var(--font-size-p)'
          }}>
            Join Us This Sunday
          </button>
        </div>

        {/* Full-screen Video Background */}
        <div 
          data-section="video"
          style={{
            marginBottom: '3rem',
            transform: isVisible.video ? 'scale(1)' : 'scale(0.95)',
            opacity: isVisible.video ? 1 : 0,
            transition: 'all 1s ease-out 1.1s',
            position: 'relative',
            height: '70vh',
            borderRadius: '0.75rem',
            overflow: 'hidden',
            boxShadow: 'var(--box-shadow)'
          }}
        >
          <img 
            src={videos[currentVideoIndex].thumbnail}
            alt={videos[currentVideoIndex].title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'all 1s ease'
            }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6))',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-white)',
            textAlign: 'center',
            padding: '2rem'
          }}>
            {/*
            <button style={{
              background: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '50%',
              padding: '1.5rem',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontSize: '2rem',
              marginBottom: '1rem',
              boxShadow: 'var(--box-shadow)'
            }}>
              ▶️
            </button>
            */}
            <div className="bg-white/25 rounded-full p-6 group-hover:scale-110 transition-transform duration-300"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-play text-black ml-1" aria-hidden="true"><path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"></path></svg></div>
            <h3 style={{
              fontSize: 'var(--font-size-h3)',
              fontWeight: 'var(--font-weight-medium)',
              color: 'var(--color-white)',
              lineHeight: '1.4',
              margin: 0
            }}>
              {videos[currentVideoIndex].title}
            </h3>
          </div>
        </div>

        {/* Latest Sermon */}
        <div 
          data-section="sermon"
          style={{
            background: 'var(--bg-main-box)',
            padding: '3rem',
            borderRadius: '0.75rem',
            boxShadow: 'var(--box-shadow)',
            transform: isVisible.sermon ? 'translateY(0)' : 'translateY(50px)',
            opacity: isVisible.sermon ? 1 : 0,
            transition: 'all 1s ease-out 1.3s',
            borderTop: '6px solid var(--color-black-20)'
          }}
        >
          <h2 style={{
            fontSize: 'var(--font-size-h2)',
            fontWeight: 'var(--font-weight-bold)',
            color: 'var(--color-black)',
            lineHeight: '1.3',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            📖 Latest Sermon
          </h2>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{
              background: 'var(--bg-main)',
              borderRadius: '0.75rem',
              boxShadow: 'var(--box-shadow)',
              padding: '2rem'
            }}>
              <h3 style={{
                fontSize: 'var(--font-size-h3)',
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--color-black)',
                lineHeight: '1.4',
                marginBottom: '1rem'
              }}>
                "Walking by Faith, Not by Sight"
              </h3>
              <p style={{
                fontSize: 'var(--font-size-span)',
                fontWeight: 'var(--font-weight-regular)',
                color: 'var(--color-black-60)',
                marginBottom: '1rem'
              }}>
                Pastor John Smith • Sunday, August 11, 2025
              </p>
              <p style={{
                fontSize: 'var(--font-size-p)',
                fontWeight: 'var(--font-weight-regular)',
                color: 'var(--color-black-80)',
                lineHeight: '1.6',
                marginBottom: '1.5rem'
              }}>
                Discover how to trust God's plan even when the path ahead seems uncertain. 
                Learn practical ways to strengthen your faith and find peace in God's promises.
              </p>
              <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap',
                gap: '1rem' 
              }}>
                <button style={{
                  background: 'var(--color-black-90)',
                  color: 'var(--color-white)',
                  fontWeight: 'var(--font-weight-bold)',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}>
                  Watch Sermon
                </button>
                <button style={{
                  background: 'var(--color-black-20)',
                  color: 'var(--color-black-90)',
                  fontWeight: 'var(--font-weight-bold)',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}>
                  Download Audio
                </button>
                <button style={{
                  background: 'var(--color-black-20)',
                  color: 'var(--color-black-90)',
                  fontWeight: 'var(--font-weight-bold)',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}>
                  Read Notes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;