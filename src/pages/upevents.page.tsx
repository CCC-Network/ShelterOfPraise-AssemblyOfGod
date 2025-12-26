const UpcomingEventsPage = () => (
    <div className="container mx-auto px-4 py-16">
      <h1 className="custom-h1 mb-8 text-center">Upcoming Events</h1>
      <div className="max-w-4xl mx-auto space-y-6">
        {[
          { title: "Sunday Worship Service", date: "Every Sunday, 10:00 AM" },
          { title: "Prayer Meeting", date: "Every Wednesday, 7:00 PM" },
          { title: "Youth Night", date: "Every Friday, 6:00 PM" },
          { title: "Community Outreach", date: "January 25, 2025" }
        ].map((event, i) => (
          <div key={i} className="custom-box">
            <h3 className="custom-h3 mb-2">{event.title}</h3>
            <p className="custom-span text-gray-500">{event.date}</p>
          </div>
        ))}
      </div>
    </div>
  );

export default UpcomingEventsPage;
