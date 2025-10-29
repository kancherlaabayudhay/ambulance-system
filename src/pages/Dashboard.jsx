import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Ambulance, History, User, MapPin } from 'lucide-react'

const Dashboard = () => {
  const { user } = useAuth()

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome, {user?.name}!</h1>
        <p>Emergency ambulance services at your fingertips</p>
      </div>

      <div className="dashboard-grid">
        <Link to="/booking" className="dashboard-card primary">
          <Ambulance className="card-icon" />
          <h3>Request Ambulance</h3>
          <p>Emergency medical transport</p>
        </Link>

        <Link to="/tracking" className="dashboard-card">
          <MapPin className="card-icon" />
          <h3>Track Ambulance</h3>
          <p>Live location tracking</p>
        </Link>

        <Link to="/history" className="dashboard-card">
          <History className="card-icon" />
          <h3>Booking History</h3>
          <p>Past emergency requests</p>
        </Link>

        <Link to="/profile" className="dashboard-card">
          <User className="card-icon" />
          <h3>Profile</h3>
          <p>Manage your account</p>
        </Link>
      </div>

      {/* Recent Activity Section */}
      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-info">
              <strong>Emergency Request</strong>
              <span>Cardiac Emergency - Downtown</span>
            </div>
            <div className="activity-status completed">Completed</div>
          </div>
          <div className="activity-item">
            <div className="activity-info">
              <strong>Ambulance Dispatched</strong>
              <span>Trauma Case - City Hospital</span>
            </div>
            <div className="activity-status in-progress">In Progress</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard