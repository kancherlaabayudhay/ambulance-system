import React from 'react'
import { Link } from 'react-router-dom'
import { Ambulance, Clock, MapPin, Shield } from 'lucide-react'

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Emergency Ambulance Service</h1>
          <p>24/7 emergency medical response. Fast, reliable, and professional ambulance services when you need them most.</p>
          <div className="hero-buttons">
            <Link to="/booking" className="btn-primary">
              <Ambulance size={20} />
              Request Ambulance
            </Link>
            <Link to="/login" className="btn-secondary">
              Existing User
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2>Why Choose Our Service?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <Clock className="feature-icon" />
              <h3>24/7 Availability</h3>
              <p>Round-the-clock emergency response teams ready to serve you anytime, anywhere.</p>
            </div>
            <div className="feature-card">
              <MapPin className="feature-icon" />
              <h3>Live Tracking</h3>
              <p>Real-time ambulance tracking so you know exactly when help will arrive.</p>
            </div>
            <div className="feature-card">
              <Shield className="feature-icon" />
              <h3>Professional Team</h3>
              <p>Certified EMTs and medical professionals providing quality emergency care.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home