import React, { useState } from 'react'
import { MapPin, AlertTriangle, User, Phone, Navigation } from 'lucide-react'

const EmergencyForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    patientName: '',
    phone: '',
    location: '',
    emergencyType: 'general',
    description: ''
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      // Simulate API call - replace with actual booking service
      console.log('Emergency booking submitted:', formData)
      if (onSubmit) {
        onSubmit(formData)
      }
      alert('Ambulance requested successfully! We are dispatching help.')
    } catch (error) {
      alert('Failed to create booking. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData(prev => ({
            ...prev,
            location: `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`
          }));
          alert('Location captured successfully!');
        },
        (error) => {
          alert('Unable to get your location. Please enter manually.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

  return (
    <div className="emergency-form">
      <div className="form-header">
        <AlertTriangle className="emergency-icon" />
        <h2>Emergency Ambulance Request</h2>
        <p>Fill out the form below to request immediate medical assistance</p>
      </div>
      
      <form onSubmit={handleSubmit} className="emergency-form-content">
        <div className="input-group">
          <User className="input-icon" />
          <input
            type="text"
            name="patientName"
            placeholder="Patient Name"
            value={formData.patientName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <Phone className="input-icon" />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <MapPin className="input-icon" />
          <input
            type="text"
            name="location"
            placeholder="Pickup Location"
            value={formData.location}
            onChange={handleChange}
            required
          />
          <button 
            type="button" 
            onClick={getCurrentLocation}
            className="location-btn"
          >
            <Navigation size={16} />
          </button>
        </div>

        <div className="input-group">
          <select 
            name="emergencyType" 
            value={formData.emergencyType}
            onChange={handleChange}
            className="emergency-type-select"
          >
            <option value="general">General Emergency</option>
            <option value="cardiac">Cardiac Emergency</option>
            <option value="trauma">Trauma</option>
            <option value="stroke">Stroke</option>
            <option value="respiratory">Respiratory</option>
          </select>
        </div>

        <div className="input-group">
          <textarea
            name="description"
            placeholder="Additional details about the emergency..."
            value={formData.description}
            onChange={handleChange}
            rows={3}
          />
        </div>

        <button 
          type="submit" 
          className="emergency-submit-btn"
          disabled={loading}
        >
          {loading ? 'Requesting Ambulance...' : 'Request Ambulance Now'}
        </button>
      </form>
    </div>
  )
}

export default EmergencyForm