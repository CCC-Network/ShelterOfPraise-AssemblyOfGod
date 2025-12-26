import React, { useState } from "react";
import { X, MessageCircle, Upload, Link as LinkIcon } from "lucide-react";

const TestimonialMessageDropper = () => {
  const [open, setOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageLink, setImageLink] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");

  // Handle local file upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setImagePreview(previewURL);
      setImageLink(""); // reset link if file uploaded
    }
  };

  // Handle image link input
  const handleImageLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setImageLink(url);
    setImagePreview(url); // preview if valid link
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name,
      role,
      message,
      image: imagePreview || null,
    };

    // Temporary client-side submission log
    console.log("Submitted testimonial:", payload);

    alert("✅ Thank you! Your testimonial has been submitted (demo mode).");
    setOpen(false);

    // Reset form
    setName("");
    setRole("");
    setMessage("");
    setImagePreview(null);
    setImageLink("");
  };

  return (
    <>
      {/* ✅ Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className="
          fixed bottom-6 right-6 z-50 
          bg-blue-600 hover:bg-blue-700 
          text-white p-4 rounded-full shadow-xl 
          flex items-center gap-2 font-semibold 
          transition-all duration-200 hover:scale-105
        "
      >
        <MessageCircle className="w-5 h-5" />
        <span className="hidden sm:block">Give Testimonial</span>
      </button>

      {/* ✅ Popup Modal */}
      {open && (
        <div
          className="
            fixed inset-0 bg-black bg-opacity-50 z-50 
            flex items-center justify-center px-4
          "
        >
          <div
            className="
              bg-white rounded-xl shadow-2xl p-6 relative 
              max-w-md w-full animate-fadeIn
            "
          >
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              Share Your Testimonial
            </h2>
            <p className="text-gray-600 text-center mb-6">
              Your story can inspire others.
            </p>

            <form onSubmit={handleSubmit}>
              {/* Image Upload / Link */}
              <div className="flex flex-col items-center">
                <label
                  htmlFor="imageUpload"
                  className="
                    cursor-pointer w-32 h-32 rounded-full 
                    bg-gray-100 border border-gray-300 
                    flex items-center justify-center 
                    overflow-hidden hover:bg-gray-200
                  "
                >
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Upload className="w-7 h-7 text-gray-500" />
                  )}
                </label>

                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />

                {/* OR image link input */}
                <div className="w-full mt-3 flex items-center gap-2">
                  <LinkIcon className="w-5 h-5 text-gray-500" />
                  <input
                    id="imageLinkTestimonial"
                    type="url"
                    placeholder="or paste image URL here"
                    value={imageLink}
                    onChange={handleImageLink}
                    className="
                      w-full px-3 py-1.5 rounded-lg border text-sm
                      focus:ring-2 focus:ring-blue-500
                    "
                  />
                </div>

                <span className="text-xs text-gray-500 mt-2">
                  Upload or paste image link
                </span>
              </div>

              {/* Name Input */}
              <div className="mt-6">
                <label className="text-sm font-semibold text-gray-700">
                  Your Name
                </label>
                <input
                  id="testimonyName"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="
                    w-full mt-1 px-4 py-2 rounded-lg border 
                    focus:ring-2 focus:ring-blue-500
                  "
                />
              </div>

              {/* Role Input */}
              <div className="mt-4">
                <label className="text-sm font-semibold text-gray-700">
                  Your Role
                </label>
                <select
                  id="testimonyRole"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="
                    w-full mt-1 px-4 py-2 rounded-lg border 
                    focus:ring-2 focus:ring-blue-500
                  "
                ><option value="">Select your role</option>
                <option value="Guest">Guest</option>
                <option value="Church Member">Church Member</option>
                <option value="Pastor">Pastor</option>
                <option value="Associate Pastor">Associate Pastor</option>
                <option value="Youth Leader">Youth Leader</option>
                <option value="Worship Leader">Worship Leader</option>
                <option value="Choir Member">Choir Member</option>
                <option value="Musician">Musician</option>
                <option value="Sunday School Teacher">Sunday School Teacher</option>
                <option value="Kids Ministry Volunteer">Kids Ministry Volunteer</option>
                <option value="Usher">Usher</option>
                <option value="Media Team">Media Team</option>
                <option value="Technical Team">Technical Team</option>
                <option value="Outreach Volunteer">Outreach Volunteer</option>
                <option value="Missionary">Missionary</option>
                <option value="Church Staff">Church Staff</option>
                <option value="Elder">Elder</option>
                <option value="Deacon">Deacon</option>
                <option value="Ministry Head">Ministry Head</option>
                <option value="Small Group Leader">Small Group Leader</option>
                <option value="Parent">Parent</option>
                <option value="Student">Student</option>
                <option value="Visitor">Visitor</option>
                <option value="Friend">Friend</option>
                <option value="Online Viewer">Online Viewer</option>
                <option value="Donor">Donor</option>
                <option value="Partner">Partner</option>
                <option value="Other">Other</option>
                </select>
              </div>

              {/* Message Input */}
              <div className="mt-4">
                <label className="text-sm font-semibold text-gray-700">
                  Your Testimonial
                </label>
                <textarea
                  id="testimonyMessage"
                  rows={4}
                  placeholder="Write your testimonial..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="
                    w-full mt-1 px-4 py-2 rounded-lg border 
                    focus:ring-2 focus:ring-blue-500
                  "
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="
                  w-full mt-6 bg-blue-600 hover:bg-blue-700 
                  text-white py-3 rounded-lg font-semibold 
                  transition-all duration-200
                "
              >
                Submit Testimonial
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default TestimonialMessageDropper;
