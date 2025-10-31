const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

// Configuration
const config = {
  PORT: process.env.PORT || 3001,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb+srv://kancherlaabayudhay2004_db_user:abyudhay@cluster0.sxyucad.mongodb.net/ambulance-system?retryWrites=true&w=majority',
  JWT_SECRET: process.env.JWT_SECRET || '0847b4cd0c5b5566a3935e435524a31e638d4b3ffb05e6a318443644b1a87e55bce91ba9b9451a4097bb1c6d5282c90ade2646700e6c855da8b66a05abf8b701',
  NODE_ENV: process.env.NODE_ENV || 'development'
};

console.log('🚀 Starting Ambulance System Backend...');
console.log('📍 Environment:', config.NODE_ENV);
console.log('🔧 Port:', config.PORT);
console.log('☁️  Database: MongoDB Atlas');

// Import routes
const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/bookings');
const ambulanceRoutes = require('./routes/ambulances');
const userRoutes = require('./routes/users');

const app = express();

// CORS configuration for production
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:3000',
      'https://ambulance-system.netlify.app',
      'https://*.netlify.app',
      'https://ambulance-system-backend.onrender.com'
    ];
    
    if (allowedOrigins.indexOf(origin) !== -1 || origin.includes('netlify')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is healthy',
    timestamp: new Date().toISOString(),
    environment: config.NODE_ENV
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/ambulances', ambulanceRoutes);
app.use('/api/users', userRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: '🚑 Ambulance System API is running!',
    version: '1.0.0',
    environment: config.NODE_ENV,
    database: 'MongoDB Atlas',
    timestamp: new Date().toISOString(),
    endpoints: {
      auth: '/api/auth',
      bookings: '/api/bookings',
      ambulances: '/api/ambulances',
      users: '/api/users'
    }
  });
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: `API route ${req.originalUrl} not found`
  });
});

// Serve static files in production (if needed)
if (config.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('🔥 Error Stack:', err.stack);
  
  // CORS error
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({
      status: 'error',
      message: 'CORS policy: Origin not allowed'
    });
  }
  
  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(el => el.message);
    return res.status(400).json({
      status: 'error',
      message: `Invalid input data: ${errors.join('. ')}`
    });
  }
  
  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({
      status: 'error',
      message: `${field} already exists`
    });
  }
  
  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      status: 'error',
      message: 'Invalid token. Please log in again.'
    });
  }
  
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      status: 'error',
      message: 'Token expired. Please log in again.'
    });
  }
  
  // Default error
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Internal server error'
  });
});

// Database connection with retry logic
const connectDB = async (retries = 5, delay = 5000) => {
  try {
    console.log('🔗 Connecting to MongoDB Atlas...');
    
    await mongoose.connect(config.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log('✅ MongoDB Atlas Connected Successfully!');
    console.log(`📊 Database: ${mongoose.connection.name}`);
    console.log(`👤 Connected as: kancherlaabayudhay2004_db_user`);
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    
    if (retries > 0) {
      console.log(`🔄 Retrying connection... (${retries} attempts left)`);
      setTimeout(() => connectDB(retries - 1, delay), delay);
    } else {
      console.error('💥 Could not connect to MongoDB after multiple attempts');
      process.exit(1);
    }
  }
};

// Handle database connection events
mongoose.connection.on('disconnected', () => {
  console.log('🔌 MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB error:', err);
});

// Start server
const startServer = async () => {
  try {
    // Connect to database first
    await connectDB();
    
    // Start listening
    const server = app.listen(config.PORT, () => {
      console.log(`🎉 Server successfully started!`);
      console.log(`📍 API URL: http://localhost:${config.PORT}`);
      console.log(`🌐 Environment: ${config.NODE_ENV}`);
      console.log(`📚 API Documentation: http://localhost:${config.PORT}/`);
      console.log(`❤️  Health Check: http://localhost:${config.PORT}/health`);
      console.log('\n✅ Ready to accept requests!');
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
      console.log('👋 SIGTERM received. Shutting down gracefully...');
      server.close(() => {
        console.log('💤 Process terminated.');
        process.exit(0);
      });
    });

  } catch (error) {
    console.error('💥 Failed to start server:', error);
    process.exit(1);
  }
};

// Start the application
startServer();

module.exports = app; // For testing