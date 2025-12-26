 {/*
  const contentByTab = {
    answers: {
      mainContent: [
        {
          id: 1,
          image: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800&h=600&fit=crop',
          category: 'Answers',
          title: 'Understanding Biblical Questions',
          description: 'Find answers to your faith questions through scripture and biblical wisdom. We explore common questions about Christianity and provide thoughtful, scripture-based responses.',
          author: 'Pastor John Smith',
          date: 'Nov 8, 2025',
          verse: '“The Lord is my shepherd; I shall not want.”',
          verseReference: 'Psalm 23:1',
          fullContent: 'Find answers to your faith questions through scripture and biblical wisdom. We explore common questions about Christianity and provide thoughtful, scripture-based responses.',
          readTime: '5 min read'
        },
        {
          id: 2,
          image: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800&h=600&fit=crop',
          category: 'Answers',
          title: 'Faith and Doubt: Finding Balance',
          description: 'Explore how to navigate doubts while maintaining a strong faith foundation. Learn from biblical examples of those who questioned and found deeper faith.',
          author: 'Rev. Sarah Johnson',
          date: 'Nov 7, 2025',
          verse: '“The Lord is my shepherd; I shall not want.”',
          verseReference: 'Psalm 23:1',
          fullContent: 'Explore how to navigate doubts while maintaining a strong faith foundation. Learn from biblical examples of those who questioned and found deeper faith.',
          readTime: '4 min read'
        }
      ],
      topStories: [
        { id: 1, image: 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=400&h=300&fit=crop', title: 'Most Asked Questions This Month', author: 'Q&A Team', views: '3.2k', daysAgo: '1 day ago' },
        { id: 2, image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=300&fit=crop', title: 'Theology 101: Common Misconceptions', author: 'Teaching Ministry', views: '2.8k', daysAgo: '2 days ago' }
      ]
    },
    devotional: {
      mainContent: [
        {
          id: 1,
          image: 'https://images.unsplash.com/photo-1501612780327-45045538702b?w=800&h=600&fit=crop',
          category: 'Daily Devotional',
          title: 'Morning Reflections: God\'s Grace',
          description: 'Start your day with inspiration and biblical wisdom. Today\'s devotional focuses on experiencing God\'s grace in our daily lives and sharing that grace with others.',
          author: 'Rev. Sarah Johnson',
          date: 'Nov 10, 2025',
          readTime: '3 min read'
        },
        {
          id: 2,
          image: 'https://images.unsplash.com/photo-1472148439583-f5a1f2d0e7fa?w=800&h=600&fit=crop',
          category: 'Daily Devotional',
          title: 'Evening Peace: Finding Rest in God',
          description: 'End your day with peaceful reflection on God\'s promises. Discover how to find rest and renewal through prayer and meditation on His word.',
          author: 'Pastor Michael Brown',
          date: 'Nov 9, 2025',
          readTime: '4 min read'
        }
      ],
      topStories: [
        { id: 1, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop', title: 'Weekly Devotional Guide Released', author: 'Devotional Team', views: '4.1k', daysAgo: '1 day ago' },
        { id: 2, image: 'https://images.unsplash.com/photo-1528605105345-5344ea20e269?w=400&h=300&fit=crop', title: 'Scripture Memory Challenge', author: 'Education Dept', views: '3.5k', daysAgo: '3 days ago' }
      ]
    },
    sermons: {
      mainContent: [
        {
          id: 1,
          image: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800&h=600&fit=crop',
          category: 'Sermons',
          title: 'Faith That Moves Mountains',
          description: 'This Sunday\'s powerful message about unwavering faith and trusting God through life\'s challenges. Learn how biblical faith can transform your perspective and life.',
          author: 'Senior Pastor David Lee',
          date: 'Nov 10, 2025',
          readTime: '45 min read'
        },
        {
          id: 2,
          image: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800&h=600&fit=crop',
          category: 'Sermons',
          title: 'The Power of Forgiveness',
          description: 'Discover the biblical foundation of forgiveness and how releasing grudges brings freedom. A transformative sermon series on healing relationships.',
          author: 'Pastor John Smith',
          date: 'Nov 3, 2025',
          readTime: '40 min read'
        }
      ],
      topStories: [
        { id: 1, image: 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=400&h=300&fit=crop', title: 'Most Viewed Sermon of 2025', author: 'Media Team', views: '15.2k', daysAgo: '5 days ago' },
        { id: 2, image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=300&fit=crop', title: 'New Sermon Series Announced', author: 'Pastor Team', views: '8.7k', daysAgo: '1 week ago' }
      ]
    },
    news: {
      mainContent: [
        {
          id: 1,
          image: 'https://images.unsplash.com/photo-1501612780327-45045538702b?w=800&h=600&fit=crop',
          category: 'News',
          title: 'Church Building Expansion Approved',
          description: 'Exciting news as our congregation votes to expand the fellowship hall and children\'s ministry spaces. Construction begins next spring.',
          author: 'Communications Team',
          date: 'Nov 9, 2025',
          readTime: '3 min read'
        },
        {
          id: 2,
          image: 'https://images.unsplash.com/photo-1472148439583-f5a1f2d0e7fa?w=800&h=600&fit=crop',
          category: 'News',
          title: 'Annual Conference Registration Open',
          description: 'Join us for three days of worship, teaching, and fellowship at our regional church conference. Early bird pricing available until December 1st.',
          author: 'Events Coordinator',
          date: 'Nov 8, 2025',
          readTime: '2 min read'
        }
      ],
      topStories: [
        { id: 1, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop', title: 'Breaking: New Youth Pastor Joins Team', author: 'Staff Updates', views: '5.3k', daysAgo: '2 days ago' },
        { id: 2, image: 'https://images.unsplash.com/photo-1528605105345-5344ea20e269?w=400&h=300&fit=crop', title: 'Mission Trip Fundraiser Success', author: 'Missions Dept', views: '4.2k', daysAgo: '4 days ago' }
      ]
    },
    informational: {
      mainContent: [
        {
          id: 1,
          image: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800&h=600&fit=crop',
          category: 'Informational',
          title: 'Small Groups: How to Get Started',
          description: 'Everything you need to know about joining or starting a small group in our church. Discover the benefits of intimate fellowship and accountability.',
          author: 'Small Groups Director',
          date: 'Nov 7, 2025',
          readTime: '6 min read'
        },
        {
          id: 2,
          image: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800&h=600&fit=crop',
          category: 'Informational',
          title: 'Membership Classes Schedule',
          description: 'Learn about our church beliefs, mission, and how to become a member. Classes meet monthly and include a welcome lunch.',
          author: 'Membership Coordinator',
          date: 'Nov 5, 2025',
          readTime: '4 min read'
        }
      ],
      topStories: [
        { id: 1, image: 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=400&h=300&fit=crop', title: 'Facility Use Guidelines Updated', author: 'Admin Team', views: '2.1k', daysAgo: '3 days ago' },
        { id: 2, image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=300&fit=crop', title: 'Parking and Security Info', author: 'Operations', views: '1.8k', daysAgo: '1 week ago' }
      ]
    },
    community: {
      mainContent: [
        {
          id: 1,
          image: 'https://images.unsplash.com/photo-1501612780327-45045538702b?w=800&h=600&fit=crop',
          category: 'Community',
          title: 'Volunteer Spotlight: Meet Sarah',
          description: 'This month we celebrate Sarah Thompson, who has dedicated 10 years to our children\'s ministry. Her story will inspire you to get involved.',
          author: 'Community Relations',
          date: 'Nov 8, 2025',
          readTime: '5 min read'
        },
        {
          id: 2,
          image: 'https://images.unsplash.com/photo-1472148439583-f5a1f2d0e7fa?w=800&h=600&fit=crop',
          category: 'Community',
          title: 'Food Pantry Serves 500th Family',
          description: 'Our community food pantry reaches a major milestone, serving hundreds of families in need. Learn how you can help make a difference.',
          author: 'Outreach Ministry',
          date: 'Nov 6, 2025',
          readTime: '4 min read'
        }
      ],
      topStories: [
        { id: 1, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop', title: 'Community Thanksgiving Dinner', author: 'Events Team', views: '6.5k', daysAgo: '1 day ago' },
        { id: 2, image: 'https://images.unsplash.com/photo-1528605105345-5344ea20e269?w=400&h=300&fit=crop', title: 'Neighborhood Cleanup Success', author: 'Community Outreach', views: '3.9k', daysAgo: '5 days ago' }
      ]
    }
  };

  const currentContent = contentByTab[activeTab as keyof typeof contentByTab];
  const mainContent = currentContent.mainContent;

  const sidebarQueue = [
    { id: 1, title: 'The Power of Prayer in Times of Trouble', date: 'Nov 9', readTime: '3 min read' },
    { id: 2, title: 'Understanding Biblical Prophecy Today', date: 'Nov 8', readTime: '5 min read' },
    { id: 3, title: 'Community Service: A Call to Action', date: 'Nov 7', readTime: '4 min read' },
    { id: 4, title: 'Youth Ministry Success Stories', date: 'Nov 6', readTime: '2 min read' },
    { id: 5, title: 'Marriage Enrichment Workshop Recap', date: 'Nov 5', readTime: '4 min read' }
  ];

  const topStories = currentContent.topStories;

  const latestStories = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1472148439583-f5a1f2d0e7fa?w=400&h=300&fit=crop',
      title: 'Worship Night This Friday',
      author: 'Worship Team',
      views: '890',
      daysAgo: '1 day ago'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&h=300&fit=crop',
      title: 'Bible Study Groups Starting',
      author: 'Small Groups',
      views: '1.2k',
      daysAgo: '2 days ago'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400&h=300&fit=crop',
      title: 'Volunteer Opportunities Available',
      author: 'Admin',
      views: '756',
      daysAgo: '3 days ago'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1502139214982-d0ad755818d8?w=400&h=300&fit=crop',
      title: 'Prayer Walk This Saturday',
      author: 'Prayer Ministry',
      views: '934',
      daysAgo: '4 days ago'
    }
  ];
*/}