const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Hardcoded configuration
const config = {
  PORT: 3001, // Changed to 3001
  MONGODB_URI: 'mongodb+srv://kancherlaabyudhay2004_db_user:abyudhay@cluster0.sxyucad.mongodb.net/ambulance-system?retryWrites=true&w=majority',
  JWT_SECRET: '0847b4cd0c5b5566a3935e435524a31e638d4b3ffb05e6a318443644b1a87e55bce91ba9b9451a4097bb1c6d5282c90ade2646700e6c855da8b66a05abf8b701'
};

console.log('🚀 Starting Ambulance System Backend...');
console.log('📍 Port:', config.PORT);
console.log('☁️  Database: MongoDB Atlas');

// Import routes
const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/bookings');
const ambulanceRoutes = require('./routes/ambulances');
const userRoutes = require('./routes/users');

const app = express();

// Connect to MongoDB Atlas
console.log('🔗 Connecting to MongoDB Atlas...');
mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB Atlas Connected Successfully!');
  console.log(`📊 Database: ${mongoose.connection.name}`);
  console.log(`👤 User: kancherlaabyudhay2004_db_user`);
})
.catch((error) => {
  console.error('❌ MongoDB Connection Failed:', error.message);
  console.log('🔧 Please check:');
  console.log('   1. IP whitelisting in MongoDB Atlas');
  console.log('   2. Username and password are correct');
  console.log('   3. Internet connection');
  process.exit(1);
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/ambulances', ambulanceRoutes);
app.use('/api/users', userRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ 
    message: '🚑 Ambulance System API is running!',
    database: 'MongoDB Atlas',
    status: 'Connected',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Route ${req.originalUrl} not found`
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    status: 'error',
    message: 'Something went wrong!' 
  });
});

app.listen(config.PORT, () => {
  console.log(`🎉 Server successfully started!`);
  console.log(`📍 API URL: http://localhost:${config.PORT}/api`);
  console.log(`📚 Endpoints:`);
  console.log(`   POST http://localhost:${config.PORT}/api/auth/register`);
  console.log(`   POST http://localhost:${config.PORT}/api/auth/login`);
  console.log(`   GET  http://localhost:${config.PORT}/api/auth/profile`);
  console.log(`   POST http://localhost:${config.PORT}/api/bookings`);
  console.log(`\n✅ Ready to accept requests!`);
});