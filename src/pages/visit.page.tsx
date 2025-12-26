import { useEffect } from "react";
import { initVisitFormHandler } from "../utils/visit.sendus.form";

const VisitUsPage = () => {

  useEffect(() => {
    initVisitFormHandler();
  }, []);

  return (
  <div className="container mx-auto px-4 py-16">
    <h1 className="custom-h1 mb-12 text-center">Visit Us</h1>

    {/* Full-width Map */}
    <div className="mb-12 rounded-lg overflow-hidden shadow-lg">
      <iframe title="Church Location Map" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3614.4463606544905!2d124.76644!3d7.6545106!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32ff4ff1de3a18f3%3A0x1027ba4d12d627c4!2sAssembly%20Of%20God!5e1!3m2!1sen!2sph!4v1755402627708!5m2!1sen!2sph"
        width="100%"
        height="400"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
      ></iframe>
    </div>

    {/* Welcome Message */}
    <div className="custom-box mb-12 text-center">
      <h2 className="custom-h2 mb-4">We'd Love to See You!</h2>
      <p className="custom-p mb-4">
        Join us for worship this Sunday. Come as you are - we're a welcoming community.
      </p>
    </div>

    {/* Location & Service Times */}
    <div className="grid md:grid-cols-2 gap-8 mb-12">
      <div className="custom-box">
        <h3 className="custom-h3 mb-4">Location</h3>
        <p className="custom-p">MQ38+RH4, Kalilangan, Bukidnon, Northern Mindanao, Philippines</p>
      </div>
      <div className="custom-box">
        <h3 className="custom-h3 mb-4">Service Times</h3>
        <p className="custom-p">
          Sunday: 09:00 AM<br />
          {/* 
          Wednesday: 7:00 PM<br />
          Friday: 6:00 PM
          */}
        </p>
      </div>
    </div>

    {/* Contact Info */}
    <div className="custom-box mb-12">
      <h3 className="custom-h3 mb-4">Contact Info</h3>
      <p className="custom-p">
        Phone: +63 951 251 8441<br />
        Email: conquerorscoheirsag@gmail.com<br />
        Facebook: <a href="https://www.facebook.com/profile.php?id=100066738213169" target="_blank" rel="noreferrer">Shelter of Praise Assembly of God</a>
      </p>
    </div>

    {/* Contact Form */}
    <div className="custom-box">
      <h3 className="custom-h3 mb-4">Send Us a Message</h3>
      <form id="triggerFormVisitForm" className="space-y-4" method="post">{/*action={"https://formsubmit.co/el/varibu"}*/}
      <div>
          <label className="custom-p block mb-1" htmlFor="name">Subject</label>
          <input className="triggerSubject visit-g-cls-ex w-full border rounded px-3 py-2" type="text" id="subject" name="subject" placeholder="Subject" />
        </div>
        <div>
          <label className="custom-p block mb-1" htmlFor="name">Name</label>
          <input className="triggerName visit-g-cls w-full border rounded px-3 py-2" type="text" id="name" name="name" placeholder="Your Name" />
        </div>
        <div>
          <label className="custom-p block mb-1" htmlFor="email">Email</label>
          <input className="triggerEmail visit-g-cls w-full border rounded px-3 py-2" type="email" id="email" name="email" placeholder="Your Email" />
        </div>
        <div>
          <label className="custom-p block mb-1" htmlFor="message">Message</label>
          <textarea className="triggerMessage visit-g-cls w-full border rounded px-3 py-2" id="message" name="message" placeholder="Your Message" rows={4}></textarea>
        </div>
        <div className="optionFormPrivacyNotice flex items-center">
          <input type="checkbox" id="privacyPolicy" name="privacyPolicy" required />
        <p className="custom-p ml-2">By submitting this form, you agree to our <a href="https://shelterofpraiseassemblyofgod.org/privacy-policy" className="custom-link">Privacy Policy</a>.</p>
      </div>
        <button id="triggerSubmitForm" className="custom-button" type="submit">Send Message</button>
      </form>
      <br />
      <div className="optionOutsideForm custom-box block mb-12 text-center space-y-2">
        <p className="custom-p">Have an error while submitting the form?</p>
        <div className="space-x-2 text-center">
        <p className="custom-p">Send us an email at <a href="mailto:conquerorscoheirsag@gmail.com">conquerorscoheirsag@gmail.com</a></p> <p className="custom-p">or</p> <a className="custom-link" target="_blank" rel="noreferrer" href="https://formsubmit.co/el/varibu">Here</a>
      </div>
      </div>
    </div>
  </div>
);
}


export default VisitUsPage;
