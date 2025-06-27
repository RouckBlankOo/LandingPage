import React from "react";
import "./ContactSection.css";

const ContactSection: React.FC = () => {
  return (
    <section className="contact-section">
      <div className="contact-card">
        <h2 className="contact-title">Get in Touch</h2>
        <p className="contact-description">
          Have questions or want to work together? Feel free to reach out!
        </p>
        <form className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Your Name" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Your Email" />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" placeholder="Your Message"></textarea>
          </div>
          <button type="submit" className="submit-button">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
