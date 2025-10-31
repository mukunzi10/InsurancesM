const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const connectDB = require('./src/config/database');
const errorHandler = require('./src/middleware/errorHandler');

// Load environment variables
dotenv.config({ path: './.env' });

// Initialize Express
const app = express();

// Connect to MongoDB
connectDB();

// Trust proxy for reverse proxy rate limiting
app.set('trust proxy', 1);

// Security middleware
app.use(helmet());

// ✅ Enhanced CORS setup
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:3000',
  'http://localhost:3002', // for development
  'http://127.0.0.1:3000',
  'http://127.0.0.1:3002',
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (e.g., mobile apps or curl)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      console.warn(`🚫 CORS blocked request from: ${origin}`);
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: 'Too many requests from this IP, please try again later.',
});
app.use('/api/', limiter);

// Static uploads folder
app.use('/uploads', express.static('uploads'));

// Welcome route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Sanlam | Allianz Insurance API',
    version: '1.0.0',
    status: 'Running',
  });
});

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/policies', require('./src/routes/policyRoutes'));
app.use('/api/claims', require('./src/routes/claimRoutes'));
app.use('/api/payments', require('./src/routes/paymentRoutes'));
app.use('/api/complaints', require('./src/routes/complaintRoutes'));
app.use('/api/feedback', require('./src/routes/feedbackRoutes'));

// 404 fallback route
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Global Error Handler
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const server = app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT} in ${NODE_ENV} mode`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  server.close(() => console.log('🛑 Server gracefully terminated'));
});
process.on('SIGINT', () => {
  server.close(() => console.log('🛑 Server interrupted'));
});
