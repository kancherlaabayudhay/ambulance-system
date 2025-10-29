import React from 'react'
import { Users, Ambulance, Activity, Calendar } from 'lucide-react'

const Admin = () => {
  const stats = [
    { icon: Users, label: 'Total Users', value: '1,234' },
    { icon: Ambulance, label: 'Active Ambulances', value: '24' },
    { icon: Activity, label: 'Today\'s Emergencies', value: '18' },
    { icon: Calendar, label: 'Monthly Requests', value: '542' }
  ]

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Manage ambulance system operations</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <stat.icon className="stat-icon" />
            <div className="stat-info">
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="admin-sections">
        <div className="admin-section">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <button className="action-btn">Manage Ambulances</button>
            <button className="action-btn">View All Bookings</button>
            <button className="action-btn">User Management</button>
            <button className="action-btn">Generate Reports</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin