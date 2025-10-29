import React from 'react'
import { Ambulance, Phone, Mail, MapPin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-logo">
            <Ambulance className="logo-icon" />
            <span>Ambulance System</span>
          </div>
          <p>24/7 emergency medical response services. Fast, reliable, and professional care when you need it most.</p>
        </div>

        <div className="footer-section">
          <h3>Emergency Contacts</h3>
          <div className="contact-info">
            <Phone size={16} />
            <span>911 / 112</span>
          </div>
          <div className="contact-info">
            <Mail size={16} />
            <span>emergency@ambulancesystem.com</span>
          </div>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <a href="/booking">Request Ambulance</a>
          <a href="/tracking">Track Ambulance</a>
          <a href="/login">User Login</a>
          <a href="/admin">Admin Panel</a>
        </div>

        <div className="footer-section">
          <h3>Service Areas</h3>
          <div className="contact-info">
            <MapPin size={16} />
            <span>City-wide coverage</span>
          </div>
          <p>Available 24/7 across all metropolitan areas</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2024 Ambulance System. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer