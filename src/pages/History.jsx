    import React, { useState, useEffect } from 'react';
import { bookingService } from '../services/bookingService';
import { Calendar, MapPin, Clock, CheckCircle, XCircle } from 'lucide-react';

const History = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const data = await bookingService.getBookings();
      setBookings(data);
    } catch (error) {
      console.error('Failed to load bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="status-icon completed" />;
      case 'cancelled': return <XCircle className="status-icon cancelled" />;
      default: return <Clock className="status-icon pending" />;
    }
  };

  return (
    <div className="history-page">
      <h1>Booking History</h1>
      <div className="bookings-list">
        {bookings.map(booking => (
          <div key={booking._id} className="booking-card">
            <div className="booking-header">
              <h3>{booking.patientName}</h3>
              <div className="booking-status">
                {getStatusIcon(booking.status)}
                <span>{booking.status}</span>
              </div>
            </div>
            <div className="booking-details">
              <div className="detail">
                <MapPin size={16} />
                <span>{booking.location}</span>
              </div>
              <div className="detail">
                <Calendar size={16} />
                <span>{new Date(booking.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;