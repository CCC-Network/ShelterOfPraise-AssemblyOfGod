import React from 'react';

const ServePage = () => {
  const departments = [
    {
      id: 1,
      name: "Production Department",
      description: "Managing technical aspects, sound, lighting, and media production for services and events.",
      backgroundImage: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500&h=300&fit=crop&auto=format"
    },
    {
      id: 2,
      name: "Creative Department",
      description: "Developing visual content, graphics, and creative materials for ministry outreach.",
      backgroundImage: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=500&h=300&fit=crop&auto=format"
    },
    {
      id: 3,
      name: "Worship Department",
      description: "Leading the congregation in heartfelt worship, music, and spiritual expression.",
      backgroundImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=300&fit=crop&auto=format"
    },
    {
      id: 4,
      name: "Relationship Department",
      description: "Building connections, community outreach, and fostering meaningful relationships.",
      backgroundImage: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&h=300&fit=crop&auto=format"
    },
    {
      id: 5,
      name: "Sports Department",
      description: "Organizing athletic activities, sports ministry, and fitness programs for all ages.",
      backgroundImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop&auto=format"
    },
    {
      id: 6,
      name: "Admin Department",
      description: "Managing administrative tasks, coordination, and organizational support.",
      backgroundImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&h=300&fit=crop&auto=format"
    }
  ];

  return (
    <>
      <style>{`
        .serve-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 4rem 1rem;
          font-family: var(--font-main);
        }

        .serve-title {
          font-size: var(--font-size-h1);
          font-weight: var(--font-weight-black);
          color: var(--color-black);
          margin-bottom: 2rem;
          text-align: center;
          line-height: 1.2;
        }

        .serve-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .department-card {
          background: var(--bg-main-box);
          padding: 1.5rem;
          border-radius: 0.75rem;
          box-shadow: var(--box-shadow);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        .department-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 255, 255, 0.85);
          z-index: 1;
        }

        .department-content {
          position: relative;
          z-index: 2;
        }

        .department-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }

        .department-title {
          font-size: var(--font-size-h3);
          font-weight: var(--font-weight-medium);
          color: var(--color-black);
          margin-bottom: 1rem;
          line-height: 1.4;
        }

        .department-description {
          font-size: var(--font-size-p);
          font-weight: var(--font-weight-regular);
          color: var(--color-black);
          line-height: 1.6;
        }

        .serve-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .serve-subtitle {
          font-size: var(--font-size-span);
          font-weight: var(--font-weight-regular);
          color: var(--color-black-60);
          margin-top: 0.5rem;
        }

        @media (max-width: 768px) {
          .serve-container {
            padding: 2rem 1rem;
          }
          
          .serve-title {
            font-size: 2rem;
          }
          
          .serve-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }
      `}</style>

      <div className="serve-container">
        <div className="serve-header">
          <h1 className="serve-title">SERVE</h1>
          <p className="serve-subtitle">Join one of our departments and make a difference</p>
        </div>
        
        <div className="serve-grid">
          {departments.map((department) => (
            <div 
              key={department.id} 
              className="department-card"
              style={{ backgroundImage: `url(${department.backgroundImage})` }}
            >
              <div className="department-content">
                <h3 className="department-title">{department.name}</h3>
                <p className="department-description">{department.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ServePage;