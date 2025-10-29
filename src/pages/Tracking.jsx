import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Navigation, Clock, User } from 'lucide-react'

const Tracking = () => {
  // Temporary mock data
  const ambulanceLocation = [51.505, -0.09] // London coordinates
  const eta = "8 minutes"

  return (
    <div className="tracking-page">
      <div className="tracking-header">
        <h1>Live Ambulance Tracking</h1>
        <p>Real-time location of your dispatched ambulance</p>
      </div>

      <div className="tracking-container">
        <div className="tracking-info">
          <div className="info-card">
            <Clock className="info-icon" />
            <div>
              <h3>Estimated Arrival</h3>
              <p className="eta">{eta}</p>
            </div>
          </div>
          
          <div className="info-card">
            <User className="info-icon" />
            <div>
              <h3>Medical Team</h3>
              <p>2 EMTs, 1 Paramedic</p>
            </div>
          </div>

          <div className="info-card">
            <Navigation className="info-icon" />
            <div>
              <h3>Ambulance No.</h3>
              <p>AMB-2024-001</p>
            </div>
          </div>
        </div>

        <div className="tracking-map">
          <MapContainer 
            center={ambulanceLocation} 
            zoom={13} 
            style={{ height: '400px', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={ambulanceLocation}>
              <Popup>
                Ambulance AMB-2024-001<br />
                ETA: {eta}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  )
}

export default Tracking