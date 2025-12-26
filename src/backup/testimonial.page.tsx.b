import { useState } from "react";

import TestimonialMessageDropper from "./testimonials/components/testimonial.message.dropper";

const TestimonialsPage = () => {
  const [selectedTestimonial, setSelectedTestimonial] = useState<any>(null);

  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b15c2fd0?w=150&h=150&fit=crop&crop=face&auto=format",
      testimonial:
        "This church has been a blessing to our family. The community is welcoming and the teachings are life-changing.",
      role: "Guest",
    },
    {
      id: 2,
      name: "Kyle Doe",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format",
      testimonial:
        "This church has been a blessing to our family. The community is welcoming and the teachings are life-changing.",
      role: "Church Member Pastor",
    },
    {
      id: 3,
      name: "Sam Meltmer",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format",
      testimonial:
        "This church has been a blessing to our family. The community is welcoming and the teachings are life-changing.",
      role: "Musician",
    },
    {
      id: 4,
      name: "Alicja Khan",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face&auto=format",
      testimonial:
        "This church has been a blessing to our family. The community is welcoming and the teachings are life-changing.",
      role: "Friend",
    },
  ];

  const handleCardClick = (testimonial: any) => {
    setSelectedTestimonial(testimonial);
  };

  const closeModal = () => {
    setSelectedTestimonial(null);
  };

  return (
    <>
      <div className="testimonials-container relative">
        <div className="testimonials-wrapper">
          {/* Header Section */}
          <div className="testimonials-header text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 tracking-wide">
              TESTIMONIALS
            </h1>
            <div className="mx-auto mt-3 w-24 h-1 bg-blue-600 rounded-full"></div>
          </div>

          {/* Testimonials Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                onClick={() => handleCardClick(testimonial)}
                className="
                  cursor-pointer bg-white rounded-xl shadow-md p-5 
                  hover:shadow-xl transition-shadow duration-200
                  flex flex-col items-center text-center border border-gray-100
                "
              >
                {/* Profile Image */}
                <div className="w-24 h-24 rounded-full overflow-hidden mb-3">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Testimonial Text */}
                <div className="flex flex-col items-center">
                  <p className="text-gray-600 text-sm italic line-clamp-3">
                    “{testimonial.testimonial}”
                  </p>
                </div>

                {/* Author Info */}
                <div className="mt-3">
                  <p className="font-semibold text-gray-800">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-blue-600 font-medium mt-1">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popup Modal for Full Testimonial */}
        {selectedTestimonial && (
          <div
            className="
              fixed inset-0 bg-black bg-opacity-50 z-50 
              flex items-center justify-center px-4
            "
          >
            <div
              className="
                bg-white rounded-xl shadow-2xl p-6 relative 
                max-w-md w-full max-h-[90vh] overflow-y-auto
                animate-fadeIn text-center
              "
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>

              {/* Profile Image */}
              <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-blue-600 mb-4">
                <img
                  src={selectedTestimonial.image}
                  alt={selectedTestimonial.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name & Role */}
              <h2 className="text-xl font-bold text-gray-800">
                {selectedTestimonial.name}
              </h2>
              <p className="text-sm text-blue-600 font-medium mb-4">
                {selectedTestimonial.role}
              </p>

              {/* Full Testimonial */}
              <p className="text-gray-700 italic leading-relaxed">
                “{selectedTestimonial.testimonial}”
              </p>

              {/* Close Button Below */}
              <button
                onClick={closeModal}
                className="
                  mt-6 bg-blue-600 hover:bg-blue-700 text-white 
                  px-6 py-2 rounded-lg font-semibold 
                  transition-all duration-200
                "
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Floating Dropper */}
        <TestimonialMessageDropper />
      </div>
    </>
  );
};

export default TestimonialsPage;
