import React from 'react'
import EmergencyForm from '../components/booking/EmergencyForm'

const Booking = () => {
  const handleEmergencySubmit = (formData) => {
    console.log('Emergency booking submitted:', formData)
    // TODO: Connect to backend API
    alert('Ambulance requested successfully! We are dispatching help.')
  }

  return (
    <div className="booking-page">
      <div className="page-header">
        <h1>Emergency Ambulance Booking</h1>
        <p>Fill out the form below to request immediate medical assistance</p>
      </div>
      
      <EmergencyForm onSubmit={handleEmergencySubmit} />
    </div>
  )
}

export default Booking